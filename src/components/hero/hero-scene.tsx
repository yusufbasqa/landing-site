"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { scrollStore } from "@/lib/scroll-store";
import { heroTextStore } from "@/lib/hero-text-store";

// Below this width the cube sits centered beneath the text instead of
// beside it, and shrinks so the whole cube stays in view.
const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}

type Axis = "x" | "y" | "z";
type Vec3 = [number, number, number];

const GRID = [-1, 0, 1];
const SIZE = 0.8;
const GAP = 0.06;
const SPACING = SIZE + GAP;

const AXES: Axis[] = ["x", "y", "z"];
const LAYER_VALUES = [-1, 0, 1];
const AXIS_INDEX: Record<Axis, number> = { x: 0, y: 1, z: 2 };
const AXIS_VECTORS: Record<Axis, THREE.Vector3> = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};

// Light theme: cubies are a translucent sunflower orange rather than the
// traditional six-color Rubik's Cube faces.
const CUBIE_COLOR = "#FDAE44";

type CubieDatum = { coord: Vec3 };

function buildCubies(): CubieDatum[] {
  const cubies: CubieDatum[] = [];
  for (const x of GRID) {
    for (const y of GRID) {
      for (const z of GRID) {
        if (x === 0 && y === 0 && z === 0) continue;
        cubies.push({ coord: [x, y, z] });
      }
    }
  }
  return cubies;
}

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type TurnState =
  | { phase: "idle"; nextAt: number }
  | {
      phase: "turning";
      axis: Axis;
      direction: 1 | -1;
      startTime: number;
      duration: number;
      indices: number[];
    };

function RubiksCube({ isMobile }: { isMobile: boolean }) {
  const cubieData = useMemo(() => buildCubies(), []);
  const cubies = useRef(cubieData.map((c) => ({ coord: [...c.coord] as Vec3 })));
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const outerRef = useRef<THREE.Group>(null);
  const staticGroupRef = useRef<THREE.Group>(null);
  const pivotGroupRef = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const turnState = useRef<TurnState>({ phase: "idle", nextAt: 3 });

  // Desktop sits the cube beside the text; mobile centers it, shrunk,
  // beneath the text. The cube's own bounding half-extent (world units),
  // used to keep it clear of the text above and the viewport edge below.
  const baseX = isMobile ? 0 : 1.5;
  const cubeScale = isMobile ? 0.4 : 1;
  const cubeHalfExtent = 1.3 * cubeScale;
  const mobileGapPx = 28;

  useFrame((state, delta) => {
    spin.current += delta * 0.12;
    const scrollT =
      scrollStore.y / (typeof window !== "undefined" ? window.innerHeight : 1);

    // Mobile: derive the cube's resting Y from the text block's actual
    // measured bottom edge, converted from px to world units, so the gap
    // stays correct across every viewport height instead of a guessed
    // constant that overlaps on short phones and floats too low on tall ones.
    let baseY = 0;
    if (isMobile) {
      const pxPerWorldUnit = state.size.height / state.viewport.height;
      const gapWorld = mobileGapPx / pxPerWorldUnit;
      const textBottomWorldY =
        state.viewport.height / 2 - heroTextStore.bottom / pxPerWorldUnit;
      baseY = textBottomWorldY - gapWorld - cubeHalfExtent;
    }

    const outer = outerRef.current;
    if (outer) {
      const targetY = spin.current + scrollT * 0.35;
      const targetX = 0;
      outer.rotation.y = THREE.MathUtils.lerp(outer.rotation.y, targetY, 0.04);
      outer.rotation.x = THREE.MathUtils.lerp(outer.rotation.x, targetX, 0.04);
      outer.position.y = THREE.MathUtils.lerp(outer.position.y, baseY, 0.05);
      outer.position.x = THREE.MathUtils.lerp(outer.position.x, baseX, 0.08);
      outer.scale.setScalar(
        THREE.MathUtils.lerp(outer.scale.x, cubeScale, 0.08)
      );
    }

    const pivot = pivotGroupRef.current;
    const staticGroup = staticGroupRef.current;
    if (!pivot || !staticGroup) return;

    const t = state.clock.elapsedTime;
    const turn = turnState.current;

    if (turn.phase === "idle") {
      if (t >= turn.nextAt) {
        const axis = AXES[Math.floor(Math.random() * 3)];
        const layer = LAYER_VALUES[Math.floor(Math.random() * 3)];
        const direction: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
        const axisIdx = AXIS_INDEX[axis];

        const indices: number[] = [];
        cubies.current.forEach((c, i) => {
          if (c.coord[axisIdx] === layer) indices.push(i);
        });

        pivot.rotation.set(0, 0, 0);
        indices.forEach((i) => {
          const mesh = meshRefs.current[i];
          if (mesh) pivot.attach(mesh);
        });

        turnState.current = {
          phase: "turning",
          axis,
          direction,
          startTime: t,
          duration: 1.5,
          indices,
        };
      }
    } else {
      const elapsed = t - turn.startTime;
      const progress = Math.min(elapsed / turn.duration, 1);
      const eased = easeInOutQuad(progress);
      pivot.rotation[turn.axis] = turn.direction * (Math.PI / 2) * eased;

      if (progress >= 1) {
        const axisVec = AXIS_VECTORS[turn.axis];
        const finalAngle = turn.direction * (Math.PI / 2);

        turn.indices.forEach((i) => {
          const mesh = meshRefs.current[i];
          if (!mesh) return;
          staticGroup.attach(mesh);

          const c = cubies.current[i].coord;
          const v = new THREE.Vector3(c[0], c[1], c[2]);
          v.applyAxisAngle(axisVec, finalAngle);
          cubies.current[i].coord = [
            Math.round(v.x),
            Math.round(v.y),
            Math.round(v.z),
          ];
        });

        pivot.rotation.set(0, 0, 0);
        turnState.current = { phase: "idle", nextAt: t + 3 + Math.random() * 3 };
      }
    }
  });

  return (
    <group ref={outerRef} position={[baseX, 0, 0]} scale={cubeScale}>
      <group ref={staticGroupRef}>
        {cubieData.map((c, i) => (
          <RoundedBox
            key={i}
            ref={(el: THREE.Mesh | null) => {
              meshRefs.current[i] = el;
            }}
            args={[SIZE, SIZE, SIZE]}
            radius={SIZE * 0.1}
            smoothness={4}
            position={[c.coord[0] * SPACING, c.coord[1] * SPACING, c.coord[2] * SPACING]}
          >
            <meshPhysicalMaterial
              color={CUBIE_COLOR}
              roughness={0.12}
              metalness={0}
              clearcoat={1}
              clearcoatRoughness={0.08}
              transparent
              opacity={0.5}
            />
          </RoundedBox>
        ))}
      </group>
      <group ref={pivotGroupRef} />
    </group>
  );
}

export function HeroScene() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[-4, 3, 4]} intensity={55} color="#FDAE44" />
      <pointLight position={[4, -2, 3]} intensity={28} color="#ffffff" />
      <pointLight position={[0, 4, -3]} intensity={26} color="#ffffff" />
      <pointLight position={[-2, -3, -4]} intensity={16} color="#ffffff" />
      <RubiksCube isMobile={isMobile} />
    </Canvas>
  );
}

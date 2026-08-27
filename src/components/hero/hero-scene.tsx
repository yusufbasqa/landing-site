"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { scrollStore } from "@/lib/scroll-store";

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

// Traditional Rubik's Cube hues, mixed ~90% toward black so the form reads
// as a dark, almost monochrome object — hue only surfaces under highlights.
const DARKEN = 0.9;
function darken(hex: string) {
  return new THREE.Color(hex).lerp(new THREE.Color("#000000"), DARKEN);
}

const FACE_COLORS = {
  posX: darken("#d32f2f"), // red
  negX: darken("#f57c00"), // orange
  posY: darken("#eeeeee"), // white
  negY: darken("#f5c518"), // yellow
  posZ: darken("#1565c0"), // blue
  negZ: darken("#2e7d32"), // green
};

function cubieColor(x: number, y: number, z: number) {
  const contributions: THREE.Color[] = [];
  if (x === 1) contributions.push(FACE_COLORS.posX);
  if (x === -1) contributions.push(FACE_COLORS.negX);
  if (y === 1) contributions.push(FACE_COLORS.posY);
  if (y === -1) contributions.push(FACE_COLORS.negY);
  if (z === 1) contributions.push(FACE_COLORS.posZ);
  if (z === -1) contributions.push(FACE_COLORS.negZ);

  const result = new THREE.Color(0, 0, 0);
  contributions.forEach((c) => result.add(c));
  return result.multiplyScalar(1 / contributions.length);
}

type CubieDatum = { coord: Vec3; color: THREE.Color };

function buildCubies(): CubieDatum[] {
  const cubies: CubieDatum[] = [];
  for (const x of GRID) {
    for (const y of GRID) {
      for (const z of GRID) {
        if (x === 0 && y === 0 && z === 0) continue;
        cubies.push({ coord: [x, y, z], color: cubieColor(x, y, z) });
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

function RubiksCube() {
  const cubieData = useMemo(() => buildCubies(), []);
  const cubies = useRef(cubieData.map((c) => ({ coord: [...c.coord] as Vec3 })));
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const outerRef = useRef<THREE.Group>(null);
  const staticGroupRef = useRef<THREE.Group>(null);
  const pivotGroupRef = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const turnState = useRef<TurnState>({ phase: "idle", nextAt: 3 });

  useFrame((state, delta) => {
    spin.current += delta * 0.12;
    const scrollT =
      scrollStore.y / (typeof window !== "undefined" ? window.innerHeight : 1);

    const outer = outerRef.current;
    if (outer) {
      const targetY = spin.current + state.pointer.x * 0.25 + scrollT * 0.35;
      const targetX = -state.pointer.y * 0.15;
      outer.rotation.y = THREE.MathUtils.lerp(outer.rotation.y, targetY, 0.04);
      outer.rotation.x = THREE.MathUtils.lerp(outer.rotation.x, targetX, 0.04);
      outer.position.y = THREE.MathUtils.lerp(outer.position.y, -scrollT * 1.4, 0.05);
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
    <group ref={outerRef} position={[1.5, 0, 0]}>
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
              color={c.color}
              emissive={c.color}
              emissiveIntensity={0.3}
              roughness={0.4}
              metalness={0.3}
              clearcoat={0.7}
              clearcoatRoughness={0.2}
            />
          </RoundedBox>
        ))}
      </group>
      <group ref={pivotGroupRef} />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[-4, 3, 4]} intensity={75} color="#6366f1" />
      <pointLight position={[4, -2, 3]} intensity={60} color="#22d3ee" />
      <pointLight position={[0, 4, -3]} intensity={40} color="#ffffff" />
      <pointLight position={[-2, -3, -4]} intensity={22} color="#8b5cf6" />
      <RubiksCube />
    </Canvas>
  );
}

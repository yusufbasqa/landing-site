"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { scrollStore } from "@/lib/scroll-store";

function ShapeCluster() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    const scrollT =
      scrollStore.y / (typeof window !== "undefined" ? window.innerHeight : 1);

    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      state.pointer.x * 0.25 + scrollT * 0.35,
      0.04,
    );
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.15, 0.04);
    g.position.y = THREE.MathUtils.lerp(g.position.y, -scrollT * 1.4, 0.05);
  });

  return (
    <group ref={group} position={[1.5, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh position={[0.3, 0.3, 0]} scale={1.35}>
          <icosahedronGeometry args={[1, 8]} />
          <MeshDistortMaterial
            color="#eeecff"
            roughness={0.15}
            metalness={0.15}
            distort={0.3}
            speed={1.4}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[-1.4, -1.2, -1.3]} rotation={[0.6, 0.3, 0]} scale={0.85}>
          <torusGeometry args={[0.7, 0.26, 32, 100]} />
          <meshPhysicalMaterial
            color="#f2f1ff"
            roughness={0.2}
            metalness={0.2}
            clearcoat={0.4}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.6}>
        <RoundedBox
          args={[0.5, 0.5, 0.5]}
          radius={0.12}
          smoothness={4}
          position={[1.7, -2.1, 0.2]}
        >
          <meshPhysicalMaterial color="#f4933c" roughness={0.3} metalness={0.1} />
        </RoundedBox>
      </Float>

      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={2}>
        <mesh position={[-0.4, 1.6, 0.6]} scale={0.22}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial color="#22d3ee" roughness={0.1} metalness={0.3} />
        </mesh>
      </Float>
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
      <ambientLight intensity={0.65} />
      <pointLight position={[-4, 2, 4]} intensity={55} color="#6366f1" />
      <pointLight position={[4, -1, -2]} intensity={40} color="#22d3ee" />
      <pointLight position={[0, 3, 2]} intensity={20} color="#ffffff" />
      <ShapeCluster />
    </Canvas>
  );
}

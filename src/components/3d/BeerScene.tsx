"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function BeerGlass() {
  const glassRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const foamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glassRef.current) {
      glassRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      glassRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={glassRef}>
        {/* Glass body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.5, 2.2, 32, 1, true]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.3}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            resolution={256}
            color="#ffffff"
            transmission={0.95}
            roughness={0.05}
          />
        </mesh>

        {/* Beer liquid */}
        <mesh ref={liquidRef} position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.65, 0.45, 1.8, 32]} />
          <meshStandardMaterial
            color="#c47b18"
            transparent
            opacity={0.85}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Foam top */}
        <mesh ref={foamRef} position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.7, 0.65, 0.4, 32]} />
          <MeshDistortMaterial
            color="#f5e6c8"
            speed={2}
            distort={0.15}
            radius={1}
            roughness={0.8}
          />
        </mesh>

        {/* Glass base */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.55, 0.6, 0.15, 32]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.2}
            transmission={0.9}
            roughness={0.1}
            color="#ffffff"
          />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingDroplets() {
  const dropletsRef = useRef<THREE.Group>(null);
  const droplets = Array.from({ length: 15 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 2,
    ] as [number, number, number],
    scale: Math.random() * 0.08 + 0.02,
    speed: Math.random() * 0.5 + 0.3,
  }));

  useFrame((state) => {
    if (dropletsRef.current) {
      dropletsRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * droplets[i].speed + i) * 0.002;
      });
    }
  });

  return (
    <group ref={dropletsRef}>
      {droplets.map((droplet, i) => (
        <mesh key={i} position={droplet.position}>
          <sphereGeometry args={[droplet.scale, 16, 16]} />
          <meshStandardMaterial
            color="#d97706"
            transparent
            opacity={0.4}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#f59e0b"
      />
      <spotLight
        position={[-5, 3, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#d97706"
      />
      <pointLight position={[0, 2, 3]} intensity={0.3} color="#fbbf24" />

      <BeerGlass />
      <FloatingDroplets />

      <Environment preset="city" environmentIntensity={0.3} />
    </>
  );
}

export function BeerScene({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

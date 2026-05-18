'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Utility to generate random points within a sphere
function randomInSphere(numPoints: number, radius: number) {
  const points = new Float32Array(numPoints * 3);
  for (let i = 0; i < numPoints; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius;
    const sinPhi = Math.sin(phi);
    const x = r * sinPhi * Math.cos(theta);
    const y = r * sinPhi * Math.sin(theta);
    const z = r * Math.cos(phi);
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  // Memoize geometry generation so it only happens once
  const sphere = useMemo(() => randomInSphere(4000, 3.5), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0E5E64"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

export default function ProcessCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
        dpr={[1, 2]} // Optimize pixel ratio
      >
        <ParticleSwarm />
      </Canvas>
      {/* Soft gradient overlay to blend the canvas with the background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9FAFB]/50 via-transparent to-[#F9FAFB] pointer-events-none" />
    </div>
  );
}

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const PARTICLE_COUNT = 800;

  const { positions, colors, sizes } = useMemo(() => {
    const positionsArray = new Float32Array(PARTICLE_COUNT * 3);
    const colorsArray = new Float32Array(PARTICLE_COUNT * 3);
    const sizesArray = new Float32Array(PARTICLE_COUNT);

    const color1 = new THREE.Color("#0E5E64"); // Webiox Teal
    const color2 = new THREE.Color("#14b8a6"); // Teal 500

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Create a cylindrical or torus-like distribution for a unique feel
      const theta = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 8;
      const y = (Math.random() - 0.5) * 10;
      
      positionsArray[i * 3] = Math.cos(theta) * radius;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = Math.sin(theta) * radius;

      const mixRatio = Math.random();
      const mixedColor = color1.clone().lerp(color2, mixRatio);
      
      colorsArray[i * 3] = mixedColor.r;
      colorsArray[i * 3 + 1] = mixedColor.g;
      colorsArray[i * 3 + 2] = mixedColor.b;

      sizesArray[i] = Math.random() * 2;
    }

    return { positions: positionsArray, colors: colorsArray, sizes: sizesArray };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      
      // Gentle pulsing of points
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      for(let i=0; i<PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const z = positions[i3 + 2];
        const time = state.clock.elapsedTime;
        
        // Add subtle wave motion
        positionsAttr.array[i3 + 1] = positions[i3 + 1] + Math.sin(time + x) * 0.01;
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors={true}
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default function BlogScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <ParticleField />
      </Float>
    </>
  );
}

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const TechNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const PARTICLE_COUNT = 140;
  const MAX_DISTANCE = 1.35;
  const MAX_CONNECTIONS = 900;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;
      const vx = (Math.random() - 0.5) * 0.012;
      const vy = (Math.random() - 0.5) * 0.012;
      const vz = (Math.random() - 0.5) * 0.012;
      temp.push({ x, y, z, vx, vy, vz, baseX: x, baseY: y, baseZ: z });
    }
    return temp;
  }, []);

  const { positions, colors } = useMemo(() => {
    const positionsArray = new Float32Array(PARTICLE_COUNT * 3);
    const colorsArray = new Float32Array(PARTICLE_COUNT * 3);

    const colorPrimary = new THREE.Color("#FFBF00");
    const colorSecondary = new THREE.Color("#1a7097");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const mixRatio = Math.random();
      const mixedColor = colorPrimary.clone().lerp(colorSecondary, mixRatio);

      colorsArray[i * 3] = mixedColor.r;
      colorsArray[i * 3 + 1] = mixedColor.g;
      colorsArray[i * 3 + 2] = mixedColor.b;
    }
    return { positions: positionsArray, colors: colorsArray };
  }, []);

  // Pre-allocate typed arrays for line segments once to avoid per-frame GC allocations
  const { linePositions, lineColors, lineGeometry } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const posArr = new Float32Array(MAX_CONNECTIONS * 2 * 3);
    const colArr = new Float32Array(MAX_CONNECTIONS * 2 * 4);

    geom.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colArr, 4));

    return {
      linePositions: posArr,
      lineColors: colArr,
      lineGeometry: geom,
    };
  }, []);

  const { viewport } = useThree();
  const mouse3D = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    mouse3D.x = (state.pointer.x * viewport.width) / 2;
    mouse3D.y = (state.pointer.y * viewport.height) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      if (p.x < -4 || p.x > 4) p.vx *= -1;
      if (p.y < -4 || p.y > 4) p.vy *= -1;
      if (p.z < -2 || p.z > 2) p.vz *= -1;

      const dx = mouse3D.x - p.x;
      const dy = mouse3D.y - p.y;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);

      const reactionRadius = 2.2;
      if (distToMouse < reactionRadius) {
        const force = (reactionRadius - distToMouse) * 0.05;
        p.x -= (dx / distToMouse) * force;
        p.y -= (dy / distToMouse) * force;
      } else {
        p.x += (p.baseX - p.x) * 0.002;
        p.y += (p.baseY - p.y) * 0.002;
      }

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    let connectCount = 0;
    let posIdx = 0;
    let colIdx = 0;

    for (let i = 0; i < PARTICLE_COUNT && connectCount < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && connectCount < MAX_CONNECTIONS; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dz = particles[i].z - particles[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DISTANCE) {
          linePositions[posIdx++] = particles[i].x;
          linePositions[posIdx++] = particles[i].y;
          linePositions[posIdx++] = particles[i].z;

          linePositions[posIdx++] = particles[j].x;
          linePositions[posIdx++] = particles[j].y;
          linePositions[posIdx++] = particles[j].z;

          const alpha = (1.0 - dist / MAX_DISTANCE) * 0.45;
          lineColors[colIdx++] = 1;
          lineColors[colIdx++] = 0.75;
          lineColors[colIdx++] = 0.2;
          lineColors[colIdx++] = alpha;

          lineColors[colIdx++] = 1;
          lineColors[colIdx++] = 0.75;
          lineColors[colIdx++] = 0.2;
          lineColors[colIdx++] = alpha;

          connectCount++;
        }
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, connectCount * 2);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors={true}
          transparent={true}
          opacity={0.9}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <TechNetwork />
      </Float>
    </>
  );
}

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const TechNetwork = () => {
  const pointsRef = useRef();
  const linesRef = useRef();

  const PARTICLE_COUNT = 150;
  const MAX_DISTANCE = 1.4;

  // Base positions and velocities for organic movement
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;
      const vx = (Math.random() - 0.5) * 0.015;
      const vy = (Math.random() - 0.5) * 0.015;
      const vz = (Math.random() - 0.5) * 0.015;
      temp.push({ x, y, z, vx, vy, vz, baseX: x, baseY: y, baseZ: z });
    }
    return temp;
  }, []);

  const { positions, colors } = useMemo(() => {
    const positionsArray = new Float32Array(PARTICLE_COUNT * 3);
    const colorsArray = new Float32Array(PARTICLE_COUNT * 3);

    const colorPrimary = new THREE.Color("#eab308"); // Brand Yellow
    const colorSecondary = new THREE.Color("#ffffff"); // Bright White

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const mixRatio = Math.random();
      const mixedColor = colorPrimary.clone().lerp(colorSecondary, mixRatio);

      colorsArray[i * 3] = mixedColor.r;
      colorsArray[i * 3 + 1] = mixedColor.g;
      colorsArray[i * 3 + 2] = mixedColor.b;
    }
    return { positions: positionsArray, colors: colorsArray };
  }, []);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  const { viewport } = useThree();
  const mouse3D = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    // Map mouse to 3D space
    mouse3D.x = (state.pointer.x * viewport.width) / 2;
    mouse3D.y = (state.pointer.y * viewport.height) / 2;

    let linePos = [];
    let lineColors = [];

    // Update particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];

      // Organic floating
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Keep them within bounds gently bouncing back
      if (p.x < -4 || p.x > 4) p.vx *= -1;
      if (p.y < -4 || p.y > 4) p.vy *= -1;
      if (p.z < -2 || p.z > 2) p.vz *= -1;

      // Mouse interaction: Make them magically repel from the cursor
      const dx = mouse3D.x - p.x;
      const dy = mouse3D.y - p.y;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);

      const reactionRadius = 2.5;
      if (distToMouse < reactionRadius) {
        const force = (reactionRadius - distToMouse) * 0.06;
        p.x -= (dx / distToMouse) * force;
        p.y -= (dy / distToMouse) * force;
      } else {
        // Return gently to base trajectory over time
        p.x += (p.baseX - p.x) * 0.002;
        p.y += (p.baseY - p.y) * 0.002;
      }

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    // Connect lines for nodes that are close to each other
    let connectCount = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dz = particles[i].z - particles[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DISTANCE) {
          linePos.push(
            particles[i].x, particles[i].y, particles[i].z,
            particles[j].x, particles[j].y, particles[j].z
          );

          // Fade lines based on distance. Make them glow slightly white/yellow
          const alpha = 1.0 - (dist / MAX_DISTANCE);
          lineColors.push(
            1, 0.9, 0.5, alpha * 0.6, // Soft glowing yellowish
            1, 0.9, 0.5, alpha * 0.6
          );
          connectCount++;
        }
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
      linesRef.current.geometry.setDrawRange(0, connectCount * 2);
    }
  });

  return (
    <group>
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
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors={true}
          transparent={true}
          opacity={1}
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
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <TechNetwork />
      </Float>
    </>
  );
}

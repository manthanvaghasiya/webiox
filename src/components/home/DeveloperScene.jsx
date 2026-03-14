import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

const createHTMLTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 256);
  
  // Text
  ctx.fillStyle = '#eab308'; // Matches the theme yellow
  ctx.font = 'bold 140px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HTML', 256, 128);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
};

const Desk = () => (
  <group>
    {/* Table top */}
    <mesh position={[0, 0, 0]} receiveShadow castShadow>
      <boxGeometry args={[3, 0.15, 1.5]} />
      <meshStandardMaterial color="#e5e5e5" roughness={1} metalness={0} />
    </mesh>
    {/* Legs */}
    {[-1.3, 1.3].map((x) => 
      [-0.6, 0.6].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, -1, z]} receiveShadow castShadow>
          <boxGeometry args={[0.15, 2, 0.15]} />
          <meshStandardMaterial color="#d4d4d8" roughness={1} metalness={0} />
        </mesh>
      ))
    )}
  </group>
);

const Laptop = () => (
  <group position={[0, 0.1, 0]}>
    {/* Base */}
    <mesh position={[0, 0.025, 0]} receiveShadow castShadow>
      <boxGeometry args={[0.8, 0.05, 0.6]} />
      <meshStandardMaterial color="#a3a3a3" roughness={1} metalness={0} />
    </mesh>
    {/* Screen */}
    <mesh position={[0, 0.3, -0.3]} rotation={[-0.2, 0, 0]} receiveShadow castShadow>
      <boxGeometry args={[0.8, 0.6, 0.05]} />
      <meshStandardMaterial color="#a3a3a3" roughness={1} metalness={0} />
    </mesh>
    {/* Screen glow */}
    <mesh position={[0, 0.3, -0.27]} rotation={[-0.2, 0, 0]}>
      <planeGeometry args={[0.7, 0.5]} />
      <meshBasicMaterial color="#eab308" />
    </mesh>
  </group>
);

const Character = () => (
  <group position={[0, 0.8, 0.8]}>
    {/* Body */}
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.25, 0.35, 0.6, 32]} />
      <meshStandardMaterial color="#3b82f6" roughness={1} metalness={0} />
    </mesh>
    {/* Head */}
    <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
      <sphereGeometry args={[0.22, 32, 32]} />
      <meshStandardMaterial color="#fcd34d" roughness={1} metalness={0} />
    </mesh>
  </group>
);

const FloatingPlane = () => {
  const ref = useRef();
  const texture = useMemo(() => createHTMLTexture(), []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0, 1.2, -1.2]} castShadow receiveShadow>
      <planeGeometry args={[1.5, 0.75]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={1} 
        metalness={0}
      />
    </mesh>
  );
};

export default function DeveloperScene() {
  return (
    <Canvas shadows camera={{ position: [3, 2, 4], fov: 45 }} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing">
      <color attach="background" args={['#f8fafc']} />
      <SoftShadows size={20} samples={16} focus={0.5} />
      
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
      >
        <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5]} />
      </directionalLight>
      <directionalLight position={[-3, 2, -3]} intensity={0.5} />
      
      <group position={[0, -0.2, 0]}>
        <Desk />
        <Laptop />
        <Character />
        <FloatingPlane />
      </group>
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} makeDefault />
    </Canvas>
  );
}

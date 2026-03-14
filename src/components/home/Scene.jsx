import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

export default function Scene() {
  const meshRef = useRef();

  useFrame((state) => {
    // Subtle rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
          <MeshDistortMaterial
            color="#FFB800"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
    </>
  );
}

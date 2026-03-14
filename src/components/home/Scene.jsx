import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';

export default function Scene() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Sphere ref={meshRef} args={[1.5, 16, 16]} scale={1.2}>
        <meshStandardMaterial
          color="#eab308"
          wireframe={true}
          emissive="#eab308"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      <OrbitControls enableZoom={false} autoRotate={false} />
    </>
  );
}

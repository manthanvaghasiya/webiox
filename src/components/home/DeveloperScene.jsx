import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Desk = () => (
  <group position={[0, -0.5, 0]}>
    {/* Desk Top */}
    <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
      <boxGeometry args={[3, 0.1, 1.5]} />
      <meshStandardMaterial color="#ffffff" roughness={0.2} />
    </mesh>
    {/* Desk Legs */}
    <mesh position={[-1.4, 0, -0.6]} castShadow receiveShadow>
      <cylinderGeometry args={[0.05, 0.05, 1]} />
      <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
    </mesh>
    <mesh position={[1.4, 0, -0.6]} castShadow receiveShadow>
      <cylinderGeometry args={[0.05, 0.05, 1]} />
      <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
    </mesh>
    <mesh position={[-1.4, 0, 0.6]} castShadow receiveShadow>
      <cylinderGeometry args={[0.05, 0.05, 1]} />
      <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
    </mesh>
    <mesh position={[1.4, 0, 0.6]} castShadow receiveShadow>
      <cylinderGeometry args={[0.05, 0.05, 1]} />
      <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
    </mesh>
  </group>
);

const Laptop = () => (
  <group position={[0, 0.05, 0]}>
    {/* Base */}
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.6, 0.05, 0.4]} />
      <meshStandardMaterial color="#94a3b8" roughness={0.4} />
    </mesh>
    {/* Screen */}
    <mesh position={[0, 0.2, -0.2]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.6, 0.4, 0.05]} />
      <meshStandardMaterial color="#475569" roughness={0.4} />
    </mesh>
    {/* Screen Glow */}
    <mesh position={[0, 0.2, -0.17]} rotation={[0.2, 0, 0]}>
      <planeGeometry args={[0.55, 0.35]} />
      <meshBasicMaterial color="#38bdf8" />
    </mesh>
  </group>
);

const Character = () => (
  <group position={[0, -0.2, 0.6]}>
    {/* Body */}
    <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.25, 0.25, 0.6]} />
      <meshStandardMaterial color="#8b5cf6" roughness={0.7} />
    </mesh>
    {/* Head */}
    <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
      <sphereGeometry args={[0.2]} />
      <meshStandardMaterial color="#f97316" roughness={0.5} />
    </mesh>
    {/* Arms (Typing!) */}
    <mesh position={[-0.3, 0.4, -0.2]} rotation={[0.5, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.05, 0.05, 0.4]} />
      <meshStandardMaterial color="#8b5cf6" roughness={0.7} />
    </mesh>
    <mesh position={[0.3, 0.4, -0.2]} rotation={[0.5, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.05, 0.05, 0.4]} />
      <meshStandardMaterial color="#8b5cf6" roughness={0.7} />
    </mesh>
  </group>
);

const DecorativeElements = () => (
  <>
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <group position={[-1.5, 1.5, -1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.3}
          color="#ffffff"
          font="https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISmb2R_.woff"
        >
          HTML
        </Text>
      </group>
    </Float>

    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
      <group position={[1.5, 1.2, -0.5]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#f97316" roughness={0.2} />
        </mesh>
      </group>
    </Float>

    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <group position={[1, 2.2, -1.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#a855f7" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.25}
          color="#ffffff"
          font="https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISmb2R_.woff"
        >
          {`{ Code }`}
        </Text>
      </group>
    </Float>
  </>
);

const DeveloperScene = () => {
  return (
    <div className="w-full h-full min-h-[500px] pointer-events-auto">
      <Canvas shadows camera={{ position: [6, 4, 6], fov: 40 }}>
        {/* Soft, vibrant studio lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={2048}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[5, 5, -5]} intensity={0.5} color="#38bdf8" />

        <group position={[0, -1, 0]}>
          <Desk />
          <Laptop />
          <Character />
          <DecorativeElements />
        </group>

        {/* Soft shadow catcher */}
        <AccumulativeShadows temporal frames={100} scale={12} position={[0, -1.5, 0]} color="#000000" colorBlend={2} alphaTest={0.9} opacity={0.8}>
          <RandomizedLight amount={8} radius={5} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
        </AccumulativeShadows>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 4} />
      </Canvas>
    </div>
  );
};

export default DeveloperScene;

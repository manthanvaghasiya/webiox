import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, ContactShadows } from '@react-three/drei';

const Person = ({ position, color, shirtColor, sitting = true, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    {/* Body */}
    <mesh position={[0, sitting ? 0.35 : 0.6, 0]} castShadow receiveShadow>
      <capsuleGeometry args={[0.2, sitting ? 0.3 : 0.8, 2, 8]} />
      <meshStandardMaterial color={shirtColor} roughness={0.7} />
    </mesh>
    {/* Head */}
    <mesh position={[0, sitting ? 0.8 : 1.4, 0]} castShadow receiveShadow>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
    {/* Arms */}
    {sitting ? (
      <>
        <mesh position={[-0.25, 0.4, -0.15]} rotation={[0.4, 0.2, 0]} castShadow receiveShadow>
          <capsuleGeometry args={[0.05, 0.3, 2, 8]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
        <mesh position={[0.25, 0.4, -0.15]} rotation={[0.4, -0.2, 0]} castShadow receiveShadow>
          <capsuleGeometry args={[0.05, 0.3, 2, 8]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
      </>
    ) : (
      <>
        {/* Pointing Arm */}
        <mesh position={[0.3, 1.0, -0.2]} rotation={[1.2, 0, 0]} castShadow receiveShadow>
          <capsuleGeometry args={[0.05, 0.4, 2, 8]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
        <mesh position={[-0.25, 0.9, 0]} rotation={[0, 0, 0.2]} castShadow receiveShadow>
          <capsuleGeometry args={[0.05, 0.4, 2, 8]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
      </>
    )}
  </group>
);

const Monitor = ({ position, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    {/* Stand */}
    <mesh position={[0, 0.2, -0.1]} castShadow receiveShadow>
      <cylinderGeometry args={[0.03, 0.05, 0.4]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    <mesh position={[0, 0.01, -0.1]} castShadow receiveShadow>
      <boxGeometry args={[0.4, 0.02, 0.3]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    {/* Screen */}
    <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
      <boxGeometry args={[1.0, 0.6, 0.05]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
    {/* Glowing Display */}
    <mesh position={[0, 0.45, 0.026]}>
      <planeGeometry args={[0.95, 0.55]} />
      <meshBasicMaterial color="#0ea5e9" transparent opacity={0.6} />
    </mesh>
    {/* Code lines */}
    <mesh position={[-0.3, 0.55, 0.027]}>
      <planeGeometry args={[0.3, 0.015]} />
      <meshBasicMaterial color="#34d399" />
    </mesh>
    <mesh position={[-0.2, 0.50, 0.027]}>
      <planeGeometry args={[0.5, 0.015]} />
      <meshBasicMaterial color="#f472b6" />
    </mesh>
    <mesh position={[-0.35, 0.45, 0.027]}>
      <planeGeometry args={[0.2, 0.015]} />
      <meshBasicMaterial color="#fbbf24" />
    </mesh>
    <mesh position={[-0.1, 0.40, 0.027]}>
      <planeGeometry args={[0.6, 0.015]} />
      <meshBasicMaterial color="#a855f7" />
    </mesh>
  </group>
);

const DeskSetup = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    {/* Desk Top */}
    <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
      <boxGeometry args={[2.2, 0.1, 1.2]} />
      <meshStandardMaterial color="#ffffff" roughness={0.1} />
    </mesh>
    {/* Legs */}
    {[-0.9, 0.9].map((x) =>
      [-0.4, 0.4].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.35, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.7]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      ))
    )}
    {/* Monitors */}
    <Monitor position={[-0.5, 0.75, -0.2]} rotation={[0, 0.2, 0]} />
    <Monitor position={[0.5, 0.75, -0.2]} rotation={[0, -0.2, 0]} />
    {/* Keyboard */}
    <mesh position={[0, 0.76, 0.3]} rotation={[0.05, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.6, 0.02, 0.2]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
    {/* Mouse */}
    <mesh position={[0.5, 0.76, 0.3]} castShadow receiveShadow>
      <boxGeometry args={[0.1, 0.02, 0.15]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
  </group>
);

const HolographicBoard = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
      {/* Stand Base */}
      <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.1]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.2]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.8, 0.05]} />
        <meshStandardMaterial 
          color="#0ea5e9"
          opacity={0.3}
          transparent
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
      
      {/* Abstract UI Elements */}
      <Html transform center position={[0, 0.65, 0.03]}>
        <div className="text-white text-[10px] tracking-wider font-bold whitespace-nowrap font-sans">
          BUILDING SOFTWARE
        </div>
      </Html>
      
      {/* Panels */}
      <mesh position={[-0.7, 0.1, 0.03]}>
        <planeGeometry args={[1, 0.6]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>
      {/* Chart */}
      <mesh position={[-0.9, -0.05, 0.04]}><planeGeometry args={[0.1, 0.2]} /><meshBasicMaterial color="#fcd34d" /></mesh>
      <mesh position={[-0.7, 0.0, 0.04]}><planeGeometry args={[0.1, 0.3]} /><meshBasicMaterial color="#fcd34d" /></mesh>
      <mesh position={[-0.5, 0.1, 0.04]}><planeGeometry args={[0.1, 0.5]} /><meshBasicMaterial color="#fcd34d" /></mesh>

      <mesh position={[0.7, 0.1, 0.03]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>
      
      <mesh position={[0.7, 0.1, 0.04]}>
        <ringGeometry args={[0.15, 0.25, 32]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.8} />
      </mesh>
      <Html transform center position={[0.7, -0.3, 0.03]}>
        <div className="text-white text-[8px] tracking-wider font-bold font-sans">
          DEPLOY
        </div>
      </Html>
    </Float>
  </group>
);

const Rocket = ({ position }) => (
  <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.2, 0.3, 32]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.3} />
      </mesh>
      {/* Window */}
      <mesh position={[0, 0.1, 0.25]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[0, 0.1, 0.26]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.06]} />
        <meshBasicMaterial color="#e0f2fe" />
      </mesh>
      {/* Fins */}
      <mesh position={[-0.3, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.3, 0.05]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0.3, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.3, 0.05]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      {/* Flame */}
      <mesh position={[0, -0.6, 0]}>
        <coneGeometry args={[0.15, 0.4]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
    </group>
  </Float>
);

const Gear = ({ position, color, scale=1 }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.5;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position} scale={scale} ref={ref}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.3, 0.1, 8, 16]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI) / 4) * 0.35, Math.sin((i * Math.PI) / 4) * 0.35, 0]} rotation={[0, 0, (i * Math.PI) / 4]}>
            <boxGeometry args={[0.15, 0.15, 0.1]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const FloatingCard = ({ position, color, text, iconColor, fontSize = 0.3 }) => (
  <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.5}>
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      <Html transform center position={[0, 0, 0.06]}>
        <div className="text-white text-lg font-bold whitespace-pre text-center font-sans tracking-wide drop-shadow-md">
          {text}
        </div>
      </Html>
    </group>
  </Float>
);

const DeveloperScene = () => {
  return (
    <div className="w-full h-full min-h-[500px] pointer-events-auto">
      <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "default" }} shadows camera={{ position: [14, 10, 14], fov: 25 }}>
        {/* Soft, vibrant studio lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[5, 5, -5]} intensity={0.5} color="#38bdf8" />

        <group position={[0, -1.5, 0]}>
          {/* User 1: Desk - Front Left */}
          <DeskSetup position={[-1.5, 0, 2]} rotation={[0, Math.PI / 6, 0]} />
          <Person position={[-0.8, 0, 2.8]} color="#ffedd5" shirtColor="#22c55e" rotation={[0, Math.PI / 6 + 3.14, 0]} />

          {/* User 2: Desk - Back Left */}
          <DeskSetup position={[-2.5, 0, -1.5]} rotation={[0, Math.PI / 4, 0]} />
          <Person position={[-1.8, 0, -0.6]} color="#fcd34d" shirtColor="#f97316" rotation={[0, Math.PI / 4 + 3.14, 0]} />

          {/* User 3: Standing at Holo Board - Right */}
          <HolographicBoard position={[2.5, 1.5, -0.5]} rotation={[0, -Math.PI / 5, 0]} />
          <Person position={[2.5, 0, 0.5]} color="#fbcfe8" shirtColor="#8b5cf6" sitting={false} rotation={[0, 3.14 + Math.PI/5, 0]} />

          {/* Floating Elements */}
          <Rocket position={[0, 4.5, -2]} />
          
          <Gear position={[-3.5, 3.5, 1]} color="#a855f7" scale={0.8} />
          <Gear position={[-2.5, 2.5, 2.5]} color="#6366f1" scale={0.5} />

          <FloatingCard position={[-3.5, 1.5, -2.5]} color="#3b82f6" text={`{ }`} iconColor="#ffffff" />
          <FloatingCard position={[2.5, 3.5, 1]} color="#8b5cf6" text={`< />`} iconColor="#ffffff" />
          <FloatingCard position={[0, 2.5, 3]} color="#10b981" text={`0101\n1010`} iconColor="#ffffff" fontSize={0.25} />
          
        </group>

        {/* Soft shadow catcher */}
        <ContactShadows position={[0, -1.45, 0]} opacity={0.6} scale={15} blur={2.5} far={4} />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3} target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default DeveloperScene;

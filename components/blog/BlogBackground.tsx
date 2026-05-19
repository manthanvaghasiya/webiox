'use client';

import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

const BlogScene = dynamic(() => import('../canvas/BlogScene'), {
  ssr: false,
});

export default function BlogBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]}
      >
        <BlogScene />
      </Canvas>
      {/* Gradient overlay that interacts with the 3D scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(248,250,252,0.7) 100%)',
        }}
      />
    </div>
  );
}

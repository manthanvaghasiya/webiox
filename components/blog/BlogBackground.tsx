'use client';

import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

const BlogScene = dynamic(() => import('../canvas/BlogScene'), {
  ssr: false,
});

export default function BlogBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]}
      >
        <BlogScene />
      </Canvas>
    </div>
  );
}

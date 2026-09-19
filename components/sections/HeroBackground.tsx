'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouse = {
      x: width * 0.5,
      y: height * 0.45,
      targetX: width * 0.5,
      targetY: height * 0.45,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // 44 Architectural Nodal Constellation Particles
    const nodes = Array.from({ length: 44 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      radius: Math.random() * 2 + 1.2,
      isGold: Math.random() > 0.62,
    }));

    let time = 0;

    const render = () => {
      time += 0.009;
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.07;
      mouse.y += (mouse.targetY - mouse.y) * 0.07;

      // ── 1. Soft Dynamic Radial Cursor Spotlight ──
      const spotlightGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        280
      );
      spotlightGrad.addColorStop(0, 'rgba(14, 165, 233, 0.07)');
      spotlightGrad.addColorStop(0.5, 'rgba(0, 102, 255, 0.02)');
      spotlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = spotlightGrad;
      ctx.fillRect(0, 0, width, height);

      // ── 2. Draw Nodal Particle Interconnections & Elastic Cursor Physics ──
      for (let i = 0; i < nodes.length; i++) {
        const p1 = nodes[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Elastic cursor deflection
        const dxM = mouse.x - p1.x;
        const dyM = mouse.y - p1.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 190) {
          const force = (190 - distM) / 190;
          p1.x -= (dxM / distM) * force * 1.8;
          p1.y -= (dyM / distM) * force * 1.8;
        }

        // Connect neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 145) {
            const alpha = (1 - dist / 145) * 0.22;
            ctx.strokeStyle = `rgba(14, 116, 144, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw individual constellation node
        ctx.fillStyle = p1.isGold ? 'rgba(0, 102, 255, 0.65)' : 'rgba(14, 116, 144, 0.65)';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 3. Multi-Frequency Fluid Waves with Iridescent Light Fills ──
      const waves = [
        {
          yBase: height * 0.67,
          amplitude: 38,
          freq: 0.0022,
          speed: time * 1.6,
          colorA: 'rgba(14, 165, 233, 0.08)',
          colorB: 'rgba(0, 102, 255, 0.03)',
        },
        {
          yBase: height * 0.74,
          amplitude: 46,
          freq: 0.0018,
          speed: -time * 1.3,
          colorA: 'rgba(26, 112, 151, 0.07)',
          colorB: 'rgba(14, 165, 233, 0.04)',
        },
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 16) {
          const mouseInfluence = ((mouse.y - height * 0.5) / height) * 16;
          const y =
            w.yBase +
            Math.sin(x * w.freq + w.speed) * w.amplitude +
            Math.cos(x * (w.freq * 0.55) - time) * (w.amplitude * 0.45) +
            mouseInfluence;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, w.yBase - 40, width, height);
        grad.addColorStop(0, w.colorA);
        grad.addColorStop(0.65, w.colorB);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* ── 1. Interactive Canvas (Waves + Constellation + Spotlight) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ── 2. Living Aurora Gradient Mesh (4 Floating Kinetic Orbs) ── */}
      {/* Top Left: Electric Cyan Azure */}
      <div className="absolute -top-16 left-1/5 w-[560px] h-[380px] bg-sky-200/50 rounded-full blur-[140px] animate-float-slow-1 pointer-events-none" />
      
      {/* Top Right: Sophisticated Soft Sky Mist */}
      <div className="absolute -top-10 right-1/5 w-[520px] h-[380px] bg-sky-100/40 rounded-full blur-[145px] animate-float-slow-2 pointer-events-none" />
      
      {/* Center Deep: Prismatic Indigo Mist */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-100/35 rounded-full blur-[150px] animate-float-slow-1 pointer-events-none" />
      
      {/* Bottom Center: Fresh Mint Emerald Accent */}
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[260px] bg-emerald-100/35 rounded-full blur-[125px] animate-float-slow-2 pointer-events-none" />

      {/* ── 3. Concentric Focal Blueprint Depth Rings ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] pointer-events-none opacity-40">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-slate-200/70 border-dashed animate-rotate-slow" />
        {/* Middle Ring */}
        <div className="absolute inset-[110px] rounded-full border border-slate-200/80 animate-rotate-slow-reverse" />
        {/* Inner Ring */}
        <div className="absolute inset-[220px] rounded-full border border-slate-200/60 border-dotted" />
      </div>

      {/* ── 4. Precision Architectural Blueprint Dot & Line Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.38]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0),
            linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px, 112px 112px, 112px 112px',
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 45%, transparent 84%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 45%, transparent 84%)',
        }}
      />

      {/* ── 5. Analog Tactile Texture (3.5% Micro-Noise Grain) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-noise" />



    </div>
  );
}

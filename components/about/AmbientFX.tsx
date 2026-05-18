'use client';

import { motion } from 'framer-motion';

const NOISE_SVG = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

/** Film-grain overlay — adds a premium tactile texture to the surface */
export const NoiseOverlay = ({
  opacity = 0.03,
}: {
  opacity?: number;
}) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay"
    style={{ backgroundImage: NOISE_SVG, opacity }}
  />
);

/** Multi-stop mesh-gradient overlay placed above the section base */
export const MeshGradient = ({ stops }: { stops: string }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0"
    style={{ backgroundImage: stops }}
  />
);

export type DotColor = 'teal' | 'yellow';

export interface Dot {
  x: string;
  y: string;
  size: number;
  delay: number;
  color: DotColor;
}

const dotColors: Record<DotColor, string> = {
  teal: '#0E5E64',
  yellow: '#FFBF00',
};

/** Floating constellation of soft-glow particles that pulse + drift */
export const ConstellationDots = ({ dots }: { dots: Dot[] }) => (
  <>
    {dots.map((p, i) => {
      const c = dotColors[p.color];
      return (
        <motion.span
          key={`${p.x}-${p.y}-${i}`}
          aria-hidden="true"
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.7, 1],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3 + (i % 3) + (i % 2 === 0 ? 0.6 : 0),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: c,
            boxShadow: `0 0 ${p.size * 5}px ${c}99, 0 0 ${p.size * 12}px ${c}40`,
          }}
          className="pointer-events-none absolute z-0 rounded-full"
        />
      );
    })}
  </>
);

export type StreakColor = 'teal' | 'yellow' | 'mint';

const streakColors: Record<StreakColor, string> = {
  teal: 'rgba(14,94,100,0.11)',
  yellow: 'rgba(255,191,0,0.11)',
  mint: 'rgba(199,232,155,0.3)',
};

export interface StreakProps {
  position?: string;
  color?: StreakColor;
  angle?: number;
  duration?: number;
  reverse?: boolean;
  height?: string;
}

/** Drifting aurora light streak — diagonal gradient that crosses the section */
export const AuroraStreak = ({
  position = 'top-1/3 left-0',
  color = 'yellow',
  angle = 12,
  duration = 28,
  reverse = false,
  height = 'h-32',
}: StreakProps) => {
  const c = streakColors[color];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 w-[140%] overflow-hidden ${height} ${position}`}
      style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'center' }}
    >
      <motion.div
        animate={{ x: reverse ? ['100%', '-100%'] : ['-100%', '100%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="h-full w-1/2 blur-3xl"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${c}, transparent)`,
        }}
      />
    </div>
  );
};

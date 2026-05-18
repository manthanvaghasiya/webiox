import type { Transition, Variants } from 'framer-motion';

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const headlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const headlineWord: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const bentoGrid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

export const bentoTile: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOutExpo },
  },
};

export const counterSpring: Transition = {
  type: 'spring',
  stiffness: 60,
  damping: 20,
  mass: 1,
};

export const cursorSpring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 24,
  mass: 0.4,
};

export const tileHoverSpring: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 22,
};

export const ambientLoop: Transition = {
  duration: 22,
  repeat: Infinity,
  ease: 'easeInOut',
};

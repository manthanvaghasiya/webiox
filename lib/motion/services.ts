import type { Transition, Variants } from 'framer-motion';

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const headlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const headlineWord: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const showcaseTransition: Transition = {
  duration: 0.55,
  ease: easeOutExpo,
};

export const showcasePanel: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: showcaseTransition },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.35, ease: easeOutExpo },
  },
};

export const showcaseChild: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export const indicatorSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 32,
  mass: 0.6,
};

export const cursorSpring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 24,
  mass: 0.4,
};

export const floatLoop: Transition = {
  duration: 6,
  repeat: Infinity,
  ease: 'easeInOut',
};

export const marqueeLoop: Transition = {
  duration: 38,
  repeat: Infinity,
  ease: 'linear',
};

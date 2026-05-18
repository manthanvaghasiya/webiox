import { Variants } from 'framer-motion';

// Premium Awwwards-style easing curve
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const textRevealVariant: Variants = {
  hidden: { y: "120%", rotate: 5, opacity: 0 },
  visible: { 
    y: "0%", 
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.2, ease } 
  }
};

export const lineDrawVariant: Variants = {
  hidden: { width: "0%" },
  visible: { 
    width: "100%",
    transition: { duration: 1.5, ease }
  }
};

export const letterStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3
    }
  }
};

export const letterVariant: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 1, ease }
  }
};

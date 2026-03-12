import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  icon = false,
  type = 'button',
  fullWidth = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary shadow-lg shadow-primary/25 hover:shadow-primary/40',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 shadow-lg shadow-gray-900/20 hover:shadow-gray-900/40',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary',
    ghost: 'text-gray-600 hover:text-primary hover:bg-primary/5 focus:ring-primary',
    white: 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-white shadow-xl',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = twMerge(
    clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    )
  );

  const innerContent = (
    <>
      {children}
      {icon && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes + " group"}>
        {innerContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes + " group"} target="_blank" rel="noopener noreferrer">
        {innerContent}
      </a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={classes + " group"}
    >
      {innerContent}
    </motion.button>
  );
};

export default Button;

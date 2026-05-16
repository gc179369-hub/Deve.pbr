import { useEffect, ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = false, // padrão agora é false para permitir animação reversa
}: ScrollRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.15,
    rootMargin: '-50px 0px -50px 0px',
  });

  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 60, filter: 'blur(8px)' };
      case 'down': return { opacity: 0, y: -60, filter: 'blur(8px)' };
      case 'left': return { opacity: 0, x: -60, filter: 'blur(8px)' };
      case 'right': return { opacity: 0, x: 60, filter: 'blur(8px)' };
      case 'fade': return { opacity: 0, filter: 'blur(8px)' };
      default: return { opacity: 0, y: 60, filter: 'blur(8px)' };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'up': return { opacity: 1, y: 0, filter: 'blur(0px)' };
      case 'down': return { opacity: 1, y: 0, filter: 'blur(0px)' };
      case 'left': return { opacity: 1, x: 0, filter: 'blur(0px)' };
      case 'right': return { opacity: 1, x: 0, filter: 'blur(0px)' };
      case 'fade': return { opacity: 1, filter: 'blur(0px)' };
      default: return { opacity: 1, y: 0, filter: 'blur(0px)' };
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        ...getAnimate(),
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      });
    } else if (!once) {
      controls.start({
        ...getInitial(),
        transition: {
          duration: duration * 0.6, // some um pouquinho mais rápido
          ease: [0.55, 0.06, 0.68, 0.19],
        },
      });
    }
  }, [inView, controls, once, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={controls}
      className={className}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}

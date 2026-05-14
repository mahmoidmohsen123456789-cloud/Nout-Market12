import { useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  children: ReactNode;
  intensity?: number; // 0..1
}

export function MagneticButton({
  children,
  className,
  intensity = 0.3,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Disable on touch / coarse pointer.
  const isFine =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isFine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * intensity, y: y * intensity });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.4 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'relative inline-flex items-center justify-center font-heading font-bold transition-shadow',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nour-accent focus-visible:ring-offset-2 focus-visible:ring-offset-nour-base',
        className
      )}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}

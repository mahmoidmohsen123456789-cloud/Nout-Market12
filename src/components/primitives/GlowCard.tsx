import { type HTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

type DivProps = Omit<HTMLMotionProps<'div'>, 'children'>;

interface Props extends DivProps {
  children: ReactNode;
  className?: string;
  variant?: 'glass' | 'card' | 'orange';
}

export function GlowCard({
  children,
  className,
  variant = 'glass',
  ...rest
}: Props) {
  const base =
    variant === 'orange'
      ? 'glass-orange'
      : variant === 'card'
      ? 'glass-card'
      : 'glass';

  return (
    <motion.div
      className={cn(
        base,
        'rounded-2xl p-5',
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

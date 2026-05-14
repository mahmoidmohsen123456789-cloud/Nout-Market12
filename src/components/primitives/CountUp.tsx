import { useEffect, useRef } from 'react';
import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import { toArabicDigits } from '@/utils/format';

interface Props {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  arabic?: boolean;
  className?: string;
}

export function CountUp({ to, duration = 1.6, suffix = '', prefix = '', arabic = false, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const mv = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (numRef.current) numRef.current.textContent = arabic ? toArabicDigits(to) : String(to);
      return;
    }
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const v = Math.floor(latest);
        if (numRef.current) numRef.current.textContent = arabic ? toArabicDigits(v) : String(v);
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, arabic, mv, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span ref={numRef}>{arabic ? toArabicDigits(0) : '0'}</span>
      {suffix}
    </span>
  );
}

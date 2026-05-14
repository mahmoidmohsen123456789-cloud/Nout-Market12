import { useEffect, useState } from 'react';

interface Pos { x: number; y: number; }

export function useMouseGlow() {
  const [pos, setPos] = useState<Pos>({ x: -1000, y: -1000 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse). Skip touch.
    if (typeof window === 'undefined') return;
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || reduced) return;
    setEnabled(true);

    let ticking = false;
    const onMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        ticking = false;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return { ...pos, enabled };
}

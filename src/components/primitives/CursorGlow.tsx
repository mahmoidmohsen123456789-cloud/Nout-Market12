import { useMouseGlow } from '@/hooks/useMouseGlow';

export function CursorGlow() {
  const { x, y, enabled } = useMouseGlow();
  if (!enabled) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,107,0,0.08), transparent 70%)`,
      }}
    />
  );
}

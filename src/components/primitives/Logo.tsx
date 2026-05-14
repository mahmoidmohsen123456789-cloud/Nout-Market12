import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 36, showText = true, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        whileHover={{ rotate: 25 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="shrink-0 drop-shadow-[0_0_12px_rgba(255,107,0,0.55)]"
        aria-label="نور ماركت"
      >
        <defs>
          <radialGradient id="lg-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD9B0" />
            <stop offset="55%" stopColor="#FF8C33" />
            <stop offset="100%" stopColor="#CC4400" />
          </radialGradient>
        </defs>
        {/* Rays */}
        <motion.g
          stroke="#FF6B00"
          strokeWidth={3.5}
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '32px 32px' }}
        >
          <line x1="32" y1="4" x2="32" y2="13" />
          <line x1="32" y1="51" x2="32" y2="60" />
          <line x1="4" y1="32" x2="13" y2="32" />
          <line x1="51" y1="32" x2="60" y2="32" />
          <line x1="12" y1="12" x2="18" y2="18" />
          <line x1="46" y1="46" x2="52" y2="52" />
          <line x1="52" y1="12" x2="46" y2="18" />
          <line x1="18" y1="46" x2="12" y2="52" />
        </motion.g>
        <circle cx="32" cy="32" r="13" fill="url(#lg-core)" />
      </motion.svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-heading text-xl font-black tracking-tight text-white">
            نور ماركت
          </span>
          <span className="font-accent text-[10px] tracking-[0.25em] text-nour-text-secondary uppercase mt-0.5">
            NOUR MARKET
          </span>
        </div>
      )}
    </div>
  );
}

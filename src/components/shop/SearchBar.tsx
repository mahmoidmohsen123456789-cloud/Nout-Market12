import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, Props>(function SearchBar(
  { value, onChange, placeholder = 'ابحث عن منتج...' },
  ref
) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <Search
          size={18}
          className="absolute top-1/2 -translate-y-1/2 right-4 text-nour-text-secondary pointer-events-none"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pr-12 pl-12 rounded-full bg-nour-card/70 backdrop-blur-xl border border-white/10 focus:border-nour-accent/60 focus:shadow-[0_0_24px_rgba(255,107,0,0.25)] outline-none text-white placeholder:text-nour-text-muted font-body transition-all"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="مسح"
            className="absolute top-1/2 -translate-y-1/2 left-4 text-nour-text-secondary hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
});

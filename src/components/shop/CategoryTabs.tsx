import { motion } from 'framer-motion';
import { Sparkles, Flame, Star } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { cn } from '@/utils/cn';

export type Filter = 'all' | 'offers' | 'best' | string;

interface Props {
  value: Filter;
  onChange: (f: Filter) => void;
}

export function CategoryTabs({ value, onChange }: Props) {
  const tabs: { key: Filter; label: string; icon?: any }[] = [
    { key: 'all', label: 'الكل', icon: Sparkles },
    { key: 'offers', label: 'عروض', icon: Flame },
    { key: 'best', label: 'الأكثر مبيعاً', icon: Star },
    ...CATEGORIES.map((c) => ({ key: c.slug, label: c.name, icon: c.icon })),
  ];

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {tabs.map((t) => {
          const active = t.key === value;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={cn(
                'relative shrink-0 inline-flex items-center gap-1.5 px-4 h-10 rounded-full text-sm font-heading font-bold transition-colors',
                active
                  ? 'text-white'
                  : 'text-nour-text-secondary hover:text-white bg-white/5 border border-white/10'
              )}
            >
              {active && (
                <motion.span
                  layoutId="cat-active"
                  className="absolute inset-0 rounded-full bg-nour-accent shadow-glow-sm"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              {Icon && <Icon size={14} className="relative z-10" />}
              <span className="relative z-10">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

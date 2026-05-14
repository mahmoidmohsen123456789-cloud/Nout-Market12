import { Home, Search, ShoppingBag, LayoutGrid } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/utils/cn';

interface Props {
  onSearchClick?: () => void;
  onCategoryClick?: () => void;
}

export function MobileBottomNav({ onSearchClick, onCategoryClick }: Props) {
  const { count, open: openCart } = useCart();
  const { pathname } = useLocation();

  const items = [
    { key: 'home', icon: Home, label: 'الرئيسية', to: '/' },
    { key: 'search', icon: Search, label: 'بحث', action: onSearchClick },
    { key: 'cart', icon: ShoppingBag, label: 'السلة', action: openCart, badge: count },
    { key: 'menu', icon: LayoutGrid, label: 'الأقسام', action: onCategoryClick },
  ];

  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-40 backdrop-blur-xl bg-black/80 border-t border-white/10">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = it.to === pathname;

          const content = (
            <motion.span
              whileTap={{ scale: 0.88 }}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-colors',
                isActive ? 'text-nour-accent' : 'text-nour-text-secondary'
              )}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
                <AnimatePresence>
                  {it.badge !== undefined && it.badge > 0 && (
                    <motion.span
                      key={it.badge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                      className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-nour-accent text-[10px] font-bold text-white flex items-center justify-center font-accent shadow-[0_0_10px_rgba(255,107,0,0.6)]"
                    >
                      {it.badge}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="text-[10px] font-heading font-semibold">{it.label}</span>
            </motion.span>
          );

          return it.to ? (
            <Link key={it.key} to={it.to} className="flex-1 flex justify-center">
              {content}
            </Link>
          ) : (
            <button
              key={it.key}
              onClick={it.action}
              className="flex-1 flex justify-center"
              aria-label={it.label}
            >
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

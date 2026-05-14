import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Logo } from '@/components/primitives/Logo';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useCart } from '@/hooks/useCart';
import { openWhatsAppContact } from '@/utils/whatsapp';

const links = [
  { label: 'الرئيسية', to: '/' },
  { label: 'المتجر', to: '/shop' },
  { label: 'العروض', to: '/shop?filter=offers' },
  { label: 'تواصل معنا', to: '/#contact' },
];

export function Navbar() {
  const scrolled = useScrollPosition(40);
  const { count, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to.split('?')[0]);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl bg-black/70 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <nav className="container-x flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="shrink-0">
            <Logo size={36} />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to} className="relative">
                <Link
                  to={l.to}
                  className={cn(
                    'relative px-4 py-2 text-sm font-heading font-semibold transition-colors',
                    isActive(l.to) ? 'text-white' : 'text-nour-text-secondary hover:text-white'
                  )}
                >
                  {l.label}
                  {isActive(l.to) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-nour-accent rounded-full shadow-[0_0_12px_rgba(255,107,0,0.8)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openWhatsAppContact()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nour-whatsapp hover:bg-nour-whatsapp-hover text-white text-sm font-bold transition-colors shadow-[0_0_20px_rgba(37,211,102,0.35)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2.003c-5.518 0-9.997 4.479-9.997 9.997 0 1.764.46 3.486 1.336 5.004L2 22l5.122-1.34a9.96 9.96 0 0 0 4.918 1.27h.004c5.518 0 9.997-4.479 9.997-9.997s-4.479-9.93-10.001-9.93zm5.825 14.124c-.247.69-1.45 1.32-1.992 1.4-.51.075-1.155.106-1.86-.117-.428-.135-.978-.317-1.683-.622-2.964-1.28-4.898-4.27-5.045-4.466-.147-.196-1.21-1.61-1.21-3.072 0-1.461.77-2.18 1.04-2.476.27-.295.587-.369.783-.369l.563.01c.18.008.422-.069.66.504.247.591.84 2.052.913 2.2.073.147.122.319.025.515-.098.196-.147.319-.293.491-.147.172-.31.385-.443.518-.147.147-.3.305-.13.6.172.295.762 1.258 1.638 2.038 1.124 1.003 2.073 1.314 2.368 1.461.295.147.467.122.64-.074.172-.196.736-.858.933-1.153.196-.295.392-.246.661-.147.27.098 1.715.808 2.01.954.295.147.491.221.564.344.073.122.073.713-.174 1.402z" />
              </svg>
              اطلب الآن
            </button>

            <Link
              to="/shop"
              onClick={(e) => {
                if (pathname === '/shop') {
                  e.preventDefault();
                  open();
                }
              }}
              aria-label="عربة التسوق"
              className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-nour-accent text-[11px] font-bold text-white flex items-center justify-center font-accent shadow-[0_0_10px_rgba(255,107,0,0.7)]"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="القائمة"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 top-0 z-[61] bg-nour-base border-b border-white/10 md:hidden"
            >
              <div className="container-x flex items-center justify-between h-16">
                <Logo size={32} />
                <button
                  aria-label="إغلاق"
                  onClick={() => setMobileOpen(false)}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <ul className="px-4 pb-6 space-y-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block px-4 py-4 rounded-xl text-base font-heading font-bold',
                        isActive(l.to)
                          ? 'bg-nour-accent/20 text-nour-accent border border-nour-accent/30'
                          : 'text-white hover:bg-white/5'
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
                <li className="pt-3">
                  <button
                    onClick={() => {
                      openWhatsAppContact();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-nour-whatsapp hover:bg-nour-whatsapp-hover text-white font-heading font-bold shadow-[0_0_20px_rgba(37,211,102,0.35)]"
                  >
                    اطلب الآن عبر واتساب
                  </button>
                </li>
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

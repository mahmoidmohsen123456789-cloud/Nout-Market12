import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';

export function EmptyCart() {
  const { close } = useCart();
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 rounded-full bg-nour-accent/30 blur-2xl" />
        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-nour-accent/30 to-nour-accent/5 border border-nour-accent/30 flex items-center justify-center">
          <ShoppingCart size={40} className="text-nour-accent" />
        </div>
      </motion.div>
      <h3 className="font-heading font-black text-2xl text-white">سلتك فارغة</h3>
      <p className="text-nour-text-secondary text-sm mt-2 max-w-xs">
        أضف بعض المنتجات الرائعة من المتجر لتبدأ طلبك
      </p>
      <Link
        to="/shop"
        onClick={close}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nour-accent hover:bg-nour-accent-hover text-white font-heading font-bold shadow-glow-sm transition-colors"
      >
        ابدأ التسوق
      </Link>
    </div>
  );
}

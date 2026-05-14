import { AnimatePresence, motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-nour-card/60 border border-white/5 mb-4">
          <PackageOpen size={32} className="text-nour-text-secondary" />
        </div>
        <h3 className="font-heading font-bold text-white text-lg">لا توجد منتجات</h3>
        <p className="text-nour-text-secondary text-sm mt-1">جرّب تغيير الفلتر أو البحث</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5"
    >
      <AnimatePresence mode="popLayout">
        {products.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBestSellers } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';

export function BestSellers() {
  const products = getBestSellers();

  return (
    <section className="section-pad relative">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nour-accent/10 border border-nour-accent/30 text-nour-accent text-xs font-heading font-bold uppercase tracking-widest mb-3">
              <Star size={14} className="fill-current" />
              منتجاتنا المميزة
            </span>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
              الأكثر <span className="text-gradient-orange">مبيعاً</span>
            </h2>
            <p className="text-nour-text-secondary mt-2">المنتجات المفضلة عند عملائنا</p>
          </div>
          <Link
            to="/shop?filter=best"
            className="hidden md:inline-flex items-center gap-2 text-nour-accent hover:text-nour-accent-hover font-heading font-bold text-sm transition-colors"
          >
            عرض الكل
            <ArrowLeft size={16} />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
        >
          {products.slice(0, 8).map((p) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={p} compact highlight="best" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

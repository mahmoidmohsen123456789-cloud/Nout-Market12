import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { getFeaturedProducts, getDiscountPct, type Product } from '@/data/products';
import { getCategoryBySlug } from '@/data/categories';
import { formatPrice } from '@/utils/format';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/utils/cn';

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="section-pad relative">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nour-accent/10 border border-nour-accent/30 text-nour-accent text-xs font-heading font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            مختارة لك
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            أبرز <span className="text-gradient-orange">منتجاتنا</span>
          </h2>
          <p className="text-nour-text-secondary mt-2">العروض الحصرية والمنتجات الجديدة</p>
        </motion.div>

        {/* Mobile: horizontal scroll. Desktop: grid */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto no-scrollbar">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="flex gap-3 w-max"
          >
            {products.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                className="w-[260px] shrink-0"
              >
                <FeaturedCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {products.map((p) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <FeaturedCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const cat = getCategoryBySlug(product.category);
  const CatIcon = cat?.icon;
  const discount = getDiscountPct(product);

  const handleAdd = () => {
    add(product, 1);
    setAdded(true);
    toast.success('تمت إضافة المنتج إلى السلة', {
      description: product.name,
      duration: 1800,
    });
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      className="group relative flex flex-col rounded-2xl bg-nour-card border border-white/5 overflow-hidden hover:shadow-card-hover hover:border-nour-accent/30 h-full"
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-nour-surface">
        <div className={cn('absolute inset-0 bg-gradient-to-br', cat?.gradient ?? 'from-nour-accent/20 to-nour-surface')} />
        {CatIcon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <CatIcon className="text-white/15" size={72} strokeWidth={1.2} />
          </div>
        )}
        {!imgFailed && (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="relative w-full h-full object-cover img-crisp transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Top badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {discount && (
            <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold font-accent shadow-md">
              خصم {discount}%
            </span>
          )}
          {product.isBestSeller && !discount && (
            <span className="px-2 py-0.5 rounded-full bg-nour-accent text-white text-[10px] font-bold shadow-md">
              الأكثر مبيعاً
            </span>
          )}
          {product.isNew && !discount && !product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-md">
              جديد
            </span>
          )}
        </div>

        {/* Bottom offer ribbon */}
        {product.offer && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pt-6 pb-2">
            <span className="text-[11px] font-heading font-bold text-nour-accent">
              {product.offer}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-white text-sm md:text-base leading-snug line-clamp-2 min-h-[2.5em]">
          {product.name}
        </h3>

        {product.description ? (
          <p className="text-xs text-nour-text-secondary mt-1 line-clamp-1">{product.description}</p>
        ) : (
          <p className="text-xs text-nour-text-secondary mt-1 font-accent">
            {product.unit}
          </p>
        )}

        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-nour-text-secondary">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="font-accent text-white font-medium">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-accent text-lg md:text-xl font-bold text-nour-accent">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="font-accent text-xs text-nour-price-old line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'mt-3 inline-flex items-center justify-center gap-2 w-full h-10 rounded-xl border font-heading font-bold text-sm transition-all',
            added
              ? 'bg-emerald-500 border-emerald-400 text-white'
              : 'border-nour-accent/40 text-nour-accent hover:bg-nour-accent hover:text-white hover:border-nour-accent hover:shadow-glow-sm'
          )}
        >
          {added ? <Check size={16} /> : <Plus size={16} />}
          {added ? 'تمت الإضافة' : 'أضف للسلة'}
        </motion.button>
      </div>
    </motion.article>
  );
}

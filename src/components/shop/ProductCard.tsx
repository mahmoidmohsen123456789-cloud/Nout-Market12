import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Check } from 'lucide-react';
import { toast } from 'sonner';
import { type Product, getDiscountPct } from '@/data/products';
import { formatPrice } from '@/utils/format';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/utils/cn';
import { getCategoryBySlug } from '@/data/categories';

interface Props {
  product: Product;
  compact?: boolean;
  highlight?: 'best' | 'new';
}

export function ProductCard({ product, compact = false, highlight }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const discount = getDiscountPct(product);
  const cat = getCategoryBySlug(product.category);
  const CatIcon = cat?.icon;

  const handleAdd = () => {
    add(product);
    setAdded(true);
    toast.success('تمت إضافة المنتج إلى السلة', {
      description: product.name,
      duration: 1800,
    });
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      className={cn(
        'group relative flex flex-col rounded-2xl bg-nour-card border border-white/5 overflow-hidden transition-shadow hover:shadow-card-hover hover:border-nour-accent/30 h-full'
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-nour-surface">
        {/* Always-visible gradient fallback with category icon */}
        <div className={cn('absolute inset-0 bg-gradient-to-br', cat?.gradient ?? 'from-nour-accent/20 to-nour-surface')} />
        {CatIcon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <CatIcon className="text-white/15" size={64} strokeWidth={1.4} />
          </div>
        )}
        {/* Real product photo on top — hides if it fails */}
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

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {discount && (
            <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold font-accent shadow-md">
              خصم {discount}%
            </span>
          )}
          {highlight === 'best' && (
            <span className="px-2 py-0.5 rounded-full bg-nour-accent text-white text-[10px] font-bold shadow-md">
              الأكثر مبيعاً
            </span>
          )}
          {product.isNew && !highlight && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-md">
              جديد
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={cn('p-3 md:p-4 flex flex-col flex-1', compact && 'p-3')}>
        <h3 className={cn(
          'font-heading font-bold text-white leading-snug line-clamp-2 min-h-[2.5em]',
          compact ? 'text-sm' : 'text-sm md:text-base'
        )}>
          {product.name}
        </h3>

        <div className="mt-1 text-xs text-nour-text-secondary font-accent">
          {product.unit}
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-nour-text-secondary">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="font-accent text-white font-medium">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        {/* Price */}
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

        {/* Add to cart */}
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

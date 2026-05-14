import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import interior from '@/assets/interior.jpg';
import { CountUp } from '@/components/primitives/CountUp';
import { TOTAL_REVIEWS } from '@/data/reviews';
import { PRODUCTS } from '@/data/products';

const STATS = [
  { value: PRODUCTS.length, suffix: '+', label: 'منتج عالي الجودة' },
  { value: TOTAL_REVIEWS, suffix: '+', label: 'عميل سعيد' },
  { value: 30, suffix: ' دقيقة', label: 'متوسط التوصيل' },
];

export function StoreAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden">
      {/* Parallax interior photo */}
      <motion.div
        style={{ y, willChange: 'transform' }}
        className="absolute inset-0 -inset-y-[15%] transform-gpu"
      >
        <img
          src={interior}
          alt="داخل سوبر ماركت النور"
          className="w-full h-full object-cover img-crisp"
          loading="lazy"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-nour-base via-nour-base/50 to-nour-base" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.06),transparent_60%)]" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-x text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-heading font-bold uppercase tracking-widest mb-6"
          >
            تجربة تسوق مختلفة
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-black text-4xl md:text-7xl text-white text-glow leading-[1.1] max-w-4xl mx-auto"
          >
            أرفف <span className="text-gradient-orange">مليئة</span>
            <br /> جودة <span className="text-gradient-orange">عالية</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-nour-text-secondary mt-6 text-base md:text-lg max-w-xl mx-auto"
          >
            من الباب إلى الرف، كل منتج اخترناه بعناية لنوصله إليك بأفضل جودة وأنسب سعر
          </motion.p>

          {/* Stats */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15, delayChildren: 0.35 } },
            }}
            className="mt-14 grid grid-cols-3 gap-4 md:gap-12 max-w-3xl mx-auto"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                style={{ willChange: 'transform, opacity' }}
                className="text-center transform-gpu"
              >
                <div className="font-accent font-bold text-3xl md:text-6xl text-gradient-orange leading-none tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[11px] md:text-sm text-nour-text-secondary font-heading">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

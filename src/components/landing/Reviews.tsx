import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { REVIEWS, TOTAL_REVIEWS, AVERAGE_RATING } from '@/data/reviews';

export function Reviews() {
  // Duplicate for infinite-scroll feel
  const items = [...REVIEWS, ...REVIEWS];

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nour-accent/10 border border-nour-accent/30 text-nour-accent text-xs font-heading font-bold uppercase tracking-widest mb-4">
            تقييمات عملائنا
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            ماذا يقول <span className="text-gradient-orange">عملاؤنا</span>
          </h2>
          <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-accent font-bold text-white">{AVERAGE_RATING}</span>
            <span className="text-nour-text-secondary text-sm">·</span>
            <span className="text-nour-text-secondary text-sm">+{TOTAL_REVIEWS} تقييم على Google</span>
          </div>
        </motion.div>
      </div>

      {/* Marquee row */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-nour-base to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-nour-base to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 md:gap-6 w-max"
        >
          {items.map((r, i) => (
            <article
              key={`${r.id}-${i}`}
              className="w-[300px] md:w-[380px] shrink-0 glass-card rounded-2xl p-6 relative"
            >
              <Quote className="absolute top-4 left-4 text-nour-accent/30" size={28} />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 leading-relaxed text-sm md:text-base mb-4 line-clamp-4">
                "{r.text}"
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <div className="font-heading font-bold text-white text-sm">{r.name}</div>
                  <div className="text-xs text-nour-text-secondary mt-0.5">{r.date}</div>
                </div>
                {r.badge && (
                  <span className="text-[10px] px-2 py-1 rounded-full bg-nour-accent/10 text-nour-accent border border-nour-accent/20 font-bold">
                    {r.badge}
                  </span>
                )}
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

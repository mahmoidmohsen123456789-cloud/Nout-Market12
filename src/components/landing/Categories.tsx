import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';

export function Categories() {
  return (
    <section id="categories" className="section-pad relative">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-nour-accent/10 border border-nour-accent/30 text-nour-accent text-xs font-heading font-bold uppercase tracking-widest mb-4">
            تسوق حسب القسم
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            أقسامنا <span className="text-gradient-orange">الفاخرة</span>
          </h2>
          <p className="text-nour-text-secondary mt-3 max-w-xl mx-auto">
            تشكيلة منوعة من المنتجات الأصلية بأفضل الأسعار
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5"
        >
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.slug).length;
            const Icon = c.icon;
            return (
              <motion.div
                key={c.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  to={`/shop?category=${c.slug}`}
                  className="group block h-full"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    className="relative h-full p-5 rounded-2xl bg-nour-card border border-white/5 hover:border-nour-accent/40 transition-colors overflow-hidden"
                  >
                    {/* Inner gradient glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    <div className="relative flex flex-col items-center text-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-nour-accent/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-nour-accent/20 to-nour-accent/5 border border-nour-accent/30 flex items-center justify-center">
                          <Icon className="text-nour-accent" size={26} />
                        </div>
                      </div>
                      <h3 className="font-heading font-bold text-sm md:text-base text-white group-hover:text-nour-accent transition-colors leading-tight">
                        {c.name}
                      </h3>
                      <span className="text-[11px] text-nour-text-secondary font-accent">
                        {count} منتج
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

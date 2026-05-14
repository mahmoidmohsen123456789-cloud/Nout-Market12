import { motion } from 'framer-motion';
import { Truck, MapPin, MessageCircle, Clock, BadgePercent } from 'lucide-react';
import heroBg from '@/assets/hero-bg.png';
import { MagneticButton } from '@/components/primitives/MagneticButton';
import { openWhatsAppContact } from '@/utils/whatsapp';

const INFO = [
  { icon: MapPin, title: 'داخل العريش', sub: 'نوصل لكل أنحاء المدينة' },
  { icon: BadgePercent, title: 'توصيل مجاني', sub: 'بدون رسوم إضافية' },
  { icon: MessageCircle, title: 'اطلب بسهولة', sub: 'عبر واتساب فوراً' },
];

export function DeliverySection() {
  return (
    <section className="section-pad relative overflow-hidden bg-nour-main">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover' }}
      />
      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nour-accent/10 border border-nour-accent/30 text-nour-accent text-xs font-heading font-bold uppercase tracking-widest mb-4">
            <Truck size={14} />
            خدمة التوصيل
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            نوصلك لبيتك <span className="text-gradient-orange">في العريش</span>
          </h2>
        </motion.div>

        {/* Time badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="mx-auto max-w-md mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-nour-accent/30 blur-2xl" />
            <div className="relative glass-orange rounded-3xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-nour-accent/20 mb-3">
                <Clock size={28} className="text-nour-accent" />
              </div>
              <div className="font-accent font-bold text-5xl md:text-6xl text-gradient-orange">
                30–60
              </div>
              <div className="text-white font-heading font-bold mt-1">دقيقة</div>
              <div className="text-nour-text-secondary text-sm mt-2">متوسط وقت التوصيل داخل العريش</div>
            </div>
          </div>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          {INFO.map((it) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                className="glass-card rounded-2xl p-6 text-center hover:border-nour-accent/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-nour-accent/15 mb-4">
                  <Icon className="text-nour-accent" size={22} />
                </div>
                <h3 className="font-heading font-bold text-white text-lg">{it.title}</h3>
                <p className="text-nour-text-secondary text-sm mt-1">{it.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center">
          <MagneticButton
            onClick={() => openWhatsAppContact()}
            className="h-14 px-10 rounded-full bg-nour-whatsapp hover:bg-nour-whatsapp-hover text-white shadow-[0_0_40px_rgba(37,211,102,0.4)]"
          >
            <span className="inline-flex items-center gap-2">
              <MessageCircle size={18} />
              اطلب الآن عبر واتساب
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

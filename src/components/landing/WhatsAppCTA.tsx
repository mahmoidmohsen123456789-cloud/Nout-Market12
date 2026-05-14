import { motion } from 'framer-motion';
import { MessageCircle, ShoppingCart, Send, Package } from 'lucide-react';
import exterior from '@/assets/exterior.jpg';
import { MagneticButton } from '@/components/primitives/MagneticButton';
import { openWhatsAppContact } from '@/utils/whatsapp';

const STEPS = [
  { icon: ShoppingCart, title: 'اختر منتجاتك', sub: 'تصفح المتجر وأضف ما تحتاج' },
  { icon: Send, title: 'أرسل طلبك', sub: 'بضغطة زر عبر واتساب' },
  { icon: Package, title: 'استلم في بيتك', sub: 'توصيل سريع داخل العريش' },
];

export function WhatsAppCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={exterior}
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nour-base via-nour-base/80 to-nour-base/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nour-base" />
      </div>

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nour-whatsapp/10 border border-nour-whatsapp/30 text-nour-whatsapp text-xs font-heading font-bold uppercase tracking-widest mb-4">
            <MessageCircle size={14} />
            اطلب عبر واتساب
          </span>
          <h2 className="font-heading font-black text-3xl md:text-6xl text-white text-glow">
            ثلاث خطوات{' '}
            <span className="text-gradient-orange">للطلب</span>
          </h2>
          <p className="text-nour-text-secondary mt-4 text-base md:text-lg">
            اطلب أي منتج من منتجاتنا بطريقة سهلة وبسيطة
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                className="relative glass-card rounded-2xl p-6 text-center group hover:border-nour-accent/30 transition-colors"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-nour-accent flex items-center justify-center font-accent font-bold text-white shadow-glow-sm">
                  {i + 1}
                </div>
                <div className="mt-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-nour-accent/15 mb-4">
                  <Icon className="text-nour-accent" size={26} />
                </div>
                <h3 className="font-heading font-bold text-white text-lg md:text-xl">
                  {s.title}
                </h3>
                <p className="text-nour-text-secondary text-sm mt-1.5">{s.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center">
          <MagneticButton
            onClick={() => openWhatsAppContact('مرحباً نور ماركت، أريد أن أبدأ طلباً جديداً')}
            className="h-16 px-10 rounded-full bg-nour-whatsapp hover:bg-nour-whatsapp-hover text-white text-base shadow-[0_0_50px_rgba(37,211,102,0.5)]"
          >
            <span className="inline-flex items-center gap-3">
              <MessageCircle size={20} />
              ابدأ طلبك الآن
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { GOOGLE_MAPS_URL, WHATSAPP_DISPLAY } from '@/utils/whatsapp';

export function LocationSection() {
  return (
    <section id="contact" className="section-pad relative">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nour-accent/10 border border-nour-accent/30 text-nour-accent text-xs font-heading font-bold uppercase tracking-widest mb-4">
            <MapPin size={14} />
            تجدنا هنا
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            <span className="text-gradient-orange">موقعنا</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative glass-card rounded-3xl overflow-hidden">
            {/* Decorative map-like grid pattern */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,107,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.08) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-nour-accent/10 to-transparent" />

            {/* Animated pin */}
            <div className="relative pt-12 pb-2 flex justify-center">
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-nour-accent/40 blur-xl" />
                <div className="relative w-16 h-16 rounded-full bg-nour-accent flex items-center justify-center shadow-[0_0_30px_rgba(255,107,0,0.6)]">
                  <MapPin className="text-white" size={28} />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-nour-accent"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>

            <div className="relative p-8 md:p-10 text-center">
              <h3 className="font-heading font-black text-2xl md:text-3xl text-white">
                المساعيد، شمال سيناء
              </h3>
              <p className="text-nour-text-secondary mt-2">العريش — مصر</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                <a
                  href={`tel:${WHATSAPP_DISPLAY}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-nour-accent/40 transition-colors group"
                >
                  <Phone size={16} className="text-nour-accent" />
                  <span dir="ltr" className="font-accent text-white">{WHATSAPP_DISPLAY}</span>
                </a>
                <div className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <Clock size={16} className="text-nour-accent" />
                  <span className="text-white text-sm font-heading">مفتوح يومياً</span>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nour-accent hover:bg-nour-accent-hover text-white font-heading font-bold shadow-glow-sm transition-colors"
              >
                افتح في خرائط Google
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

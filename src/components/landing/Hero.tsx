import { motion } from 'framer-motion';
import { Star, Truck, Package, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import exterior from '@/assets/exterior.jpg';
import heroBg from '@/assets/hero-bg.png';
import { MagneticButton } from '@/components/primitives/MagneticButton';
import { openWhatsAppContact } from '@/utils/whatsapp';
import { TOTAL_REVIEWS, AVERAGE_RATING } from '@/data/reviews';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Layer 1: exterior photo with Ken Burns */}
      <div className="absolute inset-0 z-0">
        <img
          src={exterior}
          alt="سوبر ماركت النور من الخارج ليلاً"
          className="w-full h-full object-cover animate-ken-burns img-crisp"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Layer 2: dark gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-nour-base via-nour-base/70 to-nour-base/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-nour-base/60 via-transparent to-transparent" />

      {/* Layer 3: gold thread texture */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] opacity-[0.08] mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Layer 4: glow ring (static — invisible motion through 40px blur, kept off the compositor) */}
      <div className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="w-[680px] h-[680px] max-w-[95vw] max-h-[95vw] rounded-full opacity-50"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(255,107,0,0.35) 90deg, transparent 180deg, rgba(255,107,0,0.25) 270deg, transparent 360deg)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-x text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-orange mb-6"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-nour-status-open opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-nour-status-open" />
          </span>
          <span className="text-xs font-heading font-bold text-white tracking-wide">مفتوح الآن</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-black tracking-tight text-white text-5xl sm:text-6xl md:text-8xl leading-[1.05] text-glow"
        >
          سوبر ماركت{' '}
          <span className="text-gradient-orange">النور</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-nour-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          أفضل الأسعار · توصيل داخل العريش · جودة مضمونة
          <br className="hidden sm:block" />
          <span className="text-white/90">أكثر من 80 منتج بانتظارك</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/shop">
            <MagneticButton className="shimmer-border group relative overflow-hidden h-14 px-8 rounded-full bg-nour-accent hover:bg-nour-accent-hover text-white shadow-glow text-base">
              <span className="relative z-10 inline-flex items-center gap-2">
                <span>تسوق الآن</span>
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              </span>
            </MagneticButton>
          </Link>
          <MagneticButton
            onClick={() => openWhatsAppContact('مرحباً نور ماركت، أريد طلب منتجات')}
            className="h-14 px-8 rounded-full bg-nour-whatsapp hover:bg-nour-whatsapp-hover text-white text-base shadow-[0_0_30px_rgba(37,211,102,0.4)]"
          >
            <span className="inline-flex items-center gap-2">
              <MessageCircle size={18} />
              <span>اطلب عبر واتساب</span>
            </span>
          </MagneticButton>
        </motion.div>

        {/* Floating glassmorphism cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <FloatCard delay={0.6} floatDelay="0s">
            <Star className="text-yellow-400 fill-yellow-400" size={22} />
            <div className="text-right">
              <div className="font-accent text-white text-lg font-bold leading-none">+{TOTAL_REVIEWS}</div>
              <div className="text-[11px] text-nour-text-secondary mt-1">تقييم · {AVERAGE_RATING} على Google</div>
            </div>
          </FloatCard>
          <FloatCard delay={0.7} floatDelay="-1s">
            <Truck className="text-nour-accent" size={22} />
            <div className="text-right">
              <div className="font-heading text-white font-bold text-sm leading-tight">توصيل داخل العريش</div>
              <div className="text-[11px] text-nour-text-secondary mt-1">30–60 دقيقة</div>
            </div>
          </FloatCard>
          <FloatCard delay={0.8} floatDelay="-2s">
            <Package className="text-emerald-400" size={22} />
            <div className="text-right">
              <div className="font-heading text-white font-bold text-sm leading-tight">+80 منتج</div>
              <div className="text-[11px] text-nour-text-secondary mt-1">متاح للطلب الآن</div>
            </div>
          </FloatCard>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-7 h-12 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
        >
          <span className="w-1 h-2 bg-nour-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatCard({
  children,
  delay,
  floatDelay,
}: {
  children: React.ReactNode;
  delay: number;
  floatDelay: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className="glass-card rounded-2xl p-4 flex items-center gap-3 transform-gpu"
    >
      <div
        style={{ animationDelay: floatDelay, willChange: 'transform' }}
        className="flex items-center gap-3 w-full justify-between animate-float-y transform-gpu"
      >
        {children}
      </div>
    </motion.div>
  );
}

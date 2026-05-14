import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, ChevronLeft } from 'lucide-react';
import { Logo } from '@/components/primitives/Logo';
import heroBg from '@/assets/hero-bg.png';
import { WHATSAPP_DISPLAY, openWhatsAppContact } from '@/utils/whatsapp';

const payments = [
  { label: 'كاش', icon: '💵' },
  { label: 'فودافون كاش', icon: '📱' },
  { label: 'InstaPay', icon: '💳' },
  { label: 'تحويل بنكي', icon: '🏦' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-nour-accent to-transparent" />
      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-nour-accent/10 to-transparent pointer-events-none" />

      {/* Gold texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover' }}
      />

      <div className="container-x relative pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size={48} />
            <p className="text-nour-text-secondary mt-6 max-w-md leading-relaxed">
              سوبر ماركت النور في المساعيد، شمال سيناء.
              أكثر من 80 منتج عالي الجودة، توصيل سريع داخل العريش، وأسعار منافسة.
            </p>
            <button
              onClick={() => openWhatsAppContact()}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-nour-whatsapp hover:bg-nour-whatsapp-hover text-white text-sm font-bold transition-colors"
            >
              اطلب عبر واتساب
            </button>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white mb-6">
              روابط
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-nour-text-secondary hover:text-nour-accent transition-colors inline-flex items-center gap-1">الرئيسية <ChevronLeft size={14} /></Link></li>
              <li><Link to="/shop" className="text-nour-text-secondary hover:text-nour-accent transition-colors inline-flex items-center gap-1">المتجر <ChevronLeft size={14} /></Link></li>
              <li><Link to="/shop?filter=offers" className="text-nour-text-secondary hover:text-nour-accent transition-colors inline-flex items-center gap-1">العروض <ChevronLeft size={14} /></Link></li>
              <li><Link to="/shop?filter=best" className="text-nour-text-secondary hover:text-nour-accent transition-colors inline-flex items-center gap-1">الأكثر مبيعاً <ChevronLeft size={14} /></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white mb-6">
              تواصل
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2 text-nour-text-secondary">
                <MapPin size={16} className="mt-0.5 text-nour-accent shrink-0" />
                <span>المساعيد، شمال سيناء، العريش</span>
              </li>
              <li>
                <a
                  href={`tel:${WHATSAPP_DISPLAY}`}
                  className="flex items-center gap-2 text-nour-text-secondary hover:text-nour-accent transition-colors"
                >
                  <Phone size={16} className="text-nour-accent shrink-0" />
                  <span dir="ltr" className="font-accent">{WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-nour-text-secondary">
                <Clock size={16} className="text-nour-accent shrink-0" />
                <span>مفتوح يومياً</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Payment row */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-xs uppercase tracking-widest text-nour-text-muted mb-3 font-heading">طرق الدفع</p>
          <div className="flex flex-wrap gap-2">
            {payments.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white"
              >
                <span>{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-nour-text-muted">
          <p>© 2026 سوبر ماركت النور · جميع الحقوق محفوظة</p>
          <p className="font-accent">Crafted with light · نور</p>
        </div>
      </div>
    </footer>
  );
}

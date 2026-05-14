import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/format';
import { openWhatsAppOrder, PAYMENT_LABELS, type PaymentMethod } from '@/utils/whatsapp';
import { EmptyCart } from './EmptyCart';
import { cn } from '@/utils/cn';

const PAYMENTS: PaymentMethod[] = ['cash', 'vodafone', 'instapay', 'bank'];

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, total, count, clear } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>('cash');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleOrder = () => {
    if (items.length === 0) return;
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error('يرجى ملء جميع البيانات', {
        description: 'الاسم، الهاتف، والعنوان مطلوبة',
      });
      return;
    }
    openWhatsAppOrder({
      items,
      total,
      payment,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
    });
    toast.success('تم فتح واتساب لإتمام طلبك 🎉');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed inset-y-0 left-0 z-[71] w-full sm:w-[440px] bg-nour-base border-l border-white/5 flex flex-col shadow-2xl"
            dir="rtl"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-6 h-16 border-b border-white/5 shrink-0">
              <div>
                <h2 className="font-heading font-black text-lg text-white">سلتي</h2>
                <p className="text-xs text-nour-text-secondary">{count} منتج</p>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={() => {
                      clear();
                      toast.message('تم تفريغ السلة');
                    }}
                    aria-label="تفريغ السلة"
                    className="w-9 h-9 rounded-full hover:bg-white/5 text-nour-text-secondary hover:text-red-400 transition-colors inline-flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  onClick={close}
                  aria-label="إغلاق"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white inline-flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((it) => (
                    <article
                      key={it.id}
                      className="flex gap-3 p-3 rounded-2xl bg-nour-card border border-white/5"
                    >
                      <img
                        src={it.image}
                        alt={it.name}
                        loading="lazy"
                        className="w-20 h-20 rounded-xl object-cover bg-nour-surface shrink-0"
                        onError={(e) => ((e.target as HTMLImageElement).style.opacity = '0')}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-white text-sm line-clamp-2 leading-snug">
                          {it.name}
                        </h3>
                        <div className="text-xs text-nour-text-secondary mt-0.5">{it.unit}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-nour-surface rounded-full border border-white/5 p-0.5">
                            <button
                              onClick={() => setQty(it.id, it.qty - 1)}
                              className="w-7 h-7 inline-flex items-center justify-center rounded-full hover:bg-white/5 text-white"
                              aria-label="إنقاص"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-accent font-bold text-white text-sm min-w-[20px] text-center">
                              {it.qty}
                            </span>
                            <button
                              onClick={() => setQty(it.id, it.qty + 1)}
                              className="w-7 h-7 inline-flex items-center justify-center rounded-full hover:bg-white/5 text-white"
                              aria-label="زيادة"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="font-accent font-bold text-nour-accent">
                            {formatPrice(it.price * it.qty)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(it.id)}
                        aria-label="حذف"
                        className="w-8 h-8 self-start rounded-full hover:bg-red-500/10 text-nour-text-secondary hover:text-red-400 transition-colors inline-flex items-center justify-center"
                      >
                        <Trash2 size={14} />
                      </button>
                    </article>
                  ))}

                  {/* Checkout form */}
                  <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                    <h3 className="font-heading font-bold text-white">بيانات التوصيل</h3>
                    <Field
                      label="الاسم الكامل"
                      value={name}
                      onChange={setName}
                      placeholder="مثال: محمد أحمد"
                    />
                    <Field
                      label="رقم الهاتف"
                      value={phone}
                      onChange={setPhone}
                      placeholder="01xxxxxxxxx"
                      type="tel"
                      dir="ltr"
                    />
                    <Field
                      label="العنوان داخل العريش"
                      value={address}
                      onChange={setAddress}
                      placeholder="الحي، الشارع، العمارة..."
                      textarea
                    />

                    <div>
                      <label className="block text-xs font-heading font-bold text-nour-text-secondary mb-2 uppercase tracking-wider">
                        طريقة الدفع
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {PAYMENTS.map((m) => (
                          <button
                            key={m}
                            onClick={() => setPayment(m)}
                            className={cn(
                              'px-3 py-2.5 rounded-xl text-xs font-heading font-bold transition-all border',
                              payment === m
                                ? 'bg-nour-accent text-white border-nour-accent shadow-glow-sm'
                                : 'bg-white/5 text-white border-white/10 hover:border-nour-accent/40'
                            )}
                          >
                            {PAYMENT_LABELS[m]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <footer className="border-t border-white/5 p-4 space-y-3 bg-nour-main/80 backdrop-blur-xl shrink-0">
                <div className="space-y-1 text-sm">
                  <Row label="المجموع الفرعي" value={formatPrice(subtotal)} />
                  <Row label="رسوم التوصيل" value="مجاناً" accent="success" />
                </div>
                <div className="flex items-baseline justify-between pt-3 border-t border-white/5">
                  <span className="font-heading font-bold text-white">الإجمالي</span>
                  <span className="font-accent font-bold text-2xl text-nour-accent">
                    {formatPrice(total)}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOrder}
                  className="w-full h-14 rounded-xl bg-nour-whatsapp hover:bg-nour-whatsapp-hover text-white font-heading font-bold text-base inline-flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-colors"
                >
                  <MessageCircle size={20} />
                  اطلب عبر واتساب
                </motion.button>
                <p className="text-[11px] text-center text-nour-text-secondary">
                  سيتم فتح واتساب مع تفاصيل طلبك جاهزة للإرسال
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
  type = 'text',
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  type?: string;
  dir?: 'ltr' | 'rtl';
}) {
  const cls =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-nour-accent/60 outline-none text-white placeholder:text-nour-text-muted text-sm font-body transition-colors';
  return (
    <label className="block">
      <span className="block text-xs font-heading font-bold text-nour-text-secondary mb-1.5 uppercase tracking-wider">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className={cn(cls, 'resize-none')}
          dir={dir}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
          dir={dir}
        />
      )}
    </label>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: 'success' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-nour-text-secondary">{label}</span>
      <span className={cn('font-accent font-medium', accent === 'success' ? 'text-emerald-400' : 'text-white')}>
        {value}
      </span>
    </div>
  );
}

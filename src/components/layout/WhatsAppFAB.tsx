import { motion } from 'framer-motion';
import { openWhatsAppContact } from '@/utils/whatsapp';

export function WhatsAppFAB() {
  return (
    <motion.button
      onClick={() => openWhatsAppContact('مرحباً نور ماركت، أريد الاستفسار عن طلب')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-nour-whatsapp text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.6)]"
    >
      <span className="absolute inset-0 rounded-full bg-nour-whatsapp animate-pulse-ring" />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="relative z-10 md:w-8 md:h-8">
        <path d="M12.04 2.003c-5.518 0-9.997 4.479-9.997 9.997 0 1.764.46 3.486 1.336 5.004L2 22l5.122-1.34a9.96 9.96 0 0 0 4.918 1.27h.004c5.518 0 9.997-4.479 9.997-9.997s-4.479-9.93-10.001-9.93zm5.825 14.124c-.247.69-1.45 1.32-1.992 1.4-.51.075-1.155.106-1.86-.117-.428-.135-.978-.317-1.683-.622-2.964-1.28-4.898-4.27-5.045-4.466-.147-.196-1.21-1.61-1.21-3.072 0-1.461.77-2.18 1.04-2.476.27-.295.587-.369.783-.369l.563.01c.18.008.422-.069.66.504.247.591.84 2.052.913 2.2.073.147.122.319.025.515-.098.196-.147.319-.293.491-.147.172-.31.385-.443.518-.147.147-.3.305-.13.6.172.295.762 1.258 1.638 2.038 1.124 1.003 2.073 1.314 2.368 1.461.295.147.467.122.64-.074.172-.196.736-.858.933-1.153.196-.295.392-.246.661-.147.27.098 1.715.808 2.01.954.295.147.491.221.564.344.073.122.073.713-.174 1.402z" />
      </svg>
    </motion.button>
  );
}

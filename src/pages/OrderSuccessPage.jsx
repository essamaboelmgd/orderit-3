import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useCart } from '../context/CartContext';

/* ── Animated checkmark SVG ── */
function Checkmark() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20">
      <motion.circle
        cx="40" cy="40" r="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-primary"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <motion.path
        d="M20 40 L34 54 L60 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      />
    </svg>
  );
}

/* ── Confetti dot (decorative) ── */
function ConfettiDot({ style }) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full pointer-events-none"
      style={style}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: -120, opacity: 0, scale: 0.5 }}
      transition={{ duration: 1.4, ease: 'easeOut', delay: Math.random() * 0.4 }}
    />
  );
}

const confetti = [
  { bottom: 0, left: '20%', backgroundColor: '#F03030' },
  { bottom: 0, left: '40%', backgroundColor: '#4CAF50' },
  { bottom: 0, left: '60%', backgroundColor: '#2196F3' },
  { bottom: 0, left: '75%', backgroundColor: '#FF9800' },
  { bottom: 0, left: '10%', backgroundColor: '#9C27B0' },
  { bottom: 0, left: '85%', backgroundColor: '#F03030' },
];

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const { items, totalPrice, tableNumber, clearCart } = useCart();
  const orderNum = '#' + (1000 + Math.floor(Math.random() * 900));
  const snapshot = useRef([...items]).current;
  const snapshotPrice = useRef(totalPrice).current;

  useEffect(() => {
    const t = setTimeout(() => clearCart(), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageTransition>
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
        dir="rtl"
      >
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-tertiary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-md border border-outline-variant/10 overflow-hidden"
        >
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-l from-primary via-primary-container to-primary" />

          <div className="p-8 text-center">
            {/* Checkmark + confetti area */}
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="w-24 h-24 bg-primary/8 rounded-full flex items-center justify-center">
                <Checkmark />
              </div>
              {confetti.map((c, i) => (
                <ConfettiDot key={i} style={c} />
              ))}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-3xl font-black text-on-surface mb-2"
            >
              تم إرسال طلبك! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-secondary mb-6 leading-relaxed"
            >
              سيصلك طلبك قريباً على الطاولة رقم{' '}
              <span className="font-black text-primary">
                {tableNumber || '—'}
              </span>
            </motion.p>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="bg-surface-container rounded-2xl p-4 text-right mb-5"
            >
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-outline-variant/10">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">رقم الطلب</span>
                <span className="font-black text-on-surface">{orderNum}</span>
              </div>
              <div className="space-y-2 mb-3">
                {snapshot.length > 0 ? (
                  snapshot.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="font-bold text-on-surface">${(item.price * item.qty).toFixed(2)}</span>
                      <span className="text-secondary">{item.name} × {item.qty}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-secondary text-sm">لا توجد عناصر</p>
                )}
              </div>
              <div className="border-t border-outline-variant/10 pt-3 flex justify-between items-center">
                <motion.span
                  className="font-black text-xl text-primary"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, type: 'spring', stiffness: 300 }}
                >
                  ${(snapshotPrice > 0 ? snapshotPrice : 0).toFixed(2)}
                </motion.span>
                <span className="font-bold text-on-surface">الإجمالي</span>
              </div>
            </motion.div>

            {/* Pay on arrival badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-2 text-secondary text-sm mb-6"
            >
              <span className="material-symbols-outlined text-sm text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              الدفع عند الوصول — لا حاجة للدفع الآن
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/menu?table=${tableNumber}`)}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-black text-base shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined">restaurant_menu</span>
              <span>العودة للمنيو</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Estimated time card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-5 flex items-center gap-4 bg-surface-container-lowest rounded-2xl px-6 py-4 shadow-sm border border-outline-variant/10 w-full max-w-md"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="text-primary"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>avg_pace</span>
          </motion.div>
          <div className="text-right">
            <p className="font-black text-on-surface">الوقت المتوقع</p>
            <p className="text-secondary text-sm">15 – 25 دقيقة تقريباً</p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useCart } from '../context/CartContext';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, updateNote, totalPrice, tableNumber } = useCart();

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <div className="w-24 h-24 bg-surface-container rounded-3xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-5xl text-outline">shopping_basket</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-on-surface mb-2">السلة فارغة</h2>
              <p className="text-secondary">أضف أصناف من المنيو لتبدأ طلبك</p>
            </div>
            <motion.button
              onClick={() => navigate('/menu')}
              className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-md"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              العودة للمنيو
            </motion.button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-on-surface antialiased" dir="rtl">

        {/* ── Sticky Header ── */}
        <motion.header
          className="sticky top-0 z-30 glass-nav shadow-sm border-b border-outline-variant/10"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-secondary hover:text-primary font-semibold text-sm transition-colors"
              whileTap={{ scale: 0.93 }}
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              العودة
            </motion.button>
            <h1 className="font-black text-xl">طلبك</h1>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">table_restaurant</span>
              الطاولة {tableNumber}
            </div>
          </div>
        </motion.header>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

          {/* ── Items Card ── */}
          <motion.div
            className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/5 overflow-hidden"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <div className="px-5 pt-5 pb-2">
              <p className="text-xs font-bold text-secondary uppercase tracking-widest">أصناف الطلب</p>
            </div>

            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={fadeUp}
                  exit={{ opacity: 0, x: 40, height: 0 }}
                  className="flex items-start gap-3 p-4 border-t border-outline-variant/5 first:border-0"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                    {item.image
                      ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      : <span className="text-2xl">{item.icon || '🍱'}</span>
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-on-surface text-sm leading-snug">{item.name}</p>
                      <p className="text-primary font-bold text-sm flex-shrink-0">{item.price.toFixed(2)} ج.م</p>
                    </div>
                    <input
                      type="text"
                      value={item.note || ''}
                      onChange={e => updateNote(item.id, e.target.value)}
                      placeholder="ملاحظة للمطبخ (اختياري)..."
                      className="w-full mt-1 text-xs bg-surface-container border border-outline-variant/10 rounded-lg p-2 focus:border-primary outline-none text-right placeholder:text-secondary transition-colors"
                    />
                  </div>

                  {/* Qty stepper */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-2 bg-surface-container rounded-lg px-2 py-1">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="text-primary font-black w-5 text-center"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </motion.button>
                      <motion.span
                        key={item.qty}
                        initial={{ scale: 0.7 }}
                        animate={{ scale: 1 }}
                        className="font-bold text-on-surface w-4 text-center text-sm"
                      >
                        {item.qty}
                      </motion.span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-primary font-black w-5 text-center"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </motion.button>
                    </div>
                    <p className="text-xs font-bold text-on-surface">{(item.price * item.qty).toFixed(2)} ج.م</p>
                  </div>

                  {/* Delete */}
                  <motion.button
                    onClick={() => removeItem(item.id)}
                    className="text-outline hover:text-red-500 transition-colors mt-1 flex-shrink-0"
                    whileTap={{ scale: 0.85 }}
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Price Summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/5 p-5 space-y-3"
          >
            <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">ملخص الطلب</p>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">المجموع الفرعي</span>
              <span className="font-semibold text-on-surface">{totalPrice.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">رسوم الخدمة</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                مجاناً
              </span>
            </div>
            <div className="h-px bg-outline-variant/10 my-1" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-on-surface">الإجمالي</span>
              <motion.span
                key={totalPrice}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="font-black text-2xl text-primary"
              >
                {totalPrice.toFixed(2)} ج.م
              </motion.span>
            </div>
            <p className="text-secondary text-xs text-center pt-1 flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-sm">payments</span>
              الدفع يتم عند الوصول
            </p>
          </motion.div>

          {/* ── Confirm Button ── */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(0,0,0,0.16)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/order-success')}
            className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            <span>تأكيد الطلب</span>
            <span className="material-symbols-outlined">check_circle</span>
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
}

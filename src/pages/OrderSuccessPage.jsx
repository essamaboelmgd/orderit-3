import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useCart } from '../context/CartContext';

function CheckmarkSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20">
      <motion.circle
        cx="40" cy="40" r="36"
        fill="none"
        stroke="#22C55E"
        strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.path
        d="M20 40 L34 54 L60 26"
        fill="none"
        stroke="#22C55E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
      />
    </svg>
  );
}

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const { items, totalPrice, tableNumber, clearCart } = useCart();
  const orderNum = '#1042';
  const snapshot = [...items];

  useEffect(() => {
    const timer = setTimeout(() => clearCart(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12 font-sans" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckmarkSVG />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-black text-gray-900 mb-3"
          >
            تم إرسال طلبك! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-secondary text-lg mb-6"
          >
            سيصلك طلبك قريباً على الطاولة رقم <span className="font-bold text-primary">{tableNumber}</span>
          </motion.p>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gray-50 rounded-2xl p-4 text-right mb-6"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-500 text-sm">رقم الطلب</span>
              <span className="font-black text-gray-900">{orderNum}</span>
            </div>
            <div className="space-y-2 mb-3">
              {snapshot.length > 0 ? snapshot.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.name} × {item.qty}</span>
                  <span className="font-bold">{(item.price * item.qty).toFixed(0)} ج.م</span>
                </div>
              )) : (
                <p className="text-gray-400 text-sm">سوشي سالمون × 2</p>
              )}
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="font-bold">الإجمالي</span>
              <span className="font-black text-primary">{totalPrice > 0 ? totalPrice.toFixed(2) : '88.00'} ج.م</span>
            </div>
          </motion.div>

          <p className="text-secondary text-sm mb-6">لا حاجة للدفع الآن — الدفع عند الوصول</p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/menu?table=${tableNumber}`)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all"
          >
            العودة للمنيو
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  );
}

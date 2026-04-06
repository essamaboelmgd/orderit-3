import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, updateNote, totalPrice, tableNumber } = useCart();

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center" dir="rtl">
          <span className="text-6xl mb-6">🛒</span>
          <h2 className="text-2xl font-black text-gray-800 mb-3">السلة فارغة</h2>
          <p className="text-secondary mb-6">أضف أصناف من المنيو لتبدأ طلبك</p>
          <button onClick={() => navigate('/menu')} className="bg-primary text-white px-6 py-3 rounded-lg font-bold">
            العودة للمنيو
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary font-medium text-sm transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              العودة
            </button>
            <h1 className="font-black text-xl">طلبك</h1>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              الطاولة {tableNumber}
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {/* Items */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
            {items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-4"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {item.icon || '🍱'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-primary font-bold text-sm">{item.price} ج.م</p>
                  </div>
                  <input
                    type="text"
                    value={item.note || ''}
                    onChange={e => updateNote(item.id, e.target.value)}
                    placeholder="ملاحظة للمطبخ (اختياري)..."
                    className="w-full mt-2 text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-primary text-right"
                  />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="text-primary font-black w-6 text-center">−</button>
                  <span className="font-bold text-gray-900 w-4 text-center text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="text-primary font-black w-6 text-center">+</button>
                </div>
                <div className="min-w-[60px] text-left">
                  <p className="font-bold text-gray-900 text-sm">{(item.price * item.qty).toFixed(2)}</p>
                  <p className="text-gray-400 text-xs">ج.م</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </motion.div>
            ))}
          </div>



          {/* Price summary */}
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-secondary">المجموع الفرعي</span>
              <span className="font-medium">{totalPrice.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">رسوم الخدمة</span>
              <span className="font-medium text-green-600">مجاناً</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="font-bold text-lg">الإجمالي</span>
              <span className="font-black text-xl text-primary">{totalPrice.toFixed(2)} ج.م</span>
            </div>
            <p className="text-secondary text-xs text-center">الدفع يتم عند الوصول</p>
          </div>

          {/* Confirm button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/order-success')}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-primary-dark transition-all"
          >
            تأكيد الطلب
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
}

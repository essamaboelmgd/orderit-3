import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Logo from '../components/Logo';
import { initialOrders } from '../data/dummyData';

const COLUMNS = [
  { key: 'new', label: 'جديد', emoji: '🔴', color: 'text-red-500' },
  { key: 'preparing', label: 'قيد التحضير', emoji: '🟡', color: 'text-yellow-500' },
  { key: 'ready', label: 'جاهز للتقديم', emoji: '🟢', color: 'text-green-500' },
];

export default function StaffView() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('current');

  const handleDeliver = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
        {/* Top bar */}
        <header className="bg-dark text-white px-4 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <Logo size="lg" />
            <div className="text-right">
              <p className="font-bold text-sm">وضع الموظف</p>
              <p className="text-white/60 text-xs">ساكورا سوشي</p>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white border-b sticky top-[57px] z-20">
          <div className="flex">
            {[
              { key: 'current', label: 'الطلبات الحالية' },
              { key: 'history', label: 'سجل اليوم' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-bold transition-all ${activeTab === tab.key ? 'text-primary border-b-2 border-primary' : 'text-secondary'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'current' ? (
            <div className="space-y-4">
              {COLUMNS.map(col => {
                const colOrders = orders.filter(o => o.status === col.key);
                if (colOrders.length === 0) return null;
                return (
                  <div key={col.key}>
                    <h3 className={`font-black text-sm mb-2 flex items-center gap-2 ${col.color}`}>
                      {col.emoji} {col.label} ({colOrders.length})
                    </h3>
                    <div className="space-y-2">
                      <AnimatePresence>
                        {colOrders.map(order => (
                          <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className={`bg-white rounded-xl p-4 shadow-sm border ${order.status === 'new' ? 'border-red-200' : 'border-gray-100'}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-black">
                                طاولة {order.tableNumber}
                              </span>
                              <span className="text-secondary text-xs">{order.time}</span>
                            </div>
                            <div className="space-y-1 mb-3">
                              {order.items.map((item, i) => (
                                <p key={i} className="text-sm text-gray-600">{item.name} × {item.qty}</p>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-black text-primary">{order.total} ج.م</span>
                              {order.status === 'ready' && (
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleDeliver(order.id)}
                                  className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold"
                                >
                                  تم التسليم ✓
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
              {orders.length === 0 && (
                <div className="text-center py-16 text-secondary">
                  <span className="text-5xl block mb-3">✅</span>
                  <p className="font-bold">لا توجد طلبات حالية</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {[
                { id: '#1033', table: 3, total: 88, time: '14:23' },
                { id: '#1032', table: 7, total: 66, time: '13:45' },
                { id: '#1031', table: 5, total: 124, time: '13:12' },
              ].map(o => (
                <div key={o.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{o.id}</p>
                    <p className="text-secondary text-xs">طاولة {o.table} · {o.time}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-black text-primary">{o.total} ج.م</p>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">مُسلَّم</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

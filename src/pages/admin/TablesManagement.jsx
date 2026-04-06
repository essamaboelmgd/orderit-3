import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';
import { tables } from '../../data/dummyData';

function QRPlaceholder({ tableNumber, size = 80 }) {
  const s = size;
  const c = s / 2;
  const r = s / 6;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="mx-auto">
      <rect width={s} height={s} fill="white" />
      {/* QR corner squares */}
      {[[4, 4], [s - 4 - r * 2, 4], [4, s - 4 - r * 2]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={r * 2} height={r * 2} fill="none" stroke="#1A1A1A" strokeWidth="2" />
          <rect x={x + 3} y={y + 3} width={r * 2 - 6} height={r * 2 - 6} fill="#1A1A1A" />
        </g>
      ))}
      {/* QR data dots */}
      {Array.from({ length: 20 }, (_, i) => (
        <rect
          key={i}
          x={c - 8 + (i % 5) * 4}
          y={c - 8 + Math.floor(i / 5) * 4}
          width={3}
          height={3}
          fill={Math.random() > 0.4 ? '#1A1A1A' : 'white'}
        />
      ))}
      <text x={c} y={s - 2} textAnchor="middle" fontSize="6" fill="#666">{tableNumber}</text>
    </svg>
  );
}

function QRModal({ table, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="font-black text-xl mb-2">الطاولة رقم {table.number}</h3>
        <p className="text-secondary text-sm mb-6">{table.qrUrl}</p>
        <div className="border-2 border-gray-100 rounded-xl p-4 mb-6">
          <QRPlaceholder tableNumber={table.number} size={180} />
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all text-sm">
            تحميل QR
          </button>
          <button className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm">
            طباعة
          </button>
        </div>
        <button onClick={onClose} className="mt-3 text-secondary text-sm hover:text-gray-700">إغلاق</button>
      </motion.div>
    </motion.div>
  );
}

export default function TablesManagement() {
  const [tableList, setTableList] = useState(tables);
  const [selectedTable, setSelectedTable] = useState(null);

  const addTable = () => {
    const newNum = tableList.length + 1;
    setTableList(prev => [...prev, { id: newNum, number: newNum, qrUrl: `sakura.orderit.com/menu?table=${newNum}` }]);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-brand-bg font-sans" dir="rtl">
        <AdminSidebar />
        <div className="md:mr-64 min-h-screen">
          <header className="bg-white/80 backdrop-blur-sm shadow-sm px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
            <div>
              <h1 className="font-black text-xl">الطاولات ورموز QR</h1>
              <p className="text-secondary text-sm">إجمالي الطاولات: {tableList.length}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={addTable}
              className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary-dark transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              إضافة طاولة
            </motion.button>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tableList.map((table, i) => (
                <motion.div
                  key={table.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl shadow-sm p-5 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="font-black text-2xl text-primary">{table.number}</span>
                  </div>
                  <div className="mb-3">
                    <QRPlaceholder tableNumber={table.number} size={60} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedTable(table)}
                      className="flex-1 text-xs bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary-dark transition-all"
                    >
                      عرض QR
                    </button>
                    <button
                      onClick={() => setTableList(prev => prev.filter(t => t.id !== table.id))}
                      className="text-xs border border-red-100 text-red-400 py-2 px-3 rounded-lg hover:bg-red-50"
                    >
                      حذف
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedTable && <QRModal table={selectedTable} onClose={() => setSelectedTable(null)} />}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';
import { tables } from '../../data/dummyData';

import { QRCodeSVG } from 'qrcode.react';

function QRModal({ table, onClose }) {
  const handleDownload = () => {
    const svg = document.getElementById(`qr-${table.id}`);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `table-${table.number}-qr.png`;
      a.href = url;
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const svg = document.getElementById(`qr-${table.id}`);
    const svgData = new XMLSerializer().serializeToString(svg);
    printWindow.document.write(`
      <html>
        <head><title>Print QR Code - Table ${table.number}</title></head>
        <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;">
          <h1 style="font-family:sans-serif;">طاولة رقم ${table.number}</h1>
          <div style="margin: 20px;">${svgData}</div>
          <script>window.print();window.close();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

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
        <div className="border-2 border-gray-100 rounded-xl p-4 mb-6 bg-white shrink-0">
          <QRCodeSVG id={`qr-${table.id}`} value={table.qrUrl} size={180} level="M" />
        </div>
        <div className="flex gap-3">
          <button onClick={handleDownload} className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all text-sm">
            تحميل QR
          </button>
          <button onClick={handlePrint} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm">
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
                  <div className="mb-3 bg-white p-2 rounded-lg inline-block">
                    <QRCodeSVG value={table.qrUrl} size={60} level="M" />
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

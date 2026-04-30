import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/axios';

export default function LiveOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders', { params: { limit: 50 } });
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching live orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const handlePrint = (orderId) => {
    window.print();
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      // Optimistic update
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      await api.patch(`/orders/${id}/status`, { status: newStatus });
    } catch (error) {
      console.error("Error updating order status", error);
      // Revert on error could be implemented here
    }
  };

  const newOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');
  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-16 md:pb-0 font-body" dir="rtl">
        <AdminSidebar />

        <main className="md:mr-64 min-h-screen flex flex-col transition-all">
          {/* TopAppBar Integration */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-sm px-6 py-3 flex flex-row-reverse items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="relative group">
                <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO3HYy-dYZdoqtHEeeNsO2l4kkHRZO7unIp_jCT6Nm66BZ2tUVObgKx55UBSIj2azB50aiCcTLm_coacDiq2xNQnO9zu3tDtDcHfTJVx-vus-BNdWij98yY0hMjCXFcLCV5gjX7See_eAWPX1IBqb1btS4gdhIx0_5xqt7VaqlfLiOduy2Ko-YsLB76LIsPHSL-Hsgh5mDqs7fYo9APY3j_KtXV2UXvM575lMKA52ZePLecHMAJHG9zb_Mdr0ubxYXZ284LuRdwI5C" />
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-start px-8">
              <h1 className="text-2xl font-black text-primary tracking-tighter">Live Orders</h1>
            </div>
            <button className="md:hidden p-2 text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          {/* Page Content Canvas */}
          <div className="py-6 px-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full flex-grow text-right">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h1 className="text-3xl font-black text-on-surface tracking-tight mb-1">إدارة الطلبات المباشرة</h1>
                <p className="text-secondary font-medium uppercase tracking-widest text-xs">Live Order Stream • Dashboard</p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 bg-tertiary-container/10 px-4 py-2 rounded-lg text-tertiary-container font-bold border border-tertiary-container/20">
                  <span className="w-2 h-2 bg-tertiary-container rounded-full animate-pulse"></span>
                  <span>النظام متصل</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-lg text-on-surface-variant font-bold">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>14:30</span>
                </div>
              </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

              {/* Column 1: NEW */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border-r-4 border-red-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>fiber_new</span>
                    <h2 className="text-xl font-extrabold text-on-surface">جديد</h2>
                  </div>
                  <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-black">{newOrders.length} طلبات</span>
                </div>

                <AnimatePresence>
                  {newOrders.map(order => (
                    <motion.div key={order.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-transparent hover:border-red-100 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-sm font-bold tracking-tighter">طاولة #{order.table_id || '?'}</span>
                        <span className="text-xs text-secondary font-medium">الآن</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {order.items?.map((item, i) => (
                          <li key={i} className="flex justify-between items-center">
                            <span className="text-on-surface font-bold">{item.name || item.menu_item_id}</span>
                            <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-surface-container-low flex items-center justify-between mb-5">
                        <span className="text-secondary text-xs uppercase font-bold tracking-widest">الإجمالي</span>
                        <span className="text-primary font-black text-lg">{parseFloat(order.total_price || 0).toFixed(2)} ج.م</span>
                      </div>
                      <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span>قبول الطلب</span>
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Column 2: IN PREPARATION */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border-r-4 border-orange-500">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>skillet</span>
                    <h2 className="text-xl font-extrabold text-on-surface">قيد التحضير</h2>
                  </div>
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-black">{preparingOrders.length} طلب</span>
                </div>

                <AnimatePresence>
                  {preparingOrders.map(order => (
                    <motion.div key={order.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-r-2 border-orange-200 group">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-bold">طاولة #{order.table_id || '?'}</span>
                        <span className="text-xs text-secondary font-medium">في المطبخ</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {order.items?.map((item, i) => (
                          <li key={i} className="flex justify-between items-center">
                            <span className="text-on-surface font-bold">{item.name || item.menu_item_id}</span>
                            <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="relative w-full h-1 bg-surface-container-high rounded-full mb-6 overflow-hidden">
                        <div className="absolute top-0 right-0 h-full bg-orange-500 w-3/4 animate-pulse"></div>
                      </div>
                      <button onClick={() => updateOrderStatus(order.id, 'ready')} className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span>جاهز</span>
                        <span className="material-symbols-outlined text-sm">notifications_active</span>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Column 3: READY TO SERVE */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border-r-4 border-green-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                    <h2 className="text-xl font-extrabold text-on-surface">جاهز للتقديم</h2>
                  </div>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-black">{readyOrders.length} طلب</span>
                </div>

                <AnimatePresence>
                  {readyOrders.map(order => (
                    <motion.div key={order.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-r-2 border-green-200 group">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">طاولة #{order.table_id || '?'}</span>
                        <span className="text-xs text-green-600 font-black animate-pulse">ينتظر النادل</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {order.items?.map((item, i) => (
                          <li key={i} className="flex justify-between items-center">
                            <span className="text-on-surface font-bold">{item.name || item.menu_item_id}</span>
                            <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <button onClick={() => updateOrderStatus(order.id, 'completed')} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                          <span>تم التوصيل</span>
                        </button>
                        <button onClick={() => handlePrint(order.id)} className="w-12 h-12 bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant rounded-lg flex items-center justify-center active:scale-95">
                          <span className="material-symbols-outlined">print</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Background/Decorative Bento Slot */}
                {readyOrders.length === 0 && (
                  <div className="bg-neutral-100/50 border-2 border-dashed border-neutral-300 rounded-2xl h-48 flex items-center justify-center p-8 text-center group">
                    <div className="space-y-2">
                      <span className="material-symbols-outlined text-neutral-400 text-4xl group-hover:scale-110 transition-transform">drag_indicator</span>
                      <p className="text-neutral-500 text-xs font-medium">لا توجد طلبات جاهزة حالياً</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Footer Integration */}
          {/* <footer className="mt-auto w-full border-t border-neutral-200 bg-neutral-50 flex flex-col md:flex-row-reverse justify-between items-center px-8 py-12 gap-6 pb-24 md:pb-12 text-right">
            <div className="flex items-center gap-4 flex-row-reverse">
              <span className="text-lg font-black text-primary">OrderIt</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500">© 2026 OrderIt. All rights reserved.</span>
            </div>
            <div className="flex gap-8">
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Privacy Policy</a>
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Terms of Service</a>
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Help Center</a>
            </div>
          </footer> */}
        </main>
      </div>
    </PageTransition>
  );
}

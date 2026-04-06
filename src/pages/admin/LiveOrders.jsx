import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';

export default function LiveOrders() {
  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-16 md:pb-0 font-body" dir="rtl">
        <AdminSidebar />
        
        <main className="md:mr-64 min-h-screen flex flex-col transition-all">
          {/* TopAppBar Integration */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-sm px-6 py-3 flex flex-row-reverse items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="relative group">
                <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl3T0GLQuK1r7vI--E_QwqEGnmLhnmstXyj8g_Z8b6RwjIcg7GYdBUTL53ZvGRJXCV-znS0y3E3kvhrmr8-Y8ChRw-sUGfkChpsZ37EKFHB-NWXd-LV_AMP-e3frWcQhBpVorZOtS8tSDR7D8hrt6bEta7F-umaNZuUcpDd4aTSoFGlfWijVga2Vkxdf5laIueuHb0jj7i41bcD75V-oWwm44PbCsvHORuroErmqX3rI2t4gbQUBNDnkf0GNS4f0CprH0v9lW6faao" />
              </div>
              <button className="p-2 hover:bg-neutral-50 rounded-full text-neutral-600 transition-colors active:scale-95">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 hover:bg-neutral-50 rounded-full text-neutral-600 transition-colors active:scale-95">
                <span className="material-symbols-outlined">settings</span>
              </button>
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
                  <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-black">3 طلبات</span>
                </div>
                
                {/* Order Card 1 */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-transparent hover:border-red-100 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-sm font-bold tracking-tighter">طاولة #08</span>
                    <span className="text-xs text-secondary font-medium">منذ دقيقتين</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface font-bold">بيتزا مارغريتا</span>
                      <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x2</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface font-bold">سلطة سيزر</span>
                      <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x1</span>
                    </li>
                    <li className="flex justify-between items-center text-secondary-fixed-variant italic text-sm">
                      <span>* بدون بصل</span>
                    </li>
                  </ul>
                  <div className="pt-4 border-t border-surface-container-low flex items-center justify-between mb-5">
                    <span className="text-secondary text-xs uppercase font-bold tracking-widest">الإجمالي</span>
                    <span className="text-primary font-black text-lg">185.00 ر.س</span>
                  </div>
                  <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span>قبول الطلب</span>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                  </button>
                </motion.div>

                {/* Order Card 2 */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-transparent hover:border-red-100 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-sm font-bold">طاولة #12</span>
                    <span className="text-xs text-secondary font-medium">منذ 5 دقائق</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface font-bold">برجر دجاج سبايسي</span>
                      <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x3</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface font-bold">بطاطس مقلية</span>
                      <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x2</span>
                    </li>
                  </ul>
                  <div className="pt-4 border-t border-surface-container-low flex items-center justify-between mb-5">
                    <span className="text-secondary text-xs uppercase font-bold tracking-widest">الإجمالي</span>
                    <span className="text-primary font-black text-lg">142.00 ر.س</span>
                  </div>
                  <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span>قبول الطلب</span>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                  </button>
                </motion.div>
              </div>

              {/* Column 2: IN PREPARATION */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border-r-4 border-orange-500">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>skillet</span>
                    <h2 className="text-xl font-extrabold text-on-surface">قيد التحضير</h2>
                  </div>
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-black">2 طلب</span>
                </div>

                {/* Prep Card 1 */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-r-2 border-orange-200 group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-bold">طاولة #04</span>
                    <span className="text-xs text-secondary font-medium">في المطبخ: 12:40</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface font-bold">ستيك ريب آي</span>
                      <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x1</span>
                    </li>
                    <li className="flex justify-between items-center text-orange-600 text-sm font-medium">
                      <span>* درجة استواء وسط</span>
                    </li>
                  </ul>
                  <div className="relative w-full h-1 bg-surface-container-high rounded-full mb-6 overflow-hidden">
                    <div className="absolute top-0 right-0 h-full bg-orange-500 w-3/4"></div>
                  </div>
                  <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span>جاهز</span>
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                  </button>
                </motion.div>

                {/* Prep Card 2 */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-r-2 border-orange-200 group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-bold">طاولة #15</span>
                    <span className="text-xs text-secondary font-medium">في المطبخ: 08:20</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex justify-between items-center opacity-50 line-through">
                      <span className="text-on-surface font-bold">عصير برتقال</span>
                      <span className="material-symbols-outlined text-green-600 border border-green-600 rounded-full ml-2 w-4 h-4 text-[10px] flex items-center justify-center">done</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface font-bold">باستا فيتوتشيني</span>
                      <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x2</span>
                    </li>
                  </ul>
                  <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span>جاهز</span>
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                  </button>
                </motion.div>
              </div>

              {/* Column 3: READY TO SERVE */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border-r-4 border-green-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                    <h2 className="text-xl font-extrabold text-on-surface">جاهز للتقديم</h2>
                  </div>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-black">1 طلب</span>
                </div>

                {/* Ready Card */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-r-2 border-green-200 group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">طاولة #21</span>
                    <span className="text-xs text-green-600 font-black animate-pulse">ينتظر النادل</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface font-bold">تشيز كيك بالتوت</span>
                      <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x1</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-on-surface font-bold">قهوة عربية (دلة)</span>
                      <span className="bg-surface-container-low px-2 py-1 rounded text-xs">x1</span>
                    </li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                      <span>تم التوصيل</span>
                    </button>
                    <button className="w-12 h-12 bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant rounded-lg flex items-center justify-center active:scale-95">
                      <span className="material-symbols-outlined">print</span>
                    </button>
                  </div>
                </motion.div>

                {/* Background/Decorative Bento Slot */}
                <div className="bg-neutral-100/50 border-2 border-dashed border-neutral-300 rounded-2xl h-48 flex items-center justify-center p-8 text-center group">
                  <div className="space-y-2">
                    <span className="material-symbols-outlined text-neutral-400 text-4xl group-hover:scale-110 transition-transform">drag_indicator</span>
                    <p className="text-neutral-500 text-xs font-medium">اسحب الطلبات هنا لإتمامها أو لإلغائها</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Integration */}
          <footer className="mt-auto w-full border-t border-neutral-200 bg-neutral-50 flex flex-col md:flex-row-reverse justify-between items-center px-8 py-12 gap-6 pb-24 md:pb-12 text-right">
            <div className="flex items-center gap-4 flex-row-reverse">
              <span className="text-lg font-black text-primary">OrderIt</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500">© 2026 OrderIt. All rights reserved.</span>
            </div>
            <div className="flex gap-8">
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Privacy Policy</a>
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Terms of Service</a>
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Help Center</a>
            </div>
          </footer>
        </main>
      </div>
    </PageTransition>
  );
}

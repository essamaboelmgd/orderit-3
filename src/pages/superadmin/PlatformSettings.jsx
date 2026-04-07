import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar'; // Or a separate SuperAdminSidebar if needed

export default function PlatformSettings() {
  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-16 md:pb-0 font-body" dir="rtl">
        <main className="min-h-screen flex flex-col transition-all">
          <header className="sticky top-0 z-30 bg-primary backdrop-blur-xl shadow-lg px-6 py-4 flex flex-row-reverse items-center justify-between w-full text-white">
            <h1 className="text-2xl font-black tracking-tighter">إعدادات المنصة - OrderIt</h1>
            <button className="text-white bg-white/20 px-4 py-2 rounded-lg text-sm font-bold">العودة للوحةควบคุม</button>
          </header>

          <div className="py-8 px-4 md:p-8 space-y-8 max-w-4xl mx-auto w-full flex-grow text-right">
            
            <div className="mb-10">
              <h1 className="text-3xl font-black text-on-surface tracking-tight mb-2">إعدادات النظام العامة</h1>
              <p className="text-secondary font-medium text-sm">التحكم في إعدادات المنصة، الرسوم، والخصائص المتقدمة.</p>
            </div>

            <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings_suggest</span>
                إعدادات الباقات والرسوم
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-on-surface">رسوم الاشتراك الشهري (ج.م)</label>
                  <input type="number" defaultValue="299" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-on-surface">عمولة المبيعات (%)</label>
                  <input type="number" defaultValue="0" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl active:scale-95 transition-transform hover:bg-primary/90">تحديث الرسوم</button>
              </div>
            </section>

          </div>
        </main>
      </div>
    </PageTransition>
  );
}

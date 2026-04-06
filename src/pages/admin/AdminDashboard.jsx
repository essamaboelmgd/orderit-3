import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';

const recentOrders = [
  { id: '#10294', table: 'طاولة 08', items: 'برجر لحم، بطاطس مقلية، بيبسي...', total: '145 ر.س', status: 'جديد' },
  { id: '#10293', table: 'طاولة 12', items: 'بيتزا مارجريتا، سلطة سيزر...', total: '88 ر.س', status: 'قيد التحضير' },
  { id: '#10292', table: 'طاولة 03', items: 'أوزي لحم، زبادي، ماء...', total: '210 ر.س', status: 'جاهز' },
  { id: '#10291', table: 'طاولة 05', items: 'باستا فيتوشيني، تيراميسو...', total: '112 ر.س', status: 'قيد التحضير' },
];

const statusStyles = {
  'جديد': 'bg-primary-fixed text-on-primary-fixed-variant',
  'قيد التحضير': 'bg-tertiary-container text-on-tertiary-fixed',
  'جاهز': 'bg-green-100 text-green-800',
};

const times = ['منذ دقيقتين', 'منذ 10 دقائق', 'منذ 15 دقيقة', 'منذ 22 دقيقة'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-16 md:pb-0" dir="rtl">
        <AdminSidebar />
        
        <main className="md:mr-64 min-h-screen flex flex-col transition-all">
          {/* TopAppBar Integration */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-sm px-6 py-3 flex flex-row-reverse items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="relative group">
                <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO3HYy-dYZdoqtHEeeNsO2l4kkHRZO7unIp_jCT6Nm66BZ2tUVObgKx55UBSIj2azB50aiCcTLm_coacDiq2xNQnO9zu3tDtDcHfTJVx-vus-BNdWij98yY0hMjCXFcLCV5gjX7See_eAWPX1IBqb1btS4gdhIx0_5xqt7VaqlfLiOduy2Ko-YsLB76LIsPHSL-Hsgh5mDqs7fYo9APY3j_KtXV2UXvM575lMKA52ZePLecHMAJHG9zb_Mdr0ubxYXZ284LuRdwI5C" />
              </div>
              <button className="p-2 hover:bg-neutral-50 rounded-full text-neutral-600 transition-colors active:scale-95">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 hover:bg-neutral-50 rounded-full text-neutral-600 transition-colors active:scale-95">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <div className="flex-1 flex justify-center md:justify-start px-8">
              <h1 className="text-2xl font-black text-primary tracking-tighter">Dashboard</h1>
            </div>
            <button className="md:hidden p-2 text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          {/* Page Content Canvas */}
          <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full flex-grow text-right">
            
            {/* Quick Actions Banner */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => navigate('/admin/menu')} className="flex items-center justify-center gap-3 bg-primary text-white p-5 rounded-xl shadow-sm hover:opacity-90 transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">add_circle</span>
                <span className="font-bold">إضافة صنف جديد</span>
              </button>
              <button onClick={() => navigate('/admin/orders')} className="flex items-center justify-center gap-3 bg-surface-container-lowest text-on-surface p-5 rounded-xl shadow-sm hover:bg-surface-container transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">list_alt</span>
                <span className="font-bold">عرض جميع الطلبات</span>
              </button>
              <button onClick={() => navigate('/admin/tables')} className="flex items-center justify-center gap-3 bg-surface-container-lowest text-on-surface p-5 rounded-xl shadow-sm hover:bg-surface-container transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">qr_code_2</span>
                <span className="font-bold">توليد رموز QR</span>
              </button>
            </section>

            {/* Stats Bento Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl border-b-4 border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">receipt</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">اليوم</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-neutral-500 text-sm font-medium">طلبات اليوم</h3>
                  <p className="text-3xl font-black text-on-surface">128</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border-b-4 border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">payments</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">الشهر</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-neutral-500 text-sm font-medium">إجمالي الإيرادات</h3>
                  <p className="text-3xl font-black text-on-surface">4,250 <span className="text-sm font-medium text-secondary">ر.س</span></p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border-b-4 border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">chair</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">متاح</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-neutral-500 text-sm font-medium">عدد الطاولات</h3>
                  <p className="text-3xl font-black text-on-surface">24</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border-b-4 border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">star</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">الأكثر مبيعاً</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-neutral-500 text-sm font-medium">أكثر صنف مطلوب</h3>
                  <p className="text-xl font-bold text-on-surface">برجر كلاسيك</p>
                </div>
              </div>
            </section>

            {/* Recent Orders Table */}
            <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-surface-container flex items-center justify-between">
                <h2 className="text-xl font-black tracking-tight">أحدث الطلبات</h2>
                <button onClick={() => navigate('/admin/orders')} className="text-primary font-bold text-sm hover:underline">مشاهدة الكل</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-secondary text-xs uppercase tracking-widest font-bold">
                      <th className="px-6 py-4">رقم الطلب</th>
                      <th className="px-6 py-4">رقم الطاولة</th>
                      <th className="px-6 py-4">الأصناف</th>
                      <th className="px-6 py-4">الإجمالي</th>
                      <th className="px-6 py-4 text-center">الحالة</th>
                      <th className="px-6 py-4">الوقت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {recentOrders.map((o, i) => (
                      <tr key={o.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-5 font-bold text-primary">{o.id}</td>
                        <td className="px-6 py-5 font-medium">{o.table}</td>
                        <td className="px-6 py-5 text-sm text-secondary">{o.items}</td>
                        <td className="px-6 py-5 font-bold text-on-surface">{o.total}</td>
                        <td className="px-6 py-5 flex justify-center">
                          <span className={`${statusStyles[o.status]} px-3 py-1 rounded-full text-xs font-bold`}>{o.status}</span>
                        </td>
                        <td className="px-6 py-5 text-xs text-secondary">{times[i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Bottom Illustration/Brand Section */}
            <section className="relative rounded-2xl overflow-hidden h-48 group">
              <div className="absolute inset-0 bg-gradient-to-l from-primary/90 to-transparent z-10 flex items-center px-12">
                <div className="max-w-md text-white">
                  <h2 className="text-2xl font-black mb-2">ارتقِ بتجربة مطعمك</h2>
                  <p className="text-white/80 text-sm">استخدم أدوات التحليل المتقدمة لفهم سلوك عملائك وزيادة مبيعاتك.</p>
                </div>
              </div>
              <img alt="interior of a modern dimly lit restaurant" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_MiVZobAr955udMPcxmk1nKJKUSU_-jBC75YQ0XNoUziNsjlJIli4jik5Y1puHW3JCiOlTW5VoAinLxhORa97zZNOQ-QAGqbZ6XK2gTSvk6FrQXVM9DLiQFLdB7s5mZ4zzqru9aAYdlYELSRIV7Y2_KRXJmeG5Q3uTeFZMPGqOIGcfUZPXA_YHPbHibN_Im6wQaZE0Vvsv7hQFCUwz3UzvJs-aBX1sPe8WoZeJ6gkpgx15se7o2miBOs-y5E25hjbuN2vlY_G7_In" />
            </section>
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

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/axios';

export default function AdminSettings() {
  const [template, setTemplate] = useState('light');
  const [restaurant, setRestaurant] = useState({
    id: '',
    name_ar: '',
    phone: '',
    description_ar: '' // Using address_ar for description in UI if no description field exists
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const res = await api.get('/menu/restaurants');
        if (res.data && res.data.length > 0) {
          const r = res.data[0];
          setRestaurant({
            id: r.id,
            name_ar: r.name_ar || r.name_en || '',
            phone: r.phone || '',
            description_ar: r.address_ar || r.address_en || ''
          });
        }
      } catch (error) {
        console.error("Error fetching restaurant data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurantInfo();
  }, []);

  const handleSave = async () => {
    if (!restaurant.id) return;
    try {
      await api.put(`/menu/restaurants/${restaurant.id}`, {
        name_ar: restaurant.name_ar,
        name_en: restaurant.name_ar, // fallback
        phone: restaurant.phone,
        address_ar: restaurant.description_ar,
        address_en: restaurant.description_ar, // fallback
        image_path: "" // optional
      });
      alert('تم حفظ التغييرات بنجاح');
    } catch (error) {
      console.error("Error updating restaurant", error);
      alert('حدث خطأ أثناء حفظ التغييرات');
    }
  };

  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-16 md:pb-0 font-body" dir="rtl">
        <AdminSidebar />

        <main className="md:mr-64 min-h-screen flex flex-col transition-all">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-sm px-6 py-3 flex flex-row-reverse items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="relative group">
                <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl3T0GLQuK1r7vI--E_QwqEGnmLhnmstXyj8g_Z8b6RwjIcg7GYdBUTL53ZvGRJXCV-znS0y3E3kvhrmr8-Y8ChRw-sUGfkChpsZ37EKFHB-NWXd-LV_AMP-e3frWcQhBpVorZOtS8tSDR7D8hrt6bEta7F-umaNZuUcpDd4aTSoFGlfWijVga2Vkxdf5laIueuHb0jj7i41bcD75V-oWwm44PbCsvHORuroErmqX3rI2t4gbQUBNDnkf0GNS4f0CprH0v9lW6faao" />
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-start px-8">
              <h1 className="text-2xl font-black text-primary tracking-tighter">الإعدادات</h1>
            </div>
            <button className="md:hidden p-2 text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          <div className="py-6 px-4 md:p-8 space-y-8 max-w-4xl mx-auto w-full flex-grow text-right">
            
            <div className="mb-10">
              <h1 className="text-3xl font-black text-on-surface tracking-tight mb-2">إعدادات المطعم</h1>
              <p className="text-secondary font-medium text-sm">إدارة معلومات المطعم، المظهر، وإعدادات الحساب الأساسية.</p>
            </div>

            <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">storefront</span>
                المعلومات الأساسية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-on-surface">اسم المطعم</label>
                  <input value={restaurant.name_ar} onChange={e => setRestaurant({...restaurant, name_ar: e.target.value})} type="text" placeholder="اسم المطعم" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-on-surface">رقم الهاتف</label>
                  <input value={restaurant.phone} onChange={e => setRestaurant({...restaurant, phone: e.target.value})} type="tel" placeholder="0501234567" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-left" dir="ltr" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-on-surface">العنوان / الوصف</label>
                  <textarea value={restaurant.description_ar} onChange={e => setRestaurant({...restaurant, description_ar: e.target.value})} rows="3" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={handleSave} disabled={loading} className="bg-primary text-white font-bold px-8 py-3 rounded-xl active:scale-95 transition-transform hover:bg-primary/90 disabled:opacity-50">
                  {loading ? 'جاري التحميل...' : 'حفظ التغييرات'}
                </button>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">palette</span>
                مظهر المنيو (القالب)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-4 transition-all ${template === 'light' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-primary/50'}`}>
                  <input type="radio" name="template" value="light" className="hidden" checked={template === 'light'} onChange={() => setTemplate('light')} />
                  <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200"></div>
                  <span className="font-bold">القالب الفاتح (Light)</span>
                </label>
                <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-4 transition-all ${template === 'dark' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-primary/50'}`}>
                  <input type="radio" name="template" value="dark" className="hidden" checked={template === 'dark'} onChange={() => setTemplate('dark')} />
                  <div className="w-full h-32 bg-[#1A1A1A] rounded-lg border border-[#333]"></div>
                  <span className="font-bold">القالب الداكن (Dark)</span>
                </label>
              </div>
            </section>

            <section className="bg-red-50 rounded-2xl p-6 md:p-8 border border-red-200">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-red-700">
                <span className="material-symbols-outlined">warning</span>
                منطقة الخطر
              </h2>
              <p className="text-red-600 text-sm mb-6">احذر، هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى حذف جميع بيانات مطعمك.</p>
              <button className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-transform hover:bg-red-700">حذف الحساب نهائياً</button>
            </section>

          </div>
        </main>
      </div>
    </PageTransition>
  );
}

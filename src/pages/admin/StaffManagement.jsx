import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';

export default function StaffManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
              <button className="p-2 hover:bg-neutral-50 rounded-full text-neutral-600 transition-colors active:scale-95">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 hover:bg-neutral-50 rounded-full text-neutral-600 transition-colors active:scale-95">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <div className="flex-1 flex justify-center md:justify-start px-8">
              <h1 className="text-2xl font-black text-primary tracking-tighter">Staff Management</h1>
            </div>
            <button className="md:hidden p-2 text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          {/* Page Content Canvas */}
          <div className="py-6 px-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full flex-grow text-right">

            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-black text-on-surface tracking-tight mb-1">إدارة الموظفين</h1>
                <p className="text-secondary font-medium uppercase tracking-widest text-xs">Staff Board &amp; Operations</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-lg">person_add</span>
                إضافة موظف
              </button>
            </div>

            {/* Stats Bento Grid (Asymmetric) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-container p-6 rounded-xl text-white flex flex-col justify-between h-40 shadow-lg relative overflow-hidden">
                <span className="material-symbols-outlined absolute -left-4 -bottom-4 text-9xl opacity-20">groups</span>
                <p className="font-bold text-lg opacity-90">إجمالي الموظفين</p>
                <h3 className="text-5xl font-black tracking-tighter">٢٤</h3>
              </div>

              <div className="md:col-span-2 bg-surface-container-lowest p-6 rounded-xl border-none shadow-sm flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="text-secondary font-bold uppercase tracking-widest text-xs">نظرة سريعة على الوردية</h4>
                  <p className="text-2xl font-black text-on-surface">١٨ موظف نشط حالياً</p>
                  <div className="flex -space-x-2 space-x-reverse">
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Staff 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm1v-SyYj2vx-hYup2kM7Yu2Gy_4Kl0yQvqcNS6xj--y0auLmCEFwivjHeYxIRSruWsNoWP6gc_XBsKXlYL9bSpyq_PUTN5-Dwpm7r9htmPU8U01gKazGiLDISm6GN7RQzGDOJRj0mt9x2xl5_5id37EexB6PamuLP6Of9UnCCW_gIN3qYsZrjDJ_utKt_VgUHiLHcxWTMcUSZNGz1mnQG4ZqhRn8adsUtZXCzlU5GLziUFmJN1bXvklKClDfRXYBkeDoYH0cKP-eZ" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Staff 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVSvE0-kmayeUUwhFV5pFf5ucoYdgMjJZGOJRKk3K74Is-aGtx79rb3DjXkpZCcWk1phPvzhti1uRWDX86beSfJg0ucNR5afUWfsbrDk7ntLaELknbCC6K0AHehpudegLWjaoe5umHMPeVHdWqeUZ1hHPgt4oQ1YJuSo1Tx0VDqcyr_HpqE17XyIhnST-mlzLuBxywRehIjkALHeW4szKFt0-t2IW9ob6WLzzc-lqPKznDG_HsED-O56xpihX7i7fXojzaIIqXP6cQ" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Staff 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhXZuVCHLq5Mxj1MvP3DSep7wHqPRxqnGp7uUSCdfqDFkWp6W4BwDEOU8pWlwwpBUbIB2KVS-Rka_PXGBqgUZEJemXMwufTkUdBEqLCJPAUrtPMv9U6x0PjHGKE0gGuXZUHF3ZwQHi0RkgLAwM6nP5NGyDr0QWjM56W5zN3-0FvVxYH6-wQ25M_l0PVs2sWitpJZ3KdEQ8zHsOniJWE2I8gFn9UrcZe8fwBMM1gE57gINcJXt_nYXqqOcuRf3hAawDQssXoMi4G-am" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-500">+١٥</div>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">+١٢٪ اليوم</span>
                </div>
              </div>
            </div>

            {/* Staff List Table Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black tracking-tight text-on-surface">قائمة الحسابات</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-neutral-400">search</span>
                    <input className="bg-surface-container-highest border border-outline-variant/30 rounded-lg pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none w-full sm:w-64" placeholder="بحث عن موظف..." type="text" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-secondary uppercase text-xs font-black tracking-widest">
                      <th className="px-6 py-4">الموظف</th>
                      <th className="px-6 py-4">الدور</th>
                      <th className="px-6 py-4">رقم الهاتف</th>
                      <th className="px-6 py-4">تاريخ الانضمام</th>
                      <th className="px-6 py-4">الحالة</th>
                      <th className="px-6 py-4">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface">

                    {/* Row 1 */}
                    <tr className="hover:bg-neutral-50 transition-colors group border-b border-surface-container-low">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">أ م</div>
                          <div>
                            <p className="font-bold">أحمد محمد</p>
                            <p className="text-xs text-neutral-400 italic">#EMP-2034</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wider">مدير وردية</span>
                      </td>
                      <td className="px-6 py-5 font-mono text-sm" dir="ltr">050XXXXX89</td>
                      <td className="px-6 py-5 text-neutral-500 text-sm">١٢ يونيو ٢٠٢٣</td>
                      <td className="px-6 py-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-[20px] after:right-[2px]"></div>
                        </label>
                      </td>
                      <td className="px-6 py-5">
                        <button className="bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 w-max">
                          <span className="material-symbols-outlined text-sm">lock_reset</span>
                          تغيير PIN
                        </button>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-neutral-50 transition-colors group border-b border-surface-container-low">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">س ع</div>
                          <div>
                            <p className="font-bold">سارة علي</p>
                            <p className="text-xs text-neutral-400 italic">#EMP-2041</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wider">كاشير</span>
                      </td>
                      <td className="px-6 py-5 font-mono text-sm" dir="ltr">055XXXXX12</td>
                      <td className="px-6 py-5 text-neutral-500 text-sm">٠٥ أغسطس ٢٠٢٣</td>
                      <td className="px-6 py-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-[20px] after:right-[2px]"></div>
                        </label>
                      </td>
                      <td className="px-6 py-5">
                        <button className="bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 w-max">
                          <span className="material-symbols-outlined text-sm">lock_reset</span>
                          تغيير PIN
                        </button>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-neutral-50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">خ ل</div>
                          <div>
                            <p className="font-bold">خالد ليث</p>
                            <p className="text-xs text-neutral-400 italic">#EMP-2102</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wider">طاهي</span>
                      </td>
                      <td className="px-6 py-5 font-mono text-sm" dir="ltr">054XXXXX34</td>
                      <td className="px-6 py-5 text-neutral-500 text-sm">٠١ يناير ٢٠٢٤</td>
                      <td className="px-6 py-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-[20px] after:right-[2px]"></div>
                        </label>
                      </td>
                      <td className="px-6 py-5">
                        <button className="bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 w-max">
                          <span className="material-symbols-outlined text-sm">lock_reset</span>
                          تغيير PIN
                        </button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </section>

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

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            dir="rtl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-surface-container flex justify-between items-center bg-primary text-white">
                <h3 className="text-xl font-bold">إضافة موظف جديد</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-bold text-secondary">اسم الموظف</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="الاسم الكامل" type="text" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-bold text-secondary">رقم الهاتف</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none text-left" dir="ltr" placeholder="05XXXXXXXX" type="tel" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-bold text-secondary">رمز PIN (٤ أرقام)</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none text-center tracking-[1em]" maxLength="4" placeholder="••••" type="password" />
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-primary text-on-primary py-4 rounded-lg font-black text-lg shadow-lg active:scale-95 transition-transform"
                >
                  حفظ البيانات
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/axios';

function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-surface rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100">
          <h3 className="text-xl font-bold font-headline text-error">تأكيد الحذف</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">delete_forever</span>
          </div>
          <p className="text-sm font-bold text-on-surface leading-relaxed">{message}</p>
        </div>
        <div className="px-6 py-4 bg-neutral-50 flex justify-center gap-3">
          <button onClick={() => { onConfirm(); onClose(); }} className="bg-error text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition-all">حذف نهائي</button>
          <button onClick={onClose} className="bg-neutral-200 text-neutral-700 px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-neutral-300 transition-all">إلغاء</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StaffManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [form, setForm] = useState({
    owner_name: '',
    email: '',
    password: '',
    role: 'cashier'
  });
  const [editStaffId, setEditStaffId] = useState(null);
  const [deleteStaffId, setDeleteStaffId] = useState(null);

  const fetchStaff = async () => {
    try {
      const res = await api.get('/staff/');
      setStaffList(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching staff", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSaveStaff = async () => {
    try {
      if (editStaffId) {
        const payload = {
          owner_name: form.owner_name,
          email: form.email,
          role: form.role
        };
        if (form.password) payload.password = form.password; // Only update password if provided
        await api.put(`/staff/${editStaffId}`, payload);
      } else {
        await api.post('/staff/', {
          owner_name: form.owner_name,
          email: form.email,
          password: form.password
        }, {
          params: { role: form.role }
        });
      }
      setShowModal(false);
      setForm({ owner_name: '', email: '', password: '', role: 'cashier' });
      setEditStaffId(null);
      fetchStaff();
    } catch (error) {
      console.error("Error saving staff", error);
    }
  };

  const handleEditClick = (staff) => {
    setForm({
      owner_name: staff.owner_name || '',
      email: staff.email || '',
      password: '', // Blank for security, update only if filled
      role: staff.role || 'cashier'
    });
    setEditStaffId(staff.id);
    setShowModal(true);
  };

  const handleDeleteStaff = async () => {
    if (!deleteStaffId) return;
    try {
      await api.delete(`/staff/${deleteStaffId}`);
      setStaffList(prev => prev.filter(s => s.id !== deleteStaffId));
      setDeleteStaffId(null);
    } catch (error) {
      console.error("Error deleting staff", error);
    }
  };

  const handleToggleStatus = async (staff) => {
    try {
      const newStatus = staff.is_active === false ? true : false;
      await api.put(`/staff/${staff.id}`, { ...staff, is_active: newStatus });
      setStaffList(prev => prev.map(s => s.id === staff.id ? { ...s, is_active: newStatus } : s));
    } catch (error) {
      console.error("Error toggling status", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'م';
    const parts = name.split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const roleTranslations = {
    manager: 'مدير',
    cashier: 'كاشير',
    waiter: 'نادل',
    kitchen: 'طاهي'
  };

  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-16 md:pb-0 font-body" dir="rtl">
        <AdminSidebar />

        <main className="md:mr-64 min-h-screen flex flex-col transition-all">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-sm px-6 py-3 flex flex-row-reverse items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="relative group">
                <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO3HYy-dYZdoqtHEeeNsO2l4kkHRZO7unIp_jCT6Nm66BZ2tUVObgKx55UBSIj2azB50aiCcTLm_coacDiq2xNQnO9zu3tDtDcHfTJVx-vus-BNdWij98yY0hMjCXFcLCV5gjX7See_eAWPX1IBqb1btS4gdhIx0_5xqt7VaqlfLiOduy2Ko-YsLB76LIsPHSL-Hsgh5mDqs7fYo9APY3j_KtXV2UXvM575lMKA52ZePLecHMAJHG9zb_Mdr0ubxYXZ284LuRdwI5C" />
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-start px-8">
              <h1 className="text-2xl font-black text-primary tracking-tighter">Staff Management</h1>
            </div>
            <button className="md:hidden p-2 text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          <div className="py-6 px-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full flex-grow text-right">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-black text-on-surface tracking-tight mb-1">إدارة الموظفين</h1>
                <p className="text-secondary font-medium uppercase tracking-widest text-xs">Staff Board &amp; Operations</p>
              </div>
              <button
                onClick={() => {
                  setEditStaffId(null);
                  setForm({ owner_name: '', email: '', password: '', role: 'cashier' });
                  setShowModal(true);
                }}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-lg">person_add</span>
                إضافة موظف
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-container p-6 rounded-xl text-white flex flex-col justify-between h-40 shadow-lg relative overflow-hidden">
                <span className="material-symbols-outlined absolute -left-4 -bottom-4 text-9xl opacity-20">groups</span>
                <p className="font-bold text-lg opacity-90">إجمالي الموظفين</p>
                <h3 className="text-5xl font-black tracking-tighter">{loading ? '-' : staffList.length}</h3>
              </div>

              <div className="md:col-span-2 bg-surface-container-lowest p-6 rounded-xl border-none shadow-sm flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="text-secondary font-bold uppercase tracking-widest text-xs">نظرة سريعة على الوردية</h4>
                  <p className="text-2xl font-black text-on-surface">{loading ? '-' : staffList.filter(s => s.is_active !== false).length} موظف نشط حالياً</p>
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
                      <th className="px-6 py-4">البريد الإلكتروني</th>
                      <th className="px-6 py-4">الحالة</th>
                      <th className="px-6 py-4">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface">
                    {loading ? (
                      <tr><td colSpan="5" className="text-center py-8">جاري التحميل...</td></tr>
                    ) : staffList.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-8">لا يوجد موظفين</td></tr>
                    ) : (
                      staffList.map((staff) => (
                        <tr key={staff.id} className="hover:bg-neutral-50 transition-colors group border-b border-surface-container-low">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {getInitials(staff.owner_name || staff.email)}
                              </div>
                              <div>
                                <p className="font-bold">{staff.owner_name || 'موظف'}</p>
                                <p className="text-xs text-neutral-400 italic">#{staff.id?.slice(0, 8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wider">
                              {roleTranslations[staff.role] || staff.role || 'موظف'}
                            </span>
                          </td>
                          <td className="px-6 py-5 font-mono text-sm" dir="ltr">{staff.email}</td>
                          <td className="px-6 py-5">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={staff.is_active !== false} onChange={() => handleToggleStatus(staff)} />
                              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-[20px] after:right-[2px]"></div>
                            </label>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleEditClick(staff)} className="bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                تعديل
                              </button>
                              <button onClick={() => setDeleteStaffId(staff.id)} className="bg-neutral-100 text-error hover:bg-error hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">delete</span>
                                حذف
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>

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
                <h3 className="text-xl font-bold">{editStaffId ? 'تعديل بيانات الموظف' : 'إضافة موظف جديد'}</h3>
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
                  <input value={form.owner_name} onChange={e => setForm({ ...form, owner_name: e.target.value })} className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="الاسم الكامل" type="text" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-bold text-secondary">الدور</label>
                  <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none">
                    <option value="manager">مدير</option>
                    <option value="cashier">كاشير</option>
                    <option value="waiter">نادل</option>
                    <option value="kitchen">مطبخ</option>
                  </select>
                </div>
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-bold text-secondary">البريد الإلكتروني</label>
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none text-left" dir="ltr" placeholder="user@example.com" type="email" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-bold text-secondary">{editStaffId ? 'تغيير كلمة المرور (اختياري)' : 'كلمة المرور'}</label>
                  <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none text-center tracking-[0.5em]" placeholder={editStaffId ? "اتركها فارغة للاحتفاظ بالقديمة" : "••••"} type="password" />
                </div>
                <button
                  onClick={handleSaveStaff}
                  className="w-full bg-primary text-on-primary py-4 rounded-lg font-black text-lg shadow-lg active:scale-95 transition-transform"
                >
                  حفظ البيانات
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {deleteStaffId && (
          <ConfirmModal
            message="هل أنت متأكد من حذف هذا الموظف؟ لن يمكن التراجع عن هذا الإجراء."
            onConfirm={handleDeleteStaff}
            onClose={() => setDeleteStaffId(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

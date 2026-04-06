import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import Logo from '../../components/Logo';
import { superAdminRestaurants } from '../../data/dummyData';

const SuperSidebar = ({ navigate }) => {
  const links = [
    { to: '/superadmin', icon: 'dashboard', label: 'الرئيسية' },
    { to: '/superadmin/restaurants', icon: 'store', label: 'المطاعم' },
    { to: '/superadmin', icon: 'bar_chart', label: 'الإحصائيات' },
    { to: '/superadmin', icon: 'settings', label: 'الإعدادات' },
  ];
  return (
    <aside className="hidden md:flex flex-col fixed right-0 top-0 h-full w-64 bg-dark z-40">
      <div className="px-5 py-6 mb-2 border-b border-white/10">
        <Logo size="xl" />
        <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Super Admin</p>
      </div>
      <nav className="flex flex-col gap-1 flex-grow px-3">
        {links.map(l => (
          <button key={l.label} onClick={() => navigate(l.to)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/8 hover:text-white transition-all text-right w-full">
            <span className="material-symbols-outlined text-xl">{l.icon}</span>
            <span className="font-medium">{l.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default function RestaurantsList() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState(superAdminRestaurants);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = restaurants.filter(r => {
    const matchSearch = r.name.includes(search) || r.subdomain.includes(search);
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? r.active : !r.active);
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id) => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-brand-bg font-sans" dir="rtl">
        <SuperSidebar navigate={navigate} />
        <div className="md:mr-64 min-h-screen">
          <header className="bg-white/80 backdrop-blur-sm shadow-sm px-6 py-4 sticky top-0 z-30 flex items-center justify-between gap-4">
            <h1 className="font-black text-xl flex-shrink-0">إدارة المطاعم</h1>
            <div className="flex items-center gap-3 flex-1 max-w-xl">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
                <input
                  type="text"
                  placeholder="بحث بالاسم أو الرابط..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pr-9 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              >
                <option value="all">الكل</option>
                <option value="active">نشط</option>
                <option value="inactive">موقوف</option>
              </select>
            </div>
          </header>

          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-secondary text-xs uppercase tracking-wider">
                    {['#', 'المطعم', 'الرابط', 'القالب', 'تاريخ الانضمام', 'الحالة', 'إجراءات'].map(h => (
                      <th key={h} className="px-5 py-3 text-right font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((r, i) => (
                    <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-secondary font-medium">{r.id}</td>
                      <td className="px-5 py-4 font-bold">{r.name}</td>
                      <td className="px-5 py-4 text-secondary font-mono text-xs">{r.subdomain}.orderit.com</td>
                      <td className="px-5 py-4 text-secondary">{r.template}</td>
                      <td className="px-5 py-4 text-secondary">{r.joinDate}</td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleStatus(r.id)}
                          className={`w-11 h-6 rounded-full transition-colors relative ${r.active ? 'bg-green-400' : 'bg-gray-300'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${r.active ? 'left-5' : 'left-0.5'}`} />
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 font-medium">عرض</button>
                          <button
                            onClick={() => toggleStatus(r.id)}
                            className={`text-xs px-3 py-1.5 rounded-lg font-medium ${r.active ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                          >
                            {r.active ? 'تعليق' : 'تفعيل'}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-secondary">
                  <span className="material-symbols-outlined text-4xl block mb-2 text-gray-300">search</span>
                  لا توجد نتائج
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageTransition from '../../components/PageTransition';
import Logo from '../../components/Logo';
import { superAdminRestaurants, monthlySignups } from '../../data/dummyData';

function StatCard({ icon, label, value, unit = '', badge = '' }) {
  const [display, setDisplay] = useState(0);
  const target = parseInt(String(value).replace(/,/g, ''));
  useEffect(() => {
    let cur = 0;
    const step = target / 40;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setDisplay(target); clearInterval(t); }
      else setDisplay(Math.floor(cur));
    }, 20);
    return () => clearInterval(t);
  }, [target]);

  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-primary/20">
      <div className="flex justify-between items-start mb-4">
        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">{icon}</span>
        {badge && <span className="text-xs font-bold uppercase tracking-widest text-secondary">{badge}</span>}
      </div>
      <p className="text-secondary text-sm mb-1">{label}</p>
      <p className="text-3xl font-black">{display.toLocaleString('en')}{unit && <span className="text-sm font-medium text-secondary mr-1">{unit}</span>}</p>
    </motion.div>
  );
}

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
      <div className="p-4 border-t border-white/10">
        <button onClick={() => navigate('/')} className="text-white/40 text-xs hover:text-white transition-colors">
          ← الخروج
        </button>
      </div>
    </aside>
  );
};

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="min-h-screen bg-brand-bg font-sans" dir="rtl">
        <SuperSidebar navigate={navigate} />
        <div className="md:mr-64 min-h-screen">
          <header className="bg-white/80 backdrop-blur-sm shadow-sm px-6 py-4 sticky top-0 z-30">
            <h1 className="font-black text-xl">لوحة تحكم OrderIt</h1>
          </header>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon="store" label="إجمالي المطاعم" value={48} badge="الكل" />
              <StatCard icon="check_circle" label="المطاعم النشطة" value={41} badge="نشط" />
              <StatCard icon="receipt" label="طلبات اليوم" value={312} badge="اليوم" />
              <StatCard icon="payments" label="إيرادات الشهر" value={24500} unit="ج.م" badge="الشهر" />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-black text-lg mb-4">الاشتراكات الجديدة</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlySignups} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontFamily: 'Tajawal', fontSize: 12 }} />
                  <YAxis tick={{ fontFamily: 'Tajawal', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F03030" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent signups */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="font-black text-lg">آخر المنضمين</h2>
                <button onClick={() => navigate('/superadmin/restaurants')} className="text-primary font-bold text-sm hover:underline">مشاهدة الكل</button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-secondary text-xs uppercase tracking-wider">
                    {['المطعم', 'الرابط', 'القالب', 'تاريخ الانضمام', 'الحالة'].map(h => (
                      <th key={h} className="px-5 py-3 text-right font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {superAdminRestaurants.slice(0, 5).map((r, i) => (
                    <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-bold">{r.name}</td>
                      <td className="px-5 py-4 text-secondary font-mono text-xs">{r.subdomain}.orderit.com</td>
                      <td className="px-5 py-4 text-secondary">{r.template}</td>
                      <td className="px-5 py-4 text-secondary">{r.joinDate}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${r.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {r.active ? 'نشط' : 'موقوف'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const allNavItems = [
  { to: '/admin', icon: 'dashboard', label: 'الرئيسية', exact: true, roles: ['admin'] },
  { to: '/admin/menu', icon: 'restaurant_menu', label: 'المنيو', roles: ['admin'] },
  { to: '/admin/orders', icon: 'receipt_long', label: 'الطلبات', roles: ['admin', 'staff'] },
  { to: '/admin/tables', icon: 'table_restaurant', label: 'الطاولات', roles: ['admin'] },
  { to: '/admin/staff', icon: 'person', label: 'الموظفين', roles: ['admin'] },
  { to: '/admin/settings', icon: 'settings', label: 'الإعدادات', roles: ['admin'] },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = allNavItems.filter(item => item.roles.includes(user?.role || 'admin'));

  return (
    <>
      <aside className="fixed right-0 top-0 h-full flex flex-col p-4 z-40 overflow-y-auto bg-primary text-white w-64 border-l border-neutral-200 hidden md:flex">
        <div className="flex flex-col gap-1 mb-8 px-4 mt-2">
          <Logo size="lg" />
          <span className="text-xs font-medium text-white/70 uppercase tracking-widest">Premium Management</span>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                  ? 'bg-white/10 text-white active:scale-95'
                  : 'text-white/70 hover:bg-white/5 hover:translate-x-[-4px]'
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto pt-6 flex flex-col gap-2 border-t border-white/10">

          <a href="#" className="flex items-center gap-3 text-white/70 px-4 py-3 hover:bg-white/5 rounded-lg transition-all">
            <span className="material-symbols-outlined">help</span>
            <span>Support</span>
          </a>
          <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center w-full gap-3 text-white/70 px-4 py-3 hover:bg-white/5 hover:text-white rounded-lg transition-all">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-nav bg-white/80 border-t border-surface-container grid grid-cols-5 h-16 z-50">
        {navItems.slice(0, 5).map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-neutral-400'}`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

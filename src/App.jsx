import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Public pages
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import StaffLoginPage from './pages/StaffLoginPage';

// Customer pages
import MenuPage from './pages/MenuPage';
import MenuPage2 from './pages/MenuPage2';
import CartPage from './pages/CartPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManagement from './pages/admin/MenuManagement';
import TablesManagement from './pages/admin/TablesManagement';
import LiveOrders from './pages/admin/LiveOrders';
import StaffManagement from './pages/admin/StaffManagement';

// Staff page
import StaffView from './pages/StaffView';

// Super admin pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import RestaurantsList from './pages/superadmin/RestaurantsList';

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/staff-login" element={<StaffLoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu-2" element={<MenuPage2 />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<MenuManagement />} />
        <Route path="/admin/tables" element={<TablesManagement />} />
        <Route path="/admin/orders" element={<LiveOrders />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/staff" element={<StaffView />} />
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
        <Route path="/superadmin/restaurants" element={<RestaurantsList />} />
      </Routes>
    </AnimatePresence>
  );
}

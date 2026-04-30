import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';

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
import AdminSettings from './pages/admin/AdminSettings';

// Staff page
import StaffView from './pages/StaffView';

// Super admin pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import RestaurantsList from './pages/superadmin/RestaurantsList';
import PlatformSettings from './pages/superadmin/PlatformSettings';

import Navbar from './components/Navbar';

export default function App() {
  const location = useLocation();
  
  // Hide Navbar on admin, auth, and app-specific routes
  const hideNavbarPaths = ['/admin', '/superadmin', '/login', '/register', '/staff-login', '/menu', '/cart', '/order-success'];
  const shouldHideNavbar = hideNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
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
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/menu" element={<ProtectedRoute allowedRoles={['admin']}><MenuManagement /></ProtectedRoute>} />
        <Route path="/admin/tables" element={<ProtectedRoute allowedRoles={['admin']}><TablesManagement /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['admin', 'staff']}><LiveOrders /></ProtectedRoute>} />
        <Route path="/admin/staff" element={<ProtectedRoute allowedRoles={['admin']}><StaffManagement /></ProtectedRoute>} />
        <Route path="/staff" element={<Navigate to="/admin/orders" replace />} />
        <Route path="/superadmin" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminDashboard /></ProtectedRoute>} />
        <Route path="/superadmin/restaurants" element={<ProtectedRoute allowedRoles={['superadmin']}><RestaurantsList /></ProtectedRoute>} />
        <Route path="/superadmin/settings" element={<ProtectedRoute allowedRoles={['superadmin']}><PlatformSettings /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
    </>
  );
}

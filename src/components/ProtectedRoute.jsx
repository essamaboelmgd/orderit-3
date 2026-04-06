import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    if (location.pathname.startsWith('/staff')) {
      return <Navigate to="/staff-login" replace state={{ from: location }} />;
    }
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'staff') return <Navigate to="/admin/orders" replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'superadmin') return <Navigate to="/superadmin" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

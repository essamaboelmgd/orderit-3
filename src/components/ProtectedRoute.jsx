import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
      </div>
    );
  }

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

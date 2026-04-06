import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Try to load user from localStorage for persistence during dev reload
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('orderit_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('orderit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('orderit_user');
    }
  }, [user]);

  const login = (credentials) => {
    // Demo credentials map correctly based on user instructions
    if (credentials.email === 'super@orderit.com' && credentials.password === 'super123') {
      const u = { id: 'super1', name: 'SuperAdmin', role: 'superadmin', restaurantId: null, restaurantName: null };
      setUser(u);
      return { success: true, role: 'superadmin' };
    }
    if (credentials.email === 'admin@sakura.com' && credentials.password === 'admin123') {
      const u = { id: 'admin1', name: 'Sakura Manager', role: 'admin', restaurantId: 'sakura-123', restaurantName: 'Sakura' };
      setUser(u);
      return { success: true, role: 'admin' };
    }
    if (credentials.pin === '1234') {
      const u = { id: 'staff1', name: 'Staff Member', role: 'staff', restaurantId: 'sakura-123', restaurantName: 'Sakura' };
      setUser(u);
      return { success: true, role: 'staff' };
    }
    return { success: false, message: 'Invalid credentials. Please try again.' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

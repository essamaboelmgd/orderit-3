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
    // Demo credentials — phone-based login (Egyptian numbers)
    if (credentials.phone === '01000000000' && credentials.password === 'super123') {
      const u = { id: 'super1', name: 'SuperAdmin', role: 'superadmin', restaurantId: null, restaurantName: null };
      setUser(u);
      return { success: true, role: 'superadmin' };
    }
    if (credentials.phone === '01012345678' && credentials.password === 'admin123') {
      const u = { id: 'admin1', name: 'مدير الساكورا', role: 'admin', restaurantId: 'sakura-123', restaurantName: 'Sakura' };
      setUser(u);
      return { success: true, role: 'admin' };
    }
    // Fallback: also accept legacy email field passed as phone for compatibility
    if ((credentials.email === '01000000000' || credentials.phone === '01000000000') && credentials.password === 'super123') {
      const u = { id: 'super1', name: 'SuperAdmin', role: 'superadmin', restaurantId: null, restaurantName: null };
      setUser(u);
      return { success: true, role: 'superadmin' };
    }
    if ((credentials.email === '01012345678' || credentials.phone === '01012345678') && credentials.password === 'admin123') {
      const u = { id: 'admin1', name: 'مدير الساكورا', role: 'admin', restaurantId: 'sakura-123', restaurantName: 'Sakura' };
      setUser(u);
      return { success: true, role: 'admin' };
    }
    if (credentials.pin === '1234') {
      const u = { id: 'staff1', name: 'موظف المطعم', role: 'staff', restaurantId: 'sakura-123', restaurantName: 'Sakura' };
      setUser(u);
      return { success: true, role: 'staff' };
    }
    return { success: false, message: 'رقم الهاتف أو كلمة المرور غير صحيحة' };
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

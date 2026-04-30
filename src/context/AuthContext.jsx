import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    const token = Cookies.get('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Ensure token is not expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
          setLoading(false);
          return;
        }

        let role = decoded.type === 'owner' ? 'admin' : decoded.type;
        let staffType = null;
        
        if (['manager', 'cashier', 'waiter', 'kitchen'].includes(role)) {
          staffType = role;
          role = 'staff';
        }
        
        if (role === 'admin') {
          try {
            const res = await api.get(`/menu/restaurants?owner_id=${decoded.sub}`);
            const rest = res.data && res.data.length > 0 ? res.data[0] : null;
            setUser({ 
              id: decoded.sub, 
              role, 
              restaurantId: rest?.id, 
              restaurantName: rest?.name_ar || rest?.name_en 
            });
          } catch (e) {
            console.error("Failed to fetch restaurant", e);
            setUser({ id: decoded.sub, role });
          }
        } else if (role === 'staff') {
          setUser({ id: decoded.sub, role, staffType });
        } else {
          setUser({ id: decoded.sub, role });
        }
      } catch (e) {
        console.error("Invalid token", e);
        logout();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, checkAuth, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

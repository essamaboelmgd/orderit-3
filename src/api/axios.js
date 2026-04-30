import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the access token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized (Refresh token logic)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          // No refresh token, force logout
          Cookies.remove('access_token');
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        // Attempt to refresh token
        const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/refresh`, {
          refresh_token: refreshToken
        });
        
        const { access_token, refresh_token: new_refresh_token } = response.data;
        
        // Update tokens
        Cookies.set('access_token', access_token, { expires: 1 }); // 1 day
        Cookies.set('refresh_token', new_refresh_token || refreshToken, { expires: 7 }); // 7 days
        
        // Retry the original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Refresh failed, clear tokens and logout
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const result = login(form);
    if (result.success) {
      if (result.role === 'superadmin') navigate('/superadmin');
      else if (result.role === 'admin') navigate('/admin');
      else if (result.role === 'staff') navigate('/admin/orders');
    } else {
      setError(result.message);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="bg-dark px-4 py-2 rounded-full inline-block mb-4">
              <Logo size="xl" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">تسجيل دخول المطعم</h1>
            <p className="text-secondary text-sm mt-1">مرحباً بعودتك، أدخل بياناتك للمتابعة</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-bold text-center">{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="info@restaurant.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">كلمة المرور</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg mt-6 shadow-lg hover:bg-primary-dark transition-all"
          >
            دخول
          </motion.button>

          <p className="text-center text-sm text-secondary mt-6">
            ليس لديك حساب؟{' '}
            <button onClick={() => navigate('/register')} className="text-primary font-bold hover:underline">سجل الآن</button>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Use phone number instead of email per user request
  const [form, setForm] = useState({ phone: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // AuthContext currently uses 'email' in its dummy logic. Passing phone as email to leverage existing mocking.
    const result = login({ email: form.phone, password: form.password });
    
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
      <div className="bg-surface-container-low min-h-screen flex flex-col text-on-surface" dir="rtl">
        {/* TopNavBar */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(187,0,20,0.08)] flex justify-between items-center px-6 py-4 max-w-full">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-black italic tracking-tighter text-red-600 dark:text-red-500 font-sans">OrderIt</span>
            {/* Translated to Arabic */}
            <div className="hidden md:flex gap-6">
              <a className="text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm font-medium" href="#">تواصل مع الدعم</a>
              <a className="text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm font-medium" href="#">مركز المساعدة</a>
            </div>
          </div>
          {/* Removed العربية button as requested */}
        </nav>

        {/* Main Content Canvas */}
        <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
          {/* Editorial Background Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary-container/5 rounded-full blur-3xl z-0"></div>
          
          {/* Login Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md z-10"
          >
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_-4px_rgba(187,0,20,0.08)] overflow-hidden">
              {/* Branding Stripe */}
              <div className="h-2 bg-gradient-to-r from-primary to-primary-container"></div>
              
              <div className="p-8 md:p-10">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-black tracking-tight text-on-surface mb-2" style={{ letterSpacing: '-0.02em', lineHeight: '1.25' }}>تسجيل الدخول للمطاعم</h1>
                  <p className="text-secondary text-sm">مرحباً بك مجدداً في لوحة تحكم OrderIt</p>
                </div>

                {error && <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-bold text-center border border-red-200">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Phone Field instead of Email */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-on-surface-variant pr-1" htmlFor="phone">رقم الجوال</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">call</span>
                      <input 
                        className="w-full pr-12 pl-4 py-3.5 bg-surface-container-highest border-none rounded-lg focus:ring-0 focus:border-b-2 focus:border-primary transition-all text-on-surface placeholder:text-outline/50 text-left" 
                        dir="ltr"
                        id="phone" 
                        name="phone" 
                        value={form.phone}
                        onChange={e => setForm(p => ({...p, phone: e.target.value}))}
                        placeholder="05X XXX XXXX" 
                        type="tel"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-sm font-bold text-on-surface-variant" htmlFor="password">كلمة المرور</label>
                      <a className="text-xs font-bold text-primary hover:underline underline-offset-4" href="#">نسيت كلمة المرور؟</a>
                    </div>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                      <input 
                        className="w-full pr-12 pl-20 py-3.5 bg-surface-container-highest border-none rounded-lg focus:ring-0 focus:border-b-2 focus:border-primary transition-all text-on-surface placeholder:text-outline/50 text-left" 
                        dir="ltr"
                        id="password" 
                        name="password" 
                        value={form.password}
                        onChange={e => setForm(p => ({...p, password: e.target.value}))}
                        placeholder="••••••••" 
                        type={showPassword ? "text" : "password"}
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors flex items-center gap-1 bg-transparent border-0"
                      >
                        <span className="text-[10px] font-bold">{showPassword ? 'إخفاء' : 'إظهار'}</span>
                        <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center gap-3 px-1">
                    <div className="relative flex items-center">
                      <input 
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-transform active:scale-110" 
                        id="remember" 
                        name="remember" 
                        checked={form.remember}
                        onChange={e => setForm(p => ({...p, remember: e.target.checked}))}
                        type="checkbox"
                      />
                    </div>
                    <label className="text-sm font-medium text-secondary cursor-pointer" htmlFor="remember">تذكرني</label>
                  </div>

                  {/* Primary CTA */}
                  <button 
                    className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-black py-4 rounded-lg shadow-[0_8px_20px_-4px_rgba(187,0,20,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-200 flex justify-center items-center gap-2" 
                    type="submit"
                  >
                    <span>دخول</span>
                    <span className="material-symbols-outlined">login</span>
                  </button>
                </form>

                {/* Secondary CTA */}
                <div className="mt-10 pt-8 border-t border-outline-variant/15 text-center">
                  <p className="text-secondary text-sm font-medium mb-4">ليس لديك حساب؟</p>
                  <Link className="inline-flex items-center gap-2 text-primary font-black hover:gap-3 transition-all duration-200" to="/register">
                    <span>سجل مطعمك الآن</span>
                    <span className="material-symbols-outlined">arrow_back</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex justify-center items-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img className="h-8 w-auto object-contain" alt="secure payment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmKpcWMbsjH5ImDtVNERrgKOgGdzEZByoERD3esyoABpwetb0aX3yS27s78qYaNCqFz6GugpmeUgL3u0kGf9PXtEkBPVqd0FAc-MKgzosIVVKTBLwKCNC7dAZktdV-P8SbSrfqtE0hmyuXqBRY3gH0idqXnRtJcwZe_WS8ly-dzEONf5dLmarSVf5xXZ7aHhKD03qBP2tbSrcSJhxvh9rHDxnHIhsOEcx7LSHLH72ru3B0fOUJp6NaYZ0iePtB1K8C_IaOSlRwWRx3"/>
              <img className="h-8 w-auto object-contain" alt="ISO certification" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAguMMpQwX24VDIdgPNOECgMh4e5MvudxrfPEvjBdBzazDUpK4R16egxJgu4B0AGdOdbeqNVVxYX2jHg8AbOVWxKAKP4s5C0LTgnmX_MGtvrmyslRc6UZudKUKgpDhdOMzd80eyCyJwnFfW7Ur4nUH7Qj4XXNH6rEs0NbBSnCiafptc1zKhwh1fnj4BwLXChd2QxYxBoBjNDrT18iuH40T_gdi9TyK-aal5nj3gDyuNd5rniNZJOZn6BZkO4ht5y3LeWiF-c57f7BFv"/>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="w-full py-8 mt-auto bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200/15 dark:border-zinc-800/15 flex flex-col md:flex-row justify-between items-center px-8 gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-lg font-bold text-zinc-900 dark:text-white font-sans italic">OrderIt</span>
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">© 2024 OrderIt Editorial Logistics. جميع الحقوق محفوظة</span>
          </div>
          <div className="flex gap-6">
            <a className="text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-red-500 underline-offset-4 hover:underline opacity-80 hover:opacity-100 transition-opacity" href="#">سياسة الخصوصية</a>
            <a className="text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-red-500 underline-offset-4 hover:underline opacity-80 hover:opacity-100 transition-opacity" href="#">شروط الخدمة</a>
            <a className="text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-red-500 underline-offset-4 hover:underline opacity-80 hover:opacity-100 transition-opacity" href="#">توجيهات الأمان</a>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}

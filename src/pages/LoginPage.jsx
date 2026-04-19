import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ phone: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login({ phone: form.phone, password: form.password });
      setLoading(false);

      if (result.success) {
        if (result.role === 'superadmin') navigate('/superadmin');
        else if (result.role === 'admin') navigate('/admin');
        else if (result.role === 'staff') navigate('/admin/orders');
      } else {
        setError(result.message);
      }
    }, 600);
  };

  return (
    <PageTransition>
      <div className="bg-background text-on-surface min-h-screen flex flex-col antialiased" dir="rtl">

        {/* ── Navbar removed as per user request ── */}

        {/* ── Main ── */}
        <main className="flex-grow flex items-center justify-center pt-28 pb-16 px-4 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <motion.div
            className="w-full max-w-lg z-10"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Card */}
            <motion.div
              variants={fadeUp}
              className="bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/10"
            >
              {/* Top accent stripe */}
              <div className="h-1.5 bg-gradient-to-l from-primary via-primary-container to-primary" />

              <div className="p-8 md:p-10">
                {/* Header */}
                <motion.div variants={fadeUp} className="mb-10 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-5">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      storefront
                    </span>
                  </div>
                  <h1 className="text-3xl font-black tracking-tight text-on-surface mb-2">تسجيل الدخول</h1>
                  <p className="text-secondary text-sm">مرحباً بك في لوحة تحكم OrderIt</p>
                </motion.div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-bold text-center border border-red-200 flex items-center gap-3 justify-center"
                    >
                      <span className="material-symbols-outlined text-sm">error</span>
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.form variants={fadeUp} onSubmit={handleLogin} className="space-y-5">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-on-surface-variant pr-1" htmlFor="phone">
                      رقم الجوال
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-xl">
                        call
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        dir="ltr"
                        placeholder="01X XXXX XXXX"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        required
                        className="w-full pr-12 pl-4 py-3.5 bg-surface-container rounded-xl border border-outline-variant/10 focus:border-primary focus:bg-surface-container-lowest outline-none transition-all text-on-surface placeholder:text-outline/50"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-sm font-bold text-on-surface-variant" htmlFor="password">
                        كلمة المرور
                      </label>
                      <a className="text-xs font-bold text-primary hover:underline underline-offset-4" href="#">
                        نسيت كلمة المرور؟
                      </a>
                    </div>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-xl">
                        lock
                      </span>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        dir="ltr"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                        required
                        className="w-full pr-12 pl-20 py-3.5 bg-surface-container rounded-xl border border-outline-variant/10 focus:border-primary focus:bg-surface-container-lowest outline-none transition-all text-on-surface placeholder:text-outline/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors flex items-center gap-0.5"
                      >
                        <span className="text-[10px] font-bold">{showPassword ? 'إخفاء' : 'إظهار'}</span>
                        <span className="material-symbols-outlined text-base">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center gap-3 px-1">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={form.remember}
                      onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))}
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20"
                    />
                    <label className="text-sm font-medium text-secondary cursor-pointer" htmlFor="remember">
                      تذكرني
                    </label>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-on-primary font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 mt-2 disabled:opacity-70"
                    whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 16px 32px rgba(0,0,0,0.15)" }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          className="material-symbols-outlined text-xl"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        >
                          progress_activity
                        </motion.span>
                        <span>جاري التحقق...</span>
                      </>
                    ) : (
                      <>
                        <span>دخول</span>
                        <span className="material-symbols-outlined">login</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>

                {/* Footer link */}
                <motion.div variants={fadeUp} className="mt-8 pt-6 border-t border-outline-variant/10 text-center">
                  <p className="text-secondary text-sm mb-3">ليس لديك حساب؟</p>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-primary font-black hover:gap-3 transition-all duration-200"
                  >
                    <span>سجل مطعمك الآن مجاناً</span>
                    <span className="material-symbols-outlined">arrow_back</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex justify-center items-center gap-8 opacity-50 hover:opacity-100 transition-all duration-500"
            >
              <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                SSL مشفر بالكامل
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                <span className="material-symbols-outlined text-sm text-primary">lock</span>
                بيانات محمية
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                <span className="material-symbols-outlined text-sm text-primary">support_agent</span>
                دعم 24/7
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* ── Footer ── */}
        <footer className="py-6 border-t border-outline-variant/10 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-widest text-secondary">© 2026 OrderIt. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6">
              <a className="text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors" href="#">سياسة الخصوصية</a>
              <a className="text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors" href="#">شروط الخدمة</a>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}

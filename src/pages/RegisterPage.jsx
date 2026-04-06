import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Logo from '../components/Logo';

const TOTAL_STEPS = 3;

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map(s => (
        <div key={s} className={`h-2 rounded-full transition-all duration-300 ${s === current ? 'w-8 bg-primary' : s < current ? 'w-4 bg-primary' : 'w-4 bg-gray-200'}`} />
      ))}
    </div>
  );
}

function PhoneCard({ dark }) {
  return (
    <div className={`relative mx-auto w-28 h-52 rounded-2xl border-4 ${dark ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'} shadow-xl overflow-hidden`}>
      <div className={`h-full w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'} p-2 pt-5`}>
        <div className={`h-5 w-full ${dark ? 'bg-primary' : 'bg-primary'} rounded-md mb-2`} />
        {[1, 2].map(i => (
          <div key={i} className={`flex gap-1 mb-1.5 ${dark ? 'bg-gray-800' : 'bg-white'} p-1 rounded`}>
            <div className={`w-7 h-7 rounded ${dark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className="flex-1">
              <div className={`h-1 ${dark ? 'bg-gray-600' : 'bg-gray-300'} rounded mb-1`} />
              <div className={`h-1 ${dark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', owner: '', phone: '', email: '', password: '' });
  const [subdomain, setSubdomain] = useState('');
  const [subAvailable, setSubAvailable] = useState(null);
  const [template, setTemplate] = useState(1);

  const handleSubdomain = (val) => {
    setSubdomain(val);
    if (val.length > 2) {
      setTimeout(() => setSubAvailable(val !== 'sakura'), 500);
    } else {
      setSubAvailable(null);
    }
  };

  const progressWidth = `${(step / TOTAL_STEPS) * 100}%`;

  return (
    <PageTransition>
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-8">
          <div className="bg-dark px-4 py-2 rounded-full inline-block">
            <Logo size="xl" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: progressWidth }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-8">
            <StepIndicator current={step} />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-black mb-2">معلومات المطعم</h2>
                  <p className="text-secondary text-sm mb-6">الخطوة 1 من 3 — أخبرنا عن مطعمك</p>
                  <div className="space-y-4">
                    {[
                      { label: 'اسم المطعم', key: 'name', placeholder: 'ساكورا سوشي' },
                      { label: 'اسم المالك', key: 'owner', placeholder: 'أحمد محمد' },
                      { label: 'رقم الهاتف', key: 'phone', placeholder: '05XXXXXXXX' },
                      { label: 'البريد الإلكتروني', key: 'email', placeholder: 'info@restaurant.com' },
                      { label: 'كلمة المرور', key: 'password', placeholder: '••••••••', type: 'password' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-sm font-bold mb-1">{f.label}</label>
                        <input
                          type={f.type || 'text'}
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-black mb-2">اختر رابطك الخاص</h2>
                  <p className="text-secondary text-sm mb-6">الخطوة 2 من 3 — سيكون هذا رابط منيوك الرقمي</p>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary">
                    <input
                      type="text"
                      placeholder="اسمك"
                      value={subdomain}
                      onChange={e => handleSubdomain(e.target.value.toLowerCase().replace(/\s/g, ''))}
                      className="flex-1 px-4 py-3 text-sm focus:outline-none text-right"
                    />
                    <span className="bg-gray-50 px-3 py-3 text-gray-400 text-sm border-r border-gray-200 font-medium">.orderit.com</span>
                  </div>
                  {subAvailable === true && (
                    <p className="text-green-600 text-sm mt-2 font-bold">✓ الرابط متاح!</p>
                  )}
                  {subAvailable === false && (
                    <p className="text-red-500 text-sm mt-2 font-bold">✗ الرابط مستخدم، جرب اسماً آخر</p>
                  )}
                  {subdomain && (
                    <div className="mt-4 bg-brand-bg rounded-lg p-3 text-sm">
                      <span className="text-secondary">رابطك سيكون: </span>
                      <span className="font-bold text-primary">{subdomain}.orderit.com</span>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-black mb-2">اختر شكل المنيو</h2>
                  <p className="text-secondary text-sm mb-6">الخطوة 3 من 3 — يمكنك تغييره لاحقاً</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 1, label: 'كلاسيك أنيق', desc: 'خلفية داكنة', dark: true },
                      { id: 2, label: 'عصري مشرق', desc: 'خلفية بيضاء', dark: false },
                    ].map(t => (
                      <motion.button
                        key={t.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setTemplate(t.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${template === t.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <PhoneCard dark={t.dark} />
                        <p className="font-bold text-sm mt-3">{t.label}</p>
                        <p className="text-secondary text-xs">{t.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all">
                  السابق
                </button>
              )}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => step < TOTAL_STEPS ? setStep(s => s + 1) : navigate('/admin')}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-bold shadow-md hover:bg-primary-dark transition-all"
              >
                {step === TOTAL_STEPS ? 'إنهاء وابدأ الآن 🎉' : 'التالي'}
              </motion.button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-secondary text-sm">
          لديك حساب؟{' '}
          <button onClick={() => navigate('/login')} className="text-primary font-bold hover:underline">سجّل دخولك</button>
        </p>
      </div>
    </PageTransition>
  );
}

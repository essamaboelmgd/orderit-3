import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Logo from '../components/Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ─── Input helper ─── */
function Field({ label, icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-on-surface-variant pr-1">{label}</label>
      <div className="relative group">
        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-xl">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

const inputClass =
  'w-full pr-12 pl-4 py-3.5 bg-surface-container rounded-xl border border-outline-variant/10 focus:border-primary focus:bg-surface-container-lowest outline-none transition-all text-on-surface placeholder:text-outline/50';

/* ─── Step 1: Restaurant Info ─── */
function Step1({ formData, setFormData, onNext }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div key="step1" variants={stagger} initial="hidden" animate="visible" exit={{ opacity: 0, x: 30 }}>
      <motion.div variants={fadeUp} className="mb-8">
        <h2 className="text-2xl font-black text-on-surface mb-1">معلومات المطعم</h2>
        <p className="text-secondary text-sm">ابدأ رحلتك مع OrderIt بتزويدنا بالتفاصيل الأساسية.</p>
      </motion.div>

      <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-5">
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="اسم المطعم" icon="storefront">
            <input
              type="text"
              className={inputClass}
              placeholder="مثال: شاورما السلطان"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Field>
          <Field label="اسم المالك" icon="person">
            <input
              type="text"
              className={inputClass}
              placeholder="الاسم الكامل"
              value={formData.owner}
              onChange={e => setFormData({ ...formData, owner: e.target.value })}
              required
            />
          </Field>
          <Field label="رقم الهاتف" icon="call">
            <input
              type="tel"
              className={inputClass}
              placeholder="01X XXXX XXXX"
              dir="ltr"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </Field>
          <Field label="واتساب (اختياري)" icon="chat">
            <input
              type="tel"
              className={inputClass}
              placeholder="01X XXXX XXXX"
              dir="ltr"
              value={formData.whatsapp}
              onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </Field>
        </motion.div>

        {/* Password */}
        <motion.div variants={fadeUp} className="space-y-1.5">
          <label className="block text-sm font-bold text-on-surface-variant pr-1">كلمة المرور</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-xl">lock</span>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`${inputClass} pl-20`}
              placeholder="••••••••"
              dir="ltr"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
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
          <p className="text-xs text-secondary mr-1">يجب أن تحتوي على 8 أحرف على الأقل</p>
        </motion.div>

        <motion.div variants={fadeUp} className="pt-4 flex flex-col md:flex-row-reverse items-center justify-between gap-4 border-t border-outline-variant/10">
          <motion.button
            type="submit"
            className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary font-black text-base rounded-xl shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.03, boxShadow: "0 16px 32px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span>المتابعة</span>
            <span className="material-symbols-outlined">arrow_back</span>
          </motion.button>
          <p className="text-sm text-secondary">
            لديك حساب؟{' '}
            <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4">
              سجل الدخول
            </Link>
          </p>
        </motion.div>
      </form>

      {/* Feature Cards */}
      <motion.div variants={fadeUp} className="mt-10 grid grid-cols-3 gap-4">
        {[
          { icon: 'speed', title: 'إعداد سريع', desc: 'أقل من دقيقتين' },
          { icon: 'security', title: 'بيانات آمنة', desc: 'تشفير كامل' },
          { icon: 'support_agent', title: 'دعم مباشر', desc: 'فريقنا معك دائماً' },
        ].map((f, i) => (
          <div key={i} className="bg-surface-container p-4 rounded-2xl flex flex-col items-center text-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
            <p className="font-bold text-sm text-on-surface">{f.title}</p>
            <p className="text-[11px] text-secondary">{f.desc}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── Step 2: Domain ─── */
function Step2({ formData, setFormData, onNext, onPrev }) {
  const preview = formData.domain || 'your-restaurant';
  return (
    <motion.div key="step2" variants={stagger} initial="hidden" animate="visible" exit={{ opacity: 0, x: 30 }}>
      <motion.div variants={fadeUp} className="mb-8">
        <h2 className="text-2xl font-black text-on-surface mb-1">عنوان متجرك الرقمي</h2>
        <p className="text-secondary text-sm">هذا هو الرابط الذي سيستخدمه عملاؤك للوصول إلى قائمتك.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-6">
        {/* Domain Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface-variant pr-1">أدخل اسم المطعم بالإنجليزية</label>
          <div
            className="flex items-stretch bg-surface-container rounded-xl overflow-hidden border border-outline-variant/10 focus-within:border-primary transition-all"
            dir="ltr"
          >
            <input
              className="flex-1 bg-transparent border-none text-left px-5 py-4 text-lg font-bold text-primary focus:ring-0 outline-none placeholder:text-outline/40"
              placeholder="your-restaurant"
              type="text"
              value={formData.domain}
              onChange={e => setFormData({ ...formData, domain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
            />
            <div className="bg-surface-container-high px-4 flex items-center text-secondary font-medium text-sm border-l border-outline-variant/10">
              .orderit.com
            </div>
          </div>
          <AnimatePresence>
            {formData.domain.length > 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-emerald-600 font-bold pr-1"
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm">هذا العنوان متاح!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Browser Preview */}
        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/10">
          <p className="text-xs font-bold text-secondary mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">visibility</span>
            معاينة الرابط
          </p>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md border border-outline-variant/10">
            <div className="h-8 bg-surface-container flex items-center px-3 gap-1.5 border-b border-outline-variant/10" dir="ltr">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="mx-auto bg-surface rounded-full h-5 w-44 flex items-center justify-center px-2 text-[10px] text-secondary border border-outline-variant/10 overflow-hidden">
                <span className="material-symbols-outlined text-[10px] mr-1">lock</span>
                {preview}.orderit.com
              </div>
            </div>
            <div className="h-28 relative overflow-hidden">
              <img
                className="w-full h-full object-cover opacity-70"
                alt="preview"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBCsTfAZRd2n_mwp0vT31WBhOKwNJtGMl5H8a5_2hVrFxo7Qcdo0iMy_WahPJrCBJIDWjgws0SooKuO5W56XjKBm-d8cYw823hU9-tV9GAxLSsYe8W7SCt79J_sH8lHQiKmJIqfKEvHHDKSD59gmIxKhfnW22nYJTGXN7XwJSqelDGidaAIanBH1D5XuCa__fc2rU6ArHWp80AEznmmexToryD0_4s-Be4QKdTtapqeiqvZ3zBBNpB_yRtv0GqYZW3JC2xu83dvokE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 to-transparent flex items-end p-4">
                <div>
                  <div className="h-2.5 w-20 bg-primary/30 rounded mb-2" />
                  <div className="h-2 w-32 bg-outline/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: 'speed', title: 'تحميل فائق السرعة', desc: 'رابطك يعمل بسرعة البرق' },
            { icon: 'security', title: 'تشفير SSL مجاني', desc: 'حماية عالمية المستوى' },
          ].map((b, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-surface-container rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
              <div>
                <p className="font-bold text-sm">{b.title}</p>
                <p className="text-xs text-secondary leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-row-reverse items-center gap-3 pt-2">
          <motion.button
            onClick={onNext}
            disabled={formData.domain.length < 3}
            className="flex-1 bg-primary text-on-primary py-4 px-8 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: formData.domain.length < 3 ? 1 : 1.02 }}
            whileTap={{ scale: formData.domain.length < 3 ? 1 : 0.97 }}
          >
            <span>التالي</span>
            <span className="material-symbols-outlined">arrow_back</span>
          </motion.button>
          <button
            onClick={onPrev}
            className="px-6 py-4 font-bold text-secondary hover:bg-surface-container rounded-xl transition-all"
          >
            رجوع
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Step 3: Template ─── */
function Step3({ formData, setFormData, handleFinish, onPrev }) {
  return (
    <motion.div key="step3" variants={stagger} initial="hidden" animate="visible" exit={{ opacity: 0, x: 30 }}>
      <motion.div variants={fadeUp} className="mb-8">
        <h2 className="text-2xl font-black text-on-surface mb-1">اختر مظهر قائمتك</h2>
        <p className="text-secondary text-sm">خصص تجربة عملائك من خلال قالب يناسب هوية مطعمك.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Dark Template */}
        <label className="cursor-pointer group">
          <input
            type="radio"
            value="dark"
            checked={formData.template === 'dark'}
            onChange={() => setFormData({ ...formData, template: 'dark' })}
            className="hidden peer"
          />
          <div className="h-full bg-surface-container-lowest rounded-2xl p-5 border-2 border-transparent peer-checked:border-primary transition-all duration-300 shadow-sm hover:-translate-y-1 peer-checked:shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.template === 'dark' ? 'bg-primary border-primary' : 'border-outline'}`}>
                {formData.template === 'dark' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="px-2.5 py-1 bg-on-surface text-surface text-[10px] font-bold rounded-full">الأكثر فخامة</span>
            </div>
            <div className="rounded-xl bg-neutral-950 overflow-hidden aspect-[4/5] mb-4 flex items-center justify-center">
              <div className="w-[85%] h-[90%] bg-[#0a0a0a] rounded-t-2xl shadow-2xl p-3 overflow-hidden">
                <div className="w-10 h-1 bg-neutral-800 rounded-full mx-auto mb-3" />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <div className="w-14 h-1.5 bg-neutral-800 rounded" />
                    <div className="w-20 h-1 bg-neutral-800/50 rounded" />
                  </div>
                </div>
                <img className="w-full h-24 object-cover rounded-lg mb-3 opacity-80" alt="dark template" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzHvWR02Id0mFJQxJ7k5kP96B5Oa-vVixknVLNawM_iGM40ijLO1uQAssdSc8ptjFhZr_XWSEjfmVYmLLghdg_y793PtAy2YO0fBKrHosXmg4kiJpgQxW08gc-Ysc6Ig6j3RluF-kFuUOHlt24i50dn8wJonpzERGllGsj_SO0JSsMlDsFnoQOKdYsM44srUM2wWuziG17aaKHICsapMsMwpxePy5L1y3uYQb-nXwQgeArkIZneEaMPuSeeNCHv2k7O8zI1-33Tv-B" />
                <div className="space-y-2">
                  <div className="w-full h-2 bg-neutral-800 rounded" />
                  <div className="w-2/3 h-2 bg-neutral-800 rounded" />
                  <div className="w-1/3 h-3 bg-primary/20 rounded mt-1" />
                </div>
              </div>
            </div>
            <h3 className="text-base font-bold mb-1">قالب الأناقة الداكن</h3>
            <p className="text-xs text-secondary leading-relaxed">تصميم راقٍ يعتمد التباين العالي لإبراز تفاصيل أطباقك الفاخرة.</p>
          </div>
        </label>

        {/* Bright Template */}
        <label className="cursor-pointer group">
          <input
            type="radio"
            value="bright"
            checked={formData.template === 'bright'}
            onChange={() => setFormData({ ...formData, template: 'bright' })}
            className="hidden peer"
          />
          <div className="h-full bg-surface-container-lowest rounded-2xl p-5 border-2 border-transparent peer-checked:border-primary transition-all duration-300 shadow-sm hover:-translate-y-1 peer-checked:shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.template === 'bright' ? 'bg-primary border-primary' : 'border-outline'}`}>
                {formData.template === 'bright' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="px-2.5 py-1 bg-primary text-on-primary text-[10px] font-bold rounded-full">الأكثر شعبية</span>
            </div>
            <div className="rounded-xl bg-surface-container overflow-hidden aspect-[4/5] mb-4 flex items-center justify-center">
              <div className="w-[85%] h-[90%] bg-white rounded-t-2xl shadow-2xl p-3 overflow-hidden">
                <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-3" />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <div className="w-14 h-1.5 bg-neutral-200 rounded" />
                    <div className="w-20 h-1 bg-neutral-100 rounded" />
                  </div>
                </div>
                <img className="w-full h-24 object-cover rounded-lg mb-3" alt="bright template" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF4ocMTFw-nyVsADC9kJTilK-ZZns164MrYniNuuyf10aYM_OC2OxS7y4sqBymKJTAz81KGq10iPE-UU3pR1vcEVLHYEpxGU3Y97W1-7q7lwPFakaaG8LO7xfvFY_9jjNGhLViIICaP8YZrrQyzlEYp8FPktNkbrzvHGOfrb-_IoQaFUhjB1i24hxPCBKSoeGmK4BDDFdZ-PLIV_fakhtfvwGE8Es7tOOf1XiDJtdULEUU6m4VupSytPiRKYf1k_laNw9nTuDavIUZ" />
                <div className="space-y-2">
                  <div className="w-full h-2 bg-neutral-100 rounded" />
                  <div className="w-2/3 h-2 bg-neutral-100 rounded" />
                  <div className="w-1/3 h-3 bg-primary/10 rounded mt-1" />
                </div>
              </div>
            </div>
            <h3 className="text-base font-bold mb-1">قالب الحداثة المشرق</h3>
            <p className="text-xs text-secondary leading-relaxed">نظيف، عصري، وسهل التصفح. مثالي للمقاهي والمطاعم السريعة.</p>
          </div>
        </label>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3">
        <motion.button
          onClick={handleFinish}
          className="w-full max-w-sm bg-primary text-on-primary py-4 rounded-xl text-lg font-black shadow-xl flex items-center justify-center gap-3"
          whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.18)" }}
          whileTap={{ scale: 0.97 }}
        >
          <span>إنهاء وابدأ الآن</span>
          <span className="material-symbols-outlined">rocket_launch</span>
        </motion.button>
        <button
          onClick={onPrev}
          className="text-secondary font-medium hover:text-on-surface transition-colors flex items-center gap-1.5 text-sm"
        >
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
          <span>العودة للخطوة السابقة</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Step indicator ─── */
const steps = [
  { label: 'معلومات المطعم', icon: 'storefront' },
  { label: 'رابط الموقع', icon: 'language' },
  { label: 'قالب المنيو', icon: 'dashboard_customize' },
];

/* ─── Main Page ─── */
export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', owner: '', phone: '', whatsapp: '', password: '', domain: '', template: 'bright',
  });

  const nextStep = () => setStep(p => Math.min(p + 1, 3));
  const prevStep = () => setStep(p => Math.max(p - 1, 1));

  const handleFinish = () => navigate('/admin');

  const progressPct = ((step - 1) / 2) * 100;

  return (
    <PageTransition>
      <div className="bg-background text-on-surface min-h-screen flex flex-col antialiased" dir="rtl">

        {/* ── Navbar ── */}
        <motion.nav
          className="fixed top-0 w-full z-50 glass-nav shadow-sm"
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
            <Logo size="xl" lightBg />
            <div className="hidden md:flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button
                    onClick={() => setStep(i + 1)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      step === i + 1
                        ? 'bg-primary text-on-primary'
                        : step > i + 1
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm" style={step >= i + 1 ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {step > i + 1 ? 'check_circle' : s.icon}
                    </span>
                    <span>{s.label}</span>
                  </button>
                  {i < 2 && <span className="text-outline/40 text-xs">›</span>}
                </div>
              ))}
            </div>
            <Link
              to="/login"
              className="text-sm font-bold text-secondary hover:text-primary transition-colors"
            >
              لديك حساب؟ <span className="text-primary">سجل الدخول</span>
            </Link>
          </div>
        </motion.nav>

        {/* Progress bar */}
        <div className="fixed top-[65px] w-full z-40 h-1 bg-outline-variant/10">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progressPct === 0 ? 5 : progressPct}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* ── Main ── */}
        <main className="flex-grow flex items-start justify-center pt-28 pb-16 px-4 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28">
              <div className="bg-primary rounded-2xl p-6 shadow-xl relative overflow-hidden text-on-primary">
                <div className="absolute top-0 left-0 w-28 h-28 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
                <div className="relative z-10">
                  <h2 className="text-lg font-black mb-1">إعداد الحساب</h2>
                  <p className="text-sm text-white/70 mb-6">خطوة {step} من 3</p>

                  {/* Progress ring visual */}
                  <div className="w-full bg-white/10 rounded-full h-1.5 mb-6">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      animate={{ width: `${((step - 1) / 2 + 0.5 / 3) * 100}%` }}
                      transition={{ duration: 0.4 }}
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>

                  <nav className="space-y-2">
                    {steps.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setStep(i + 1)}
                        className={`w-full flex flex-row-reverse items-center justify-end gap-3 rounded-xl p-3 transition-all text-right ${
                          step === i + 1
                            ? 'bg-white/20 font-bold shadow-sm'
                            : step > i + 1
                            ? 'text-white/90 hover:bg-white/10'
                            : 'text-white/50 hover:bg-white/5'
                        }`}
                      >
                        <span className="text-sm">{s.label}</span>
                        <span
                          className="material-symbols-outlined text-xl"
                          style={step >= i + 1 ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                          {step > i + 1 ? 'check_circle' : s.icon}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Help card */}
              <div className="mt-4 bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                  <span className="font-bold text-sm">هل تحتاج مساعدة؟</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed mb-3">فريق الدعم متاح على مدار الساعة لمساعدتك في إعداد حسابك.</p>
                <a href="#" className="text-xs font-bold text-primary hover:underline underline-offset-4">تحدث معنا الآن →</a>
              </div>
            </aside>

            {/* ── Steps Content ── */}
            <section className="col-span-1 lg:col-span-9">
              {/* Mobile step header */}
              <div className="lg:hidden mb-6 bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/10 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm text-on-surface">{steps[step - 1].label}</span>
                  <span className="text-primary font-bold text-sm">{step} / 3</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Card wrapper */}
              <div className="bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/10 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-l from-primary via-primary-container to-primary" />
                <div className="p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <Step1 key="s1" formData={formData} setFormData={setFormData} onNext={nextStep} />
                    )}
                    {step === 2 && (
                      <Step2 key="s2" formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />
                    )}
                    {step === 3 && (
                      <Step3 key="s3" formData={formData} setFormData={setFormData} handleFinish={handleFinish} onPrev={prevStep} />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>
          </div>
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

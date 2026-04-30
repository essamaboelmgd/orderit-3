import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Logo from '../components/Logo';
import api from '../api/axios';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

// Animation Constants
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ─── UI Helper: Form Field ─── */
function Field({ label, icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-black text-secondary tracking-tight pr-1 uppercase lg:text-secondary/60">{label}</label>
      <div className="relative group">
        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-lg">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

const inputClass =
  'w-full pr-11 pl-4 py-3.5 bg-surface-container/30 rounded-xl border border-outline-variant/10 focus:border-primary focus:bg-white focus:shadow-md outline-none transition-all text-on-surface placeholder:text-outline/40 font-bold text-sm lg:py-4 lg:bg-white/40 lg:backdrop-blur-sm';

/* ─── Device Mockup (Multi-Template) ─── */
function DeviceMockup({ formData }) {
  const isDarkTemplate = formData.template === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 30 }}
      className="relative w-full max-w-[280px] mx-auto lg:mx-0 select-none"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div className="bg-[#080808] rounded-[2.8rem] p-2.5 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/10 relative">

          {/* Screen */}
          <div className={`${isDarkTemplate ? 'bg-[#181818]' : 'bg-white'} rounded-[2rem] aspect-[9/19] overflow-hidden flex flex-col relative transition-colors duration-500`}>

            {/* Status Bar */}
            <div className={`h-6 w-full flex justify-between items-center px-5 pt-1.5 z-30 ${isDarkTemplate ? 'text-white/40' : 'text-black/40'}`}>
              <span className="text-[8px] font-black">9:41</span>
              <div className="flex gap-1 items-center">
                <span className="material-symbols-outlined text-[8px]">signal_cellular_4_bar</span>
                <span className="material-symbols-outlined text-[8px]">battery_very_low</span>
              </div>
            </div>

            {/* Template Content */}
            <div className="flex-1 overflow-hidden flex flex-col pt-2">

              {/* Hero / Logo Section */}
              <div className="relative h-32 flex-shrink-0">
                <img src={formData.heroImage || "https://images.unsplash.com/photo-1555396273-367ea474fb73?w=500&q=80"} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-b from-black/20 ${isDarkTemplate ? 'via-[#181818]/60 to-[#181818]' : 'via-white/60 to-white'}`} />

                {/* Table Badge */}
                <div className="absolute top-2 left-3 z-10">
                  <div style={{ backgroundColor: formData.primaryColor }} className="text-white px-2.5 py-0.5 rounded-full text-[7px] font-black shadow-lg">طاولة 5</div>
                </div>

                {/* Logo Center (Bright) vs Right (Dark) */}
                <div className={`absolute z-20 ${isDarkTemplate ? '-bottom-4 right-4 flex items-center gap-2' : '-bottom-6 left-1/2 -track-x-1/2 flex flex-col items-center'}`}
                  style={!isDarkTemplate ? { transform: 'translateX(-50%)' } : {}}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-lg ${isDarkTemplate ? 'bg-[#222]' : 'bg-white'}`}>
                    {formData.logoImage ? (
                      <img src={formData.logoImage} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-primary font-black text-lg">{formData.name ? formData.name.charAt(0) : 'O'}</span>
                    )}
                  </div>
                  <div className={isDarkTemplate ? "pb-1" : "text-center"}>
                    <div className={`text-[10px] font-black ${isDarkTemplate ? 'text-white' : 'text-black'}`}>{formData.name || "اسم المطعم"}</div>
                    {isDarkTemplate && <div className="text-[7px] text-primary font-black uppercase tracking-widest mt-0.5">مطعم فاخر</div>}
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mt-8 px-4">
                <div className={`flex gap-2 overflow-hidden mb-4 ${isDarkTemplate ? 'flex-col' : 'flex-row'}`}>
                  <div style={{ backgroundColor: formData.primaryColor }} className={`px-3 py-1 rounded-full text-[8px] font-black text-white w-fit ${isDarkTemplate ? 'border-r-4 border-white/20' : ''}`}>الرئيسية</div>
                  <div className={`px-3 py-1 rounded-full text-[8px] font-bold w-fit ${isDarkTemplate ? 'text-white/20' : 'bg-gray-100 text-gray-400'}`}>المشروبات</div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className={`flex gap-3 p-2 rounded-xl ${isDarkTemplate ? 'bg-white/5 border border-white/5' : 'bg-white shadow-sm border border-gray-50'}`}>
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80&i=${i}`} className="w-full h-full object-cover opacity-60" />
                      </div>
                      <div className="flex-1 space-y-1 py-0.5 min-w-0">
                        <div className={`h-1.5 rounded-full ${isDarkTemplate ? 'bg-white/10 w-20' : 'bg-gray-200 w-16'}`} />
                        <div className={`h-1 rounded-full ${isDarkTemplate ? 'bg-white/5 w-24' : 'bg-gray-100 w-24'}`} />
                        <div style={{ color: formData.primaryColor }} className="text-[9px] font-black mt-1">95.00</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className={`mt-auto p-3 ${isDarkTemplate ? 'bg-[#111]' : 'bg-white border-t border-gray-50'}`}>
                <button style={{ backgroundColor: formData.primaryColor }} className="w-full py-2.5 rounded-lg text-[8px] font-black text-white">إتمام الطلب</button>
              </div>
            </div>

            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4.5 bg-[#080808] rounded-b-xl z-40" />
          </div>
        </div>

        {/* Shadow floor */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/10 blur-2xl rounded-full" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Steps List ─── */
function Step1({ formData, setFormData, onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <motion.div key="step1" variants={stagger} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }} className="lg:py-4">
      <div className="mb-6 lg:mb-10">
        <h2 className="text-2xl font-black text-on-surface mb-1 font-cairo tracking-tight lg:text-4xl lg:mb-4">ابدأ رحلتك</h2>
        <p className="text-secondary text-xs font-medium lg:text-base lg:text-secondary/70">خطوات بسيطة لتنضم لآلاف المطاعم الناجحة.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4 lg:space-y-6">
        <Field label="اسم المطعم (عربي)" icon="storefront">
          <input type="text" className={inputClass} placeholder="مثال: شاورما السلطان" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
        </Field>
        <Field label="اسم المطعم (انجليزي)" icon="storefront">
          <input type="text" dir="ltr" className={inputClass} placeholder="Shawarma Sultan" value={formData.nameEn} onChange={e => setFormData({ ...formData, nameEn: e.target.value })} required />
        </Field>
        <Field label="اسم المالك" icon="person">
          <input type="text" className={inputClass} placeholder="ادخل اسمك الكامل" value={formData.owner} onChange={e => setFormData({ ...formData, owner: e.target.value })} required />
        </Field>
        <Field label="البريد الإلكتروني" icon="mail">
          <input type="email" dir="ltr" className={inputClass} placeholder="user@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        </Field>
        <Field label="رقم الجوال" icon="call">
          <input type="tel" dir="ltr" className={inputClass} placeholder="01X XXXX XXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
        </Field>
        <Field label="كلمة المرور" icon="lock">
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} dir="ltr" className={`${inputClass} pl-20`} placeholder="••••••••" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required minLength={8} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary uppercase hover:bg-primary/5 px-2 py-1 rounded-md transition-colors lg:text-[11px]">
              {showPassword ? 'إخفاء' : 'إظهار'}
            </button>
          </div>
        </Field>
        <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2 mt-4 active:scale-95 transition-transform lg:py-5 lg:text-base lg:rounded-2xl lg:shadow-primary/20">
          <span>المتابعة للخطوة التالية</span>
          <span className="material-symbols-outlined text-base lg:text-xl">arrow_back</span>
        </button>
      </form>
    </motion.div>
  );
}

function Step2({ formData, setFormData, handleFinish, onPrev, loading, templatesList }) {
  const headRef = useRef(null);
  const logoRef = useRef(null);
  const handleUpload = (e, key) => {
    const f = e.target.files[0];
    if (f) setFormData(p => ({ ...p, [key]: URL.createObjectURL(f) }));
  };

  return (
    <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }} className="lg:py-4">
      <div className="mb-6 lg:mb-10 text-center lg:text-right">
        <h2 className="text-2xl font-black text-on-surface mb-1 font-cairo tracking-tight lg:text-4xl lg:mb-4">لمساتك الفنية</h2>
        <p className="text-secondary text-xs font-medium lg:text-base lg:text-secondary/70">اختر مظهر مائدة مطعمك الرقمية بلمسة واحدة.</p>
      </div>

      <div className="space-y-6 lg:space-y-8">
        {/* Template Switching */}
        <div className="grid grid-cols-2 gap-3 lg:gap-5">
          {templatesList.length > 0 ? templatesList.map((t, idx) => {
            const isDark = t.key === 'dark' || t.name?.toLowerCase().includes('dark');
            return (
              <button
                key={t.id}
                onClick={() => setFormData({ ...formData, template: t.id })}
                className={`p-3 rounded-2xl border-2 transition-all text-right lg:p-5 lg:rounded-[2rem] ${formData.template === t.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-outline-variant/10 bg-white lg:bg-white/40 hover:border-primary/20 hover:shadow-sm'}`}
              >
                <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center lg:w-12 lg:h-12 lg:rounded-2xl lg:mb-4 ${isDark ? 'bg-[#1A1A1A] text-white' : 'bg-primary/10 text-primary'}`}>
                  <span className="material-symbols-outlined text-lg lg:text-2xl">{isDark ? 'nightlight' : 'light_mode'}</span>
                </div>
                <div className="text-[11px] font-black lg:text-sm">{t.name}</div>
                <div className="text-[9px] text-secondary font-medium lg:text-[11px] line-clamp-1">{t.description || 'نمط جديد للمنيو'}</div>
              </button>
            );
          }) : (
            <div className="col-span-2 text-center text-sm text-secondary p-4 bg-surface-container rounded-xl">جاري تحميل القوالب...</div>
          )}
        </div>

        {/* Dual Images */}
        <div className="grid grid-cols-2 gap-3 lg:gap-5">
          <div onClick={() => headRef.current?.click()} className="relative h-28 rounded-2xl border-2 border-dashed border-outline-variant/20 bg-surface-container/20 flex flex-col items-center justify-center cursor-pointer overflow-hidden group lg:h-36 lg:rounded-[2rem] lg:bg-white/40 hover:bg-white transition-colors">
            {formData.heroImage && <img src={formData.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />}
            <span className="material-symbols-outlined text-xl text-secondary group-hover:text-primary lg:text-3xl">add_photo_alternate</span>
            <span className="text-[9px] font-black text-secondary mt-1 lg:text-[11px]">صورة الغلاف</span>
            <input ref={headRef} type="file" className="hidden" onChange={e => handleUpload(e, 'heroImage')} />
          </div>
          <div onClick={() => logoRef.current?.click()} className="relative h-28 rounded-2xl border-2 border-dashed border-outline-variant/20 bg-surface-container/20 flex flex-col items-center justify-center cursor-pointer overflow-hidden group lg:h-36 lg:rounded-[2rem] lg:bg-white/40 hover:bg-white transition-colors">
            {formData.logoImage ? (
              <div className="w-12 h-12 rounded-xl overflow-hidden ring-4 ring-white shadow-lg lg:w-20 lg:h-20 lg:rounded-2xl"><img src={formData.logoImage} className="w-full h-full object-cover" /></div>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl text-secondary group-hover:text-primary lg:text-3xl">account_circle</span>
                <span className="text-[9px] font-black text-secondary mt-1 lg:text-[11px]">لوجو المطعم</span>
              </>
            )}
            <input ref={logoRef} type="file" className="hidden" onChange={e => handleUpload(e, 'logoImage')} />
          </div>
        </div>

        {/* Color */}
        <div className="flex flex-wrap gap-3 lg:gap-5 justify-center lg:justify-start">
          {['#F03030', '#f59e0b', '#10b981', '#6366f1', '#1A1A1A'].map(c => (
            <button
              key={c}
              onClick={() => setFormData({ ...formData, primaryColor: c })}
              className={`w-9 h-9 rounded-xl border-4 transition-all lg:w-12 lg:h-12 lg:rounded-2xl ${formData.primaryColor === c ? 'border-primary ring-4 ring-primary/10 scale-110 shadow-lg shadow-primary/20' : 'border-white shadow-sm hover:scale-105'}`}
              style={{ backgroundColor: c }}
            >
              {formData.primaryColor === c && <span className="material-symbols-outlined text-white text-[10px] font-black lg:text-sm">check</span>}
            </button>
          ))}
          <div className="relative w-9 h-9 rounded-xl border-2 border-dashed border-outline-variant/30 flex items-center justify-center overflow-hidden lg:w-12 lg:h-12 lg:rounded-2xl group transition-colors hover:border-primary/40">
            <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" value={formData.primaryColor} onChange={e => setFormData({ ...formData, primaryColor: e.target.value })} />
            <span className="material-symbols-outlined text-sm text-primary lg:text-xl group-hover:scale-110 transition-transform">palette</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/5 lg:pt-8 lg:mt-4">
          <button disabled={loading} onClick={handleFinish} className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl font-black text-sm shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all lg:py-6 lg:text-lg lg:rounded-[2rem] hover:bg-black hover:-translate-y-1 lg:shadow-2xl disabled:opacity-70 disabled:transform-none">
            {loading ? (
              <span>جاري الإنشاء...</span>
            ) : (
              <>
                <span>إطلاق مطعمي الآن</span>
                <span className="material-symbols-outlined text-base lg:text-2xl">rocket_launch</span>
              </>
            )}
          </button>
          <button onClick={onPrev} className="text-[10px] font-black text-secondary/60 hover:text-primary text-center py-1 lg:text-xs">الرجوع لتعديل البيانات</button>
        </div>
      </div>
    </motion.div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('edit');
  const [loading, setLoading] = useState(false);
  const [templatesList, setTemplatesList] = useState([]);

  const [formData, setFormData] = useState({
    name: '', nameEn: '', owner: '', phone: '', email: '', password: '', template: '',
    primaryColor: '#F03030', heroImage: '', logoImage: ''
  });

  // Fetch Templates
  React.useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get('/templates/?only_active=true');
        if (res.data && Array.isArray(res.data)) {
          setTemplatesList(res.data);
          if (res.data.length > 0) {
            setFormData(prev => ({ ...prev, template: res.data[0].id }));
          }
        }
      } catch (error) {
        console.error("Error fetching templates", error);
      }
    };
    fetchTemplates();
  }, []);

  const nextStep = () => setStep(p => Math.min(p + 1, 2));
  const prevStep = () => setStep(p => Math.max(p - 1, 1));
  
  const handleFinish = async () => {
    setLoading(true);
    try {
      const payload = {
        owner_name: formData.owner,
        email: formData.email,
        password: formData.password,
        restaurant_name_en: formData.nameEn,
        restaurant_name_ar: formData.name,
        restaurant_phone: formData.phone,
        template_id: formData.template
      };

      const res = await api.post('/auth/register-restaurant', payload);
      const { access_token, refresh_token } = res.data;
      
      Cookies.set('access_token', access_token, { expires: 7 }); // Default to 7 days for registration
      if (refresh_token) {
        Cookies.set('refresh_token', refresh_token, { expires: 30 });
      }
      
      await checkAuth();
      navigate('/admin');
    } catch (error) {
      console.error("Registration error", error);
      alert(error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || "حدث خطأ أثناء التسجيل. يرجى التأكد من البيانات والمحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="bg-[#FBFCFD] text-on-surface min-h-screen flex flex-col antialiased font-cairo relative overflow-hidden lg:bg-[#F2F4F7]" dir="rtl">

        {/* ── Desktop Background Assets ── */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
           {/* Decorative Blobs */}
           <motion.div 
             animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" 
           />
           <motion.div 
             animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-0 -right-24 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px]" 
           />
           {/* Grid Pattern */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Compact Mobile Top Indicator */}
        <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-outline-variant/5 px-6 py-3 flex justify-between items-center text-on-surface">
          <Logo size="md" lightBg />
          <div className="flex gap-1.5 items-center">
            {[1, 2].map(i => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step === i ? 'bg-primary w-6' : 'bg-outline-variant/20 w-3'}`} />
            ))}
          </div>
        </header>

        <main className="flex-grow flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full px-4 pt-8 lg:pt-0 lg:px-12 relative z-10 lg:items-center lg:justify-center">

          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 ml-16">
            <div className="bg-[#1A1A1A] rounded-[2.5rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] text-white relative overflow-hidden group">
              {/* Subtle Internal Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
              
              <div className="mb-12 relative z-10">
                <Logo size="xl" />
                <p className="text-[11px] font-black text-white/30 tracking-widest uppercase mt-3">إنشاء هوية مطعمك</p>
              </div>

              <nav className="space-y-12 relative z-10">
                {[
                  { l: 'المعلومات', i: 'storefront', d: 'البيانات الشخصية' },
                  { l: 'التصميم', i: 'dashboard_customize', d: 'مظهر المنيو' }
                ].map((s, i) => (
                  <div key={i} className={`flex items-start gap-5 transition-all duration-700 ${step === i + 1 ? 'opacity-100 scale-105' : 'opacity-20 translate-x-2'}`}>
                    <div className="relative">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-500 ${step >= i + 1 ? 'bg-primary text-white shadow-[0_10px_20px_rgba(240,48,48,0.3)]' : 'bg-white/10'}`}>
                         {step > i + 1 ? <span className="material-symbols-outlined text-lg">check</span> : i + 1}
                       </div>
                       {/* Connecting Line */}
                       {i < 1 && (
                         <div className={`absolute top-14 right-1/2 translate-x-1/2 w-[2px] h-10 transition-colors duration-500 ${step > i + 1 ? 'bg-primary/50' : 'bg-white/5'}`} />
                       )}
                    </div>
                    <div className="pt-1.5">
                       <div className="text-sm font-black tracking-tight">{s.l}</div>
                       <div className="text-[10px] font-medium text-white/30 mt-0.5">{s.d}</div>
                    </div>
                  </div>
                ))}
              </nav>
              
              <div className="mt-16 pt-10 border-t border-white/5 relative z-10">
                 <div className="flex items-center gap-3 opacity-40">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">نظام آمن وموثوق</span>
                 </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <section className={`flex-1 flex flex-col items-center transition-all duration-700 ${mode === 'edit' ? 'opacity-100' : 'opacity-0 lg:opacity-100'} lg:max-w-xl`}>
            <div className="w-full bg-white lg:bg-white/70 lg:backdrop-blur-3xl lg:border lg:border-white/50 rounded-[2.5rem] p-8 md:p-10 lg:p-14 lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] lg:rounded-[3.5rem]">
              <AnimatePresence mode="wait">
                {step === 1 && <Step1 formData={formData} setFormData={setFormData} onNext={nextStep} />}
                {step === 2 && <Step2 formData={formData} setFormData={setFormData} handleFinish={handleFinish} onPrev={prevStep} loading={loading} templatesList={templatesList} />}
              </AnimatePresence>
            </div>
            <div className="h-24 lg:hidden" />
          </section>

          {/* Mockup */}
          <AnimatePresence>
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 100, rotate: 10 }} 
                animate={{ opacity: 1, x: 0, rotate: 0 }} 
                exit={{ opacity: 0, x: 100, rotate: 10 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`lg:w-[400px] flex-shrink-0 flex items-center justify-center lg:mr-16 ${mode === 'preview' ? 'fixed inset-0 z-[60] bg-white lg:relative lg:bg-transparent' : 'hidden lg:flex'}`}
              >
                <DeviceMockup formData={formData} />
                <button onClick={() => setMode('edit')} className="lg:hidden absolute top-8 right-8 text-on-surface"><span className="material-symbols-outlined text-3xl">close</span></button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Mobile Tab bar - only in step 2 */}
        {step === 2 && (
          <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[100]">
            <div className="bg-[#1A1A1A]/95 backdrop-blur-xl rounded-full p-1.5 shadow-2xl flex ring-1 ring-white/10">
              <button onClick={() => setMode('edit')} className={`flex-1 py-3 px-6 rounded-full text-[11px] font-black transition-all ${mode === 'edit' ? 'bg-white text-[#1A1A1A]' : 'text-white'}`}>التعديل</button>
              <button onClick={() => setMode('preview')} className={`flex-1 py-3 px-6 rounded-full text-[11px] font-black transition-all ${mode === 'preview' ? 'bg-white text-[#1A1A1A]' : 'text-white'}`}>المعاينة</button>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}

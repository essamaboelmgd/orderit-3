import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

function Step1({ formData, setFormData, onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className="bg-white rounded-xl p-8 lg:p-12 shadow-[0_12px_32px_-4px_rgba(187,0,20,0.08)] relative z-10 w-full">
      <div className="lg:hidden mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-black text-gray-900">معلومات المطعم</h1>
          <span className="text-primary font-bold">1 / 3</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{width: '33%'}}></div>
        </div>
      </div>
      <div className="mb-10 hidden lg:block">
        <h1 className="text-3xl font-black tracking-tight mb-2 text-gray-900">المعلومات الأساسية</h1>
        <p className="text-gray-500 leading-relaxed">ابدأ رحلتك مع OrderIt من خلال تزويدنا بالتفاصيل الأساسية لمطعمك.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-600 mr-1">اسم المطعم</label>
            <input type="text" className="w-full bg-gray-100/50 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-gray-400" placeholder="مثال: شاورما السلطان" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-600 mr-1">اسم المالك</label>
            <input type="text" className="w-full bg-gray-100/50 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-gray-400" placeholder="الاسم الكامل" value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-600 mr-1">رقم الهاتف</label>
            <div className="relative flex" dir="ltr">
              <span className="inline-flex items-center px-4 rounded-l-lg bg-gray-200 text-gray-600 text-sm border-r border-gray-300">+966</span>
              <input type="tel" className="w-full bg-gray-100/50 border-none rounded-r-lg p-4 focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-gray-400" placeholder="5xxxxxxxx" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-600 mr-1">البريد الإلكتروني</label>
            <input type="email" className="w-full bg-gray-100/50 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-gray-400 text-right" dir="ltr" placeholder="example@orderit.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-600 mr-1">كلمة المرور</label>
          <div className="relative group">
            <input type={showPassword ? "text" : "password"} className="w-full pl-12 bg-gray-100/50 border-none rounded-lg p-4 focus:ring-0 focus:border-b-2 focus:border-primary transition-all placeholder:text-gray-400 text-left" dir="ltr" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required minLength={8}/>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1 mr-1">يجب أن تحتوي على 8 أحرف على الأقل</p>
        </div>
        <div className="pt-8 flex flex-col md:flex-row-reverse items-center justify-between gap-6 border-t border-gray-100">
          <button type="submit" className="w-full md:w-auto px-12 py-4 bg-primary text-white font-black text-lg rounded-lg shadow-lg hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2">
            <span>المتابعة</span>
            <span className="material-symbols-outlined rotate-180 md:rotate-0">arrow_forward</span>
          </button>
          <p className="text-sm text-gray-500 text-center md:text-right">
            لديك حساب بالفعل؟ <Link to="/login" className="text-primary font-bold hover:underline">سجل الدخول هنا</Link>
          </p>
        </div>
      </form>

      {/* Decorative Feature boxes */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg"><span className="material-symbols-outlined text-primary">speed</span></div>
          <div><h3 className="font-bold text-gray-900">إعداد سريع</h3><p className="text-sm text-gray-500">أقل من دقيقتين للبدء</p></div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg"><span className="material-symbols-outlined text-primary">security</span></div>
          <div><h3 className="font-bold text-gray-900">بيانات آمنة</h3><p className="text-sm text-gray-500">تشفير كامل لمعلوماتك</p></div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg"><span className="material-symbols-outlined text-primary">support_agent</span></div>
          <div><h3 className="font-bold text-gray-900">دعم مباشر</h3><p className="text-sm text-gray-500">فريقنا معك في كل خطوة</p></div>
        </div>
      </div>
    </motion.div>
  );
}

function Step2({ formData, setFormData, onNext, onPrev }) {
  const domainPreview = formData.domain || 'your-restaurant';
  return (
    <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className="w-full relative z-10">
      <div className="bg-white rounded-xl p-8 lg:p-12 shadow-[0_12px_32px_-4px_rgba(187,0,20,0.06)] border border-gray-100">
        <div className="lg:hidden mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black text-gray-900">رابط الموقع</h1>
            <span className="text-primary font-bold">2 / 3</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{width: '66%'}}></div>
          </div>
        </div>
        <div className="text-center mb-10 hidden lg:block">
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mb-4">اختر عنوان متجرك الرقمي</h1>
          <p className="text-gray-500 text-lg">هذا هو الرابط الذي سيستخدمه عملاؤك للوصول إلى قائمة الطعام والطلب مباشرة.</p>
        </div>
        <div className="space-y-8">
          <div className="relative">
            <label className="block text-sm font-bold text-gray-500 mb-3 pr-2">أدخل اسم المطعم بالإنجليزية</label>
            <div className="flex items-stretch bg-gray-50 rounded-xl overflow-hidden focus-within:ring-2 ring-primary/20 transition-all" dir="ltr">
              <input className="flex-1 bg-transparent border-none text-left px-6 py-4 text-xl font-bold text-primary focus:ring-0 placeholder:text-gray-300" placeholder="your-restaurant" type="text" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}/>
              <div className="bg-gray-100 px-4 flex items-center text-gray-500 font-medium border-l border-gray-200">.orderit.com</div>
            </div>
            {formData.domain.length > 2 && (
              <div className="flex items-center gap-2 mt-4 text-emerald-600 font-bold pr-2">
                <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                <span className="text-sm">هذا العنوان متاح</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-6 relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-4 bg-white w-fit px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm relative z-10">
              <span className="material-symbols-outlined text-sm">visibility</span> معاينة الرابط
            </div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 relative z-10">
              <div className="h-8 bg-gray-100 flex items-center px-4 gap-1.5 border-b border-gray-200" dir="ltr">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <div className="mx-auto bg-white rounded h-5 w-48 border border-gray-200 flex items-center justify-center px-2 overflow-hidden text-center">
                  <span className="text-[10px] text-gray-500 truncate">{domainPreview}.orderit.com</span>
                </div>
              </div>
              <div className="h-32 bg-white relative">
                <img className="w-full h-full object-cover opacity-80" alt="preview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBCsTfAZRd2n_mwp0vT31WBhOKwNJtGMl5H8a5_2hVrFxo7Qcdo0iMy_WahPJrCBJIDWjgws0SooKuO5W56XjKBm-d8cYw823hU9-tV9GAxLSsYe8W7SCt79J_sH8lHQiKmJIqfKEvHHDKSD59gmIxKhfnW22nYJTGXN7XwJSqelDGidaAIanBH1D5XuCa__fc2rU6ArHWp80AEznmmexToryD0_4s-Be4QKdTtapqeiqvZ3zBBNpB_yRtv0GqYZW3JC2xu83dvokE" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent flex items-end p-4">
                  <div>
                    <div className="h-3 w-20 bg-primary/20 rounded mb-1"></div>
                    <div class="h-2 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-4 pt-4">
            <button onClick={onNext} disabled={formData.domain.length < 3} className="flex-1 max-w-[200px] bg-primary hover:bg-primary-container text-white py-4 px-8 rounded-xl font-black text-xl transition-all shadow-[0_8px_20px_-4px_rgba(187,0,20,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3">
              <span>التالي</span>
              <span className="material-symbols-outlined rotate-180 md:rotate-0">arrow_forward</span>
            </button>
            <button onClick={onPrev} className="px-8 py-4 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">رجوع</button>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">speed</span>
          <div>
            <h4 className="font-bold text-sm">سرعة تحميل فائقة</h4>
            <p className="text-xs text-gray-500 leading-relaxed">روابطنا مهيئة للعمل بسرعة البرق على جميع الأجهزة.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">security</span>
          <div>
            <h4 className="font-bold text-sm">تشفير SSL مجاني</h4>
            <p className="text-xs text-gray-500 leading-relaxed">جميع روابط OrderIt مؤمنة بشهادات حماية عالمية.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Step3({ formData, setFormData, handleFinish, onPrev }) {
  return (
    <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className="w-full relative z-10">
      <div className="lg:hidden mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-black text-gray-900">شكل المنيو</h1>
          <span className="text-primary font-bold">3 / 3</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{width: '100%'}}></div>
        </div>
      </div>
      <header className="mb-10 text-center lg:text-right hidden lg:block">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-gray-900">اختر مظهر قائمتك</h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl lg:mr-0">خصص تجربة عملائك من خلال اختيار أحد القوالب المصممة بعناية لتناسب هوية مطعمك.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Template 1: Elegant Dark */}
        <label className="group relative cursor-pointer h-full block">
          <input type="radio" value="dark" checked={formData.template === 'dark'} onChange={() => setFormData({...formData, template: 'dark'})} className="hidden peer" />
          <div className="h-full bg-white rounded-xl p-6 border-2 border-transparent peer-checked:border-primary transition-all duration-300 shadow-[0_12px_32px_-4px_rgba(187,0,20,0.08)] hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center overflow-hidden">
                <div className="hidden peer-checked:block w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">الأكثر فخامة</span>
            </div>
            <div className="relative rounded-lg bg-neutral-950 overflow-hidden aspect-[4/5] mb-6 flex items-center justify-center">
              <div className="w-[85%] h-[90%] bg-[#0a0a0a] rounded-t-2xl shadow-2xl p-4 overflow-hidden relative">
                <div className="w-12 h-1 bg-neutral-800 rounded-full mx-auto mb-4"></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <div className="w-16 h-2 bg-neutral-800 rounded"></div>
                    <div className="w-24 h-1.5 bg-neutral-800/50 rounded"></div>
                  </div>
                </div>
                <img className="w-full h-32 object-cover rounded-lg mb-4 opacity-80" alt="dark template" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzHvWR02Id0mFJQxJ7k5kP96B5Oa-vVixknVLNawM_iGM40ijLO1uQAssdSc8ptjFhZr_XWSEjfmVYmLLghdg_y793PtAy2YO0fBKrHosXmg4kiJpgQxW08gc-Ysc6Ig6j3RluF-kFuUOHlt24i50dn8wJonpzERGllGsj_SO0JSsMlDsFnoQOKdYsM44srUM2wWuziG17aaKHICsapMsMwpxePy5L1y3uYQb-nXwQgeArkIZneEaMPuSeeNCHv2k7O8zI1-33Tv-B" />
                <div className="space-y-2">
                  <div className="w-full h-3 bg-neutral-800 rounded"></div>
                  <div className="w-2/3 h-3 bg-neutral-800 rounded"></div>
                  <div className="w-1/3 h-4 bg-primary/20 rounded mt-2"></div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">قالب الأناقة الداكن</h3>
            <p className="text-sm text-gray-500">تصميم راقٍ يعتمد على التباين العالي لإبراز تفاصيل أطباقك الفاخرة.</p>
          </div>
        </label>
        
        {/* Template 2: Modern Bright */}
        <label className="group relative cursor-pointer h-full block">
          <input type="radio" value="bright" checked={formData.template === 'bright'} onChange={() => setFormData({...formData, template: 'bright'})} className="hidden peer" />
          <div className="h-full bg-white rounded-xl p-6 border-2 border-transparent peer-checked:border-primary transition-all duration-300 shadow-[0_12px_32px_-4px_rgba(187,0,20,0.08)] hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center overflow-hidden">
                <div className="hidden peer-checked:block w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">الأكثر شعبية</span>
            </div>
            <div className="relative rounded-lg bg-gray-100 overflow-hidden aspect-[4/5] mb-6 flex items-center justify-center">
              <div className="w-[85%] h-[90%] bg-white rounded-t-2xl shadow-2xl p-4 overflow-hidden relative">
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <div className="w-16 h-2 bg-gray-200 rounded"></div>
                    <div className="w-24 h-1.5 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <img className="w-full h-32 object-cover rounded-lg mb-4" alt="bright template" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF4ocMTFw-nyVsADC9kJTilK-ZZns164MrYniNuuyf10aYM_OC2OxS7y4sqBymKJTAz81KGq10iPE-UU3pR1vcEVLHYEpxGU3Y97W1-7q7lwPFakaaG8LO7xfvFY_9jjNGhLViIICaP8YZrrQyzlEYp8FPktNkbrzvHGOfrb-_IoQaFUhjB1i24hxPCBKSoeGmK4BDDFdZ-PLIV_fakhtfvwGE8Es7tOOf1XiDJtdULEUU6m4VupSytPiRKYf1k_laNw9nTuDavIUZ" />
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-100 rounded"></div>
                  <div className="w-2/3 h-3 bg-gray-100 rounded"></div>
                  <div className="w-1/3 h-4 bg-primary/10 rounded mt-2"></div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">قالب الحداثة المشرق</h3>
            <p className="text-sm text-gray-500">نظيف، عصري، وسهل التصفح. الخيار المثالي للمطاعم السريعة والمقاهي العصرية.</p>
          </div>
        </label>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4">
        <button onClick={handleFinish} className="w-full max-w-md bg-primary hover:bg-primary-container text-white py-5 rounded-xl text-xl font-black transition-all shadow-[0_8px_20px_-4px_rgba(187,0,20,0.3)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
          <span>إنهاء وابدأ</span>
          <span className="material-symbols-outlined">rocket_launch</span>
        </button>
        <button onClick={onPrev} className="text-gray-500 font-medium hover:text-gray-900 transition-colors flex items-center gap-2">
          <span>العودة للخطوة السابقة</span>
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', owner: '', phone: '', email: '', password: '', domain: '', template: 'bright'
  });

  const nextStep = () => setStep(p => Math.min(p + 1, 3));
  const prevStep = () => setStep(p => Math.max(p - 1, 1));

  const handleFinish = (e) => {
    e?.preventDefault();
    navigate('/admin');
  };

  return (
    <PageTransition>
      <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col font-tajawal overflow-hidden" dir="rtl">
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl h-16 flex items-center px-6 justify-between shadow-[0_12px_32px_-4px_rgba(187,0,20,0.08)]">
          <div className="text-2xl font-black tracking-tighter text-primary italic font-sans">OrderIt</div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-colors">help</button>
            <button className="material-symbols-outlined text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-colors">language</button>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4" style={{ background: 'linear-gradient(135deg, #fcf9f8 0%, #f6f3f2 100%)' }}>
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Floating */}
            <aside className="hidden lg:flex lg:col-span-4 xl:col-span-3 flex-col gap-4 sticky top-24 z-20">
              <div className="bg-primary text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <h2 className="text-xl font-black mb-2 leading-tight relative z-10">إعداد الحساب</h2>
                <p className="text-sm opacity-80 mb-6 relative z-10">خطوات التسجيل</p>
                <nav className="space-y-4 relative z-10">
                  <div className={`flex flex-row-reverse items-center justify-end gap-3 rounded-lg p-3 transition-all cursor-pointer ${step === 1 ? 'bg-white/20 font-bold shadow-sm backdrop-blur-md' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setStep(1)}>
                    <span className="text-sm font-bold">معلومات المطعم</span>
                    <span className="material-symbols-outlined" style={step === 1 ? {fontVariationSettings: "'FILL' 1"} : {}}>storefront</span>
                  </div>
                  <div className={`flex flex-row-reverse items-center justify-end gap-3 rounded-lg p-3 transition-all cursor-pointer ${step === 2 ? 'bg-white/20 font-bold shadow-sm backdrop-blur-md' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setStep(2)}>
                    <span className="text-sm font-bold">رابط الموقع</span>
                    <span className="material-symbols-outlined" style={step === 2 ? {fontVariationSettings: "'FILL' 1"} : {}}>language</span>
                  </div>
                  <div className={`flex flex-row-reverse items-center justify-end gap-3 rounded-lg p-3 transition-all cursor-pointer ${step === 3 ? 'bg-white/20 font-bold shadow-sm backdrop-blur-md' : 'text-white/70 hover:bg-white/10'}`} onClick={() => setStep(3)}>
                    <span className="text-sm font-bold">قالب المنيو</span>
                    <span className="material-symbols-outlined" style={step === 3 ? {fontVariationSettings: "'FILL' 1"} : {}}>dashboard_customize</span>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <section className="col-span-1 lg:col-span-8 xl:col-span-9 w-full relative">
               <AnimatePresence mode="wait">
                 {step === 1 && <Step1 key="step1" formData={formData} setFormData={setFormData} onNext={nextStep} />}
                 {step === 2 && <Step2 key="step2" formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />}
                 {step === 3 && <Step3 key="step3" formData={formData} setFormData={setFormData} handleFinish={handleFinish} onPrev={prevStep} />}
               </AnimatePresence>
            </section>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}

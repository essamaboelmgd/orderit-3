import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import PageTransition from "../components/PageTransition";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="bg-background text-on-surface antialiased overflow-x-hidden min-h-screen" dir="rtl">
        {/* TopNavBar */}
        <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm">
          <div className="flex flex-row-reverse items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Logo size="xl" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a className="text-primary font-bold border-b-2 border-primary pb-1" href="#home">الرئيسية</a>
              <a className="text-neutral-600 hover:text-primary transition-colors" href="#how">كيف يعمل</a>
              <a className="text-neutral-600 hover:text-primary transition-colors" href="#restaurants">للمطاعم</a>
              <a className="text-neutral-600 hover:text-primary transition-colors" href="#features">المميزات</a>
              <a className="text-neutral-600 hover:text-primary transition-colors" href="#contact">تواصل معنا</a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/register')}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold shadow-lg hover:bg-primary-container transition-all active:scale-95"
              >
                ابدأ مجاناً
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <h1 className="text-5xl md:text-7xl font-black text-on-surface leading-tight mb-6">
                اجعل تجربة الطلب في مطعمك <span className="text-primary">لا تُنسى</span>
              </h1>
              <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10 max-w-lg">
                حول قائمتك الورقية إلى تجربة رقمية تفاعلية. نظام متكامل لإدارة الطلبات، الطاولات، وتحليل المبيعات بكل سهولة واحترافية.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-primary text-on-primary px-8 py-4 rounded-lg text-lg font-bold shadow-xl hover:translate-y-[-2px] transition-all"
                >
                  ابدأ الآن مجاناً
                </button>
                <button
                  onClick={() => navigate('/menu')}
                  className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-8 py-4 rounded-lg text-lg font-bold shadow-sm border border-outline-variant/10 hover:bg-surface-container-low transition-all"
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  شاهد كيف يعمل
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 bg-surface-container-lowest p-4 rounded-[2.5rem] shadow-2xl border border-outline-variant/5 transform md:rotate-3">
                <img alt="OrderIt App Interface" className="rounded-[2rem] w-full shadow-inner" data-alt="Sleek smartphone mockup displaying a high-end digital restaurant menu with appetizing food photography and red UI accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoyBAPP5k2h1FH-TR5sqvEzq-11bzCC3OYDk8fDdD_ihCkBFSq3wwGJvuajIKJuN5sz5lOHUglnVKoIOOFKivuX8aIvK1JMjSz4uh68j3pBv520RAnFwqF3jPpAeTKaHp5fOX0LV0bcdwoJcvOHmSlUlgMW1BsWhCkTiRQ8jzQ-ml-_CBwQ5gyR4FKuWr7D-vF8-uR8yG8vK_VQtvdkyacaV7qM5vAAljQ9-k31rKIHsXTQTz2Fu5x7d_Cj5c5f4A8B7lskHiDp47O" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-outline-variant/10 hidden lg:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-tertiary-container rounded-full"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">طلب جديد</span>
                </div>
                <p className="font-bold text-lg">بيتزا مارجريتا × 2</p>
                <p className="text-primary font-black">95.00 ر.س</p>
              </div>
            </div>
          </div>
        </header>

        {/* Infinite Marquee Section */}
        <section className="bg-gradient-to-r from-surface-container-low via-white to-surface-container-low py-10 overflow-hidden border-y border-outline-variant/5">
          <div className="max-w-7xl mx-auto px-6 text-center mb-6">
            <h2 className="text-xs font-bold text-neutral-400 tracking-widest uppercase">شركاء النجاح</h2>
          </div>
          <div className="relative flex whitespace-nowrap" dir="ltr">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              className="flex gap-16 min-w-max pr-16"
            >
              {[...Array(4)].map((_, blockIdx) => (
                <div key={blockIdx} className="flex gap-16 items-center">
                  {["البيك", "ماكدونالدز", "كودو", "هرفي", "الطازج", "الرومانسية", "شاورمر", "برجر كنج", "دومينوز", "بيتزا هت", "صب واي", "جان برجر", "ستيك هاوس"].map((name, idx) => (
                    <span key={idx} className="text-2xl md:text-3xl font-black text-neutral-300 hover:text-primary transition-colors cursor-default select-none flex-shrink-0">
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">خطوات بسيطة</h2>
            <p className="text-4xl font-bold text-on-surface">كيف يعمل OrderIt؟</p>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mb-6 transform rotate-3">
                <span className="material-symbols-outlined text-4xl" data-weight="fill">qr_code_2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">1. أنشئ الـ QR الخاص بك</h3>
              <p className="text-secondary leading-relaxed">قم برفع قائمة طعامك وتخصيص تصميم الـ QR ليتناسب مع هوية مطعمك.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mb-6 transform -rotate-3">
                <span className="material-symbols-outlined text-4xl" data-weight="fill">touch_app</span>
              </div>
              <h3 className="text-xl font-bold mb-3">2. العميل يطلب مباشرة</h3>
              <p className="text-secondary leading-relaxed">يمسح العميل الكود، يتصفح الصور، ويطلب ويدفع من هاتفه دون انتظار النادل.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mb-6 transform rotate-6">
                <span className="material-symbols-outlined text-4xl" data-weight="fill">check_circle</span>
              </div>
              <h3 className="text-xl font-bold mb-3">3. ابدأ التحضير فوراً</h3>
              <p className="text-secondary leading-relaxed">تصلك الطلبات مباشرة إلى المطبخ أو لوحة التحكم لتبدأ العمل بذكاء وسرعة.</p>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-4xl font-black text-on-surface mb-4">مميزات صُممت لنمو مطعمك</h2>
              <div className="w-24 h-1.5 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Feature */}
              <div className="md:col-span-2 bg-primary p-8 rounded-3xl text-on-primary relative overflow-hidden flex flex-col justify-between h-[400px]">
                <div className="z-10">
                  <h3 className="text-3xl font-bold mb-4">لوحة تحكم ذكية وشاملة</h3>
                  <p className="text-on-primary/80 max-w-md leading-relaxed text-lg">راقب مبيعاتك، أداء الموظفين، وأكثر الوجبات طلباً في لحظات. بيانات حقيقية لاتخاذ قرارات أفضل.</p>
                </div>
                <div className="z-10 mt-auto">
                  <button onClick={() => navigate('/admin')} className="bg-surface-container-lowest text-primary px-6 py-3 rounded-xl font-bold">اكتشف المزيد</button>
                </div>
                <div className="absolute bottom-[-10%] left-[-5%] w-2/3 opacity-30 transform -rotate-6">
                  <img alt="Dashboard Preview" className="rounded-xl shadow-2xl" data-alt="A clean data dashboard showing colorful charts and restaurant sales metrics on a white tablet surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5ah4PkoVyRUhL0rKTe55f6GiQqphLNp5P4qOPN5YgTRvVThiqlzyZLeS45W3hhtYZaugiKWKLZ0zH4qkNMDRZC0GBXfA_j54ocuV9j9kDeJiKO2vLFeyrk8HFe4zyiwX3gnf_AUJwO381mddUDKxueAK-8_7TKwDPWr_1rR40_FVD7QXUkguotViRIbCBr55WLhod3QuY_PviK8fxnqea0O0kqGzOtPbg-oZmYrfQbUjprl_csvAJyjiPF9ef-Z24l_VUaMqf_C4N" />
                </div>
              </div>
              {/* Secondary Features */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/5 shadow-sm">
                <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <h3 className="text-xl font-bold mb-3">دفع إلكتروني آمن</h3>
                <p className="text-secondary leading-relaxed">دعم كامل لـ Apple Pay، مدى، والبطاقات الائتمانية لتسهيل عملية الدفع.</p>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/5 shadow-sm">
                <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined">language</span>
                </div>
                <h3 className="text-xl font-bold mb-3">متعدد اللغات</h3>
                <p className="text-secondary leading-relaxed">قائمة طعام تترجم نفسها تلقائياً لتناسب جميع زوار مطعمك من كل أنحاء العالم.</p>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/5 shadow-sm">
                <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">إدارة المخزون</h3>
                <p className="text-secondary leading-relaxed">تنبيهات فورية عند اقتراب نفاذ أي صنف، لضمان استمرارية الخدمة دون انقطاع.</p>
              </div>
              <div className="bg-tertiary p-8 rounded-3xl text-on-tertiary">
                <div className="w-12 h-12 bg-tertiary-container rounded-xl flex items-center justify-center text-on-tertiary-container mb-6">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <h3 className="text-xl font-bold mb-3">دعم فني 24/7</h3>
                <p className="text-on-tertiary/80 leading-relaxed">نحن معك في كل خطوة. فريق دعم متخصص جاهز للرد على استفساراتك في أي وقت.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Preview */}
        <section id="restaurants" className="py-24 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-on-surface mb-6">قوالب تناسب <span className="text-primary">فخامة</span> مطعمك</h2>
              <p className="text-lg text-secondary leading-relaxed mb-8">اختر من بين عشرات القوالب المصممة بعناية فائقة لتبرز جمال أطباقك. يمكنك تخصيص الألوان، الخطوط، وتوزيع الصور بنقرة واحدة.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="font-bold">تصميم متجاوب بالكامل مع الهواتف</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="font-bold">تحميل سريع للصور (Lazy Loading)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="font-bold">أيقونات مخصصة لمكونات الأطباق</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 transform rotate-3 scale-110">
              <div className="space-y-4">
                <img alt="Luxury Template" className="rounded-2xl shadow-xl" data-alt="High-end restaurant menu interface on a phone screen showing fine dining dishes with elegant serif typography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWeq_V2mD3EQz1bhzye5CJF5Pd3RQLALrULn24GP6XG6S6hgBR_JZKMfYYRFm4mVvtuLJpHXOYAw3vzTzU7M1d1omPRSY0kmvmbYxeAEi1bODFIctNu0JPwapWIEbPGN_jjhVVINJDHy1f263gwyCWzie-RaBk0UmS4E6Ju6PAQfXUoDIB406BR8oXpOroO-8hq1B7KuOg_vTLB23d8TttH1B9PsWXFs4Sq-x_Aa8CjnI1jkSnCl79Slc9AomtbCgB-rA3gBwRUYsZ" />
                <img alt="Casual Template" className="rounded-2xl shadow-xl" data-alt="Vibrant and colorful digital menu for a burger joint with bold fonts and large food photos" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC88yYk-tGaWQZ9fANLnIyNYH7QVsZJNrr6z1iY98xJUQBD-z4Q37ud7srIU223sgBDlhbZX8iCRxV-b2Z9RNenw2SZ89yO74fuuk_BESLIRK6oeny6RKM1b7Crj-hRii-n4FpRkxEMlOtXekpaCuogBjuahXSIlNPK_qLwUteyv3PknajYCHcBGnjgPGweghc1j66JWjg8FGHJz_E9R3jyHgshDi3eidK4CSsYeKUnLVLZMX1RWThU3Fbsr8wVmKyLtSC4QLbYlfjA" />
              </div>
              <div className="pt-12 space-y-4">
                <img alt="Cafe Template" className="rounded-2xl shadow-xl" data-alt="Minimalist coffee shop menu layout with clean white backgrounds and soft pastel accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMoYHuMfx8-wQQofuq0pb7gHOddmyVegA3e93Zfoqzq_DPLL28WV92MMOwjQxQbu2_BP5FjJGhrc8Ga-Z7VDS-FdrYz-YhbC_r6dAjwMXavklpQ5hNhnMMaP0dV5nvLzd-xiYpPIsBGA9krrAWKZj_02ksCsCLP2kPxFAClmRZjNZ38qlNDNCMN-xaSQxGdtmHbmLbld-PFQdcMVCj9naiDHvucRoNGiIidqGCoszsmbBosH4M-fXIMYrqhzmomiYHQg-vzm5R-VsH" />
                <img alt="Bakery Template" className="rounded-2xl shadow-xl" data-alt="Warm and rustic bakery digital menu showing artisanal breads and pastries with natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATcKcxnNZWuXBtfqjqLJdcAUh2QnZ9u3v3slI5Q__yDdprsqVzS7NAujR8LQrsAndHAEGl_Np0MKfnxIGoERxRpFGGjkZWtQ4Ue__4yHdmv0luAZIP1Jd_dlSvhnuxxv_S9RtCoq1KJNkGVtBblDjWoYniiomzw53M1cZLcRfrXAuLM38vuVTGfsbyXOY2U_uznJY2PTqyh95dy_PWH1bMbUurrR-N1uDHoVlJnp-5v361Ne3dIhGH4kVTMYYZM6w91CLLOCurTAZN" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-black text-on-surface">ماذا يقول شركاؤنا؟</h2>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
              <div className="flex text-primary mb-4">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
              </div>
              <p className="text-on-surface mb-8 italic leading-relaxed">"أفضل قرار اتخذته لمطعمي. زادت المبيعات بنسبة 25% بفضل سهولة الطلب وسرعة الخدمة التي وفرها لنا OrderIt."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden">
                  <img alt="Restaurant Owner" data-alt="Professional portrait of a middle-aged male restaurant owner smiling in a modern kitchen setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFoXKN_hym1iI6EP5jn0tDHwB_T7alEXPFeJu9rwdpGUC0J_GqVFD0pzcop-hynZlS48_2-ofyUR_ChNiN0XMW5py0OxTDc_P2JI2HvnYu2biwHYIfDyNjeHhki5ZJCJCddzxFaeSCophijUdxxeT6hc39Tk4mxGFN7SlsjT5HCVqs0M0nv2NKdu8Cc401BSOcne89GsWzd31JjrbhrUbyHzcSwvZoGA000XeTYNfQn-4LC5CfdevYHC4XflnQYvQ9x79wHc1Gfbve" />
                </div>
                <div>
                  <p className="font-bold">أحمد المنصور</p>
                  <p className="text-xs text-secondary">مالك مطعم ذا ستيك هاوس</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm border-t-4 border-t-primary">
              <div class="flex text-primary mb-4">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
              </div>
              <p className="text-on-surface mb-8 italic leading-relaxed">"النظام سهل جداً في التعامل، الموظفون تعلموا عليه في دقائق. خدمة الدعم الفني استثنائية وسريعة جداً."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden">
                  <img alt="Restaurant Owner" data-alt="Young professional female restaurant manager in business attire looking confident in a bright cafe" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDauIoZv49FfsWZpXchm7JRpuPWDilrZ3XcuH74n5mIKuuY8LRteUenyxRF9HIgQwz4nypIWbsiOCy015E-wnZulNHf3vEzJiABJbw3WaBsVXl7egu837gyqQXOw9R5dyJNXgGL8oEIBYhBuKhP_-LC2SphqhNeHcYOA3llIxzNeJTP_rdp4Ws8luBHwFnBZatao4Q7qSeMnvQjShQDlX8t4zsjsy-d8d3bfK6nMhaez2PeZPXlG0j-h5V99T00CxLxg_ZUHvxhyD1Q" />
                </div>
                <div>
                  <p className="font-bold">سارة القحطاني</p>
                  <p className="text-xs text-secondary">مديرة تشغيل سلسلة كافيه لاونج</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
              <div className="flex text-primary mb-4">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
              </div>
              <p className="text-on-surface mb-8 italic leading-relaxed">"الـ QR كود غير شكل المكان، العملاء معجبون جداً بالتجربة الرقمية والصور الاحترافية للأطباق."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden">
                  <img alt="Restaurant Owner" data-alt="Smiling chef in white uniform standing in front of an upscale restaurant interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn23h3rmplr69s34qvuX0P6_a0kdKBwT3IBO3cohhpLIzmjA0fmFqQdGj4EA1Upc0Qrsl9PwGqPya8s9n0OmshKc_WYofifgqxS2e8s4YCQTxbmNiIgrHTaOuIRK6T6AIJ0Of6zyrk-ctzJDOxh0uVwj8_w2BOovdlLNDWGE0o0lKlI6Vov_W0typtGJsjQdGCnBKfX5NpsTtmlrpfPqn8FK3WlXjit0rs4PM3eGsjI7PiqtZcZbuCrR_Kq5wx8w_MXQZAV60l2MCx" />
                </div>
                <div>
                  <p className="font-bold">محمد إبراهيم</p>
                  <p className="text-xs text-secondary">شيف ومالك مطعم لقمة هنية</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-on-primary relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8">هل أنت مستعد لتغيير مستقبل مطعمك؟</h2>
                <p className="text-xl text-on-primary/80 mb-12 max-w-2xl mx-auto leading-relaxed">انضم إلى أكثر من 500 مطعم وكافيه يستخدمون OrderIt يومياً لرفع كفاءة العمل وزيادة الأرباح.</p>
                <div className="flex flex-wrap justify-center gap-6">
                  <button onClick={() => navigate('/register')} className="bg-surface-container-lowest text-primary px-10 py-5 rounded-xl text-xl font-bold hover:scale-105 transition-all shadow-xl">سجل مطعمك الآن</button>
                  <button className="border-2 border-white/30 text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white/10 transition-all">تحدث مع مبيعاتنا</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-surface-container-low pt-20 pb-10 border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <Logo size="xl" />
                </div>
                <p className="text-secondary leading-relaxed mb-6">نحن نؤمن بأن التكنولوجيا هي المفتاح لتحسين تجربة الضيافة وتحقيق النمو المستدام للمطاعم.</p>
                <div className="flex gap-4">
                  <a className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">public</span>
                  </a>
                  <a className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">share</span>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6">المنتج</h4>
                <ul className="space-y-4 text-secondary">
                  <li><a className="hover:text-primary transition-colors" href="#">المميزات</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">الأسعار</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">القوالب</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">التكاملات</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6">الشركة</h4>
                <ul className="space-y-4 text-secondary">
                  <li><a className="hover:text-primary transition-colors" href="#">من نحن</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">الوظائف</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">المدونة</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">تواصل معنا</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6">الدعم</h4>
                <ul className="space-y-4 text-secondary">
                  <li><a className="hover:text-primary transition-colors" href="#">مركز المساعدة</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">سياسة الخصوصية</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">شروط الاستخدام</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">الأسئلة الشائعة</a></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6 pt-8 border-t border-outline-variant/10">
              <p className="text-xs uppercase tracking-widest text-secondary">© 2026 OrderIt. جميع الحقوق محفوظة.</p>
              <div className="flex gap-6">
                <a className="text-xs uppercase tracking-widest text-secondary hover:underline" href="#">Privacy Policy</a>
                <a className="text-xs uppercase tracking-widest text-secondary hover:underline" href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}

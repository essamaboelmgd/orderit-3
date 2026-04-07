import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Logo from "../components/Logo";
import PageTransition from "../components/PageTransition";

/* ─── Reusable animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Helper: fires once element enters viewport ─── */
function AnimateOnScroll({ children, className, variants = fadeUp, delay = 0, duration = 0.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger wrapper ─── */
function StaggerOnScroll({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  /* Parallax for hero bg blobs */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <PageTransition>
      <div className="bg-background text-on-surface antialiased overflow-x-hidden min-h-screen" dir="rtl">

        {/* ── TopNavBar ── */}
        <motion.nav
          className="fixed top-0 w-full z-50 glass-nav shadow-sm"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
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
              <motion.button
                onClick={() => navigate('/register')}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold shadow-lg hover:bg-primary-container transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ابدأ مجاناً
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* ── Hero Section ── */}
        <header id="home" ref={heroRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Parallax background blobs */}
          <motion.div
            style={{ y: blobY }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-10 right-[-10%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-tertiary/6 rounded-full blur-3xl" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <motion.div
              className="z-10"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-black text-on-surface leading-tight mb-6"
              >
                اجعل تجربة الطلب في مطعمك{" "}
                <motion.span
                  className="text-primary inline-block"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  لا تُنسى
                </motion.span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl text-secondary leading-relaxed mb-10 max-w-lg"
              >
                حول قائمتك الورقية إلى تجربة رقمية تفاعلية. نظام متكامل لإدارة الطلبات، الطاولات، وتحليل المبيعات بكل سهولة واحترافية.
              </motion.p>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  onClick={() => navigate('/register')}
                  className="bg-primary text-on-primary px-8 py-4 rounded-lg text-lg font-bold shadow-xl transition-all"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  ابدأ الآن مجاناً
                </motion.button>
                <motion.button
                  onClick={() => navigate('/menu')}
                  className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-8 py-4 rounded-lg text-lg font-bold shadow-sm border border-outline-variant/10 hover:bg-surface-container-low transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  شاهد كيف يعمل
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
              <motion.div
                className="relative z-10 bg-surface-container-lowest p-4 rounded-[2.5rem] shadow-2xl border border-outline-variant/5 transform md:rotate-3"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  alt="OrderIt App Interface"
                  className="rounded-[2rem] w-full shadow-inner"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoyBAPP5k2h1FH-TR5sqvEzq-11bzCC3OYDk8fDdD_ihCkBFSq3wwGJvuajIKJuN5sz5lOHUglnVKoIOOFKivuX8aIvK1JMjSz4uh68j3pBv520RAnFwqF3jPpAeTKaHp5fOX0LV0bcdwoJcvOHmSlUlgMW1BsWhCkTiRQ8jzQ-ml-_CBwQ5gyR4FKuWr7D-vF8-uR8yG8vK_VQtvdkyacaV7qM5vAAljQ9-k31rKIHsXTQTz2Fu5x7d_Cj5c5f4A8B7lskHiDp47O"
                />
              </motion.div>

              {/* Floating order notification */}
              <motion.div
                className="absolute z-20 -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-outline-variant/10 hidden lg:block"
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      className="w-3 h-3 bg-tertiary-container rounded-full"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">طلب جديد</span>
                  </div>
                  <p className="font-bold text-lg">بيتزا مارجريتا × 2</p>
                  <p className="text-primary font-black">95.00 ج.م</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* ── Infinite Marquee ── */}
        <section className="bg-gradient-to-r from-surface-container-low via-white to-surface-container-low py-10 overflow-hidden border-y border-outline-variant/5">
          <AnimateOnScroll className="max-w-7xl mx-auto px-6 text-center mb-6">
            <h2 className="text-xs font-bold text-neutral-400 tracking-widest uppercase">شركاء النجاح</h2>
          </AnimateOnScroll>
          <div className="relative flex whitespace-nowrap" dir="ltr">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              className="flex gap-16 min-w-max pr-16"
            >
              {[...Array(4)].map((_, blockIdx) => (
                <div key={blockIdx} className="flex gap-16 items-center">
                  {["كينتاكي", "ماكدونالدز", "بورجر كينج", "بيتزا هت", "صب واي", "هارديز", "باسطا شوب شوب", "كارفور", "ننجو نيجي", "فيشهاوس", "جنة السوشي", "كوشيكي", "دومينوز"].map((name, idx) => (
                    <motion.span
                      key={idx}
                      className="text-2xl md:text-3xl font-black text-neutral-300 hover:text-primary transition-colors cursor-default select-none flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      {name}
                    </motion.span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how" className="py-24 bg-surface-container-low">
          <AnimateOnScroll className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">خطوات بسيطة</h2>
            <p className="text-4xl font-bold text-on-surface">كيف يعمل OrderIt؟</p>
          </AnimateOnScroll>
          <StaggerOnScroll className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            {[
              { icon: "qr_code_2", rotate: "rotate-3", title: "1. أنشئ الـ QR الخاص بك", desc: "قم برفع قائمة طعامك وتخصيص تصميم الـ QR ليتناسب مع هوية مطعمك." },
              { icon: "touch_app", rotate: "-rotate-3", title: "2. العميل يطلب مباشرة", desc: "يمسح العميل الكود، يتصفح الصور، ويطلب ويدفع من هاتفه دون انتظار النادل." },
              { icon: "check_circle", rotate: "rotate-6", title: "3. ابدأ التحضير فوراً", desc: "تصلك الطلبات مباشرة إلى المطبخ أو لوحة التحكم لتبدأ العمل بذكاء وسرعة." },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div
                  className={`w-20 h-20 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mb-6 transform ${step.rotate}`}
                  whileHover={{ scale: 1.12, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="material-symbols-outlined text-4xl" data-weight="fill">{step.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </StaggerOnScroll>
        </section>

        {/* ── Features Bento Grid ── */}
        <section id="features" className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateOnScroll className="mb-16">
              <h2 className="text-4xl font-black text-on-surface mb-4">مميزات صُممت لنمو مطعمك</h2>
              <div className="w-24 h-1.5 bg-primary rounded-full" />
            </AnimateOnScroll>
            <StaggerOnScroll className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Feature */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="md:col-span-2 bg-primary p-8 rounded-3xl text-on-primary relative overflow-hidden flex flex-col justify-between h-[400px]"
                whileHover={{ scale: 1.01, boxShadow: "0 30px 60px rgba(0,0,0,0.18)" }}
              >
                <div className="z-10">
                  <h3 className="text-3xl font-bold mb-4">لوحة تحكم ذكية وشاملة</h3>
                  <p className="text-on-primary/80 max-w-md leading-relaxed text-lg">راقب مبيعاتك، أداء الموظفين، وأكثر الوجبات طلباً في لحظات. بيانات حقيقية لاتخاذ قرارات أفضل.</p>
                </div>
                <div className="z-10 mt-auto">
                  <motion.button
                    onClick={() => navigate('/admin')}
                    className="bg-surface-container-lowest text-primary px-6 py-3 rounded-xl font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    اكتشف المزيد
                  </motion.button>
                </div>
                <motion.div
                  className="absolute bottom-[-10%] left-[-5%] w-2/3 opacity-30 transform -rotate-6"
                  animate={{ rotate: [-6, -3, -6], y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img alt="Dashboard Preview" className="rounded-xl shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5ah4PkoVyRUhL0rKTe55f6GiQqphLNp5P4qOPN5YgTRvVThiqlzyZLeS45W3hhtYZaugiKWKLZ0zH4qkNMDRZC0GBXfA_j54ocuV9j9kDeJiKO2vLFeyrk8HFe4zyiwX3gnf_AUJwO381mddUDKxueAK-8_7TKwDPWr_1rR40_FVD7QXUkguotViRIbCBr55WLhod3QuY_PviK8fxnqea0O0kqGzOtPbg-oZmYrfQbUjprl_csvAJyjiPF9ef-Z24l_VUaMqf_C4N" />
                </motion.div>
              </motion.div>

              {[
                { icon: "payments", title: "دفع إلكتروني آمن", desc: "دعم كامل لـ Apple Pay، مدى، والبطاقات الائتمانية لتسهيل عملية الدفع." },
                { icon: "language", title: "متعدد اللغات", desc: "قائمة طعام تترجم نفسها تلقائياً لتناسب جميع زوار مطعمك من كل أنحاء العالم." },
                { icon: "inventory_2", title: "إدارة المخزون", desc: "تنبيهات فورية عند اقتراب نفاذ أي صنف، لضمان استمرارية الخدمة دون انقطاع." },
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.6 }}
                  className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/5 shadow-sm"
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                >
                  <motion.div
                    className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary mb-6"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <span className="material-symbols-outlined">{feat.icon}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-secondary leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="bg-tertiary p-8 rounded-3xl text-on-tertiary"
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              >
                <motion.div
                  className="w-12 h-12 bg-tertiary-container rounded-xl flex items-center justify-center text-on-tertiary-container mb-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <span className="material-symbols-outlined">support_agent</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-3">دعم فني 24/7</h3>
                <p className="text-on-tertiary/80 leading-relaxed">نحن معك في كل خطوة. فريق دعم متخصص جاهز للرد على استفساراتك في أي وقت.</p>
              </motion.div>
            </StaggerOnScroll>
          </div>
        </section>

        {/* ── Templates Preview ── */}
        <section id="restaurants" className="py-24 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll>
              <h2 className="text-4xl font-black text-on-surface mb-6">قوالب تناسب <span className="text-primary">فخامة</span> مطعمك</h2>
              <p className="text-lg text-secondary leading-relaxed mb-8">اختر من بين عشرات القوالب المصممة بعناية فائقة لتبرز جمال أطباقك. يمكنك تخصيص الألوان، الخطوط، وتوزيع الصور بنقرة واحدة.</p>
              <StaggerOnScroll className="space-y-4">
                {[
                  "تصميم متجاوب بالكامل مع الهواتف",
                  "تحميل سريع للصور (Lazy Loading)",
                  "أيقونات مخصصة لمكونات الأطباق",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <motion.span
                      className="material-symbols-outlined text-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 * i }}
                    >
                      check_circle
                    </motion.span>
                    <span className="font-bold">{item}</span>
                  </motion.div>
                ))}
              </StaggerOnScroll>
            </AnimateOnScroll>

            <AnimateOnScroll
              variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }}
              duration={0.8}
            >
              <motion.div
                className="grid grid-cols-2 gap-4 transform rotate-3 scale-110"
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-4">
                  <motion.img whileHover={{ scale: 1.03 }} alt="Luxury Template" className="rounded-2xl shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWeq_V2mD3EQz1bhzye5CJF5Pd3RQLALrULn24GP6XG6S6hgBR_JZKMfYYRFm4mVvtuLJpHXOYAw3vzTzU7M1d1omPRSY0kmvmbYxeAEi1bODFIctNu0JPwapWIEbPGN_jjhVVINJDHy1f263gwyCWzie-RaBk0UmS4E6Ju6PAQfXUoDIB406BR8oXpOroO-8hq1B7KuOg_vTLB23d8TttH1B9PsWXFs4Sq-x_Aa8CjnI1jkSnCl79Slc9AomtbCgB-rA3gBwRUYsZ" />
                  <motion.img whileHover={{ scale: 1.03 }} alt="Casual Template" className="rounded-2xl shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC88yYk-tGaWQZ9fANLnIyNYH7QVsZJNrr6z1iY98xJUQBD-z4Q37ud7srIU223sgBDlhbZX8iCRxV-b2Z9RNenw2SZ89yO74fuuk_BESLIRK6oeny6RKM1b7Crj-hRii-n4FpRkxEMlOtXekpaCuogBjuahXSIlNPK_qLwUteyv3PknajYCHcBGnjgPGweghc1j66JWjg8FGHJz_E9R3jyHgshDi3eidK4CSsYeKUnLVLZMX1RWThU3Fbsr8wVmKyLtSC4QLbYlfjA" />
                </div>
                <div className="pt-12 space-y-4">
                  <motion.img whileHover={{ scale: 1.03 }} alt="Cafe Template" className="rounded-2xl shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMoYHuMfx8-wQQofuq0pb7gHOddmyVegA3e93Zfoqzq_DPLL28WV92MMOwjQxQbu2_BP5FjJGhrc8Ga-Z7VDS-FdrYz-YhbC_r6dAjwMXavklpQ5hNhnMMaP0dV5nvLzd-xiYpPIsBGA9krrAWKZj_02ksCsCLP2kPxFAClmRZjNZ38qlNDNCMN-xaSQxGdtmHbmLbld-PFQdcMVCj9naiDHvucRoNGiIidqGCoszsmbBosH4M-fXIMYrqhzmomiYHQg-vzm5R-VsH" />
                  <motion.img whileHover={{ scale: 1.03 }} alt="Bakery Template" className="rounded-2xl shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATcKcxnNZWuXBtfqjqLJdcAUh2QnZ9u3v3slI5Q__yDdprsqVzS7NAujR8LQrsAndHAEGl_Np0MKfnxIGoERxRpFGGjkZWtQ4Ue__4yHdmv0luAZIP1Jd_dlSvhnuxxv_S9RtCoq1KJNkGVtBblDjWoYniiomzw53M1cZLcRfrXAuLM38vuVTGfsbyXOY2U_uznJY2PTqyh95dy_PWH1bMbUurrR-N1uDHoVlJnp-5v361Ne3dIhGH4kVTMYYZM6w91CLLOCurTAZN" />
                </div>
              </motion.div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24 bg-surface">
          <AnimateOnScroll className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-black text-on-surface">ماذا يقول شركاؤنا؟</h2>
          </AnimateOnScroll>
          <StaggerOnScroll className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
              {
                text: "\"أفضل قرار اتخذته لمطعمي. زادت المبيعات بنسبة 25% بفضل سهولة الطلب وسرعة الخدمة التي وفرها لنا OrderIt.\"",
                name: "أحمد المنصور",
                role: "مالك مطعم ذا ستيك هاوس",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFoXKN_hym1iI6EP5jn0tDHwB_T7alEXPFeJu9rwdpGUC0J_GqVFD0pzcop-hynZlS48_2-ofyUR_ChNiN0XMW5py0OxTDc_P2JI2HvnYu2biwHYIfDyNjeHhki5ZJCJCddzxFaeSCophijUdxxeT6hc39Tk4mxGFN7SlsjT5HCVqs0M0nv2NKdu8Cc401BSOcne89GsWzd31JjrbhrUbyHzcSwvZoGA000XeTYNfQn-4LC5CfdevYHC4XflnQYvQ9x79wHc1Gfbve",
                featured: false,
              },
              {
                text: "\"النظام سهل جداً في التعامل، الموظفون تعلموا عليه في دقائق. خدمة الدعم الفني استثنائية وسريعة جداً.\"",
                name: "سارة القحطاني",
                role: "مديرة تشغيل سلسلة كافيه لاونج",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDauIoZv49FfsWZpXchm7JRpuPWDilrZ3XcuH74n5mIKuuY8LRteUenyxRF9HIgQwz4nypIWbsiOCy015E-wnZulNHf3vEzJiABJbw3WaBsVXl7egu837gyqQXOw9R5dyJNXgGL8oEIBYhBuKhP_-LC2SphqhNeHcYOA3llIxzNeJTP_rdp4Ws8luBHwFnBZatao4Q7qSeMnvQjShQDlX8t4zsjsy-d8d3bfK6nMhaez2PeZPXlG0j-h5V99T00CxLxg_ZUHvxhyD1Q",
                featured: true,
              },
              {
                text: "\"الـ QR كود غير شكل المكان، العملاء معجبون جداً بالتجربة الرقمية والصور الاحترافية للأطباق.\"",
                name: "محمد إبراهيم",
                role: "شيف ومالك مطعم لقمة هنية",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn23h3rmplr69s34qvuX0P6_a0kdKBwT3IBO3cohhpLIzmjA0fmFqQdGj4AA1Upc0Qrsl9PwGqPya8s9n0OmshKc_WYofifgqxS2e8s4YCQTxbmNiIgrHTaOuIRK6T6AIJ0Of6zyrk-ctzJDOxh0uVwj8_w2BOovdlLNDWGE0o0lKlI6Vov_W0typtGJsjQdGCnBKfX5NpsTtmlrpfPqn8FK3WlXjit0rs4PM3eGsjI7PiqtZcZbuCrR_Kq5wx8w_MXQZAV60l2MCx",
                featured: false,
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className={`bg-surface-container-lowest p-8 rounded-3xl border shadow-sm ${t.featured ? "border-outline-variant/10 border-t-4 border-t-primary" : "border-outline-variant/10"}`}
                whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(0,0,0,0.1)" }}
              >
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, si) => (
                    <motion.span
                      key={si}
                      className="material-symbols-outlined"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + si * 0.05 }}
                    >
                      star
                    </motion.span>
                  ))}
                </div>
                <p className="text-on-surface mb-8 italic leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden">
                    <img alt="Restaurant Owner" src={t.img} />
                  </div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-secondary">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerOnScroll>
        </section>

        {/* ── Final CTA ── */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateOnScroll
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
              duration={0.7}
            >
              <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-on-primary relative overflow-hidden shadow-2xl">
                {/* Animated blobs inside CTA */}
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.18, 0.08] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black mb-8">هل أنت مستعد لتغيير مستقبل مطعمك؟</h2>
                  <p className="text-xl text-on-primary/80 mb-12 max-w-2xl mx-auto leading-relaxed">انضم إلى أكثر من 500 مطعم وكافيه يستخدمون OrderIt يومياً لرفع كفاءة العمل وزيادة الأرباح.</p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <motion.button
                      onClick={() => navigate('/register')}
                      className="bg-surface-container-lowest text-primary px-10 py-5 rounded-xl text-xl font-bold shadow-xl"
                      whileHover={{ scale: 1.06, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      سجل مطعمك الآن
                    </motion.button>
                    <motion.button
                      className="border-2 border-white/30 text-white px-10 py-5 rounded-xl text-xl font-bold"
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      تحدث مع مبيعاتنا
                    </motion.button>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-surface-container-low pt-20 pb-10 border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <Logo size="xl" />
                </div>
                <p className="text-secondary leading-relaxed mb-6">نحن نؤمن بأن التكنولوجيا هي المفتاح لتحسين تجربة الضيافة وتحقيق النمو المستدام للمطاعم.</p>
                <div className="flex gap-4">
                  {["public", "share"].map((icon, i) => (
                    <motion.a
                      key={i}
                      className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      href="#"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="material-symbols-outlined text-sm">{icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
              {[
                { title: "المنتج", links: ["المميزات", "الأسعار", "القوالب", "التكاملات"] },
                { title: "الشركة", links: ["من نحن", "الوظائف", "المدونة", "تواصل معنا"] },
                { title: "الدعم", links: ["مركز المساعدة", "سياسة الخصوصية", "شروط الاستخدام", "الأسئلة الشائعة"] },
              ].map((col, i) => (
                <div key={i}>
                  <h4 className="font-bold text-lg mb-6">{col.title}</h4>
                  <ul className="space-y-4 text-secondary">
                    {col.links.map((link, li) => (
                      <li key={li}>
                        <motion.a
                          className="hover:text-primary transition-colors"
                          href="#"
                          whileHover={{ x: -4 }}
                        >
                          {link}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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

import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Logo from "../components/Logo";
import PageTransition from "../components/PageTransition";

/* ─── Reusable animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Helper Components ─── */
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

/* ─── Icons (SVG) ─── */
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Food images for floating effect
  const foodImages = [
    { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop&auto=format&q=80', className: 'top-10 -right-4 md:right-10 w-24 h-24 md:w-32 md:h-32 rotate-[-12deg]' },
    { src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop&auto=format&q=80', className: 'top-40 -right-8 md:-right-20 w-20 h-20 md:w-28 md:h-28 rotate-[15deg]' },
    { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop&auto=format&q=80', className: 'bottom-20 right-0 w-24 h-24 rotate-[-8deg]' },
    { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&auto=format&q=80', className: 'top-20 -left-4 md:left-10 w-28 h-28 rotate-[10deg]' },
    { src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop&auto=format&q=80', className: 'bottom-10 left-0 w-20 h-20 rotate-[-15deg]' },
  ];

  return (
    <PageTransition>
      <div className="bg-[#FFF8F9] text-[#1A1A1A] antialiased overflow-x-hidden min-h-screen font-cairo selection:bg-primary/20" dir="rtl">
        
        {/* ── Navbar ── */}
        {/* Global Navbar in App.jsx handles this now */}

        {/* ── Hero Section ── */}
        <header id="home" ref={heroRef} className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden">
          {/* Decorative Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Column */}
            <motion.div
              className="z-10 order-2 lg:order-1 text-center lg:text-right"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-black leading-[1.1] mb-8"
              >
                اجعل تجربة الطلب <br />
                في مطعمك <span className="text-primary">لا تُنسى</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-xl text-secondary leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              >
                حول قائمتك الورقية إلى تجربة رقمية تفاعلية بلمسة زر. نظام متكامل لإدارة الطلبات، دفع إلكتروني، وتحليلات دقيقة لنمو مطعمك.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
              >
                <motion.button
                  onClick={() => navigate('/register')}
                  className="bg-primary text-white px-10 py-5 rounded-full text-lg font-black shadow-2xl hover:shadow-primary/30 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ابدأ الآن مجاناً
                </motion.button>
                <motion.button
                  className="flex items-center gap-3 bg-white text-[#1A1A1A] px-10 py-5 rounded-full text-lg font-black shadow-xl border border-outline-variant/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlayIcon />
                  شاهد العرض
                </motion.button>
              </motion.div>

              {/* Stats Bar */}
              <motion.div 
                variants={fadeUp}
                className="flex justify-center lg:justify-start gap-12 pt-8 border-t border-outline-variant/20"
              >
                <div>
                  <div className="text-3xl font-black">500<span className="text-primary">+</span></div>
                  <div className="text-sm font-bold text-secondary">مطعم وكافيه</div>
                </div>
                <div>
                  <div className="text-3xl font-black">1M<span className="text-primary">+</span></div>
                  <div className="text-sm font-bold text-secondary">طلب ناجح</div>
                </div>
                <div>
                  <div className="text-3xl font-black">4.9<span className="text-primary">★</span></div>
                  <div className="text-sm font-bold text-secondary">تقييم العملاء</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Column (Phone + Food) */}
            <div className="relative order-1 lg:order-2 h-[450px] md:h-[600px] flex items-center justify-center">
              {/* Phone Mockup Wrapper */}
              <motion.div 
                className="relative z-20 w-[240px] md:w-[280px]"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: yParallax }}
              >
                <div className="bg-[#1A1A1A] rounded-[3rem] p-2.5 shadow-[0_45px_90px_-15px_rgba(0,0,0,0.3)]">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19] flex flex-col relative">
                    {/* Fake App header */}
                    <div className="bg-primary px-4 pt-6 pb-4 flex justify-between items-center text-white">
                      <span className="font-bold text-xs">Café Nilo</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold">طاولة 5</span>
                    </div>
                    {/* Fake App Content */}
                    <div className="flex-1 p-3 overflow-y-auto bg-gray-50 flex flex-col gap-2">
                      <div className="h-4 w-20 bg-gray-200 rounded-full mb-1" />
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                             <div className="aspect-square bg-gray-100 rounded-lg mb-1" />
                             <div className="h-2 w-12 bg-gray-200 rounded-full mb-1" />
                             <div className="h-2 w-8 bg-primary/20 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Fake App Footer */}
                    <div className="p-3 bg-white border-t">
                      <div className="bg-[#1A1A1A] rounded-xl p-3 flex justify-between items-center text-white text-xs font-bold">
                        <span>3 أصناف</span>
                        <span>طلب الآن ←</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <motion.div 
                  className="absolute -top-10 -left-16 bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-black">طلب جديد: بيتزا مارجريتا</span>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -right-12 bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="bg-green-500 text-white rounded-full p-1"><CheckIcon /></div>
                  <span className="text-xs font-black">تم تأكيد الطلب</span>
                </motion.div>
              </motion.div>

              {/* Floating Food Images */}
              {foodImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`absolute z-10 ${img.className} hidden md:block`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.8, type: "spring" }}
                >
                  <motion.img 
                    src={img.src} 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
                    animate={{ y: [0, -idx % 2 === 0 ? 15 : -15, 0] }}
                    transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </header>

        {/* ── Marquee Section ── */}
        <section className="bg-white py-12 overflow-hidden border-y border-outline-variant/10">
          <div className="max-w-[1440px] mx-auto px-6 mb-8 text-center uppercase tracking-widest text-[10px] font-black text-secondary/60">
            شركاء النجاح
          </div>
          <div className="relative flex whitespace-nowrap overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex gap-16 min-w-max pr-16 items-center"
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16 items-center">
                  {["بيتزا هات", "ستاربكس", "برجر كينج", "كنتاكي", "ماكدونالدز", "صب واي", "دانكن", "هارديز"].map((name, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-[#FFF8F9] px-6 py-3 rounded-full border border-primary/5 hover:border-primary/20 transition-colors cursor-default">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-lg md:text-xl font-black text-[#1A1A1A] select-none">{name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how" className="py-32 bg-[#FFF8F9]">
          <div className="max-w-[1440px] mx-auto px-6">
            <AnimateOnScroll className="text-center mb-20">
              <h2 className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4">ثلاث خطوات</h2>
              <p className="text-4xl md:text-6xl font-black text-[#1A1A1A]">كيف يعمل OrderIt؟</p>
            </AnimateOnScroll>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "01", icon: "qr_code_2", title: "أنشئ الكود الخاص بك", desc: "قم برفع قائمة طعامك وتخصيص تصميم الـ QR ليتناسب مع هوية مطعمك الفريدة." },
                { number: "02", icon: "touch_app", title: "العملاء يطلبون بذكاء", desc: "يمسح العميل الكود، يشاهد الصور الاحترافية، ويطلب مباشرة من هاتفه دون انتظار." },
                { number: "03", icon: "task_alt", title: "استقبل وحضر الطلبات", desc: "تصلك الطلبات فوراً إلى المطبخ أو لوحة التحكم، مما يسرع عملية الخدمة ويرفع الكفاءة." },
              ].map((step, i) => (
                <AnimateOnScroll key={i} delay={i * 0.1} className="group p-10 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all relative overflow-hidden">
                   <div className="absolute top-4 left-6 text-7xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">{step.number}</div>
                   <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                      <span className="material-symbols-outlined text-3xl" data-weight="fill">{step.icon}</span>
                   </div>
                   <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                   <p className="text-secondary leading-relaxed font-medium">{step.desc}</p>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Bento Grid ── */}
        <section id="features" className="py-32 bg-white">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
               <AnimateOnScroll>
                  <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A]">مميزات صُممت <br /> لنمو مطعمك</h2>
               </AnimateOnScroll>
               <AnimateOnScroll>
                  <p className="text-secondary max-w-sm font-medium">نحن نوفر لك كل الأدوات اللازمة لإدارة مطعمك بكل سهولة واحترافية تامة.</p>
               </AnimateOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 - Large */}
              <motion.div
                className="md:col-span-2 bg-[#1A1A1A] rounded-[2.5rem] p-10 text-white relative overflow-hidden h-[400px] group shadow-2xl"
                whileHover={{ y: -5 }}
              >
                <div className="z-10 relative">
                  <h3 className="text-3xl font-black mb-4">لوحة تحكم ذكية وشاملة</h3>
                  <p className="text-white/60 max-w-md text-lg font-medium mb-8">راقب مبيعاتك، أداء الموظفين، وأكثر الوجبات طلباً في لحظات. بيانات حقيقية لاتخاذ قرارات أفضل.</p>
                  <button className="bg-primary text-white px-8 py-3 rounded-full font-bold">اكتشف المزيد</button>
                </div>
                <div className="absolute bottom-0 left-0 w-[60%] lg:w-[40%] translate-y-10 group-hover:translate-y-4 transition-transform duration-700">
                   <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Dashboard" className="rounded-t-2xl shadow-2xl rotate-[-5deg]" />
                </div>
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Feature 2 - Small */}
              <motion.div className="bg-primary rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-2xl" whileHover={{ y: -5 }}>
                 <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                    <span className="material-symbols-outlined text-3xl">payments</span>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black mb-3">دفع إلكتروني آمن</h3>
                    <p className="text-white/80 text-sm font-medium">دعم كامل لـ Apple Pay، مدى، والبطاقات الائتمانية لتسهيل عملية الدفع لعملائك.</p>
                 </div>
              </motion.div>

              {/* Feature 3 - Small */}
              <motion.div className="bg-[#FFF8F9] border border-outline-variant/10 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm" whileHover={{ y: -5 }}>
                 <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 font-cairo">
                    <span className="material-symbols-outlined text-3xl">language</span>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black mb-3">متعدد اللغات</h3>
                    <p className="text-secondary text-sm font-medium">ترجمة تلقائية لقائمة الطعام لتناسب جميع زوار مطعمك من كل أنحاء العالم.</p>
                 </div>
              </motion.div>

              {/* Feature 4 - Large */}
              <motion.div
                className="md:col-span-2 bg-white border border-outline-variant/10 rounded-[2.5rem] p-10 text-[#1A1A1A] relative overflow-hidden h-[400px] flex flex-col justify-between shadow-sm group"
                whileHover={{ y: -5 }}
              >
                 <div className="z-10 relative">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                      <span className="material-symbols-outlined text-3xl">palette</span>
                    </div>
                    <h3 className="text-3xl font-black mb-4">تخصيص كامل للهوية</h3>
                    <p className="text-secondary max-w-sm font-medium">اختر الألوان، الخطوط، وتصميم المنيو بما يناسب هوية علامتك التجارية بطريقة احترافية.</p>
                 </div>
                 <div className="absolute top-10 -left-10 w-[50%] h-[80%] bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                 <div className="flex gap-4 z-10">
                    <div className="w-12 h-12 bg-primary rounded-full shadow-lg" />
                    <div className="w-12 h-12 bg-amber-500 rounded-full shadow-lg" />
                    <div className="w-12 h-12 bg-emerald-500 rounded-full shadow-lg" />
                    <div className="w-12 h-12 bg-[#1A1A1A] rounded-full shadow-lg" />
                 </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Dark Trust / Reviews Section ── */}
        <section className="bg-[#1A1A1A] py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="max-w-[1440px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="z-10">
              <AnimateOnScroll>
                <h2 className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-6">ثقة بلا حدود</h2>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 font-cairo italic">لماذا يختارنا <br /> أفضل أصحاب المطاعم؟</h2>
                <p className="text-white/60 text-lg mb-12 max-w-md font-medium leading-relaxed font-cairo">نحن لا نقدم مجرد تطبيق، بل نقدم شريكاً يعتمد عليه في نمو واستقرار أعمال مطعمك يوماً بعد يوم.</p>
                
                <div className="space-y-6">
                  {[
                    { icon: "public", title: "انتشار عالمي", desc: "نظام مصمم ليواكب تطلعات المطاعم الطموحة للتوسع والنمو." },
                    { icon: "bolt", title: "كفاءة مطلقة", desc: "تسريع بنسبة 40% في دوران الطاولات وزيادة ملحوظة في حجم الطلبات." },
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                         <span className="material-symbols-outlined text-2xl">{feat.icon}</span>
                      </div>
                      <div>
                        <div className="text-white font-black mb-1">{feat.title}</div>
                        <div className="text-white/50 text-sm">{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>

            <div className="space-y-6 z-10">
              {[
                { name: "أحمد المنصور", role: "مالك مطعم ذا ستيك هاوس", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", quote: '"أفضل قرار اتخذته لمطعمي. زادت المبيعات بنسبة 25% مع جودة خدمة أفضل للعملاء."', color: 'border-primary' },
                { name: "سارة القحطاني", role: "مديرة كافيه لاونج", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", quote: '"النظام سهل جداً والموظفون تعلموا عليه في دقائق. الدعم الفني دائماً متاح وسريع."', color: 'border-amber-500' },
              ].map((rev, i) => (
                <AnimateOnScroll key={i} delay={i * 0.2} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}>
                   <div className={`bg-white/5 border-l-4 ${rev.color} p-8 rounded-2xl shadow-xl hover:bg-white/[0.08] transition-colors`}>
                      <div className="flex text-amber-500 mb-6 tracking-widest">★★★★★</div>
                      <p className="text-white text-lg font-medium italic mb-8 leading-relaxed font-cairo">{rev.quote}</p>
                      <div className="flex items-center gap-4">
                         <img src={rev.img} alt={rev.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
                         <div>
                            <div className="text-white font-black">{rev.name}</div>
                            <div className="text-white/40 text-xs">{rev.role}</div>
                         </div>
                      </div>
                   </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section id="contact" className="py-32 relative">
          <div className="max-w-[1440px] mx-auto px-6">
             <motion.div 
               className="bg-primary rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(240,48,48,0.4)]"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
             >
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-4xl md:text-7xl font-black mb-8 z-10 relative leading-tight">هل أنت مستعد <br /> لتغيير مستقبل مطعمك؟</h2>
                <p className="text-white/80 text-xl font-medium mb-12 max-w-2xl mx-auto z-10 relative">انضم إلى مجتمع OrderIt اليوم وابدأ تجربتك المجانية لمدة 14 يوماً. لا حاجة لبطاقة ائتمان.</p>
                
                <div className="flex flex-wrap justify-center gap-6 z-10 relative">
                   <motion.button
                    onClick={() => navigate('/register')}
                    className="bg-white text-primary px-12 py-5 rounded-full text-xl font-black shadow-2xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                   >
                     سجل مطعمك الآن
                   </motion.button>
                   <motion.button
                    className="bg-[#1A1A1A] text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                   >
                     تواصل مع المبيعات
                   </motion.button>
                </div>
                <div className="mt-8 text-white/40 text-xs font-bold uppercase tracking-widest">متاح الآن في جميع دول الخليج ومصر</div>
             </motion.div>
          </div>
        </section>

        {/* ── Final Footer (Matching Image) ── */}
        <footer className="bg-[#1A1A1A] py-8 border-t-2 border-primary">
          <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Copyright (Left) */}
            <div className="order-3 md:order-1 text-white/30 text-xs font-bold">
              © 2025 OrderIt. جميع الحقوق محفوظة.
            </div>

            {/* Links (Center) */}
            <div className="order-2 flex flex-wrap justify-center items-center gap-6 lg:gap-12">
              <a className="text-white/60 hover:text-white transition-colors font-bold text-sm" href="#features">المميزات</a>
              <a className="text-white/60 hover:text-white transition-colors font-bold text-sm" href="#pricing">الأسعار</a>
              <a className="text-white/60 hover:text-white transition-colors font-bold text-sm" href="#contact">تواصل معنا</a>
              <a className="text-white/60 hover:text-white transition-colors font-bold text-sm" href="#privacy">الخصوصية</a>
            </div>

            {/* Logo (Right) */}
            <div className="order-1 md:order-3">
              <Logo size="lg" />
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}

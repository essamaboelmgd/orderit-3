import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Pages where the marketing Navbar should be hidden
  const hiddenPaths = ["/login", "/register", "/staff-login", "/menu", "/cart", "/order-success"];
  
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/10"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-row-reverse items-center justify-between px-6 md:px-12 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size="xl" lightBg />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            className={`font-bold transition-colors ${location.pathname === '/' ? 'text-[#1A1A1A] border-b-2 border-primary pb-px' : 'text-secondary hover:text-primary'}`} 
            to="/"
          >
            الرئيسية
          </Link>
          <a className="text-secondary hover:text-primary transition-colors font-medium" href="#how">كيف يعمل</a>
          <a className="text-secondary hover:text-primary transition-colors font-medium" href="#features">المميزات</a>
          <a className="text-secondary hover:text-primary transition-colors font-medium" href="#contact">تواصل معنا</a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="hidden sm:block text-sm font-bold text-secondary hover:text-primary transition-colors"
          >
            تسجيل الدخول
          </button>
          <motion.button
            onClick={() => navigate('/register')}
            className="bg-[#1A1A1A] text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-black transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ابدأ مجاناً
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

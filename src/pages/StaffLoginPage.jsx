import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

const NUMPAD = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'];

export default function StaffLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [restaurant, setRestaurant] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const submitLogin = (currentPin) => {
    setError('');
    const result = login({ pin: currentPin });
    if (result.success) {
      navigate('/admin/orders');
    } else {
      setError(result.message);
      setPin('');
    }
  };

  const handleNumpad = (val) => {
    if (val === 'del') {
      setPin(p => p.slice(0, -1));
    } else if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 4) {
        submitLogin(newPin);
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-4" dir="rtl">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-primary/5"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl w-full max-w-sm p-8 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <Logo size="2xl" />
            </div>
            <h1 className="text-2xl font-black text-white">دخول الموظفين</h1>

            <input
              type="text"
              placeholder="اسم المطعم"
              value={restaurant}
              onChange={e => setRestaurant(e.target.value)}
              className="mt-4 w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-center font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-500/20 text-red-100 rounded-lg text-sm font-bold text-center border border-red-500/50">{error}</div>}

          {/* PIN dots */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all ${pin.length > i ? 'bg-primary border-primary' : 'border-white/40'}`}
              />
            ))}
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-3">
            {NUMPAD.map((key, i) => (
              key === null ? (
                <div key={i} />
              ) : (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNumpad(key)}
                  className={`h-16 rounded-xl font-black text-xl transition-all flex items-center justify-center ${
                    key === 'del'
                      ? 'bg-white/10 text-white/60 hover:bg-white/20'
                      : 'bg-white/10 text-white hover:bg-white/20 active:bg-primary'
                  }`}
                >
                  {key === 'del' ? (
                    <span className="material-symbols-outlined text-xl">backspace</span>
                  ) : key}
                </motion.button>
              )
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => pin.length === 4 && submitLogin(pin)}
            className="w-full bg-primary text-white py-4 rounded-lg font-bold mt-6 hover:bg-primary-dark transition-all disabled:opacity-50"
            disabled={pin.length < 4}
          >
            دخول
          </motion.button>
        </motion.div>

        <p className="mt-6 text-white/30 text-sm">
          <button onClick={() => navigate('/login')} className="hover:text-white transition-colors">دخول المدير ←</button>
        </p>
      </div>
    </PageTransition>
  );
}

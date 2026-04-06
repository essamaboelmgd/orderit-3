import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useCart } from '../context/CartContext';
import { categories, menuItems } from '../data/dummyData';

const fallbackImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDW-oAsYSiBnB6qZ1GoGn4YQQmQJNoR7iLKM9Dop2_bxgjYJOge4ruVM5ORaaTMDTgnieiL2Os9eS1TOowHw3pDbFxGFu8M7TsB41qRt3GBEeLo0Q8fY56BKyKe42P1rsMV-pRkt0bKyBPYAFr50q-Zy5K1SV6t3pKm8DkLjge9ujA055E2zSkWNdZtdVSOrpKLEHYjJ_aLXTROmkbQE1KW3VyB8FJflV0THIqJ4rzfXK9ZCzigutlPQx2NP4VNHOfz4AyQWpvCb4eP",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD4f8SHEKb472rZN5YnBkSsI9sO8-eWN7XpsLs1eDYj_WkfEY1ErbkiSy5y2s07E1AqJarQQo6GWz8xzdSCjU_5rjvRNjd9vJpP8BBsOsFMbROEA5RJGgHmPZbyOjwM908l60q-R-5i6kduBLyjDwajWZzgMTBbTmjh5nruSNRD0fxB_YdmeIqHg-X0uDo1Ul1mVCbrTUseslHLxUKC4aezkzxasBuaE8_V8jjF-Kuq6gVtLluz-DdheHiJzG2N9f4h7zdvRTKapH2D",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD8sVDg3-ADfJWS6lH2YVqU-n5-_s4KB0v4yfDOQnttjNQyqqBcOthFEIwNVsTi6S87RFpdsvAMnuanBbX7SZbNtxhIKLkowFYkwh1AcTZ7yE5oHZQNM8bLv3gIxQlY84qq7ukReHcnV_0YbQ0EuzU3LuSsxIowWRNPgEIHYG0LcEiuZbTAc9pqh6Fr8awXFWAwTNaB-rjUzRh2jGOdgVdIWiBk6J6iic9G7RdkjXFJJNF68CCIaqXNMS7ilAM8moyD9W4nv3K6-UwN",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAGElR34p95kCed5ekQbAUnE-PQMJIus3baOnRPtR0TvwiR95gj05GRPiHUIvy-0yC5QxYks1DYCwBQ9EbDoRkvzQONQXkiTvcIxss0MTrTJ_imn43q1SXq4i6yirMMHvXzaOe1tc73l1-DwYCdo-A5Job44SsyoLVfvxQk8RrYsNLdHMJ5z5xy5Dt-OU32Lh6T016ybQAnFnsY5OR4V_ywgk1vYEuO8IqibYRdjdV6-uh4dO_gUapCxmGv0C0gmkFqnvR2DahQx2Jy"
];

function ItemCard({ item }) {
  const { items, addItem, updateQty } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const qty = cartItem?.qty || 0;

  const handleAdd = () => addItem(item);
  const imgSrc = item.image || fallbackImages[item.id % fallbackImages.length];

  return (
    <div className="flex gap-4 bg-surface-container-lowest p-3 rounded-2xl shadow-sm border border-outline-variant/5">
      <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden">
        <img className="w-full h-full object-cover" alt={item.name} src={imgSrc} />
      </div>
      <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-on-surface truncate">{item.name}</h3>
            <span className="text-primary font-extrabold flex-shrink-0">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-on-surface-variant text-xs mt-1 leading-relaxed line-clamp-2">{item.description}</p>
        </div>
        <div className="flex justify-end mt-2">
          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                أضف
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center bg-surface-container rounded-lg px-2 py-1 gap-3"
              >
                <button onClick={() => updateQty(item.id, qty - 1)} className="text-primary font-black"><span className="material-symbols-outlined text-sm">remove</span></button>
                <span className="text-sm font-bold w-4 text-center">{qty}</span>
                <button onClick={() => addItem(item)} className="text-primary font-black"><span className="material-symbols-outlined text-sm">add</span></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setTable, totalItems, totalPrice } = useCart();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const tableNum = searchParams.get('table') || '3';

  useEffect(() => {
    setTable(tableNum);
  }, [tableNum]);

  const filtered = menuItems.filter(i => i.categoryId === activeCategory);

  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased pb-32 min-h-screen" dir="rtl">
        {/* Hero Section & Restaurant Header */}
        <header className="relative w-full h-64">
          <div className="absolute inset-0 overflow-hidden">
            <img className="w-full h-full object-cover" alt="Restaurant Background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD53zfUGzDe7kR1W0hwjxFiAOYsokxbAxPlKqkuczOUx6u9iLB660dN-8jMoWFKu2CsWdzg4IcaDJKaG2NiSvNzPDaj3Ro9ReIU6iNl6p8Isgb4TdJzJ8i7Z_Z5FmlOshmEwn5kJ05UNPBjebn02nbnaiW94GeGWI_fwHXIGYv0_GiTrmnko0UDv6ljobusUUb0httcLxhw60R8_HocytzYYByRmZTyHSonTIpJMtMzQdHoG2nKjy0S65zxkTF9stemuFAa73k_VE_g" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-surface"></div>
          </div>
          
          {/* Table Badge */}
          <div className="absolute top-6 left-6 z-10">
            <div className="bg-primary text-on-primary px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">table_restaurant</span>
              <span className="font-bold text-sm tracking-tight">الطاولة {tableNum}</span>
            </div>
          </div>

          {/* Logo & Branding */}
          <div className="absolute -bottom-10 right-6 flex items-end gap-4 z-20">
            <div className="w-24 h-24 rounded-full border-4 border-surface overflow-hidden shadow-xl bg-white">
              <img className="w-full h-full object-cover" alt="Restaurant Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDicNTS1i8-2fxUxIMtCCYVVId_WG0hUmdnQskWZHqIBpAM3vqVeJFzcLdkwzp975kQR3oFIroTVYLwnmeAOxlRaXioqlCZRy3DIAJZ-cnNeKZ1OgAjhKZcPYY4cD1f-VAzK47i9-hV-0KzcHoBlJBzANJCNc8cTCfNBCpKUzo9JVl0PCN0vUFcaIlj7754IqWdcQb11AlAVPNIkMP81SUQld4b9QOnoq1pMq23gmlXtE9wE6fKeqQ4ZZdea9TIlXB69TYmnXKb_6l7" />
            </div>
            <div className="pb-2">
              <h1 className="text-2xl font-black text-on-surface tracking-tighter">لا كوزينا</h1>
              <p className="text-secondary text-sm font-medium">مأكولات إيطالية فاخرة</p>
            </div>
          </div>
        </header>

        {/* Content Spacing */}
        <div className="mt-16 px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">قائمة الطعام</h2>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
            </div>
            <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          {/* Category Sticky Slider */}
          <nav className="sticky top-4 z-30 mb-8 -mx-6 px-6 overflow-x-auto hide-scrollbar flex gap-3 py-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium text-sm transition-all text-center border ${
                  activeCategory === cat.id 
                    ? 'bg-primary text-on-primary font-bold shadow-md shadow-primary/20 border-transparent' 
                    : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/10 shadow-sm'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>

          {/* Menu Items List */}
          <div className="space-y-6">
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ItemCard item={item} />
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-secondary">
                لا توجد أصناف في هذا القسم حالياً
              </div>
            )}
          </div>
        </div>

        {/* Floating Cart Bar */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="fixed bottom-24 md:bottom-6 left-6 right-6 z-50 md:max-w-md md:mx-auto"
            >
              <button 
                onClick={() => navigate('/cart')}
                className="w-full bg-primary-container text-on-primary-container p-4 rounded-2xl shadow-2xl flex items-center justify-between active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <span className="material-symbols-outlined">shopping_basket</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-base leading-none">عرض الطلب</p>
                    <p className="text-white/80 text-[10px] mt-1">{totalItems} أصناف في السلة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-8 w-px bg-white/20"></span>
                  <span className="text-lg font-black tracking-tight">${totalPrice.toFixed(2)}</span>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom App Bar (Subtle Backdrop) */}
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface via-surface to-transparent pointer-events-none z-30"></div>

        {/* Navigation Mirroring SideNav Labels for Consistency */}
        <footer className="fixed bottom-0 w-full glass-nav border-t border-outline-variant/10 px-6 py-3 flex items-center justify-between md:hidden z-40">
          <button onClick={() => navigate('/menu')} className="flex flex-col items-center gap-1 text-primary w-16">
            <span className="material-symbols-outlined flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
            <span className="text-[10px] font-bold">المنيو</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-secondary w-16">
            <span className="material-symbols-outlined flex-shrink-0">receipt_long</span>
            <span className="text-[10px] font-bold">الطلبات</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-secondary w-16">
            <span className="material-symbols-outlined flex-shrink-0">person</span>
            <span className="text-[10px] font-bold">حسابي</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-secondary w-16">
            <span className="material-symbols-outlined flex-shrink-0">help</span>
            <span className="text-[10px] font-bold">مساعدة</span>
          </button>
        </footer>
      </div>
    </PageTransition>
  );
}

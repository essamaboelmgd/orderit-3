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

/* ─── Item Card ─── */
function ItemCard({ item, index }) {
  const { items, addItem, updateQty, updateNote } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const qty = cartItem?.qty || 0;
  const imgSrc = item.image || fallbackImages[item.id % fallbackImages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 bg-surface-container-lowest p-3 rounded-2xl shadow-sm border border-outline-variant/5"
    >
      <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden">
        <img className="w-full h-full object-cover" alt={item.name} src={imgSrc} />
      </div>
      <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-on-surface truncate">{item.name}</h3>
            <span className="text-primary font-extrabold flex-shrink-0">{item.price.toFixed(2)} ج.م</span>
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
                onClick={() => addItem(item)}
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
                className="flex flex-col gap-2 items-end w-full mt-2"
              >
                <div className="flex items-center bg-surface-container rounded-lg px-2 py-1 gap-3">
                  <button onClick={() => updateQty(item.id, qty - 1)} className="text-primary font-black">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{qty}</span>
                  <button onClick={() => addItem(item)} className="text-primary font-black">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="ملاحظة للمطبخ (اختياري)..."
                  value={cartItem.note || ''}
                  onChange={(e) => updateNote(item.id, e.target.value)}
                  className="w-full text-xs bg-surface-container-low border border-outline-variant/10 rounded-lg p-2 focus:border-primary outline-none text-right placeholder:text-secondary"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function MenuPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setTable, totalItems, totalPrice } = useCart();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const tableNum = searchParams.get('table') || '3';

  useEffect(() => {
    setTable(tableNum);
  }, [tableNum]);

  // Filter: if searching, ignore category and search across all items
  const filtered = searchQuery.trim()
    ? menuItems.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (i.description && i.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : menuItems.filter(i => i.categoryId === activeCategory);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <PageTransition>
      {/* 
        pb-24 = breathing room so last menu item is never hidden under the cart bar.
        No bottom nav exists, so bottom-6 on the cart bar is fine.
      */}
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-24" dir="rtl">

        {/* ── Hero / Restaurant Header ── */}
        <header className="relative w-full h-64">
          <div className="absolute inset-0 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="Restaurant Background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD53zfUGzDe7kR1W0hwjxFiAOYsokxbAxPlKqkuczOUx6u9iLB660dN-8jMoWFKu2CsWdzg4IcaDJKaG2NiSvNzPDaj3Ro9ReIU6iNl6p8Isgb4TdJzJ8i7Z_Z5FmlOshmEwn5kJ05UNPBjebn02nbnaiW94GeGWI_fwHXIGYv0_GiTrmnko0UDv6ljobusUUb0httcLxhw60R8_HocytzYYByRmZTyHSonTIpJMtMzQdHoG2nKjy0S65zxkTF9stemuFAa73k_VE_g"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-surface" />
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
              <img
                className="w-full h-full object-cover"
                alt="Restaurant Logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDicNTS1i8-2fxUxIMtCCYVVId_WG0hUmdnQskWZHqIBpAM3vqVeJFzcLdkwzp975kQR3oFIroTVYLwnmeAOxlRaXioqlCZRy3DIAJZ-cnNeKZ1OgAjhKZcPYY4cD1f-VAzK47i9-hV-0KzcHoBlJBzANJCNc8cTCfNBCpKUzo9JVl0PCN0vUFcaIlj7754IqWdcQb11AlAVPNIkMP81SUQld4b9QOnoq1pMq23gmlXtE9wE6fKeqQ4ZZdea9TIlXB69TYmnXKb_6l7"
              />
            </div>
            <div className="pb-2">
              <h1 className="text-2xl font-black text-on-surface tracking-tighter">لا كوزينا</h1>
              <p className="text-secondary text-sm font-medium">مأكولات إيطالية فاخرة</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mt-16 px-4">

          {/* Title + Search */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">قائمة الطعام</h2>
              <div className="w-12 h-1 bg-primary rounded-full" />
            </div>
            <motion.button
              onClick={() => {
                setSearchOpen(prev => !prev);
                if (searchOpen) setSearchQuery('');
              }}
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <span className="material-symbols-outlined">
                {searchOpen ? 'close' : 'search'}
              </span>
            </motion.button>
          </div>

          {/* Expandable Search Input */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden px-2"
              >
                <div className="relative">
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none">
                    search
                  </span>
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن طبق..."
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-3 pr-10 pl-4 text-sm text-right outline-none focus:border-primary transition-colors placeholder:text-secondary"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Sticky Category Bar ── */}
          {!searchQuery.trim() && (
            <div className="sticky top-0 z-30 -mx-4 mb-6">
              {/* Frosted glass backing */}
              <div className="bg-surface/85 backdrop-blur-md border-b border-outline-variant/10 shadow-sm">
                <div
                  className="flex gap-2.5 overflow-x-auto hide-scrollbar px-4 py-3"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`
                        relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold
                        transition-all duration-200 flex-shrink-0
                        ${activeCategory === cat.id
                          ? 'bg-primary text-on-primary shadow-md shadow-primary/25'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }
                      `}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Menu Items ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-4 px-2"
            >
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 text-secondary"
                >
                  <span className="material-symbols-outlined text-5xl block mb-3 opacity-30">search_off</span>
                  <p className="font-medium">لا توجد نتائج</p>
                  <p className="text-xs mt-1 opacity-60">جرّب كلمة بحث مختلفة</p>
                </motion.div>
              ) : (
                filtered.map((item, i) => (
                  <ItemCard key={item.id} item={item} index={i} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Floating Cart Bar ──
            Always bottom-6, no bottom nav to worry about.
            pb-24 on the page ensures last item scrolls clear of this bar.
        */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed bottom-6 left-4 right-4 z-50 md:max-w-md md:left-1/2 md:-translate-x-1/2"
            >
              <motion.button
                onClick={() => navigate('/cart')}
                className="w-full bg-primary text-on-primary p-4 rounded-2xl shadow-2xl flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <span className="material-symbols-outlined">shopping_basket</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-base leading-none">عرض الطلب</p>
                    <p className="text-white/70 text-[10px] mt-1">{totalItems} أصناف في السلة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-8 w-px bg-white/25" />
                  <span className="text-lg font-black tracking-tight">{totalPrice.toFixed(2)} ج.م</span>
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

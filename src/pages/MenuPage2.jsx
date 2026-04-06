import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useCart } from '../context/CartContext';
import { categories, menuItems } from '../data/dummyData';

const fallbackImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA0QGQIUT8xHM6Htshv_va9-7dxrLhudRv7oKhsBKawBgi4ytaAIZOirbfeJYZeq5xTiIYm7KPvPn4eqBlAtiGgXoomzR3O2Pv1tn6eSxh4vr0dHzgqY35HCl3DZI1wxJqLqbaMrY-dJ12qQntK8PFzBqjVxHv2O6cjBVeDReKLI_qjvrqU2zEu4l5x0spcDk3vmH3DSMowH3qjy0sY_pBKcaBY0sG1WEhnXB63KvMbuWULI6HorT06k6LX35teoGInhI1AXiY1iNWV",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDKh3FY4pRCUs5fwl4x4fkjRvgLgl0yNHcSLW9ore28eh_oIdDcKl1nN7gRtODX0imojFjdYVaxp3Q2Ala9fHhsM62HKk7A-34QBWoE0untHp972f4n0sQM9Rvxkj9Ph10OmgDlYevorIo31momrW6-bHJdl_M4OmYc7QPSDXGbeD2qE-Hgp7APYblMcUMDGBqyvGhOMV92UcSKmbHBcP91OVaukY0kfriI-GX4m8bsUA_WiW9OUdxV6gNpanvP6RSIza6O6bJLKYgN",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAtZL3dHnTX-VNpMqJtLQUChcN67EvmiUCZ_VlDvmHm7-UrcHiiFwfJoIOjg0dhNpWzRw2oBwYY0tOx3paVQ-K4Hs4B1ZOrC38XHcXYJ-qlnNmhbyKZj9JjyLgK5DUJRAzQVO83ua5bnzBQMD_rF5LQeWdauB2qkGQadt8a2glPD0th84ALgESrIqeIcpIF2huEEsPej1o0xhdlJTNFB_oFqwIG3OcglzxfLqsCPWWTTyR1TzZbmOfm9Lj6afWzEMJjkTfSW9i6yV1U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD9RR9DI3uSUW7E5KQIQbc7Ck443lI50VCmOo6U829RmEOCuCurvwPHHosERAaqJ9sH3m8lqVTjE77ZOkQDcSEnfA9hgHApNIYXVOLCVHol9XEQW2wSrd5Nip0S7T9yuH1RGp2-JyBaUF1OcQzWsOLH4tSyfbH5r_kbU5rp2205hkkzKoThtuuxMhP-zLVLyfAYJwGT8OWnMoXK9HTsH5M4ygF3YXjp3wZa0IxbsF18hR8DmRgcqgkSmjWE7CE621pTBmwZQpAMNRst"
];

function ItemCard({ item }) {
  const { items, addItem, updateQty, updateNote } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const qty = cartItem?.qty || 0;

  const handleAdd = () => addItem(item);
  const imgSrc = item.image || fallbackImages[(item.id - 1) % fallbackImages.length];

  return (
    <div className="bg-[#111111] rounded-xl overflow-hidden flex items-stretch group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] transition-all duration-300">
      <div className="w-32 sm:w-40 relative flex-shrink-0">
        <img className="absolute inset-0 w-full h-full object-cover" alt={item.name} src={imgSrc} />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow min-w-0">
        <div>
          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors truncate">{item.name}</h3>
          <p className="text-zinc-500 text-xs leading-[1.65] line-clamp-2">{item.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-primary font-black text-lg">{item.price.toFixed(2)} ر.س</span>
          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAdd}
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-white">add</span>
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col gap-2 items-end w-max mt-2"
              >
                <div className="flex items-center gap-2 bg-[#222] rounded-lg px-2 h-10 w-full justify-between">
                  <button onClick={() => updateQty(item.id, qty - 1)} className="text-primary flex items-center justify-center h-full w-4"><span className="material-symbols-outlined text-sm">remove</span></button>
                  <span className="text-white font-bold w-4 text-center">{qty}</span>
                  <button onClick={() => addItem(item)} className="text-primary flex items-center justify-center h-full w-4"><span className="material-symbols-outlined text-sm">add</span></button>
                </div>
                <input 
                  type="text" 
                  placeholder="ملاحظة للمطبخ..." 
                  value={cartItem.note || ''}
                  onChange={(e) => updateNote(item.id, e.target.value)}
                  className="w-[120px] text-[10px] bg-[#222] border border-white/5 rounded-lg p-1.5 focus:border-primary outline-none text-right placeholder-zinc-500 text-white" 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage2() {
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
      <div className="bg-[#1c1b1b] text-white selection:bg-primary selection:text-white antialiased rtl-layout font-sans min-h-screen" dir="rtl">
        <main className="max-w-2xl mx-auto relative pb-32">
          
          {/* Hero Section */}
          <header className="relative h-72 w-full overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover" alt="Restaurant Background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqIPbqt29G5PNasWVZ8EfUV83e_PhJHI01EX7UvRfnVNHoSJ9QM32bKIeSOpLz-73JwvuI70L15d9bFypIApofmEZgvKc9tZ8W4ACknoX8kLsg9Nmw4awBeBMuEbK0PlpCQBAMJX6lf1YHJq4zmxCJGU4JHtNWGejeH1ul1kiv-nbkkyKDvdDneEqmVYFIQzOJUxmOTIfDkoxRk24AlUlHOJQnYWYZ7s5HgXPfgEY-OXldy-bzF7UFyLxzrys01zJOICR4svUoqa7W" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(28,27,27,1) 90%)' }}></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-1 shadow-2xl mb-4 border-2 border-primary">
                <img className="w-full h-full rounded-full object-cover" alt="Restaurant Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqsuFk4FO7_MJXVfuJtiyANcDmuYRJMJs5D_5jFhoupzUez7omCz6Icu-VWm2DgUBr3Dhs9Ab_kox8LG3_--qqDwWEMW3QNVthXa07lHPwAFyOj8qR9pVd5_F-lrgLj7nKM39Os3K1V5HiB34aBZXINTQVK39L-5NFwy8fg_wJAPAWoMi4GBGZqHKHP3aWVOyXODcPjNPKKGEbdg_2faeC5BEMtDDqc8dnMWmmhJWrlXQh22VesVtOdsb91cTyDgt1cFoPRB1d-73b" />
              </div>
              <h1 className="text-3xl font-black tracking-tight mb-2">Vitality Eats</h1>
              <div className="bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-1 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>table_restaurant</span>
                <span className="text-sm font-bold tracking-widest uppercase">طاولة {tableNum}</span>
              </div>
            </div>
          </header>

          {/* Category Tabs */}
          <nav className="sticky top-0 z-40 bg-[#1c1b1b]/95 backdrop-blur-xl py-4 px-6 overflow-x-auto hide-scrollbar border-b border-white/5">
            <div className="flex items-center gap-3 whitespace-nowrap">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-primary text-white shadow-[0_4px_12px_rgba(187,0,20,0.3)]' 
                      : 'bg-inverse-surface text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Menu Section */}
          <div className="p-6 space-y-8">
            <section>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 border-r-4 border-primary pr-3">
                {categories.find(c => c.id === activeCategory)?.name || 'الأطباق المميزة'}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {filtered.map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                    <ItemCard item={item} />
                  </motion.div>
                ))}
                
                {filtered.length === 0 && (
                  <div className="text-center py-12 text-zinc-500">
                    لا توجد أصناف في هذا القسم حالياً
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Floating Cart Bar */}
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div 
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                className="fixed bottom-6 left-6 right-6 z-50 md:max-w-xl md:mx-auto"
              >
                <div onClick={() => navigate('/cart')} className="bg-primary text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between ring-4 ring-[#1c1b1b] cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-black tracking-widest opacity-80">سلة الطلبات</div>
                      <div className="font-bold">{totalItems} أصناف • {totalPrice.toFixed(2)} ر.س</div>
                    </div>
                  </div>
                  <button className="bg-white text-primary px-6 py-2 rounded-xl font-black text-sm active:scale-95 transition-transform">
                    إتمام الطلب
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>
        
        {/* Footer - Simple & Focused */}
        <footer className="bg-[#111111] py-12 px-8 text-center border-t border-white/5">
          <p className="text-zinc-600 text-xs mb-4 leading-loose">© ٢٠٢٤ Editorial Vitality. جميع الحقوق محفوظة لـ فيتاليتي إيتس.<br/>خدمة مدعومة بتقنيات Kinetic Logistics.</p>
          <div className="flex justify-center gap-6 text-zinc-500 text-xs font-bold">
            <a className="hover:text-primary transition-colors" href="#">سياسة الخصوصية</a>
            <a className="hover:text-primary transition-colors" href="#">شروط الخدمة</a>
            <a className="hover:text-primary transition-colors" href="#">الدعم الفني</a>
          </div>
        </footer>
        
      </div>
    </PageTransition>
  );
}

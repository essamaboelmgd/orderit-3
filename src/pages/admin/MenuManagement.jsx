import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';
import { categories, menuItems } from '../../data/dummyData';

const fallbackImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBMBrKKpXD77OaeSmh0GZVrceiG-gzSch8f3dpfUNyYa76P5W_sqalm50Q7gj2iSzBcGiBMnol6_xbrad043_r8V4j50pRIFII7GjWYzS1u8pTA7T9m2WFFfAMhQnLyMWLWFsmHMHb9ZKTu9c_JFLPlv8aH0GgrYrRMuJx6idhTO_2My1og5YQb2QBKy4V7JcVDbkov61PFDxiymc2jso42sF_ZkcpNNfUo3C_Nua7fzQkusArwVLCcUkOxqQkB--4hjwnlm1YlxkQG",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAUSG8N0MVjp6fetpeoj6m03U-jOy7jDxUdY2CLHxGp4-27Iy7Fsf9g-ujIY5LpRjjjW-8pxgpL8GRtsfIveIv8o1hiaA6cpTsWLN17bwYBC7MqGLPs0p3Yn0O_t78uzT0k9_N1t77II_w8FrRrPa8kthViiwEq81hzLT6AJKEdpfQlvQ1RrJDJE_gDng3E9IijwDxXEDRJdFtFVVUKOWJGxmVXrWNhMAB3IPN5jzcDUceHMShRsP2bZQAekYihvXx16glsmvs6iPdj",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAyDgvdvB5altqJ_HGq9wrteAKeB0sN4r3HkiMiUCOIVbw3_1aVr6bZSuQv0rdkYCI4kzalEAz89bDwL6q4953RYnJYEKhF-pF3i9EmkP2NJPCcM4r7zWI61XjOywfYsqn0XKlTXBT0OL30x0FzpCIIllWYmaWAJI1LOognff8Hf3J92A3uy50fwKxHYqJsjE_BnJJMRhkWdVo8RNfZ-bnBAOinlITDFqT-o0iAYExUfj5NbF2CU3CI1An9rq8i7dBzAN7Z8oXiOeRo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAIUboAE5DjmuYHVSrcFC6H4AgW_Wv_KEWpGwIB6uoWojI8kfqOgk0kL3tjZLssZ2BWQ6OaNPohdc7K4C85vQ5prM332mk1kQeo0i1mSE5gPPawg4XZ7kNmw5ZhssU7O6ptEdHBc7dN2G6OZfAqGYUXU_Vi7AVxT1CU42fcQ2Ly-h_XrhcFjCuKfbX-2nHlol9C8clbpFSSxqUADPK1z1ZwjUkmhdiWazujQUnXA3SiCbj3kNnY9BUqWgm0SgW4PJFg5vyRgL_ihLA4"
];

function ItemModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || { name: '', nameEn: '', description: '', price: '', categoryId: categories[0].id, available: true });
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-surface rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100">
          <h3 className="text-xl font-bold font-headline">{item ? 'تعديل صنف' : 'إضافة صنف جديد'}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Upload */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">صورة الصنف</label>
            <div className="aspect-video bg-surface-container-low rounded-xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center gap-2 group hover:border-primary transition-colors cursor-pointer overflow-hidden relative">
              <span className="material-symbols-outlined text-4xl text-neutral-400 group-hover:text-primary">upload_file</span>
              <p className="text-xs font-bold text-neutral-500">رفع صورة (400x300)</p>
            </div>
            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">الفئة</label>
                <select
                  value={form.categoryId}
                  onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))}
                  className="w-full bg-surface-container-low border-none rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20"
                >
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                <span className="text-sm font-bold">حالة التوفر</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={form.available} onChange={() => setForm(p => ({ ...p, available: !p.available }))} />
                  <div className="w-10 h-5 bg-neutral-300 rounded-full peer peer-checked:bg-tertiary-container after:content-[''] after:absolute after:top-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:-translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">الاسم (عربي)</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-surface-container-low border-none rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20"
                placeholder="مثال: حمص بيروتي"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Name (English)</label>
              <input
                type="text"
                value={form.nameEn || ''}
                onChange={e => setForm(p => ({ ...p, nameEn: e.target.value }))}
                className="w-full bg-surface-container-low border-none rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 font-['Inter']"
                dir="ltr"
                placeholder="Ex: Hummus Beiruti"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">السعر (ر.س)</label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                className="w-full bg-surface-container-low border-none rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 font-['Inter']"
                dir="ltr"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">الوصف</label>
              <textarea
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                className="w-full bg-surface-container-low border-none rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20"
                placeholder="وصف موجز للصنف..."
                rows="4"
              />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-neutral-50 flex flex-row-reverse gap-3">
          <button onClick={() => { onSave(form); onClose(); }} className="bg-primary text-on-primary px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition-all">حفظ الصنف</button>
          <button onClick={onClose} className="text-neutral-500 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-neutral-200 transition-all">إلغاء</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MenuManagement() {
  const navigate = useNavigate();
  const [items, setItems] = useState(menuItems);
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const filtered = items.filter(i => i.categoryId === activeCat);
  const currentCategory = categories.find(c => c.id === activeCat);

  const toggleAvailability = (item) => {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, available: !i.available } : i));
  };

  const handleSave = (form) => {
    if (editItem) {
      setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...form } : i));
    } else {
      setItems(prev => [...prev, { ...form, id: Date.now(), price: Number(form.price) }]);
    }
    setEditItem(null);
  };

  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-16 md:pb-0 font-body" dir="rtl">
        <AdminSidebar />
        
        <main className="md:mr-64 min-h-screen flex flex-col transition-all">
          {/* TopAppBar Integration */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-sm px-6 py-3 flex flex-row-reverse items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="relative group">
                <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO3HYy-dYZdoqtHEeeNsO2l4kkHRZO7unIp_jCT6Nm66BZ2tUVObgKx55UBSIj2azB50aiCcTLm_coacDiq2xNQnO9zu3tDtDcHfTJVx-vus-BNdWij98yY0hMjCXFcLCV5gjX7See_eAWPX1IBqb1btS4gdhIx0_5xqt7VaqlfLiOduy2Ko-YsLB76LIsPHSL-Hsgh5mDqs7fYo9APY3j_KtXV2UXvM575lMKA52ZePLecHMAJHG9zb_Mdr0ubxYXZ284LuRdwI5C" />
              </div>
              <button className="p-2 hover:bg-neutral-50 rounded-full text-neutral-600 transition-colors active:scale-95">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 hover:bg-neutral-50 rounded-full text-neutral-600 transition-colors active:scale-95">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <div className="flex-1 flex justify-center md:justify-start px-8">
              <h1 className="text-2xl font-black text-primary tracking-tighter">Menu Management</h1>
            </div>
            <button className="md:hidden p-2 text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          {/* Page Content Canvas */}
          <div className="py-6 px-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full flex-grow text-right">
            
            {/* Dashboard Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black text-on-surface font-headline tracking-tight">إدارة القائمة</h2>
                <p className="text-on-surface-variant mt-2 font-medium">Menu Management &amp; Item Inventory</p>
              </div>
              <div className="flex gap-3">
                <span className="bg-tertiary-container text-on-tertiary-fixed px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  نظام متصل (Live)
                </span>
              </div>
            </div>

            {/* Split Layout Wrapper */}
            <div className="grid grid-cols-12 gap-8">
              {/* Left: Categories (Glass Sheet) */}
              <section className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-surface-container-low rounded-xl p-6 shadow-sm border-r-4 border-primary">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold font-headline">الأصناف (Categories)</h3>
                    <button className="text-primary hover:bg-primary-fixed p-1 rounded-lg transition-all">
                      <span className="material-symbols-outlined">add_circle</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {categories.map(cat => {
                      const isActive = activeCat === cat.id;
                      return (
                        <div 
                          key={cat.id} 
                          onClick={() => setActiveCat(cat.id)}
                          className={`flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer group ${
                            isActive 
                            ? 'bg-surface-container-lowest border border-primary/20 shadow-sm' 
                            : 'bg-surface-container-lowest/50 hover:bg-surface-container-lowest'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined cursor-grab ${isActive ? 'text-neutral-400' : 'text-neutral-300 group-hover:text-neutral-400'}`}>drag_indicator</span>
                            <div>
                              <p className={`font-bold ${isActive ? 'text-primary' : 'text-on-surface'}`}>{cat.name}</p>
                              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-label mt-0.5">{cat.id}</p>
                            </div>
                          </div>
                          <div className={`flex items-center gap-1 transition-opacity ${isActive ? '' : 'opacity-0 group-hover:opacity-100'}`}>
                            <button className="p-1.5 hover:bg-surface-container text-neutral-500 rounded-md"><span className="material-symbols-outlined text-lg">edit</span></button>
                            <button className="p-1.5 hover:bg-error-container text-error rounded-md"><span className="material-symbols-outlined text-lg">delete</span></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-primary-fixed rounded-xl p-6 text-on-primary-fixed">
                  <p className="text-xs uppercase tracking-widest font-bold mb-2">تحديث القائمة</p>
                  <p className="text-sm opacity-80 leading-relaxed">يمكنك سحب وإفلات التصنيفات لتغيير ترتيب ظهورها للعملاء في التطبيق المباشر.</p>
                </div>
              </section>

              {/* Right: Items Grid (Editorial Cards) */}
              <section className="col-span-12 lg:col-span-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold font-headline">{currentCategory?.name || 'الأصناف'} ({filtered.length} صنف)</h3>
                    <div className="flex items-center bg-surface-container-low px-3 py-1 rounded-full text-xs font-bold text-secondary">
                      عرض: الكل
                    </div>
                  </div>
                  <div className="relative">
                    <input className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-primary/20 text-sm w-full sm:w-64 shadow-sm" placeholder="بحث في الأصناف..." type="text" />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xl">search</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.map((item, i) => {
                    const imgSrc = item.image || fallbackImages[i % fallbackImages.length];
                    return (
                      <div key={item.id} className={`bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full border border-transparent hover:border-outline-variant/15 ${!item.available ? 'opacity-70' : ''}`}>
                        <div className={`h-48 overflow-hidden relative ${!item.available ? 'grayscale' : ''}`}>
                          <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={imgSrc} />
                          
                          {!item.available && (
                            <div className="absolute inset-0 bg-neutral-900/40 flex items-center justify-center pointer-events-none">
                              <span className="bg-white px-4 py-1 rounded-full text-xs font-black text-neutral-800 tracking-widest uppercase shadow-md">غير متوفر</span>
                            </div>
                          )}
                          
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md shadow-sm pointer-events-none">
                            <span className="text-primary font-black text-sm">{typeof item.price === 'number' ? item.price.toFixed(2) : item.price} ر.س</span>
                          </div>
                          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditItem(item); setShowModal(true); }} className="bg-white p-2 rounded-full shadow-lg text-neutral-600 hover:text-primary"><span className="material-symbols-outlined text-lg">edit</span></button>
                            <button onClick={() => setItems(prev => prev.filter(v => v.id !== item.id))} className="bg-white p-2 rounded-full shadow-lg text-neutral-600 hover:text-error"><span className="material-symbols-outlined text-lg">delete</span></button>
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-lg leading-none">{item.name}</h4>
                              <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-label">{item.nameEn || item.name}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={item.available || false} onChange={() => toggleAvailability(item)} />
                              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:bg-tertiary-container after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-[20px] after:right-[2px]"></div>
                            </label>
                          </div>
                          <p className="text-sm text-on-surface-variant line-clamp-2 mt-2 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
            
            {/* FAB: Add Item */}
            <button 
              onClick={() => { setEditItem(null); setShowModal(true); }}
              className="fixed bottom-24 md:bottom-8 left-8 bg-primary text-on-primary w-16 h-16 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all z-20"
            >
              <span className="material-symbols-outlined text-4xl">add</span>
            </button>
            
          </div>

          {/* Footer Integration */}
          <footer className="mt-auto w-full border-t border-neutral-200 bg-neutral-50 flex flex-col md:flex-row-reverse justify-between items-center px-8 py-12 gap-6 pb-24 md:pb-12 text-right">
            <div className="flex items-center gap-4 flex-row-reverse">
              <span className="text-lg font-black text-primary">OrderIt</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500">© 2026 OrderIt. All rights reserved.</span>
            </div>
            <div className="flex gap-8">
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Privacy Policy</a>
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Terms of Service</a>
              <a className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-600 transition-all" href="#">Help Center</a>
            </div>
          </footer>
        </main>
        
        <AnimatePresence>
          {showModal && (
            <ItemModal
              item={editItem}
              onClose={() => { setShowModal(false); setEditItem(null); }}
              onSave={handleSave}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

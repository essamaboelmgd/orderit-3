import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/axios';



function ItemModal({ item, onClose, onSave, categories, showAlert }) {
  const [activeTab, setActiveTab] = useState('basic');
  const [form, setForm] = useState(item || { 
    name_ar: '', 
    description_ar: '', 
    base_price: '', 
    category_id: categories[0]?.id || '', 
    is_available: true,
    name_en: '',
    description_en: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(item?.image_url || item?.image_path || item?.image || null);
  const [localItem, setLocalItem] = useState(item);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const [options, setOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  
  const [newOpt, setNewOpt] = useState({ name_ar: '', name_en: '', type: 'single', is_required: false });
  const [newValValues, setNewValValues] = useState({});

  const fetchOptions = async (itemId) => {
    setLoadingOptions(true);
    try {
      const res = await api.get(`/menu/menu_item_options?menu_item_id=${itemId}`);
      const opts = Array.isArray(res.data) ? res.data : [];
      const optsWithValues = await Promise.all(opts.map(async (opt) => {
        const valRes = await api.get(`/menu/menu_item_option_values?option_id=${opt.id}`);
        return { ...opt, values: Array.isArray(valRes.data) ? valRes.data : [] };
      }));
      setOptions(optsWithValues);
    } catch(e) {
      console.error("Error fetching options", e);
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'options' && localItem?.id) {
      fetchOptions(localItem.id);
    }
  }, [activeTab, localItem]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBasicSave = async () => {
    if (!localItem?.id && !imageFile) {
      showAlert('صورة المنتج مطلوبة', 'يرجى اختيار صورة للمنتج قبل الحفظ.', 'error');
      return;
    }
    
    setIsSaving(true);
    try {
      const saved = await onSave(form, imageFile, localItem);
      setLocalItem(saved);
      showAlert('تم الحفظ', 'تم حفظ بيانات المنتج بنجاح!', 'success');
    } catch(e) {
       console.error("Save error", e);
       showAlert('خطأ', 'حدث خطأ أثناء حفظ المنتج.', 'error');
    } finally {
       setIsSaving(false);
    }
  };

  const handleAddOption = async () => {
    if (!newOpt.name_ar) return;
    try {
      const payload = { ...newOpt, name_en: newOpt.name_en || newOpt.name_ar, menu_item_id: localItem.id, display_order: options.length };
      const res = await api.post('/menu/menu_item_options', payload);
      setOptions([...options, { ...res.data, values: [] }]);
      setNewOpt({ name_ar: '', name_en: '', type: 'single', is_required: false });
    } catch(e) {
      console.error("Error adding option", e);
    }
  };

  const handleAddValue = async (optionId) => {
    const valForm = newValValues[optionId];
    if (!valForm || !valForm.name_ar) return;
    try {
      const payload = {
        option_id: optionId,
        name_ar: valForm.name_ar,
        name_en: valForm.name_en || valForm.name_ar,
        price_modifier: Number(valForm.price_modifier || 0),
        is_default: false
      };
      const res = await api.post('/menu/menu_item_option_values', payload);
      setOptions(opts => opts.map(o => o.id === optionId ? { ...o, values: [...o.values, res.data] } : o));
      setNewValValues(prev => ({ ...prev, [optionId]: { name_ar: '', name_en: '', price_modifier: '' } }));
    } catch(e) {
      console.error("Error adding value", e);
    }
  };

  const handleDeleteOption = async (optId) => {
    try {
      await api.delete(`/menu/menu_item_options/${optId}`);
      setOptions(opts => opts.filter(o => o.id !== optId));
    } catch (error) {
      console.error("Error deleting option", error);
    }
  };

  const handleDeleteValue = async (optId, valId) => {
    try {
      await api.delete(`/menu/menu_item_option_values/${valId}`);
      setOptions(opts => opts.map(o => o.id === optId ? { ...o, values: o.values.filter(v => v.id !== valId) } : o));
    } catch (error) {
      console.error("Error deleting value", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-surface rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()} dir="rtl"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100 flex-shrink-0">
          <h3 className="text-xl font-bold font-headline">{localItem ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-neutral-100 px-6 bg-white flex-shrink-0 gap-4">
          <button onClick={() => setActiveTab('basic')} className={`py-3 px-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'basic' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}>البيانات الأساسية</button>
          <div className="relative group flex items-center">
            <button onClick={() => setActiveTab('options')} disabled={!localItem?.id} className={`py-3 px-4 text-sm font-bold border-b-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === 'options' ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}>الخيارات والإضافات</button>
            {!localItem?.id && (
              <div className="absolute top-full mt-2 w-48 text-xs bg-neutral-800 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                يرجى حفظ بيانات المنتج أولاً لتتمكن من إضافة خيارات.
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-surface-container-lowest">
          {activeTab === 'basic' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Upload */}
              <div className="lg:col-span-4 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">صورة المنتج</label>
                <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-surface-container-low rounded-xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center gap-2 group hover:border-primary transition-colors cursor-pointer overflow-hidden relative">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-neutral-400 group-hover:text-primary">upload_file</span>
                      <p className="text-xs font-bold text-neutral-500">رفع صورة المنتج</p>
                    </>
                  )}
                  <input type="file" className="hidden" ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
                </div>
                
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">الصنف (الفئة)</label>
                    <select value={form.category_id} onChange={e => setForm(p => ({ ...p, category_id: e.target.value }))} className="w-full bg-surface border border-outline-variant/30 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none">
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name_ar || c.name_en}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface border border-outline-variant/30 rounded-lg">
                    <span className="text-sm font-bold">متاح للطلب؟</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={form.is_available} onChange={() => setForm(p => ({ ...p, is_available: !p.is_available }))} />
                      <div className="w-10 h-5 bg-neutral-300 rounded-full peer peer-checked:bg-primary after:absolute after:top-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:-translate-x-5"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right: Fields */}
              <div className="lg:col-span-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">اسم المنتج (عربي)</label>
                    <input type="text" value={form.name_ar} onChange={e => setForm(p => ({ ...p, name_ar: e.target.value }))} className="w-full bg-surface border border-outline-variant/30 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="مثال: بيتزا مارجريتا" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">اسم المنتج (إنجليزي)</label>
                    <input type="text" dir="ltr" value={form.name_en} onChange={e => setForm(p => ({ ...p, name_en: e.target.value }))} className="w-full bg-surface border border-outline-variant/30 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Margherita Pizza" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">الوصف (عربي)</label>
                    <textarea value={form.description_ar} onChange={e => setForm(p => ({ ...p, description_ar: e.target.value }))} className="w-full bg-surface border border-outline-variant/30 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="وصف موجز للمنتج..." rows="3" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">الوصف (إنجليزي)</label>
                    <textarea dir="ltr" value={form.description_en} onChange={e => setForm(p => ({ ...p, description_en: e.target.value }))} className="w-full bg-surface border border-outline-variant/30 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Product description..." rows="3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">السعر الأساسي (ج.م)</label>
                  <input type="number" value={form.base_price} onChange={e => setForm(p => ({ ...p, base_price: e.target.value }))} className="w-full sm:w-1/2 bg-surface border border-outline-variant/30 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 font-['Inter'] outline-none" dir="ltr" placeholder="0.00" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {loadingOptions ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-neutral-400">
                  <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
                  <p className="text-sm">جاري تحميل الإضافات...</p>
                </div>
              ) : (
                <>
                  {options.length === 0 && (
                    <div className="text-center py-8 text-neutral-400">لا توجد خيارات مضافة لهذا المنتج بعد. أضف خياراً جديداً بالأسفل.</div>
                  )}
                  {options.map(opt => (
                    <div key={opt.id} className="bg-surface border border-outline-variant/30 rounded-xl p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-4 border-b border-outline-variant/10 pb-3">
                        <div>
                          <h4 className="font-bold text-lg text-on-surface">{opt.name_ar} {opt.name_en ? <span className="text-sm font-normal text-secondary ml-1">({opt.name_en})</span> : ''}</h4>
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md mt-1 inline-block">
                            {opt.type === 'multiple' ? 'متعدد الاختيار' : 'اختيار واحد'} • {opt.is_required ? 'إجباري' : 'اختياري'}
                          </span>
                        </div>
                        <button onClick={() => handleDeleteOption(opt.id)} className="text-error hover:bg-error-container p-2 rounded-lg transition-colors" title="حذف الخيار"><span className="material-symbols-outlined text-xl">delete</span></button>
                      </div>
                      
                      <div className="space-y-2 mb-5">
                        {opt.values.map(v => (
                          <div key={v.id} className="flex justify-between items-center bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10">
                            <span className="text-sm font-bold text-on-surface">{v.name_ar} {v.name_en ? <span className="text-xs font-normal text-secondary">- {v.name_en}</span> : ''}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md" dir="ltr">+{parseFloat(v.price_modifier).toFixed(2)} EGP</span>
                              <button onClick={() => handleDeleteValue(opt.id, v.id)} className="text-neutral-400 hover:text-error transition-colors p-1" title="حذف الإضافة"><span className="material-symbols-outlined text-sm">close</span></button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Value Form */}
                      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                        <input type="text" placeholder="اسم الإضافة (عربي) *" className="flex-1 bg-white border border-outline-variant/30 rounded-lg text-sm px-3 py-2 outline-none focus:border-primary" value={newValValues[opt.id]?.name_ar || ''} onChange={e => setNewValValues(p => ({ ...p, [opt.id]: { ...p[opt.id], name_ar: e.target.value } }))} />
                        <input type="text" placeholder="إنجليزي (اختياري)" className="flex-1 bg-white border border-outline-variant/30 rounded-lg text-sm px-3 py-2 outline-none focus:border-primary" dir="ltr" value={newValValues[opt.id]?.name_en || ''} onChange={e => setNewValValues(p => ({ ...p, [opt.id]: { ...p[opt.id], name_en: e.target.value } }))} />
                        <div className="flex items-center gap-2">
                          <input type="number" placeholder="السعر (+)" className="w-24 bg-white border border-outline-variant/30 rounded-lg text-sm px-3 py-2 outline-none focus:border-primary" dir="ltr" value={newValValues[opt.id]?.price_modifier || ''} onChange={e => setNewValValues(p => ({ ...p, [opt.id]: { ...p[opt.id], price_modifier: e.target.value } }))} />
                          <button onClick={() => handleAddValue(opt.id)} disabled={!newValValues[opt.id]?.name_ar} className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"><span className="material-symbols-outlined">add</span></button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Option Form */}
                  <div className="bg-primary/5 rounded-xl p-5 border border-dashed border-primary/40 mt-8">
                    <h4 className="font-bold text-sm mb-4 text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">add_circle</span>
                      إنشاء مجموعة إضافات جديدة (مثل: الحجم، نوع الخبز)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <input type="text" placeholder="اسم المجموعة (عربي) *" className="bg-white border border-outline-variant/30 rounded-lg text-sm px-3 py-2 outline-none focus:border-primary" value={newOpt.name_ar} onChange={e => setNewOpt(p => ({ ...p, name_ar: e.target.value }))} />
                      <input type="text" placeholder="إنجليزي (اختياري)" className="bg-white border border-outline-variant/30 rounded-lg text-sm px-3 py-2 outline-none focus:border-primary" dir="ltr" value={newOpt.name_en} onChange={e => setNewOpt(p => ({ ...p, name_en: e.target.value }))} />
                      <select value={newOpt.type} onChange={e => setNewOpt(p => ({ ...p, type: e.target.value }))} className="bg-white border border-outline-variant/30 rounded-lg text-sm px-3 py-2 outline-none focus:border-primary">
                        <option value="single">اختيار واحد (Single)</option>
                        <option value="multiple">متعدد الاختيار (Multiple)</option>
                      </select>
                      <label className="flex items-center gap-3 bg-white border border-outline-variant/30 rounded-lg px-4 py-2 cursor-pointer select-none hover:bg-neutral-50 transition-colors">
                        <input type="checkbox" checked={newOpt.is_required} onChange={e => setNewOpt(p => ({ ...p, is_required: e.target.checked }))} className="w-4 h-4 text-primary rounded" />
                        <span className="text-sm font-bold text-neutral-600">إجباري للعميل</span>
                      </label>
                    </div>
                    <button onClick={handleAddOption} disabled={!newOpt.name_ar} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold disabled:opacity-50 hover:shadow-lg transition-all active:scale-95">إضافة المجموعة</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-white border-t border-neutral-100 flex flex-row-reverse gap-3 flex-shrink-0">
          {activeTab === 'basic' ? (
            <button onClick={handleBasicSave} disabled={isSaving} className="bg-primary text-on-primary px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition-all flex gap-2 items-center">
              {isSaving ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : null}
              <span>حفظ البيانات الأساسية</span>
            </button>
          ) : (
            <button onClick={onClose} className="bg-primary text-on-primary px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition-all">الانتهاء والإغلاق</button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CategoryModal({ category, onClose, onSave }) {
  const [form, setForm] = useState(category || { name_ar: '', name_en: '' });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-surface rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()} dir="rtl"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100">
          <h3 className="text-xl font-bold font-headline">{category ? 'تعديل الصنف' : 'إضافة صنف جديد'}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">اسم الصنف (القسم)</label>
            <input type="text" value={form.name_ar} onChange={e => setForm(p => ({ ...p, name_ar: e.target.value, name_en: p.name_en || e.target.value }))} className="w-full bg-surface border border-outline-variant/30 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="مثال: مقبلات" autoFocus />
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

function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-surface rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100">
          <h3 className="text-xl font-bold font-headline text-error">تأكيد الحذف</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">delete_forever</span>
          </div>
          <p className="text-sm font-bold text-on-surface leading-relaxed">{message}</p>
        </div>
        <div className="px-6 py-4 bg-neutral-50 flex justify-center gap-3">
          <button onClick={() => { onConfirm(); onClose(); }} className="bg-error text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition-all">حذف نهائي</button>
          <button onClick={onClose} className="bg-neutral-200 text-neutral-700 px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-neutral-300 transition-all">إلغاء</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NotificationModal({ title, message, type, onClose }) {
  const isError = type === 'error';
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-surface rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100">
          <h3 className={`text-xl font-bold font-headline ${isError ? 'text-error' : 'text-primary'}`}>{title}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isError ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
            <span className="material-symbols-outlined text-3xl">{isError ? 'error' : 'check_circle'}</span>
          </div>
          <p className="text-sm font-bold text-on-surface leading-relaxed">{message}</p>
        </div>
        <div className="px-6 py-4 bg-neutral-50 flex justify-center">
          <button onClick={onClose} className={`text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition-all ${isError ? 'bg-error' : 'bg-primary'}`}>حسناً</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MenuManagement() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showCatModal, setShowCatModal] = useState(false);
  const [editCat, setEditCat] = useState(null);
  const [deleteCatId, setDeleteCatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const showAlert = (title, message, type = 'success') => {
    setNotification({ title, message, type });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, itemsRes] = await Promise.all([
          api.get('/menu/menu_categories'),
          api.get('/menu/menu_items')
        ]);
        const cats = Array.isArray(catsRes.data) ? catsRes.data : [];
        const itms = Array.isArray(itemsRes.data) ? itemsRes.data : [];
        
        setCategoryList(cats);
        setItems(itms);
        if (cats.length > 0) setActiveCat(cats[0].id);
      } catch (error) {
        console.error("Error fetching menu data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = items.filter(i => i.category_id === activeCat);
  const currentCategory = categoryList.find(c => c.id === activeCat);

  const toggleAvailability = async (item) => {
    try {
      const updatedItem = { ...item, is_available: !item.is_available };
      await api.put(`/menu/menu_items/${item.id}`, updatedItem);
      setItems(prev => prev.map(i => i.id === item.id ? updatedItem : i));
    } catch (error) {
      console.error("Error updating availability", error);
    }
  };

  const handleSave = async (form, imageFile, localItem) => {
    try {
      const { id, image_url, image_path, image, ...cleanForm } = form;
      const payload = { ...cleanForm, base_price: Number(form.base_price), stock_quantity: 0 };
      let savedItem;
      if (localItem && localItem.id) {
        const res = await api.put(`/menu/menu_items/${localItem.id}`, payload);
        savedItem = res.data;
      } else {
        const res = await api.post('/menu/menu_items', payload);
        savedItem = res.data;
      }

      if (imageFile && savedItem.id) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const imgRes = await api.post(`/menu/menu_items/${savedItem.id}/image`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        savedItem = imgRes.data;
      }

      setItems(prev => {
        const exists = prev.find(i => i.id === savedItem.id);
        if (exists) return prev.map(i => i.id === savedItem.id ? savedItem : i);
        return [...prev, savedItem];
      });
      return savedItem;
    } catch (error) {
      console.error("Error saving item", error);
      throw error;
    }
  };

  const handleSaveCategory = async (form) => {
    if (form.name_ar && form.name_ar.trim()) {
      try {
        if (editCat) {
          const { id, ...catData } = editCat;
          const res = await api.put(`/menu/menu_categories/${editCat.id}`, { ...catData, name_ar: form.name_ar.trim(), name_en: form.name_en.trim() || form.name_ar.trim() });
          setCategoryList(prev => prev.map(c => c.id === editCat.id ? res.data : c));
        } else {
          const payload = { name_ar: form.name_ar.trim(), name_en: form.name_en.trim() || form.name_ar.trim(), display_order: categoryList.length };
          const res = await api.post('/menu/menu_categories', payload);
          setCategoryList(prev => [...prev, res.data]);
          if (!activeCat) setActiveCat(res.data.id);
          showAlert('تم الحفظ', 'تم حفظ الصنف بنجاح!', 'success');
        }
      } catch (error) {
        console.error("Error saving category", error);
        showAlert('خطأ', 'حدث خطأ أثناء حفظ الصنف.', 'error');
      }
    }
  };

  const handleDeleteCategory = (catId) => setDeleteCatId(catId);
  const confirmDeleteCategory = async () => {
    if (!deleteCatId) return;
    try {
      await api.delete(`/menu/menu_categories/${deleteCatId}`);
      setCategoryList(prev => {
        const next = prev.filter(c => c.id !== deleteCatId);
        if (activeCat === deleteCatId) setActiveCat(next[0]?.id || null);
        return next;
      });
      setItems(prev => prev.filter(i => i.category_id !== deleteCatId));
      setDeleteCatId(null);
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await api.delete(`/menu/menu_items/${itemId}`);
        setItems(prev => prev.filter(v => v.id !== itemId));
      } catch (error) {
        console.error("Error deleting item", error);
      }
    }
  };

  return (
    <PageTransition>
      <div className="bg-surface text-on-surface antialiased min-h-screen pb-16 md:pb-0 font-body" dir="rtl">
        <AdminSidebar />
        <main className="md:mr-64 min-h-screen flex flex-col transition-all">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-sm px-6 py-3 flex flex-row-reverse items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="relative group">
                <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO3HYy-dYZdoqtHEeeNsO2l4kkHRZO7unIp_jCT6Nm66BZ2tUVObgKx55UBSIj2azB50aiCcTLm_coacDiq2xNQnO9zu3tDtDcHfTJVx-vus-BNdWij98yY0hMjCXFcLCV5gjX7See_eAWPX1IBqb1btS4gdhIx0_5xqt7VaqlfLiOduy2Ko-YsLB76LIsPHSL-Hsgh5mDqs7fYo9APY3j_KtXV2UXvM575lMKA52ZePLecHMAJHG9zb_Mdr0ubxYXZ284LuRdwI5C" />
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-start px-8">
              <h1 className="text-2xl font-black text-primary tracking-tighter">Menu Management</h1>
            </div>
            <button className="md:hidden p-2 text-primary"><span className="material-symbols-outlined">menu</span></button>
          </header>

          <div className="py-6 px-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full flex-grow text-right">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black text-on-surface font-headline tracking-tight">المنيو والمنتجات</h2>
                <p className="text-on-surface-variant mt-2 font-medium">إدارة الأصناف والمنتجات الخاصة بمطعمك</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
              <section className="col-span-12 lg:col-span-3 xl:col-span-3 space-y-6">
                <div className="bg-surface-container-low rounded-xl p-5 shadow-sm border-r-4 border-primary">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold font-headline">الأصناف</h3>
                    <button onClick={() => { setEditCat(null); setShowCatModal(true); }} className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-all" title="إضافة صنف جديد"><span className="material-symbols-outlined">add_circle</span></button>
                  </div>
                  <div className="space-y-2">
                    {categoryList.map(cat => {
                      const isActive = activeCat === cat.id;
                      return (
                        <div key={cat.id} onClick={() => setActiveCat(cat.id)} className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group ${isActive ? 'bg-white border border-primary/20 shadow-sm' : 'hover:bg-white/50 border border-transparent'}`}>
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-sm cursor-grab ${isActive ? 'text-neutral-400' : 'text-neutral-300 group-hover:text-neutral-400'}`}>drag_indicator</span>
                            <div>
                              <p className={`font-bold text-sm ${isActive ? 'text-primary' : 'text-on-surface'}`}>{cat.name_ar || cat.name_en}</p>
                            </div>
                          </div>
                          <div className={`flex items-center transition-opacity ${isActive ? '' : 'opacity-0 group-hover:opacity-100'}`}>
                            <button onClick={(e) => { e.stopPropagation(); setEditCat(cat); setShowCatModal(true); }} className="p-1 hover:bg-surface-container text-neutral-500 rounded"><span className="material-symbols-outlined text-sm">edit</span></button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }} className="p-1 hover:bg-error-container text-error rounded"><span className="material-symbols-outlined text-sm">delete</span></button>
                          </div>
                        </div>
                      );
                    })}
                    {categoryList.length === 0 && !loading && (
                      <p className="text-sm text-neutral-400 text-center py-4">لم تقم بإضافة أي أصناف بعد.</p>
                    )}
                  </div>
                </div>
              </section>

              <section className="col-span-12 lg:col-span-9 xl:col-span-9">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold font-headline">{currentCategory?.name_ar || currentCategory?.name_en || 'المنتجات'} ({filtered.length} منتج)</h3>
                  </div>
                  <div className="relative">
                    <input className="bg-white border border-outline-variant/30 rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-primary/20 text-sm w-full sm:w-64 shadow-sm outline-none" placeholder="بحث في المنتجات..." type="text" />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xl">search</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((item, i) => {
                    const imgSrc = item.image_url || item.image_path || item.image;
                    return (
                      <div key={item.id} className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col h-full border border-outline-variant/15 ${!item.is_available ? 'opacity-70' : ''}`}>
                        <div className={`h-40 overflow-hidden relative ${!item.is_available ? 'grayscale' : ''}`}>
                          {imgSrc ? (
                            <img alt={item.name_ar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={imgSrc} />
                          ) : (
                            <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center text-neutral-400 group-hover:bg-surface-container-highest transition-colors">
                              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">image_not_supported</span>
                              <span className="text-xs font-bold uppercase tracking-widest opacity-50">بدون صورة</span>
                            </div>
                          )}
                          {!item.is_available && (
                            <div className="absolute inset-0 bg-neutral-900/40 flex items-center justify-center pointer-events-none">
                              <span className="bg-white px-4 py-1 rounded-full text-xs font-black text-neutral-800 tracking-widest uppercase shadow-md">غير متوفر</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md shadow-sm pointer-events-none">
                            <span className="text-primary font-black text-sm">{typeof item.base_price === 'number' || !isNaN(parseFloat(item.base_price)) ? parseFloat(item.base_price).toFixed(2) : item.base_price} ج.م</span>
                          </div>
                          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditItem(item); setShowModal(true); }} className="bg-white p-2 rounded-full shadow-lg text-neutral-600 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                            <button onClick={() => handleDeleteItem(item.id)} className="bg-white p-2 rounded-full shadow-lg text-neutral-600 hover:text-error transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div><h4 className="font-bold text-base leading-tight">{item.name_ar || item.name_en}</h4></div>
                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                              <input type="checkbox" className="sr-only peer" checked={item.is_available ?? false} onChange={() => toggleAvailability(item)} />
                              <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:-translate-x-[16px] after:right-[2px]"></div>
                            </label>
                          </div>
                          <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">{item.description_ar || item.description_en}</p>
                        </div>
                      </div>
                    );
                  })}
                  {filtered.length === 0 && !loading && (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-neutral-400 bg-white rounded-xl border border-dashed border-outline-variant/30">
                      <span className="material-symbols-outlined text-5xl mb-3">restaurant_menu</span>
                      <p>لا توجد منتجات في هذا الصنف. اضغط على (+) للإضافة.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <button onClick={() => { 
                if(categoryList.length === 0) { alert("يرجى إضافة صنف أولاً."); return; }
                setEditItem(null); setShowModal(true); 
              }} 
              className="fixed bottom-24 md:bottom-8 left-8 bg-primary text-on-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20"
              title="إضافة منتج جديد"
            >
              <span className="material-symbols-outlined text-3xl">add</span>
            </button>
          </div>
        </main>

        <AnimatePresence>
          {showModal && <ItemModal item={editItem} categories={categoryList} onClose={() => { setShowModal(false); setEditItem(null); }} onSave={handleSave} showAlert={showAlert} />}
          {showCatModal && <CategoryModal category={editCat} onClose={() => { setShowCatModal(false); setEditCat(null); }} onSave={handleSaveCategory} />}
          {deleteCatId && <ConfirmModal message="هل أنت متأكد من حذف هذا الصنف؟ سيتم حذف جميع المنتجات المندرجة تحته بشكل نهائي." onClose={() => setDeleteCatId(null)} onConfirm={confirmDeleteCategory} />}
          {notification && <NotificationModal title={notification.title} message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

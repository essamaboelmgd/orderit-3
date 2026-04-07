// Dummy data for OrderIt demo

export const restaurant = {
  id: 'sakura-sushi',
  name: 'ساكورا سوشي',
  nameEn: 'Sakura Sushi',
  tagline: 'سوشي ومأكولات يابانية',
  subdomain: 'sakura',
  tables: 12,
  template: 1,
};

export const categories = [
  { id: 'appetizers', name: 'المقبلات', icon: '🥗' },
  { id: 'mains', name: 'الرئيسية', icon: '🍱' },
  { id: 'desserts', name: 'الحلويات', icon: '🍮' },
  { id: 'drinks', name: 'المشروبات', icon: '🥤' },
];

export const menuItems = [
  // المقبلات
  { id: 1, categoryId: 'appetizers', name: 'سوشي سالمون', nameEn: 'Salmon Sushi', description: 'قطع سوشي طازجة بالسالمون الطازج وصلصة الصويا اليابانية', price: 35, available: true, image: null },
  { id: 2, categoryId: 'appetizers', name: 'إيدامامي', nameEn: 'Edamame', description: 'فاصوليا الصويا الخضراء المسلوقة مع رشة ملح البحر', price: 18, available: true, image: null },
  { id: 3, categoryId: 'appetizers', name: 'سلطة التوفو', nameEn: 'Tofu Salad', description: 'قطع توفو ناعمة مع الخضار الطازجة وصلصة السمسم', price: 22, available: true, image: null },
  { id: 4, categoryId: 'appetizers', name: 'حساء الميسو', nameEn: 'Miso Soup', description: 'شوربة الميسو التقليدية مع التوفو والواكامي', price: 15, available: true, image: null },
  // الرئيسية
  { id: 5, categoryId: 'mains', name: 'بيتزا مارغريتا', nameEn: 'Margherita Pizza', description: 'بيتزا إيطالية كلاسيكية بجبن الموزاريلا وعصير الطماطم الطازج', price: 55, available: true, image: null },
  { id: 6, categoryId: 'mains', name: 'رامين بالدجاج', nameEn: 'Chicken Ramen', description: 'شوربة الرامين الغنية مع الدجاج المشوي والبيض والخضار', price: 48, available: true, image: null },
  { id: 7, categoryId: 'mains', name: 'دجاج تيرياكي', nameEn: 'Teriyaki Chicken', description: 'دجاج مشوي بصلصة التيرياكي اليابانية الأصيلة مع الأرز', price: 52, available: true, image: null },
  { id: 8, categoryId: 'mains', name: 'سلمون مشوي', nameEn: 'Grilled Salmon', description: 'سالمون نرويجي طازج مشوي مع خضار الفصل وصلصة الليمون', price: 65, available: true, image: null },
  // الحلويات
  { id: 9, categoryId: 'desserts', name: 'موشي آيسكريم', nameEn: 'Mochi Ice Cream', description: 'حلوى الموشي اليابانية المحشوة بآيسكريم متعدد النكهات', price: 25, available: true, image: null },
  { id: 10, categoryId: 'desserts', name: 'تشيز كيك الماتشا', nameEn: 'Matcha Cheesecake', description: 'كيكة الجبن الكريمية بنكهة الشاي الأخضر الياباني', price: 30, available: true, image: null },
  { id: 11, categoryId: 'desserts', name: 'دوراياكي', nameEn: 'Dorayaki', description: 'كعك ياباني محشو بصلصة الفاصوليا الحمراء الحلوة', price: 20, available: true, image: null },
  { id: 12, categoryId: 'desserts', name: 'بودينغ كاراميل', nameEn: 'Caramel Pudding', description: 'بودينغ ياباني ناعم بطبقة الكاراميل المذاب', price: 22, available: true, image: null },
  // المشروبات
  { id: 13, categoryId: 'drinks', name: 'شاي الماتشا', nameEn: 'Matcha Tea', description: 'شاي الماتشا الياباني الأصيل محضر تقليدياً', price: 18, available: true, image: null },
  { id: 14, categoryId: 'drinks', name: 'عصير التفاح', nameEn: 'Apple Juice', description: 'عصير تفاح طازج طبيعي بدون سكر مضاف', price: 15, available: true, image: null },
  { id: 15, categoryId: 'drinks', name: 'ماء غازي', nameEn: 'Sparkling Water', description: 'ماء معدني غازي مبرد', price: 10, available: true, image: null },
  { id: 16, categoryId: 'drinks', name: 'ليمونادة اليوزو', nameEn: 'Yuzu Lemonade', description: 'عصير الليمون الياباني المنعش مع نعناع طازج', price: 22, available: true, image: null },
];

export const tables = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  qrUrl: `sakura.orderit.com/menu?table=${i + 1}`,
}));

export const initialOrders = [
  {
    id: '#1040', tableNumber: 3, status: 'new', time: 'منذ دقيقة',
    items: [{ name: 'سوشي سالمون', qty: 2, price: 35 }, { name: 'شاي الماتشا', qty: 1, price: 18 }],
    total: 88,
  },
  {
    id: '#1041', tableNumber: 7, status: 'new', time: 'منذ 3 دقائق',
    items: [{ name: 'رامين بالدجاج', qty: 1, price: 48 }, { name: 'إيدامامي', qty: 1, price: 18 }],
    total: 66,
  },
  {
    id: '#1038', tableNumber: 5, status: 'preparing', time: 'منذ 8 دقائق',
    items: [{ name: 'دجاج تيرياكي', qty: 2, price: 52 }, { name: 'ماء غازي', qty: 2, price: 10 }],
    total: 124,
  },
  {
    id: '#1037', tableNumber: 10, status: 'preparing', time: 'منذ 12 دقيقة',
    items: [{ name: 'سلمون مشوي', qty: 1, price: 65 }, { name: 'موشي آيسكريم', qty: 2, price: 25 }],
    total: 115,
  },
  {
    id: '#1035', tableNumber: 2, status: 'ready', time: 'منذ 18 دقيقة',
    items: [{ name: 'بيتزا مارغريتا', qty: 1, price: 55 }, { name: 'ليمونادة اليوزو', qty: 2, price: 22 }],
    total: 99,
  },
  {
    id: '#1034', tableNumber: 8, status: 'ready', time: 'منذ 22 دقيقة',
    items: [{ name: 'حساء الميسو', qty: 2, price: 15 }, { name: 'سلطة التوفو', qty: 1, price: 22 }],
    total: 52,
  },
];

export const staff = [
  { id: 1, name: 'أحمد سالم', phone: '01012345678', pin: '4821', active: true },
  { id: 2, name: 'فاطمة محمد', phone: '01123456789', pin: '7362', active: true },
  { id: 3, name: 'خالد عمر', phone: '01234567890', pin: '1958', active: false },
];

export const superAdminRestaurants = [
  { id: 1, name: 'ساكورا سوشي', subdomain: 'sakura', template: 'كلاسيك', joinDate: '2025-01-15', active: true },
  { id: 2, name: 'برجر هاوس', subdomain: 'burgerhouse', template: 'مشرق', joinDate: '2025-01-22', active: true },
  { id: 3, name: 'مطعم الخليج', subdomain: 'gulf-rest', template: 'كلاسيك', joinDate: '2025-02-03', active: true },
  { id: 4, name: 'بيتزا ستار', subdomain: 'pizzastar', template: 'مشرق', joinDate: '2025-02-11', active: false },
  { id: 5, name: 'كافيه لاونج', subdomain: 'cafe-lounge', template: 'كلاسيك', joinDate: '2025-02-18', active: true },
  { id: 6, name: 'شاورما كينج', subdomain: 'shawarma-king', template: 'مشرق', joinDate: '2025-03-01', active: true },
  { id: 7, name: 'مطعم الزيتون', subdomain: 'alzaytoun', template: 'كلاسيك', joinDate: '2025-03-14', active: true },
  { id: 8, name: 'ديزرت هاوس', subdomain: 'desserthouse', template: 'مشرق', joinDate: '2025-03-28', active: false },
];

export const monthlySignups = [
  { month: 'أكتوبر', count: 5 },
  { month: 'نوفمبر', count: 8 },
  { month: 'ديسمبر', count: 12 },
  { month: 'يناير', count: 15 },
  { month: 'فبراير', count: 11 },
  { month: 'مارس', count: 18 },
];

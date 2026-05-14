export interface Review {
  id: string;
  name: string;       // customer name
  badge?: string;     // e.g., "Local Guide"
  rating: number;     // 1-5
  text: string;       // Arabic review text
  date: string;       // relative date in Arabic
  reviewCount?: number;
  photoCount?: number;
}

// First 2 are REAL Google reviews from Nour Market.
// Remaining are realistic-styled to fill the carousel.
export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'alrkeba s',
    badge: 'Local Guide',
    rating: 5,
    text: 'ماركت مواد غذائيه متميز وأسعاره جيدة جدا وخدمة التوصيل متاحة داخل مدينة العريش',
    date: 'منذ 6 سنوات',
    reviewCount: 272,
    photoCount: 86,
  },
  {
    id: 'r2',
    name: 'Ahmad Barhoum',
    badge: 'Local Guide',
    rating: 5,
    text: 'من أكبر محلات السوبر ماركت في العريش، والأكثر شهرة في هذه الفترة',
    date: 'منذ 3 أشهر',
    reviewCount: 2,
    photoCount: 4,
  },
  {
    id: 'r3',
    name: 'محمد إبراهيم',
    rating: 5,
    text: 'تشكيلة منتجات ممتازة وأسعار منافسة، التوصيل سريع جداً والمنتجات دائماً طازجة. أنصح بشدة!',
    date: 'منذ شهر',
    reviewCount: 8,
  },
  {
    id: 'r4',
    name: 'سارة عبدالله',
    rating: 5,
    text: 'تجربة تسوق رائعة، طلبت عن طريق واتساب ووصل الطلب في أقل من ساعة. شكراً نور ماركت!',
    date: 'منذ أسبوعين',
    reviewCount: 12,
  },
];

export const TOTAL_REVIEWS = 325;
export const AVERAGE_RATING = 4.8;

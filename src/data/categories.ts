import { Candy, Droplets, SprayCan, CupSoda, Wheat, Sparkles, type LucideIcon } from 'lucide-react';

export type CategorySlug =
  | 'chocolates'
  | 'oils'
  | 'cleaners'
  | 'drinks'
  | 'dry'
  | 'personal';

export interface Category {
  slug: CategorySlug;
  name: string;          // Arabic display name
  description: string;   // Short Arabic description
  icon: LucideIcon;
  gradient: string;      // CSS gradient for icon bg
}

export const CATEGORIES: Category[] = [
  {
    slug: 'chocolates',
    name: 'شوكولاتة وحلويات',
    description: 'أشهى الحلويات والشوكولاتة',
    icon: Candy,
    gradient: 'from-orange-500/30 to-pink-500/20',
  },
  {
    slug: 'oils',
    name: 'زيوت وسمن',
    description: 'زيوت طبخ عالية الجودة',
    icon: Droplets,
    gradient: 'from-amber-500/30 to-yellow-500/20',
  },
  {
    slug: 'cleaners',
    name: 'منظفات',
    description: 'منظفات ومنتجات تنظيف',
    icon: SprayCan,
    gradient: 'from-cyan-500/30 to-blue-500/20',
  },
  {
    slug: 'drinks',
    name: 'مشروبات',
    description: 'عصائر ومشروبات منعشة',
    icon: CupSoda,
    gradient: 'from-red-500/30 to-orange-500/20',
  },
  {
    slug: 'dry',
    name: 'سلع جافة',
    description: 'أرز ومعكرونة وبقوليات',
    icon: Wheat,
    gradient: 'from-yellow-600/30 to-orange-500/20',
  },
  {
    slug: 'personal',
    name: 'عناية شخصية',
    description: 'منتجات العناية اليومية',
    icon: Sparkles,
    gradient: 'from-violet-500/30 to-pink-500/20',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);

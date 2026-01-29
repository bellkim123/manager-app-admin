import {
  Home,
  Store,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  BarChart3,
  Bell,
  UserCog,
  Megaphone,
  Ticket,
  CreditCard,
  Building2,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { title: '홈', href: '/dashboard', icon: Home },
  { title: '브랜드 관리', href: '/dashboard/brands', icon: Building2 },
  { title: '매장 관리', href: '/dashboard/stores', icon: Store },
  { title: '점주 관리', href: '/dashboard/owners', icon: Users },
  { title: '주문 내역', href: '/dashboard/orders', icon: ShoppingCart },
  { title: '매출 통계', href: '/dashboard/analytics', icon: BarChart3 },
  { title: '콘텐츠 관리', href: '/dashboard/contents', icon: FileText },
];

export const MARKETING_NAV_ITEMS: NavItem[] = [
  { title: '캠페인', href: '/dashboard/marketing/campaigns', icon: Megaphone },
  { title: '쿠폰 관리', href: '/dashboard/marketing/coupons', icon: Ticket },
  { title: '결제 관리', href: '/dashboard/marketing/prepaid-cards', icon: CreditCard },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { title: '어드민 계정', href: '/dashboard/admins', icon: UserCog },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { title: '알림', href: '/dashboard/notifications', icon: Bell },
  { title: '설정', href: '/dashboard/settings', icon: Settings },
];

export const NAV_SECTIONS: NavSection[] = [
  { items: MAIN_NAV_ITEMS },
  { label: '마케팅', items: MARKETING_NAV_ITEMS },
  { label: '관리', items: ADMIN_NAV_ITEMS },
];

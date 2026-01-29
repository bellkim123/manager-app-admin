'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Store,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  BarChart3,
  Bell,
  Search,
  UserCog,
  Megaphone,
  Ticket,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/lib/stores/sidebar-store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const mainNavItems = [
  { title: '홈', href: '/dashboard', icon: Home },
  { title: '매장 관리', href: '/dashboard/stores', icon: Store },
  { title: '점주 관리', href: '/dashboard/owners', icon: Users },
  { title: '주문 내역', href: '/dashboard/orders', icon: ShoppingCart },
  { title: '매출 통계', href: '/dashboard/analytics', icon: BarChart3 },
  { title: '콘텐츠 관리', href: '/dashboard/contents', icon: FileText },
];

const marketingNavItems = [
  { title: '캠페인', href: '/dashboard/marketing/campaigns', icon: Megaphone },
  { title: '쿠폰 관리', href: '/dashboard/marketing/coupons', icon: Ticket },
  { title: '선불카드', href: '/dashboard/marketing/prepaid-cards', icon: CreditCard },
];

const adminNavItems = [
  { title: '어드민 계정', href: '/dashboard/admins', icon: UserCog },
];

const bottomNavItems = [
  { title: '알림', href: '/dashboard/notifications', icon: Bell },
  { title: '설정', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, isHovered, toggle, setHovered } = useSidebarStore();

  const showExpanded = isOpen || isHovered;

  const handleLogout = () => {
    router.push('/login');
  };

  const renderNavItem = (item: { title: string; href: string; icon: React.ComponentType<{ className?: string }> }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
    const Icon = item.icon;

    return (
      <li key={item.href}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                'hover:bg-sidebar-accent',
                isActive
                  ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/80',
                !showExpanded && 'justify-center'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {showExpanded && (
                <span className="truncate">{item.title}</span>
              )}
            </Link>
          </TooltipTrigger>
          {!showExpanded && (
            <TooltipContent side="right">
              {item.title}
            </TooltipContent>
          )}
        </Tooltip>
      </li>
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        onMouseEnter={() => !isOpen && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-sidebar',
          showExpanded ? 'w-60' : 'w-[52px]'
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between px-3">
          <Link
            href="/dashboard"
            className={cn(
              'flex items-center gap-2 overflow-hidden',
              !showExpanded && 'justify-center'
            )}
          >
            <Image
              src="/images/logo.png"
              alt="소복소복"
              width={32}
              height={32}
              className="shrink-0 rounded-md"
            />
            {showExpanded && (
              <span className="truncate text-sm font-semibold">
                소복소복
              </span>
            )}
          </Link>
          {showExpanded && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={toggle}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search */}
        {showExpanded && (
          <div className="px-3 pb-2">
            <Button
              variant="ghost"
              className="h-8 w-full justify-start gap-2 px-2 text-muted-foreground"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">검색...</span>
              <kbd className="ml-auto text-xs text-muted-foreground">⌘K</kbd>
            </Button>
          </div>
        )}

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 scrollbar-notion">
          {/* Main Section */}
          <ul className="space-y-1">
            {mainNavItems.map(renderNavItem)}
          </ul>

          {/* Marketing Section */}
          {showExpanded && (
            <div className="mt-4 mb-2 px-2">
              <span className="text-xs font-medium text-muted-foreground">
                마케팅
              </span>
            </div>
          )}
          {!showExpanded && <Separator className="my-2" />}
          <ul className="space-y-1">
            {marketingNavItems.map(renderNavItem)}
          </ul>

          {/* Admin Section */}
          {showExpanded && (
            <div className="mt-4 mb-2 px-2">
              <span className="text-xs font-medium text-muted-foreground">
                관리
              </span>
            </div>
          )}
          {!showExpanded && <Separator className="my-2" />}
          <ul className="space-y-1">
            {adminNavItems.map(renderNavItem)}
          </ul>
        </nav>

        <Separator />

        {/* Bottom Navigation */}
        <div className="px-2 py-2">
          <ul className="space-y-1">
            {bottomNavItems.map(renderNavItem)}
          </ul>
        </div>

        <Separator />

        {/* User Profile */}
        <div className="p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                  'hover:bg-sidebar-accent',
                  !showExpanded && 'justify-center'
                )}
              >
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs">관</AvatarFallback>
                </Avatar>
                {showExpanded && (
                  <div className="flex flex-1 items-center justify-between overflow-hidden">
                    <div className="truncate text-left">
                      <p className="truncate text-sm font-medium">관리자</p>
                    </div>
                    <LogOut className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                )}
              </button>
            </TooltipTrigger>
            {!showExpanded && (
              <TooltipContent side="right">관리자 (로그아웃)</TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Collapse Toggle (when collapsed) */}
        {!showExpanded && (
          <div className="p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggle}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">사이드바 펼치기</TooltipContent>
            </Tooltip>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}

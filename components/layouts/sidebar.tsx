'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, LogOut, Search } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import {
  NAV_SECTIONS,
  BOTTOM_NAV_ITEMS,
  type NavItem,
} from '@/lib/constants/navigation';

// ============================================================================
// Types
// ============================================================================

interface NavItemProps {
  item: NavItem;
  isExpanded: boolean;
  onNavigate?: () => void;
}

interface SidebarContentProps {
  isExpanded: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
  showToggleButton?: boolean;
}

// ============================================================================
// Hooks
// ============================================================================

function useNavItemActive(href: string): boolean {
  const pathname = usePathname();

  if (href === '/dashboard') {
    return pathname === '/dashboard';
  }
  return pathname === href || pathname.startsWith(href + '/');
}

// ============================================================================
// Sub Components
// ============================================================================

function NavItemLink({ item, isExpanded, onNavigate }: NavItemProps) {
  const isActive = useNavItemActive(item.href);
  const Icon = item.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
            'hover:bg-sidebar-accent',
            isActive
              ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
              : 'text-sidebar-foreground/80',
            !isExpanded && 'justify-center'
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {isExpanded && <span className="truncate">{item.title}</span>}
        </Link>
      </TooltipTrigger>
      {!isExpanded && (
        <TooltipContent side="right">{item.title}</TooltipContent>
      )}
    </Tooltip>
  );
}

function SidebarHeader({ isExpanded, onToggle, showToggleButton }: Pick<SidebarContentProps, 'isExpanded' | 'onToggle' | 'showToggleButton'>) {
  return (
    <div className="flex h-14 items-center justify-between px-3">
      <Link
        href="/dashboard"
        className={cn(
          'flex items-center gap-2 overflow-hidden',
          !isExpanded && 'justify-center'
        )}
      >
        <Image
          src="/images/logo.png"
          alt="소복소복"
          width={32}
          height={32}
          className="shrink-0 rounded-md"
        />
        {isExpanded && (
          <span className="truncate text-sm font-semibold">소복소복</span>
        )}
      </Link>
      {isExpanded && showToggleButton && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={onToggle}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

function SidebarSearch({ isExpanded }: { isExpanded: boolean }) {
  if (!isExpanded) return null;

  return (
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
  );
}

function SidebarNav({ isExpanded, onNavigate }: Pick<SidebarContentProps, 'isExpanded' | 'onNavigate'>) {
  return (
    <nav className="flex-1 overflow-y-auto px-2 py-2 scrollbar-notion">
      {NAV_SECTIONS.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {/* 섹션 라벨 */}
          {section.label && isExpanded && (
            <div className="mt-4 mb-2 px-2">
              <span className="text-xs font-medium text-muted-foreground">
                {section.label}
              </span>
            </div>
          )}
          {section.label && !isExpanded && <Separator className="my-2" />}

          {/* 네비게이션 아이템 */}
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <NavItemLink
                  item={item}
                  isExpanded={isExpanded}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarBottomNav({ isExpanded, onNavigate }: Pick<SidebarContentProps, 'isExpanded' | 'onNavigate'>) {
  return (
    <div className="px-2 py-2">
      <ul className="space-y-1">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <NavItemLink
              item={item}
              isExpanded={isExpanded}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SidebarUserProfile({ isExpanded }: { isExpanded: boolean }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="p-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleLogout}
            className={cn(
              'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
              'hover:bg-sidebar-accent',
              !isExpanded && 'justify-center'
            )}
          >
            <Avatar className="h-6 w-6 shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="text-xs">관</AvatarFallback>
            </Avatar>
            {isExpanded && (
              <div className="flex flex-1 items-center justify-between overflow-hidden">
                <div className="truncate text-left">
                  <p className="truncate text-sm font-medium">관리자</p>
                </div>
                <LogOut className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
            )}
          </button>
        </TooltipTrigger>
        {!isExpanded && (
          <TooltipContent side="right">관리자 (로그아웃)</TooltipContent>
        )}
      </Tooltip>
    </div>
  );
}

function SidebarCollapseToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="p-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggle}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">사이드바 펼치기</TooltipContent>
      </Tooltip>
    </div>
  );
}

// ============================================================================
// Sidebar Content (공통)
// ============================================================================

function SidebarContent({
  isExpanded,
  onToggle,
  onNavigate,
  showToggleButton = true,
}: SidebarContentProps) {
  return (
    <>
      <SidebarHeader
        isExpanded={isExpanded}
        onToggle={onToggle}
        showToggleButton={showToggleButton}
      />
      <SidebarSearch isExpanded={isExpanded} />
      <Separator />
      <SidebarNav isExpanded={isExpanded} onNavigate={onNavigate} />
      <Separator />
      <SidebarBottomNav isExpanded={isExpanded} onNavigate={onNavigate} />
      <Separator />
      <SidebarUserProfile isExpanded={isExpanded} />
      {!isExpanded && showToggleButton && onToggle && (
        <SidebarCollapseToggle onToggle={onToggle} />
      )}
    </>
  );
}

// ============================================================================
// Desktop Sidebar
// ============================================================================

function DesktopSidebar() {
  const { isOpen, isHovered, toggle, setHovered } = useSidebarStore();
  const showExpanded = isOpen || isHovered;

  return (
    <aside
      onMouseEnter={() => !isOpen && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-sidebar-border bg-sidebar transition-sidebar md:flex',
        showExpanded ? 'w-60' : 'w-[52px]'
      )}
    >
      <SidebarContent
        isExpanded={showExpanded}
        onToggle={toggle}
        showToggleButton={true}
      />
    </aside>
  );
}

// ============================================================================
// Mobile Sidebar
// ============================================================================

function MobileSidebar() {
  const { isMobileOpen, closeMobile } = useSidebarStore();

  return (
    <Sheet open={isMobileOpen} onOpenChange={closeMobile}>
      <SheetContent
        side="left"
        className="w-60 p-0 flex flex-col"
        showCloseButton={false}
      >
        <SidebarContent
          isExpanded={true}
          onNavigate={closeMobile}
          showToggleButton={false}
        />
      </SheetContent>
    </Sheet>
  );
}

// ============================================================================
// Main Export
// ============================================================================

export function Sidebar() {
  return (
    <TooltipProvider delayDuration={0}>
      <DesktopSidebar />
      <MobileSidebar />
    </TooltipProvider>
  );
}

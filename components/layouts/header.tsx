'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  Bell,
  Search,
  Moon,
  Sun,
  Check,
  Store,
  ShoppingCart,
  UserPlus,
  Megaphone,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSidebarStore } from '@/lib/stores/sidebar-store';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
}

const initialNotifications = [
  {
    id: '1',
    type: 'store' as const,
    title: '새로운 매장 신청',
    message: '역삼점에서 매장 등록을 신청했습니다.',
    time: '5분 전',
    read: false,
  },
  {
    id: '2',
    type: 'order' as const,
    title: '주문 취소 알림',
    message: '강남점에서 주문이 취소되었습니다.',
    time: '15분 전',
    read: false,
  },
  {
    id: '3',
    type: 'user' as const,
    title: '새로운 점주 가입',
    message: '정점주님이 가입을 신청했습니다.',
    time: '1시간 전',
    read: false,
  },
  {
    id: '4',
    type: 'campaign' as const,
    title: '캠페인 목표 달성',
    message: '설 연휴 프로모션이 50% 달성했습니다.',
    time: '2시간 전',
    read: true,
  },
  {
    id: '5',
    type: 'system' as const,
    title: '시스템 점검 예정',
    message: '내일 02:00~04:00 점검이 예정되어 있습니다.',
    time: '3시간 전',
    read: true,
  },
];

const notificationIcons = {
  store: Store,
  order: ShoppingCart,
  user: UserPlus,
  campaign: Megaphone,
  system: AlertCircle,
};

const notificationColors = {
  store: 'bg-blue-100 text-blue-600',
  order: 'bg-orange-100 text-orange-600',
  user: 'bg-purple-100 text-purple-600',
  campaign: 'bg-green-100 text-green-600',
  system: 'bg-gray-100 text-gray-600',
};

export function Header({ title }: HeaderProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isOpen, isHovered } = useSidebarStore();
  const showExpanded = isOpen || isHovered;
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-sidebar',
        showExpanded ? 'ml-60' : 'ml-[52px]'
      )}
    >
      <div className="flex items-center gap-4">
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="검색..."
            className="h-9 w-64 rounded-md bg-muted/50 pl-8 focus-visible:bg-background"
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">테마 변경</span>
        </Button>

        {/* Notifications */}
        <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'relative h-9 w-9 transition-transform',
                isNotificationOpen && 'scale-95'
              )}
            >
              <Bell
                className={cn(
                  'h-4 w-4 transition-transform',
                  isNotificationOpen && 'animate-wiggle'
                )}
              />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground animate-in zoom-in">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">알림</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 p-0"
            align="end"
            sideOffset={8}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">알림</h3>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-2 py-1 text-xs"
                  onClick={markAllAsRead}
                >
                  <Check className="mr-1 h-3 w-3" />
                  모두 읽음
                </Button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    알림이 없습니다
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => {
                    const Icon = notificationIcons[notification.type];
                    const colorClass = notificationColors[notification.type];

                    return (
                      <button
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={cn(
                          'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50',
                          !notification.read && 'bg-muted/30'
                        )}
                      >
                        <div
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                            colorClass
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p
                              className={cn(
                                'text-sm',
                                !notification.read && 'font-medium'
                              )}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t p-2">
              <Link href="/dashboard/notifications">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-sm"
                  onClick={() => setIsNotificationOpen(false)}
                >
                  모든 알림 보기
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="관리자" />
                <AvatarFallback>관</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">관리자</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@sobok.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>프로필</DropdownMenuItem>
            <DropdownMenuItem>설정</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

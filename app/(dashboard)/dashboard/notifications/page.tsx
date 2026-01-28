'use client';

import { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Settings } from 'lucide-react';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSidebarStore } from '@/lib/stores/sidebar-store';
import { cn } from '@/lib/utils';

const notifications = [
  {
    id: '1',
    title: '새로운 매장 신청',
    message: '역삼점에서 매장 등록을 신청했습니다.',
    type: 'store' as const,
    read: false,
    createdAt: '5분 전',
  },
  {
    id: '2',
    title: '주문 취소 알림',
    message: '강남점에서 주문 ORD-2024-004가 취소되었습니다.',
    type: 'order' as const,
    read: false,
    createdAt: '15분 전',
  },
  {
    id: '3',
    title: '시스템 점검 예정',
    message: '2024년 1월 30일 02:00 ~ 04:00 시스템 점검이 예정되어 있습니다.',
    type: 'system' as const,
    read: true,
    createdAt: '1시간 전',
  },
  {
    id: '4',
    title: '매출 목표 달성',
    message: '홍대점이 이번 주 매출 목표를 달성했습니다.',
    type: 'achievement' as const,
    read: true,
    createdAt: '2시간 전',
  },
  {
    id: '5',
    title: '새로운 점주 가입',
    message: '정점주님이 점주로 가입을 신청했습니다.',
    type: 'user' as const,
    read: true,
    createdAt: '3시간 전',
  },
];

const typeConfig = {
  store: { color: 'bg-blue-500' },
  order: { color: 'bg-orange-500' },
  system: { color: 'bg-gray-500' },
  achievement: { color: 'bg-green-500' },
  user: { color: 'bg-purple-500' },
};

export default function NotificationsPage() {
  const { isOpen, isHovered } = useSidebarStore();
  const showExpanded = isOpen || isHovered;
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <>
      <Header title="알림" />
      <main
        className={cn(
          'min-h-[calc(100vh-3.5rem)] transition-sidebar',
          showExpanded ? 'ml-60' : 'ml-[52px]'
        )}
      >
        <div className="p-6 max-w-2xl">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">알림</h2>
              {unreadCount > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="mr-2 h-4 w-4" />
                모두 읽음
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-2">
            {items.map((notification) => {
              const type = typeConfig[notification.type];
              return (
                <Card
                  key={notification.id}
                  className={cn(
                    'cursor-pointer transition-colors',
                    !notification.read && 'bg-muted/30'
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Indicator */}
                      <div className="relative mt-1">
                        <div
                          className={cn(
                            'h-2 w-2 rounded-full',
                            notification.read ? 'bg-transparent' : type.color
                          )}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3
                              className={cn(
                                'text-sm',
                                !notification.read && 'font-medium'
                              )}
                            >
                              {notification.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">알림이 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

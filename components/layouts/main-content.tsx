'use client';

import { ReactNode } from 'react';
import { useSidebarStore } from '@/lib/stores/sidebar-store';
import { cn } from '@/lib/utils';

interface MainContentProps {
  children: ReactNode;
  className?: string;
}

export function MainContent({ children, className }: MainContentProps) {
  const { isOpen, isHovered } = useSidebarStore();
  const showExpanded = isOpen || isHovered;

  return (
    <main
      className={cn(
        'min-h-[calc(100vh-3.5rem)] transition-sidebar',
        // 모바일: 마진 없음, 데스크탑: 사이드바 너비만큼 마진
        'ml-0 md:ml-[52px]',
        showExpanded && 'md:ml-60',
        className
      )}
    >
      {/* 모바일: 작은 패딩, 데스크탑: 기본 패딩 */}
      <div className="px-4 py-4 md:p-6">{children}</div>
    </main>
  );
}

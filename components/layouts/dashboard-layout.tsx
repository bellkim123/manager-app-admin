'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useSidebarStore } from '@/lib/stores/sidebar-store';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { isOpen, isHovered } = useSidebarStore();
  const showExpanded = isOpen || isHovered;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header title={title} />
      <main
        className={cn(
          'min-h-[calc(100vh-3.5rem)] transition-sidebar',
          showExpanded ? 'ml-60' : 'ml-[52px]'
        )}
      >
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
}

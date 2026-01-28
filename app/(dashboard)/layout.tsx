import { ReactNode } from 'react';
import { Sidebar } from '@/components/layouts/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      {children}
    </div>
  );
}

'use client';

import { User, Bell, Shield, Palette, Database, HelpCircle } from 'lucide-react';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSidebarStore } from '@/lib/stores/sidebar-store';
import { cn } from '@/lib/utils';

const settingsSections = [
  {
    id: 'profile',
    title: '프로필',
    description: '계정 정보를 관리합니다.',
    icon: User,
  },
  {
    id: 'notifications',
    title: '알림',
    description: '알림 설정을 관리합니다.',
    icon: Bell,
  },
  {
    id: 'security',
    title: '보안',
    description: '비밀번호 및 2단계 인증을 설정합니다.',
    icon: Shield,
  },
  {
    id: 'appearance',
    title: '테마',
    description: '앱 테마를 설정합니다.',
    icon: Palette,
  },
  {
    id: 'data',
    title: '데이터',
    description: '데이터 내보내기 및 백업을 관리합니다.',
    icon: Database,
  },
  {
    id: 'help',
    title: '도움말',
    description: '도움말 및 지원을 확인합니다.',
    icon: HelpCircle,
  },
];

export default function SettingsPage() {
  const { isOpen, isHovered } = useSidebarStore();
  const showExpanded = isOpen || isHovered;

  return (
    <>
      <Header title="설정" />
      <main
        className={cn(
          'min-h-[calc(100vh-3.5rem)] transition-sidebar',
          showExpanded ? 'ml-60' : 'ml-[52px]'
        )}
      >
        <div className="p-6 max-w-4xl">
          {/* Profile Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">프로필 정보</CardTitle>
              <CardDescription>
                공개 프로필 정보를 수정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">이름</label>
                  <Input defaultValue="관리자" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">이메일</label>
                  <Input defaultValue="admin@coffee.com" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">연락처</label>
                <Input defaultValue="010-1234-5678" />
              </div>
              <div className="flex justify-end">
                <Button>저장</Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {settingsSections.slice(1).map((section) => (
              <Card
                key={section.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <section.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-base text-destructive">
                위험 구역
              </CardTitle>
              <CardDescription>
                주의가 필요한 작업입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">계정 삭제</p>
                  <p className="text-sm text-muted-foreground">
                    모든 데이터가 영구적으로 삭제됩니다.
                  </p>
                </div>
                <Button variant="destructive">계정 삭제</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

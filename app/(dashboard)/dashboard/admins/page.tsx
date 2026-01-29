'use client';

import { useState, Fragment } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Shield,
  Calendar,
  Check,
  X,
  Settings2,
  Home,
  Store,
  Users,
  ShoppingCart,
  BarChart3,
  FileText,
  Megaphone,
  Ticket,
  CreditCard,
  UserCog,
  Bell,
  Settings,
  ChevronDown,
  ChevronUp,
  Building2,
} from 'lucide-react';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebarStore } from '@/lib/stores/sidebar-store';
import { cn } from '@/lib/utils';

// 메뉴 목록 정의
const menuItems = [
  { id: 'home', name: '홈', icon: Home, category: 'main' },
  { id: 'stores', name: '매장 관리', icon: Store, category: 'main' },
  { id: 'owners', name: '점주 관리', icon: Users, category: 'main' },
  { id: 'orders', name: '주문 내역', icon: ShoppingCart, category: 'main' },
  { id: 'analytics', name: '매출 통계', icon: BarChart3, category: 'main' },
  { id: 'contents', name: '콘텐츠 관리', icon: FileText, category: 'main' },
  { id: 'campaigns', name: '캠페인', icon: Megaphone, category: 'marketing' },
  { id: 'coupons', name: '쿠폰 관리', icon: Ticket, category: 'marketing' },
  { id: 'prepaid-cards', name: '선불카드', icon: CreditCard, category: 'marketing' },
  { id: 'brands', name: '브랜드 관리', icon: Building2, category: 'admin' },
  { id: 'admins', name: '어드민 계정', icon: UserCog, category: 'admin' },
  { id: 'notifications', name: '알림', icon: Bell, category: 'system' },
  { id: 'settings', name: '설정', icon: Settings, category: 'system' },
];

const categoryNames = {
  main: '기본 메뉴',
  marketing: '마케팅',
  admin: '관리',
  system: '시스템',
};

const admins = [
  {
    id: '1',
    name: '김관리',
    email: 'kim@sobok.com',
    role: 'super_admin' as const,
    brandCode: 'ALL',
    status: 'active' as const,
    lastLogin: '2024-01-28 14:32',
    createdAt: '2023-01-15',
    menuPermissions: ['home', 'stores', 'owners', 'orders', 'analytics', 'contents', 'campaigns', 'coupons', 'prepaid-cards', 'brands', 'admins', 'notifications', 'settings'],
  },
  {
    id: '2',
    name: '이매니저',
    email: 'lee@sobok.com',
    role: 'admin' as const,
    brandCode: 'BRAND001',
    status: 'active' as const,
    lastLogin: '2024-01-28 10:15',
    createdAt: '2023-03-20',
    menuPermissions: ['home', 'stores', 'owners', 'orders', 'analytics', 'contents', 'campaigns', 'coupons', 'prepaid-cards', 'brands', 'notifications', 'settings'],
  },
  {
    id: '3',
    name: '박운영',
    email: 'park@sobok.com',
    role: 'manager' as const,
    brandCode: 'BRAND001',
    status: 'active' as const,
    lastLogin: '2024-01-27 18:45',
    createdAt: '2023-05-10',
    menuPermissions: ['home', 'stores', 'orders', 'analytics', 'notifications'],
  },
  {
    id: '4',
    name: '최뷰어',
    email: 'choi@sobok.com',
    role: 'viewer' as const,
    brandCode: 'BRAND002',
    status: 'inactive' as const,
    lastLogin: '2024-01-20 09:00',
    createdAt: '2023-08-05',
    menuPermissions: ['home', 'analytics'],
  },
  {
    id: '5',
    name: '정신규',
    email: 'jung@sobok.com',
    role: 'admin' as const,
    brandCode: 'BRAND003',
    status: 'pending' as const,
    lastLogin: '-',
    createdAt: '2024-01-25',
    menuPermissions: ['home', 'stores', 'owners', 'orders', 'analytics', 'contents', 'campaigns', 'coupons', 'prepaid-cards', 'brands', 'notifications', 'settings'],
  },
];

const roleConfig = {
  super_admin: {
    label: '슈퍼 관리자',
    className: 'bg-purple-100 text-purple-700',
    description: '모든 브랜드 접근 가능',
  },
  admin: {
    label: '관리자',
    className: 'bg-blue-100 text-blue-700',
    description: '브랜드 내 전체 권한',
  },
  manager: {
    label: '매니저',
    className: 'bg-green-100 text-green-700',
    description: '조회 및 일부 수정 권한',
  },
  viewer: {
    label: '뷰어',
    className: 'bg-gray-100 text-gray-700',
    description: '조회 전용',
  },
};

const statusConfig = {
  active: { label: '활성', className: 'bg-green-100 text-green-700' },
  inactive: { label: '비활성', className: 'bg-gray-100 text-gray-700' },
  pending: { label: '승인대기', className: 'bg-yellow-100 text-yellow-700' },
};

export default function AdminsPage() {
  const { isOpen, isHovered } = useSidebarStore();
  const showExpanded = isOpen || isHovered;
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAdminId, setExpandedAdminId] = useState<string | null>(null);
  const [adminPermissions, setAdminPermissions] = useState<Record<string, string[]>>(
    admins.reduce((acc, admin) => ({ ...acc, [admin.id]: admin.menuPermissions }), {})
  );

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.brandCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAdminExpand = (adminId: string) => {
    setExpandedAdminId(expandedAdminId === adminId ? null : adminId);
  };

  const toggleMenuPermission = (adminId: string, menuId: string) => {
    setAdminPermissions((prev) => {
      const currentPermissions = prev[adminId] || [];
      if (currentPermissions.includes(menuId)) {
        return { ...prev, [adminId]: currentPermissions.filter((id) => id !== menuId) };
      }
      return { ...prev, [adminId]: [...currentPermissions, menuId] };
    });
  };

  const toggleAllCategory = (adminId: string, category: string) => {
    const categoryMenuIds = menuItems
      .filter((item) => item.category === category)
      .map((item) => item.id);
    const currentPermissions = adminPermissions[adminId] || [];
    const allSelected = categoryMenuIds.every((id) => currentPermissions.includes(id));

    setAdminPermissions((prev) => {
      if (allSelected) {
        return { ...prev, [adminId]: currentPermissions.filter((id) => !categoryMenuIds.includes(id)) };
      }
      const newPermissions = [...new Set([...currentPermissions, ...categoryMenuIds])];
      return { ...prev, [adminId]: newPermissions };
    });
  };

  return (
    <>
      <Header title="어드민 계정 관리" />
      <main
        className={cn(
          'min-h-[calc(100vh-3.5rem)] transition-sidebar',
          showExpanded ? 'ml-60' : 'ml-[52px]'
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              소복소복 어드민 시스템의 계정과 메뉴 권한을 관리합니다.
            </p>
          </div>

          {/* Header Actions */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="이름, 이메일, 브랜드 코드 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              계정 추가
            </Button>
          </div>

          {/* Admins Table */}
          <div className="rounded-lg border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="w-8 px-4 py-3"></th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      관리자
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      역할
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      브랜드 코드
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      메뉴 권한
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      상태
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      마지막 로그인
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => {
                    const role = roleConfig[admin.role];
                    const status = statusConfig[admin.status];
                    const isExpanded = expandedAdminId === admin.id;
                    const permissions = adminPermissions[admin.id] || [];

                    return (
                      <Fragment key={admin.id}>
                        <tr
                          className={cn(
                            'border-b hover:bg-muted/30',
                            isExpanded && 'bg-muted/20'
                          )}
                        >
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleAdminExpand(admin.id)}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-xs">
                                  {admin.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{admin.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {admin.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                              <span
                                className={cn(
                                  'rounded-full px-2 py-0.5 text-xs font-medium',
                                  role.className
                                )}
                              >
                                {role.label}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                              {admin.brandCode}
                            </code>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-sm">
                                {permissions.length} / {menuItems.length} 메뉴
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                'rounded-full px-2 py-0.5 text-xs font-medium',
                                status.className
                              )}
                            >
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {admin.lastLogin}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {admin.status === 'pending' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>상세 보기</DropdownMenuItem>
                                  <DropdownMenuItem>권한 수정</DropdownMenuItem>
                                  <DropdownMenuItem>비밀번호 초기화</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    계정 삭제
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>

                        {/* Menu Permission Panel */}
                        {isExpanded && (
                          <tr>
                            <td colSpan={8} className="px-4 py-4 bg-muted/10">
                              <div className="rounded-lg border bg-background p-4">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-medium flex items-center gap-2">
                                    <Settings2 className="h-4 w-4" />
                                    메뉴 접근 권한 설정
                                  </h4>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setAdminPermissions((prev) => ({
                                        ...prev,
                                        [admin.id]: menuItems.map((item) => item.id),
                                      }))}
                                    >
                                      전체 선택
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setAdminPermissions((prev) => ({
                                        ...prev,
                                        [admin.id]: [],
                                      }))}
                                    >
                                      전체 해제
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                  {Object.entries(categoryNames).map(([category, categoryName]) => {
                                    const categoryMenus = menuItems.filter((item) => item.category === category);
                                    const selectedCount = categoryMenus.filter((item) =>
                                      permissions.includes(item.id)
                                    ).length;
                                    const allSelected = selectedCount === categoryMenus.length;
                                    const someSelected = selectedCount > 0;

                                    return (
                                      <div key={category} className="space-y-1">
                                        {/* 대메뉴 (카테고리) */}
                                        <button
                                          onClick={() => toggleAllCategory(admin.id, category)}
                                          className={cn(
                                            'flex w-full items-center gap-2 rounded-md px-2 py-2 transition-colors',
                                            'bg-muted/50 hover:bg-muted'
                                          )}
                                        >
                                          <div
                                            className={cn(
                                              'h-4 w-4 rounded border flex items-center justify-center transition-colors shrink-0',
                                              allSelected
                                                ? 'bg-primary border-primary'
                                                : someSelected
                                                ? 'bg-primary/50 border-primary/50'
                                                : 'border-input'
                                            )}
                                          >
                                            {allSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                            {someSelected && !allSelected && (
                                              <div className="h-1.5 w-1.5 bg-primary-foreground rounded-sm" />
                                            )}
                                          </div>
                                          <span className="text-sm font-medium flex-1 text-left">
                                            {categoryName}
                                          </span>
                                          <span className="text-xs text-muted-foreground">
                                            {selectedCount}/{categoryMenus.length}
                                          </span>
                                        </button>

                                        {/* 하위메뉴 */}
                                        <div className="space-y-0.5 pl-2">
                                          {categoryMenus.map((menu) => {
                                            const Icon = menu.icon;
                                            const isChecked = permissions.includes(menu.id);

                                            return (
                                              <button
                                                key={menu.id}
                                                onClick={() => toggleMenuPermission(admin.id, menu.id)}
                                                className={cn(
                                                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 transition-colors',
                                                  isChecked
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'hover:bg-muted/50'
                                                )}
                                              >
                                                <div
                                                  className={cn(
                                                    'h-4 w-4 rounded border flex items-center justify-center transition-colors shrink-0',
                                                    isChecked
                                                      ? 'bg-primary border-primary'
                                                      : 'border-input'
                                                  )}
                                                >
                                                  {isChecked && <Check className="h-3 w-3 text-primary-foreground" />}
                                                </div>
                                                <Icon className="h-3.5 w-3.5 shrink-0" />
                                                <span className="text-sm">{menu.name}</span>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                                  <Button variant="outline" size="sm" onClick={() => setExpandedAdminId(null)}>
                                    취소
                                  </Button>
                                  <Button size="sm">
                                    <Check className="mr-1 h-3 w-3" />
                                    저장
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {filteredAdmins.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">검색 결과가 없습니다.</p>
            </div>
          )}

          {/* Role Legend */}
          <div className="mt-6 rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium mb-3">역할 설명</h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(roleConfig).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium',
                      value.className
                    )}
                  >
                    {value.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {value.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

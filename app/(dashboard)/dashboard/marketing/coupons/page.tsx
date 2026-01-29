'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Ticket,
  Calendar,
  Percent,
  Tag,
  Copy,
  Download,
} from 'lucide-react';
import { Header, MainContent } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const coupons = [
  {
    id: '1',
    code: 'WELCOME2024',
    name: '신규가입 웰컴 쿠폰',
    type: 'fixed' as const,
    value: 3000,
    minOrderAmount: 10000,
    status: 'active' as const,
    totalIssued: 5000,
    totalUsed: 3245,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: '2',
    code: 'LUNAR2024',
    name: '설 연휴 특별 할인',
    type: 'percent' as const,
    value: 20,
    minOrderAmount: 15000,
    maxDiscount: 5000,
    status: 'active' as const,
    totalIssued: 8500,
    totalUsed: 2340,
    startDate: '2024-02-05',
    endDate: '2024-02-12',
  },
  {
    id: '3',
    code: 'COMEBACK30',
    name: '휴면고객 복귀 쿠폰',
    type: 'percent' as const,
    value: 30,
    minOrderAmount: 20000,
    maxDiscount: 7000,
    status: 'paused' as const,
    totalIssued: 3200,
    totalUsed: 456,
    startDate: '2024-01-15',
    endDate: '2024-02-28',
  },
  {
    id: '4',
    code: 'BDAY2024',
    name: '생일 축하 무료 음료',
    type: 'free_item' as const,
    value: 0,
    freeItem: '아메리카노 (R)',
    status: 'active' as const,
    totalIssued: 1200,
    totalUsed: 892,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: '5',
    code: 'SPRING2024',
    name: '봄맞이 할인 쿠폰',
    type: 'fixed' as const,
    value: 2000,
    minOrderAmount: 8000,
    status: 'draft' as const,
    totalIssued: 0,
    totalUsed: 0,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
  },
];

const statusConfig = {
  active: { label: '발급중', className: 'bg-green-100 text-green-700' },
  paused: { label: '발급중지', className: 'bg-yellow-100 text-yellow-700' },
  draft: { label: '준비중', className: 'bg-gray-100 text-gray-700' },
  expired: { label: '만료', className: 'bg-red-100 text-red-700' },
};

const typeConfig = {
  fixed: { label: '정액 할인', icon: Tag },
  percent: { label: '정률 할인', icon: Percent },
  free_item: { label: '무료 상품', icon: Ticket },
};

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.status === 'active').length,
    totalIssued: coupons.reduce((acc, c) => acc + c.totalIssued, 0),
    totalUsed: coupons.reduce((acc, c) => acc + c.totalUsed, 0),
  };

  return (
    <>
      <Header title="쿠폰 관리" />
      <MainContent>
          {/* Stats */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  전체 쿠폰
                </CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  발급중
                </CardTitle>
                <Ticket className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  총 발급
                </CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalIssued.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  총 사용
                </CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsed.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  사용률 {((stats.totalUsed / stats.totalIssued) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Header Actions */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="쿠폰명 또는 코드 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                내보내기
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                쿠폰 생성
              </Button>
            </div>
          </div>

          {/* Mobile Coupon Cards */}
          <div className="space-y-3 md:hidden">
            {filteredCoupons.map((coupon) => {
              const status = statusConfig[coupon.status];
              const type = typeConfig[coupon.type];
              const TypeIcon = type.icon;
              const usageRate = coupon.totalIssued > 0
                ? ((coupon.totalUsed / coupon.totalIssued) * 100).toFixed(1)
                : 0;

              return (
                <div
                  key={coupon.id}
                  className="rounded-lg border bg-card p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        <TypeIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{coupon.name}</p>
                        <code className="text-xs text-muted-foreground">{coupon.code}</code>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">
                      {coupon.type === 'fixed' && `₩${coupon.value.toLocaleString()}`}
                      {coupon.type === 'percent' && `${coupon.value}%`}
                      {coupon.type === 'free_item' && coupon.freeItem}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {coupon.totalUsed.toLocaleString()} / {coupon.totalIssued.toLocaleString()} 사용
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{coupon.startDate} ~ {coupon.endDate}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>상세 보기</DropdownMenuItem>
                        <DropdownMenuItem>수정</DropdownMenuItem>
                        <DropdownMenuItem>복제</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Coupon Table */}
          <div className="hidden md:block rounded-lg border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      쿠폰
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      코드
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      할인
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      조건
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      사용현황
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      기간
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      상태
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((coupon) => {
                    const status = statusConfig[coupon.status];
                    const type = typeConfig[coupon.type];
                    const TypeIcon = type.icon;
                    const usageRate = coupon.totalIssued > 0
                      ? ((coupon.totalUsed / coupon.totalIssued) * 100).toFixed(1)
                      : 0;

                    return (
                      <tr
                        key={coupon.id}
                        className="border-b last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                              <TypeIcon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{coupon.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                              {coupon.code}
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {coupon.type === 'fixed' && `₩${coupon.value.toLocaleString()}`}
                          {coupon.type === 'percent' && `${coupon.value}%`}
                          {coupon.type === 'free_item' && coupon.freeItem}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {coupon.minOrderAmount && `${coupon.minOrderAmount.toLocaleString()}원 이상`}
                          {coupon.maxDiscount && ` (최대 ${coupon.maxDiscount.toLocaleString()}원)`}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <span className="font-medium">{coupon.totalUsed.toLocaleString()}</span>
                            <span className="text-muted-foreground"> / {coupon.totalIssued.toLocaleString()}</span>
                          </div>
                          <div className="mt-1 h-1 w-16 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${usageRate}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {coupon.startDate} ~ {coupon.endDate}
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
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>상세 보기</DropdownMenuItem>
                              <DropdownMenuItem>수정</DropdownMenuItem>
                              <DropdownMenuItem>복제</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
      </MainContent>
    </>
  );
}

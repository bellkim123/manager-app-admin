'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Download,
  RefreshCw,
  Ban,
} from 'lucide-react';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebarStore } from '@/lib/stores/sidebar-store';
import { cn } from '@/lib/utils';

const prepaidCards = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    ownerName: '김철수',
    ownerPhone: '010-1234-5678',
    balance: 45000,
    totalCharged: 150000,
    totalUsed: 105000,
    status: 'active' as const,
    lastUsed: '2024-01-28 14:32',
    createdAt: '2023-06-15',
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    ownerName: '이영희',
    ownerPhone: '010-2345-6789',
    balance: 128000,
    totalCharged: 200000,
    totalUsed: 72000,
    status: 'active' as const,
    lastUsed: '2024-01-27 18:15',
    createdAt: '2023-08-20',
  },
  {
    id: '3',
    cardNumber: '**** **** **** 9012',
    ownerName: '박지민',
    ownerPhone: '010-3456-7890',
    balance: 0,
    totalCharged: 50000,
    totalUsed: 50000,
    status: 'empty' as const,
    lastUsed: '2024-01-20 09:45',
    createdAt: '2023-11-10',
  },
  {
    id: '4',
    cardNumber: '**** **** **** 3456',
    ownerName: '최수진',
    ownerPhone: '010-4567-8901',
    balance: 23500,
    totalCharged: 100000,
    totalUsed: 76500,
    status: 'active' as const,
    lastUsed: '2024-01-28 10:20',
    createdAt: '2023-09-05',
  },
  {
    id: '5',
    cardNumber: '**** **** **** 7890',
    ownerName: '정민호',
    ownerPhone: '010-5678-9012',
    balance: 85000,
    totalCharged: 85000,
    totalUsed: 0,
    status: 'active' as const,
    lastUsed: '-',
    createdAt: '2024-01-25',
  },
  {
    id: '6',
    cardNumber: '**** **** **** 2468',
    ownerName: '한소희',
    ownerPhone: '010-6789-0123',
    balance: 15000,
    totalCharged: 80000,
    totalUsed: 65000,
    status: 'suspended' as const,
    lastUsed: '2024-01-10 15:30',
    createdAt: '2023-07-22',
  },
];

const recentTransactions = [
  { id: '1', type: 'charge', amount: 50000, cardNumber: '****1234', time: '10분 전' },
  { id: '2', type: 'use', amount: 8500, cardNumber: '****5678', time: '25분 전' },
  { id: '3', type: 'use', amount: 12000, cardNumber: '****3456', time: '1시간 전' },
  { id: '4', type: 'charge', amount: 30000, cardNumber: '****9012', time: '2시간 전' },
  { id: '5', type: 'use', amount: 5500, cardNumber: '****1234', time: '3시간 전' },
];

const statusConfig = {
  active: { label: '정상', className: 'bg-green-100 text-green-700' },
  empty: { label: '잔액없음', className: 'bg-yellow-100 text-yellow-700' },
  suspended: { label: '정지', className: 'bg-red-100 text-red-700' },
};

export default function PrepaidCardsPage() {
  const { isOpen, isHovered } = useSidebarStore();
  const showExpanded = isOpen || isHovered;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = prepaidCards.filter(
    (card) =>
      card.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.ownerPhone.includes(searchQuery) ||
      card.cardNumber.includes(searchQuery)
  );

  const stats = {
    totalCards: prepaidCards.length,
    activeCards: prepaidCards.filter((c) => c.status === 'active').length,
    totalBalance: prepaidCards.reduce((acc, c) => acc + c.balance, 0),
    totalCharged: prepaidCards.reduce((acc, c) => acc + c.totalCharged, 0),
  };

  return (
    <>
      <Header title="결제 관리" />
      <main
        className={cn(
          'min-h-[calc(100vh-3.5rem)] transition-sidebar',
          showExpanded ? 'ml-60' : 'ml-[52px]'
        )}
      >
        <div className="p-6">
          {/* Stats */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  전체 카드
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCards}</div>
                <p className="text-xs text-muted-foreground">
                  활성 {stats.activeCards}개
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  총 잔액
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩{stats.totalBalance.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  총 충전액
                </CardTitle>
                <ArrowUpRight className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩{stats.totalCharged.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  오늘 충전
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩280,000</div>
                <p className="text-xs text-green-600">+12% 어제 대비</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Card List */}
            <div className="lg:col-span-2">
              {/* Header Actions */}
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1 sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="이름, 전화번호, 카드번호 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  내보내기
                </Button>
              </div>

              {/* Card Table */}
              <div className="rounded-lg border bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          카드 정보
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          소유자
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                          잔액
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
                      {filteredCards.map((card) => {
                        const status = statusConfig[card.status];

                        return (
                          <tr
                            key={card.id}
                            className="border-b last:border-0 hover:bg-muted/30"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary/80 to-primary">
                                  <CreditCard className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <code className="text-sm font-mono">{card.cardNumber}</code>
                                  <p className="text-xs text-muted-foreground">
                                    마지막 사용: {card.lastUsed}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-medium">{card.ownerName}</p>
                              <p className="text-xs text-muted-foreground">{card.ownerPhone}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-semibold">₩{card.balance.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">
                                총 충전 ₩{card.totalCharged.toLocaleString()}
                              </p>
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
                                  <DropdownMenuItem>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    잔액 환불
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Ban className="mr-2 h-4 w-4" />
                                    카드 정지
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
            </div>

            {/* Recent Transactions */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">최근 거래</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'flex h-8 w-8 items-center justify-center rounded-full',
                              tx.type === 'charge' ? 'bg-green-100' : 'bg-red-100'
                            )}
                          >
                            {tx.type === 'charge' ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {tx.type === 'charge' ? '충전' : '사용'}
                            </p>
                            <p className="text-xs text-muted-foreground">{tx.cardNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={cn(
                              'text-sm font-medium',
                              tx.type === 'charge' ? 'text-green-600' : 'text-red-600'
                            )}
                          >
                            {tx.type === 'charge' ? '+' : '-'}₩{tx.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">{tx.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

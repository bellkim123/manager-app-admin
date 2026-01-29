'use client';

import { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { Header, MainContent } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const orders = [
  {
    id: 'ORD-2024-001',
    store: '강남점',
    items: '아메리카노 x2, 카페라떼 x1',
    amount: '₩15,500',
    status: 'completed' as const,
    paymentMethod: '카드',
    createdAt: '2024-01-28 14:32',
  },
  {
    id: 'ORD-2024-002',
    store: '홍대점',
    items: '콜드브루 x1, 바닐라라떼 x2',
    amount: '₩18,000',
    status: 'completed' as const,
    paymentMethod: '앱결제',
    createdAt: '2024-01-28 14:28',
  },
  {
    id: 'ORD-2024-003',
    store: '판교점',
    items: '카푸치노 x3',
    amount: '₩16,500',
    status: 'pending' as const,
    paymentMethod: '카드',
    createdAt: '2024-01-28 14:25',
  },
  {
    id: 'ORD-2024-004',
    store: '강남점',
    items: '에스프레소 x1',
    amount: '₩4,000',
    status: 'cancelled' as const,
    paymentMethod: '현금',
    createdAt: '2024-01-28 14:20',
  },
  {
    id: 'ORD-2024-005',
    store: '신촌점',
    items: '카페모카 x2, 녹차라떼 x1',
    amount: '₩19,500',
    status: 'completed' as const,
    paymentMethod: '앱결제',
    createdAt: '2024-01-28 14:15',
  },
];

const statusConfig = {
  completed: { label: '완료', className: 'bg-green-100 text-green-700' },
  pending: { label: '대기', className: 'bg-yellow-100 text-yellow-700' },
  cancelled: { label: '취소', className: 'bg-red-100 text-red-700' },
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header title="주문 내역" />
      <MainContent>
          {/* Header Actions */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="주문번호, 매장, 메뉴 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              내보내기
            </Button>
          </div>

          {/* Orders Table */}
          <div className="rounded-lg border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      주문번호
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      매장
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      주문내역
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      결제금액
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      결제수단
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      상태
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      주문일시
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status];
                    return (
                      <tr
                        key={order.id}
                        className="border-b last:border-0 hover:bg-muted/30 cursor-pointer"
                      >
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm">{order.id}</span>
                        </td>
                        <td className="px-4 py-3 text-sm">{order.store}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {order.items}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          {order.amount}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {order.paymentMethod}
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
                          {order.createdAt}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            총 {filteredOrders.length}건
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              이전
            </Button>
            <Button variant="outline" size="sm">
              다음
            </Button>
          </div>
        </div>
      </MainContent>
    </>
  );
}

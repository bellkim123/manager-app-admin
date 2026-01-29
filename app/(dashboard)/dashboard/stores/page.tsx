'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { Header, MainContent } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const stores = [
  {
    id: '1',
    name: '강남점',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    owner: '김점주',
    status: 'active' as const,
    todayOrders: 47,
    todayRevenue: '₩892,000',
  },
  {
    id: '2',
    name: '홍대점',
    address: '서울시 마포구 홍익로 45',
    phone: '02-2345-6789',
    owner: '이점주',
    status: 'active' as const,
    todayOrders: 38,
    todayRevenue: '₩654,000',
  },
  {
    id: '3',
    name: '판교점',
    address: '경기도 성남시 분당구 판교역로 12',
    phone: '031-345-6789',
    owner: '박점주',
    status: 'active' as const,
    todayOrders: 52,
    todayRevenue: '₩1,023,000',
  },
  {
    id: '4',
    name: '신촌점',
    address: '서울시 서대문구 연세로 78',
    phone: '02-3456-7890',
    owner: '최점주',
    status: 'inactive' as const,
    todayOrders: 0,
    todayRevenue: '₩0',
  },
  {
    id: '5',
    name: '역삼점',
    address: '서울시 강남구 역삼로 234',
    phone: '02-4567-8901',
    owner: '정점주',
    status: 'pending' as const,
    todayOrders: 0,
    todayRevenue: '₩0',
  },
];

const statusConfig = {
  active: { label: '운영중', className: 'bg-green-100 text-green-700' },
  inactive: { label: '휴업', className: 'bg-gray-100 text-gray-700' },
  pending: { label: '승인대기', className: 'bg-yellow-100 text-yellow-700' },
};

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header title="매장 관리" />
      <MainContent>
          {/* Header Actions */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="매장명, 주소, 점주 검색..."
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
              매장 추가
            </Button>
          </div>

          {/* Store Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStores.map((store) => {
              const status = statusConfig[store.status];
              return (
                <Card key={store.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{store.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {store.owner}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-medium',
                            status.className
                          )}
                        >
                          {status.label}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>상세 보기</DropdownMenuItem>
                            <DropdownMenuItem>수정</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{store.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{store.phone}</span>
                      </div>
                    </div>

                    {store.status === 'active' && (
                      <div className="mt-4 flex items-center justify-between border-t pt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">오늘 주문</p>
                          <p className="font-semibold">{store.todayOrders}건</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">오늘 매출</p>
                          <p className="font-semibold">{store.todayRevenue}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

        {filteredStores.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">
              검색 결과가 없습니다.
            </p>
          </div>
        )}
      </MainContent>
    </>
  );
}

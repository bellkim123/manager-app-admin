'use client';

import { useState } from 'react';
import {
  Search,
  MoreHorizontal,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Store,
} from 'lucide-react';
import { Header, MainContent } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// 브랜드 정보
const brands = [
  { code: 'K0130000', name: '매머드커피', color: 'bg-[#8B4513]' },
  { code: 'K0340000', name: '더 리터', color: 'bg-[#1E40AF]' },
  { code: 'K0720000', name: '오크베리', color: 'bg-[#7C3AED]' },
  { code: 'K0570000', name: '하삼동커피', color: 'bg-[#DC2626]' },
];

const stores = [
  {
    id: '1',
    brandCode: 'K0130000',
    name: '강남역점',
    address: '서울시 강남구 강남대로 390',
    phone: '02-1234-5678',
    owner: '김매머',
    status: 'active' as const,
    todayOrders: 152,
    todayRevenue: 1250000,
  },
  {
    id: '2',
    brandCode: 'K0340000',
    name: '서면점',
    address: '부산시 부산진구 중앙대로 694',
    phone: '051-234-5678',
    owner: '이리터',
    status: 'active' as const,
    todayOrders: 88,
    todayRevenue: 980000,
  },
  {
    id: '3',
    brandCode: 'K0720000',
    name: '여의도파크원점',
    address: '서울시 영등포구 여의대로 108',
    phone: '02-3456-7890',
    owner: '박오크',
    status: 'active' as const,
    todayOrders: 95,
    todayRevenue: 2100000,
  },
  {
    id: '4',
    brandCode: 'K0570000',
    name: '부산본점',
    address: '부산시 부산진구 전포대로209번길 42',
    phone: '051-456-7890',
    owner: '최하삼',
    status: 'active' as const,
    todayOrders: 210,
    todayRevenue: 1890000,
  },
  {
    id: '5',
    brandCode: 'K0130000',
    name: '판교테크노밸리점',
    address: '경기도 성남시 분당구 판교역로 235',
    phone: '031-567-8901',
    owner: '정매머',
    status: 'pending' as const,
    todayOrders: 0,
    todayRevenue: 0,
  },
  {
    id: '6',
    brandCode: 'K0340000',
    name: '대구동성로점',
    address: '대구시 중구 동성로2길 81',
    phone: '053-678-9012',
    owner: '한리터',
    status: 'inactive' as const,
    todayOrders: 0,
    todayRevenue: 0,
  },
  {
    id: '7',
    brandCode: 'K0720000',
    name: '압구정점',
    address: '서울시 강남구 압구정로42길 25-10',
    phone: '02-789-0123',
    owner: '윤오크',
    status: 'active' as const,
    todayOrders: 78,
    todayRevenue: 1850000,
  },
  {
    id: '8',
    brandCode: 'K0570000',
    name: '서울숲점',
    address: '서울시 성동구 서울숲2길 44-13',
    phone: '02-890-1234',
    owner: '조하삼',
    status: 'active' as const,
    todayOrders: 110,
    todayRevenue: 1320000,
  },
];

const statusConfig = {
  active: { label: '운영중', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  inactive: { label: '휴업', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
  pending: { label: '승인대기', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
};

const ITEMS_PER_PAGE = 10;

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // 필터링
  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = brandFilter === 'all' || store.brandCode === brandFilter;
    const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
    return matchesSearch && matchesBrand && matchesStatus;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStores = filteredStores.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 통계
  const stats = {
    total: filteredStores.length,
    active: filteredStores.filter((s) => s.status === 'active').length,
    todayOrders: filteredStores.reduce((acc, s) => acc + s.todayOrders, 0),
    todayRevenue: filteredStores.reduce((acc, s) => acc + s.todayRevenue, 0),
  };

  const getBrand = (code: string) => brands.find((b) => b.code === code);

  const formatRevenue = (value: number) => {
    if (value >= 1000000) {
      return `₩${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `₩${(value / 1000).toFixed(0)}K`;
    }
    return `₩${value}`;
  };

  return (
    <>
      <Header title="매장 관리" />
      <MainContent>
        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground">전체 매장</p>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground">운영중</p>
            <p className="text-xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground">오늘 총 주문</p>
            <p className="text-xl font-bold">{stats.todayOrders.toLocaleString()}건</p>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground">오늘 총 매출</p>
            <p className="text-xl font-bold">{formatRevenue(stats.todayRevenue)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="매장명, 주소, 점주 검색..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={brandFilter}
              onValueChange={(value) => {
                setBrandFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-35">
                <SelectValue placeholder="브랜드" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 브랜드</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.code} value={brand.code}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-30">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="active">운영중</SelectItem>
                <SelectItem value="inactive">휴업</SelectItem>
                <SelectItem value="pending">승인대기</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Store List */}
        <div className="space-y-2 md:hidden">
          {paginatedStores.map((store) => {
            const brand = getBrand(store.brandCode);
            const status = statusConfig[store.status];

            return (
              <div
                key={store.id}
                className="rounded-lg border bg-card p-3 active:bg-muted/50"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full shrink-0',
                        brand?.color || 'bg-gray-400'
                      )}
                    />
                    <span className="text-xs text-muted-foreground">{brand?.name}</span>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium shrink-0',
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{store.name}</p>
                    <p className="text-sm text-muted-foreground">{store.owner}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {store.address}
                    </p>
                  </div>
                  {store.status === 'active' && (
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold">{store.todayOrders}건</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRevenue(store.todayRevenue)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Store Table */}
        <div className="hidden md:block rounded-lg border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  브랜드
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  매장
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  점주
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  주소
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  오늘 주문
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  오늘 매출
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                  상태
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">

                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedStores.map((store) => {
                const brand = getBrand(store.brandCode);
                const status = statusConfig[store.status];

                return (
                  <tr
                    key={store.id}
                    className="border-b last:border-0 hover:bg-muted/30 cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            'h-2.5 w-2.5 rounded-full',
                            brand?.color || 'bg-gray-400'
                          )}
                        />
                        <span className="text-sm">{brand?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{store.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{store.owner}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-w-50">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{store.address}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {store.status === 'active' ? (
                        <span className="font-medium">{store.todayOrders}건</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {store.status === 'active' ? (
                        <span className="font-medium">{formatRevenue(store.todayRevenue)}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={cn(
                          'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
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
                            <Phone className="mr-2 h-4 w-4" />
                            {store.phone}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>주문 내역</DropdownMenuItem>
                          <DropdownMenuItem>매출 통계</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredStores.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Store className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredStores.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              총 {filteredStores.length}개 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredStores.length)}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1 px-2">
                <span className="text-sm font-medium">{currentPage}</span>
                <span className="text-sm text-muted-foreground">/ {totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </MainContent>
    </>
  );
}

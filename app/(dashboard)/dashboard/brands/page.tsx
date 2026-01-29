'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Building2,
  Smartphone,
  Settings2,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { Header, MainContent } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const brands = [
  {
    id: '1',
    code: 'K0130000',
    name: '매머드커피',
    status: 'active' as const,
    storeCount: 156,
    ownerCount: 124,
    createdAt: '2022-03-15',
    settings: {
      primaryColor: '#8B4513',
      logo: '/images/mammoth-logo.png',
      appName: '매머드커피 점주',
      pushEnabled: true,
      operatingHours: '07:00 - 22:00',
    },
  },
  {
    id: '2',
    code: 'K0340000',
    name: '더 리터',
    status: 'active' as const,
    storeCount: 89,
    ownerCount: 72,
    createdAt: '2022-06-20',
    settings: {
      primaryColor: '#1E40AF',
      logo: '/images/theliter-logo.png',
      appName: '더 리터 파트너',
      pushEnabled: true,
      operatingHours: '08:00 - 23:00',
    },
  },
  {
    id: '3',
    code: 'K0720000',
    name: '오크베리',
    status: 'active' as const,
    storeCount: 45,
    ownerCount: 38,
    createdAt: '2023-01-10',
    settings: {
      primaryColor: '#7C3AED',
      logo: '/images/oakberry-logo.png',
      appName: '오크베리 사장님',
      pushEnabled: true,
      operatingHours: '10:00 - 22:00',
    },
  },
  {
    id: '4',
    code: 'K0570000',
    name: '하삼동커피',
    status: 'active' as const,
    storeCount: 203,
    ownerCount: 178,
    createdAt: '2021-11-05',
    settings: {
      primaryColor: '#DC2626',
      logo: '/images/hasamdong-logo.png',
      appName: '하삼동커피 점주',
      pushEnabled: true,
      operatingHours: '06:00 - 24:00',
    },
  },
];

const statusConfig = {
  active: { label: '운영중', className: 'bg-green-100 text-green-700' },
  inactive: { label: '비활성', className: 'bg-gray-100 text-gray-700' },
};

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBrandId, setExpandedBrandId] = useState<string | null>(null);

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBrandExpand = (brandId: string) => {
    setExpandedBrandId(expandedBrandId === brandId ? null : brandId);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Header title="브랜드 관리" />
      <MainContent>
          {/* Header */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              브랜드별 설정과 점주앱 기본 세팅을 관리합니다.
            </p>
          </div>

          {/* Header Actions */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="브랜드명, 코드 검색..."
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
              브랜드 추가
            </Button>
          </div>

          {/* Brands Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBrands.map((brand) => {
              const status = statusConfig[brand.status];
              const isExpanded = expandedBrandId === brand.id;

              return (
                <div
                  key={brand.id}
                  className={cn(
                    'rounded-lg border bg-card transition-all',
                    isExpanded && 'md:col-span-2 lg:col-span-3'
                  )}
                >
                  {/* Brand Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ backgroundColor: brand.settings.primaryColor + '20' }}
                        >
                          <Building2
                            className="h-5 w-5"
                            style={{ color: brand.settings.primaryColor }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{brand.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                              {brand.code}
                            </code>
                            <button
                              onClick={() => copyToClipboard(brand.code)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
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
                            <DropdownMenuItem>설정 수정</DropdownMenuItem>
                            <DropdownMenuItem>브랜드 복제</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              브랜드 삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-semibold">{brand.storeCount}</p>
                        <p className="text-xs text-muted-foreground">매장 수</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">{brand.ownerCount}</p>
                        <p className="text-xs text-muted-foreground">점주 수</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{brand.createdAt}</p>
                        <p className="text-xs text-muted-foreground">생성일</p>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => toggleBrandExpand(brand.id)}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="mr-2 h-4 w-4" />
                          설정 접기
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-2 h-4 w-4" />
                          상세 설정 보기
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Expanded Settings */}
                  {isExpanded && (
                    <div className="border-t bg-muted/30 p-4">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* 앱 기본 설정 */}
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            점주앱 기본 설정
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">앱 이름</span>
                              <span className="text-sm font-medium">{brand.settings.appName}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">브랜드 컬러</span>
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-5 w-5 rounded border"
                                  style={{ backgroundColor: brand.settings.primaryColor }}
                                />
                                <span className="text-sm font-mono">{brand.settings.primaryColor}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">운영 시간</span>
                              <span className="text-sm font-medium">{brand.settings.operatingHours}</span>
                            </div>
                          </div>
                        </div>

                        {/* 알림 설정 */}
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center gap-2">
                            <Settings2 className="h-4 w-4" />
                            알림 설정
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">푸시 알림</span>
                              <span className={cn(
                                'text-sm font-medium',
                                brand.settings.pushEnabled ? 'text-green-600' : 'text-gray-400'
                              )}>
                                {brand.settings.pushEnabled ? '활성' : '비활성'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-4 border-t flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          점주앱 미리보기
                        </Button>
                        <Button size="sm">
                          <Settings2 className="mr-2 h-3 w-3" />
                          설정 수정
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        {filteredBrands.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        )}
      </MainContent>
    </>
  );
}

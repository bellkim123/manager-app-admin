'use client';

import { Calendar, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Store } from 'lucide-react';
import { Header, MainContent } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <>
      <Header title="매출 통계" />
      <MainContent>
          {/* Period Selector */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                오늘
              </Button>
              <Button variant="secondary" size="sm">
                이번 주
              </Button>
              <Button variant="outline" size="sm">
                이번 달
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                기간 선택
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  총 매출
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩48.2M</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12.5% 전주 대비
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  총 주문수
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,847</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +8.2% 전주 대비
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  평균 객단가
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩7,850</div>
                <div className="flex items-center text-xs text-red-600">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  -2.1% 전주 대비
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  활성 매장
                </CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">138</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +3 전주 대비
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Placeholder */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  일별 매출 추이
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    차트 컴포넌트 영역 (Recharts 설치 필요)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  시간대별 주문량
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    차트 컴포넌트 영역 (Recharts 설치 필요)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  인기 메뉴 TOP 10
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: '아메리카노', count: 2847, percent: 100 },
                    { name: '카페라떼', count: 2134, percent: 75 },
                    { name: '바닐라라떼', count: 1856, percent: 65 },
                    { name: '콜드브루', count: 1623, percent: 57 },
                    { name: '카푸치노', count: 1245, percent: 44 },
                  ].map((item, index) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span className="w-5 text-sm font-medium text-muted-foreground">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {item.count.toLocaleString()}건
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  지역별 매출
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: '강남구', revenue: '₩12.4M', stores: 24 },
                    { name: '마포구', revenue: '₩8.7M', stores: 18 },
                    { name: '성남시', revenue: '₩7.2M', stores: 15 },
                    { name: '서대문구', revenue: '₩5.8M', stores: 12 },
                    { name: '용산구', revenue: '₩4.3M', stores: 9 },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.stores}개 매장
                        </p>
                      </div>
                      <span className="text-sm font-semibold">{item.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
      </MainContent>
    </>
  );
}

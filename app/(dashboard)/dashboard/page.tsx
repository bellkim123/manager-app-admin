'use client';

import {
  Store,
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header, MainContent } from '@/components/layouts';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: '총 매장',
    value: '142',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Store,
    description: '지난달 대비',
  },
  {
    title: '활성 점주',
    value: '128',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Users,
    description: '지난달 대비',
  },
  {
    title: '오늘 주문',
    value: '1,847',
    change: '+23%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
    description: '어제 대비',
  },
  {
    title: '오늘 매출',
    value: '₩12.4M',
    change: '-5%',
    changeType: 'negative' as const,
    icon: TrendingUp,
    description: '어제 대비',
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    store: '강남점',
    amount: '₩45,000',
    items: '아메리카노 외 3건',
    time: '2분 전',
  },
  {
    id: 'ORD-002',
    store: '홍대점',
    amount: '₩32,000',
    items: '카페라떼 외 2건',
    time: '5분 전',
  },
  {
    id: 'ORD-003',
    store: '판교점',
    amount: '₩28,500',
    items: '바닐라라떼 외 1건',
    time: '8분 전',
  },
  {
    id: 'ORD-004',
    store: '신촌점',
    amount: '₩56,000',
    items: '콜드브루 외 4건',
    time: '12분 전',
  },
  {
    id: 'ORD-005',
    store: '역삼점',
    amount: '₩19,500',
    items: '에스프레소 외 1건',
    time: '15분 전',
  },
];

const topStores = [
  { name: '강남점', revenue: '₩2.4M', orders: 234, growth: '+15%' },
  { name: '홍대점', revenue: '₩2.1M', orders: 198, growth: '+12%' },
  { name: '판교점', revenue: '₩1.9M', orders: 187, growth: '+8%' },
  { name: '신촌점', revenue: '₩1.7M', orders: 165, growth: '+5%' },
];

export default function DashboardPage() {
  return (
    <>
      <Header title="대시보드" />
      <MainContent>
        {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              안녕하세요, 관리자님 👋
            </h2>
            <p className="text-muted-foreground">
              오늘의 매장 현황을 확인해보세요.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs">
                    <span
                      className={cn(
                        'flex items-center',
                        stat.changeType === 'positive'
                          ? 'text-green-600'
                          : 'text-red-600'
                      )}
                    >
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className="mr-0.5 h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="mr-0.5 h-3 w-3" />
                      )}
                      {stat.change}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  최근 주문
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{order.store}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.items}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{order.amount}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Stores */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  매출 상위 매장
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStores.map((store, index) => (
                    <div
                      key={store.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{store.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {store.orders}건 주문
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{store.revenue}</p>
                        <p className="text-xs text-green-600">{store.growth}</p>
                      </div>
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

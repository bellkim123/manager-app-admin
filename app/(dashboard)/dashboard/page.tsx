'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

// 클라이언트 마운트 상태 추적 (SSR 경고 방지)
const emptySubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(emptySubscribe, () => true, () => false);
import {
  Store,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Package,
  Percent,
  Award,
  Activity,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header, MainContent } from '@/components/layouts';
import { cn } from '@/lib/utils';

// 역할 타입
type UserRole = 'super_admin' | 'brand_admin';

// ============================================
// 슈퍼관리자용 데이터
// ============================================
const superAdminStats = [
  {
    title: '전체 브랜드',
    value: '4',
    change: '+1',
    changeType: 'positive' as const,
    icon: Building2,
    description: '이번 달 신규',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: '전체 매장',
    value: '1,990',
    change: '+45',
    changeType: 'positive' as const,
    icon: Store,
    description: '이번 달 신규',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: '전체 점주',
    value: '1,680',
    change: '+38',
    changeType: 'positive' as const,
    icon: Users,
    description: '이번 달 신규',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: '월 총 매출',
    value: '₩8.2B',
    change: '+11.3%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: '전월 대비',
    gradient: 'from-orange-500 to-amber-500',
  },
];

const brandPerformance = [
  {
    name: '매머드커피',
    code: 'K0130000',
    stores: 850,
    owners: 720,
    monthlyRevenue: 3200000000,
    growth: 9.8,
    avgOrderValue: 14200,
    targetRate: 102,
    status: 'excellent',
    color: '#D97706',
    bgGradient: 'from-amber-500/10 to-orange-500/5',
    sparkline: [65, 72, 78, 82, 88, 85, 92],
  },
  {
    name: '하삼동커피',
    code: 'K0570000',
    stores: 715,
    owners: 628,
    monthlyRevenue: 2850000000,
    growth: 12.3,
    avgOrderValue: 15800,
    targetRate: 98,
    status: 'excellent',
    color: '#DC2626',
    bgGradient: 'from-red-500/10 to-rose-500/5',
    sparkline: [58, 65, 70, 75, 82, 86, 90],
  },
  {
    name: '더 리터',
    code: 'K0340000',
    stores: 390,
    owners: 312,
    monthlyRevenue: 1560000000,
    growth: 15.2,
    avgOrderValue: 12500,
    targetRate: 94,
    status: 'growing',
    color: '#2563EB',
    bgGradient: 'from-blue-500/10 to-indigo-500/5',
    sparkline: [45, 52, 58, 65, 72, 78, 85],
  },
  {
    name: '오크베리',
    code: 'K0720000',
    stores: 35,
    owners: 28,
    monthlyRevenue: 140000000,
    growth: -2.1,
    avgOrderValue: 18900,
    targetRate: 78,
    status: 'attention',
    color: '#7C3AED',
    bgGradient: 'from-violet-500/10 to-purple-500/5',
    sparkline: [42, 45, 43, 40, 38, 35, 38],
  },
];

const quickActions = [
  { icon: Sparkles, label: '신규 브랜드', count: 1, color: 'text-violet-500' },
  { icon: Target, label: '목표 달성', count: 3, color: 'text-emerald-500' },
  { icon: Zap, label: '실시간 이슈', count: 2, color: 'text-amber-500' },
];

// ============================================
// 브랜드관리자용 데이터
// ============================================
const brandAdminStats = [
  {
    title: '운영 매장',
    value: '715',
    subValue: '영업중 698 / 휴업 17',
    change: '+8',
    changeType: 'positive' as const,
    icon: Store,
    description: '이번 달 신규',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: '활성 점주',
    value: '628',
    subValue: '신규 15 / 휴면 12',
    change: '+15',
    changeType: 'positive' as const,
    icon: Users,
    description: '이번 달 신규',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: '오늘 주문',
    value: '18,420',
    subValue: '평균 주문가 ₩15,800',
    change: '+12.3%',
    changeType: 'positive' as const,
    icon: Package,
    description: '어제 대비',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: '오늘 매출',
    value: '₩291M',
    subValue: '목표 달성률 97%',
    change: '+8.7%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: '어제 대비',
    gradient: 'from-orange-500 to-amber-500',
  },
];

const storeRanking = [
  { rank: 1, name: '강남역점', area: '서울 강남', todayRevenue: 4850000, todayOrders: 262, growth: 18.5 },
  { rank: 2, name: '홍대입구점', area: '서울 마포', todayRevenue: 4120000, todayOrders: 223, growth: 12.3 },
  { rank: 3, name: '판교테크노점', area: '경기 성남', todayRevenue: 3890000, todayOrders: 198, growth: 15.7 },
  { rank: 4, name: '부산서면점', area: '부산 부산진', todayRevenue: 3450000, todayOrders: 187, growth: 8.9 },
  { rank: 5, name: '대전둔산점', area: '대전 서구', todayRevenue: 3120000, todayOrders: 168, growth: -2.1 },
];

const hourlyData = [
  { hour: '06', orders: 145, revenue: 2290 },
  { hour: '07', orders: 428, revenue: 6762 },
  { hour: '08', orders: 842, revenue: 13303 },
  { hour: '09', orders: 687, revenue: 10854 },
  { hour: '10', orders: 498, revenue: 7868 },
  { hour: '11', orders: 656, revenue: 10364 },
  { hour: '12', orders: 1078, revenue: 17032 },
  { hour: '13', orders: 912, revenue: 14409 },
  { hour: '14', orders: 534, revenue: 8437 },
  { hour: '15', orders: 598, revenue: 9448 },
  { hour: '16', orders: 567, revenue: 8958 },
  { hour: '17', orders: 789, revenue: 12466 },
  { hour: '18', orders: 1021, revenue: 16131 },
  { hour: '19', orders: 867, revenue: 13698 },
  { hour: '20', orders: 612, revenue: 9669 },
];

const storeStatusData = [
  { name: '영업중', value: 698, color: '#10b981' },
  { name: '휴업', value: 17, color: '#f59e0b' },
];

const operationalAlerts = [
  { type: 'inquiry', icon: MessageSquare, title: '1:1 문의 대기', count: 23, urgent: 5, description: '긴급 5건 포함' },
  { type: 'inventory', icon: Package, title: '재고 부족 알림', count: 8, urgent: 3, description: '3개 매장 긴급' },
  { type: 'review', icon: AlertTriangle, title: '부정 리뷰 감지', count: 4, urgent: 2, description: '1점 리뷰 2건' },
  { type: 'coupon', icon: Percent, title: '쿠폰 만료 예정', count: 3, urgent: 0, description: '7일 이내' },
];

const topProducts = [
  { name: '시그니처 아메리카노', orders: 3847, revenue: 19235000, growth: 12.3 },
  { name: '카페라떼', orders: 2892, revenue: 17352000, growth: 8.7 },
  { name: '바닐라라떼', orders: 2156, revenue: 14014000, growth: 15.2 },
  { name: '콜드브루', orders: 1834, revenue: 11004000, growth: 22.1 },
  { name: '녹차라떼', orders: 1523, revenue: 9138000, growth: -3.2 },
];

// 숫자 포맷 함수
function formatCurrency(value: number): string {
  if (value >= 1000000000) return `₩${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `₩${(value / 1000000).toFixed(0)}M`;
  if (value >= 1000) return `₩${(value / 1000).toFixed(0)}K`;
  return `₩${value.toLocaleString()}`;
}

function formatNumber(value: number): string {
  return value.toLocaleString();
}

// 상태 뱃지 스타일
function getStatusStyle(status: string) {
  switch (status) {
    case 'excellent':
      return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400';
    case 'growing':
      return 'bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400';
    case 'attention':
      return 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400';
    default:
      return 'bg-slate-50 text-slate-600 dark:bg-slate-950/30 dark:text-slate-400';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'excellent':
      return '우수';
    case 'growing':
      return '성장중';
    case 'attention':
      return '관심필요';
    default:
      return '보통';
  }
}

export default function DashboardPage() {
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');

  return (
    <>
      <Header title="대시보드" />
      <MainContent>
        {/* Role Switcher */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {currentRole === 'super_admin' ? '플랫폼 운영 현황' : '브랜드 운영 현황'}
            </h2>
            <p className="text-muted-foreground">
              {currentRole === 'super_admin'
                ? '전체 브랜드의 성과를 한눈에 확인하세요.'
                : '하삼동커피 브랜드의 실시간 현황입니다.'}
            </p>
          </div>
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'rounded-md px-3 transition-all',
                currentRole === 'super_admin' && 'bg-background shadow-sm'
              )}
              onClick={() => setCurrentRole('super_admin')}
            >
              슈퍼관리자
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'rounded-md px-3 transition-all',
                currentRole === 'brand_admin' && 'bg-background shadow-sm'
              )}
              onClick={() => setCurrentRole('brand_admin')}
            >
              브랜드관리자
            </Button>
          </div>
        </div>

        {currentRole === 'super_admin' ? (
          <SuperAdminDashboard />
        ) : (
          <BrandAdminDashboard />
        )}
      </MainContent>
    </>
  );
}

// ============================================
// 슈퍼관리자 대시보드
// ============================================
function SuperAdminDashboard() {
  const mounted = useMounted();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {superAdminStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <div className={cn('absolute inset-0 opacity-5 bg-gradient-to-br', stat.gradient)} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn('rounded-lg p-2 bg-gradient-to-br', stat.gradient)}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                <span
                  className={cn(
                    'flex items-center font-medium',
                    stat.changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'
                  )}
                >
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="mr-0.5 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-0.5 h-3 w-3" />
                  )}
                  {stat.change}
                </span>
                <span className="ml-1.5 text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Brand Performance & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Brand Performance Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Building2 className="h-4 w-4" />
              브랜드별 성과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">브랜드</th>
                    <th className="pb-3 font-medium text-right">매장</th>
                    <th className="pb-3 font-medium text-right">월 매출</th>
                    <th className="pb-3 font-medium text-right">성장률</th>
                    <th className="pb-3 font-medium text-center">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {brandPerformance.map((brand) => (
                    <tr key={brand.name} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: brand.color }}
                          />
                          <span className="font-medium">{brand.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right tabular-nums">{formatNumber(brand.stores)}개</td>
                      <td className="py-3 text-right tabular-nums">{formatCurrency(brand.monthlyRevenue)}</td>
                      <td className="py-3 text-right">
                        <span
                          className={cn(
                            'inline-flex items-center font-medium tabular-nums',
                            brand.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'
                          )}
                        >
                          {brand.growth >= 0 ? (
                            <ArrowUpRight className="mr-0.5 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-0.5 h-3 w-3" />
                          )}
                          {Math.abs(brand.growth)}%
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            getStatusStyle(brand.status)
                          )}
                        >
                          {getStatusLabel(brand.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Zap className="h-4 w-4" />
              빠른 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <div
                  key={action.label}
                  className="flex items-center justify-between rounded-xl border bg-gradient-to-r from-muted/50 to-transparent p-4 transition-all hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('rounded-lg bg-background p-2 shadow-sm', action.color)}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </div>
                  <span className="text-2xl font-bold tabular-nums">{action.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brand Performance Cards - Top 4 */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-semibold">
            <TrendingUp className="h-4 w-4" />
            매출 상위 브랜드
            <span className="ml-1 text-sm font-normal text-muted-foreground">TOP 4</span>
          </h3>
          <Link
            href="/dashboard/brands"
            className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            전체 브랜드 보기
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {brandPerformance.slice(0, 4).map((brand) => (
            <div
              key={brand.name}
              className={cn(
                'group relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 transition-all hover:shadow-lg hover:-translate-y-0.5',
                brand.bgGradient
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm"
                    style={{ backgroundColor: brand.color + '15' }}
                  >
                    <Building2 className="h-5 w-5" style={{ color: brand.color }} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{brand.name}</h4>
                    <p className="text-xs text-muted-foreground">{brand.stores}개 매장</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-medium',
                    getStatusStyle(brand.status)
                  )}
                >
                  {getStatusLabel(brand.status)}
                </span>
              </div>

              {/* Sparkline */}
              <div className="my-4 h-12">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={brand.sparkline.map((v, i) => ({ v, i }))}>
                      <defs>
                        <linearGradient id={`gradient-${brand.code}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={brand.color} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={brand.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={brand.color}
                        strokeWidth={2}
                        fill={`url(#gradient-${brand.code})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">월 매출</p>
                  <p className="text-lg font-bold tabular-nums">
                    {formatCurrency(brand.monthlyRevenue)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">성장률</p>
                  <p
                    className={cn(
                      'flex items-center text-lg font-bold tabular-nums',
                      brand.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    )}
                  >
                    {brand.growth >= 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {Math.abs(brand.growth)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">목표 달성</p>
                  <p className="text-lg font-bold tabular-nums">{brand.targetRate}%</p>
                </div>
              </div>

              {/* Progress bar for target */}
              <div className="mt-3">
                <div className="h-1.5 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(brand.targetRate, 100)}%`,
                      backgroundColor: brand.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 브랜드관리자 대시보드
// ============================================
function BrandAdminDashboard() {
  const mounted = useMounted();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {brandAdminStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <div className={cn('absolute inset-0 opacity-5 bg-gradient-to-br', stat.gradient)} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn('rounded-lg p-2 bg-gradient-to-br', stat.gradient)}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subValue}</p>
              <div className="mt-1 flex items-center text-xs">
                <span
                  className={cn(
                    'flex items-center font-medium',
                    stat.changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'
                  )}
                >
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="mr-0.5 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-0.5 h-3 w-3" />
                  )}
                  {stat.change}
                </span>
                <span className="ml-1.5 text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hourly Chart & Store Status */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hourly Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Activity className="h-4 w-4" />
              시간대별 주문 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                    <XAxis
                      dataKey="hour"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => `${value}시`}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      formatter={(value, name) => [
                        name === 'orders' ? `${formatNumber(value as number)}건` : `₩${value}K`,
                        name === 'orders' ? '주문' : '매출',
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#orderGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Store Status & Alerts */}
        <div className="space-y-6">
          {/* Store Status Pie */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Store className="h-4 w-4" />
                매장 운영 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-[100px] w-[100px]">
                  {mounted && (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                      <PieChart>
                        <Pie
                          data={storeStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          dataKey="value"
                          strokeWidth={0}
                        >
                          {storeStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">영업중 698개</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">휴업 17개</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operational Alerts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <AlertTriangle className="h-4 w-4" />
                운영 알림
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {operationalAlerts.map((alert) => (
                  <div
                    key={alert.type}
                    className={cn(
                      'flex items-center justify-between rounded-lg p-2.5 transition-colors',
                      alert.urgent > 0
                        ? 'bg-rose-50 dark:bg-rose-950/20'
                        : 'bg-muted/50 hover:bg-muted'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <alert.icon
                        className={cn(
                          'h-4 w-4',
                          alert.urgent > 0 ? 'text-rose-500' : 'text-muted-foreground'
                        )}
                      />
                      <div>
                        <p className="text-xs font-medium">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.description}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-medium',
                        alert.urgent > 0
                          ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      )}
                    >
                      {alert.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Store Ranking & Top Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Store Ranking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Award className="h-4 w-4" />
              매장별 오늘 매출 순위
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {storeRanking.map((store) => (
                <div
                  key={store.rank}
                  className="flex items-center justify-between rounded-lg bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                        store.rank === 1
                          ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white'
                          : store.rank === 2
                          ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white'
                          : store.rank === 3
                          ? 'bg-gradient-to-br from-orange-300 to-orange-400 text-white'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {store.rank}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{store.name}</p>
                      <p className="text-xs text-muted-foreground">{store.area}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums">{formatCurrency(store.todayRevenue)}</p>
                    <p className="text-xs text-muted-foreground">{store.todayOrders}건</p>
                  </div>
                  <span
                    className={cn(
                      'flex items-center text-xs font-medium tabular-nums',
                      store.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    )}
                  >
                    {store.growth >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(store.growth)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Package className="h-4 w-4" />
              인기 상품 TOP 5
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded text-xs font-bold',
                          index === 0
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums">{formatNumber(product.orders)}건</span>
                      <span
                        className={cn(
                          'flex items-center text-xs font-medium tabular-nums',
                          product.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'
                        )}
                      >
                        {product.growth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                      style={{
                        width: `${(product.orders / topProducts[0].orders) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Megaphone,
  Calendar,
  Users,
  Send,
  Pause,
  Play,
  Copy,
  BarChart3,
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

const campaigns = [
  {
    id: '1',
    name: '신규 가입 웰컴 쿠폰',
    description: '신규 가입 고객에게 3,000원 할인 쿠폰 자동 발송',
    status: 'active' as const,
    type: 'auto' as const,
    targetCount: 1523,
    sentCount: 1523,
    usedCount: 892,
    conversionRate: 58.6,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: '2',
    name: '설 연휴 스페셜 프로모션',
    description: '설 연휴 기간 전 고객 대상 20% 할인 쿠폰',
    status: 'active' as const,
    type: 'scheduled' as const,
    targetCount: 8500,
    sentCount: 8500,
    usedCount: 2340,
    conversionRate: 27.5,
    startDate: '2024-02-05',
    endDate: '2024-02-12',
  },
  {
    id: '3',
    name: '휴면 고객 재방문 캠페인',
    description: '30일 이상 미방문 고객 대상 특별 할인',
    status: 'paused' as const,
    type: 'manual' as const,
    targetCount: 3200,
    sentCount: 2100,
    usedCount: 456,
    conversionRate: 21.7,
    startDate: '2024-01-15',
    endDate: '2024-02-28',
  },
  {
    id: '4',
    name: '생일 축하 쿠폰',
    description: '생일 당일 고객에게 음료 1잔 무료 쿠폰',
    status: 'active' as const,
    type: 'auto' as const,
    targetCount: 245,
    sentCount: 245,
    usedCount: 198,
    conversionRate: 80.8,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: '5',
    name: '봄 시즌 신메뉴 런칭',
    description: '봄 시즌 신메뉴 출시 기념 알림톡 발송',
    status: 'draft' as const,
    type: 'scheduled' as const,
    targetCount: 0,
    sentCount: 0,
    usedCount: 0,
    conversionRate: 0,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
  },
];

const statusConfig = {
  active: { label: '진행중', className: 'bg-green-100 text-green-700' },
  paused: { label: '일시중지', className: 'bg-yellow-100 text-yellow-700' },
  draft: { label: '준비중', className: 'bg-gray-100 text-gray-700' },
  ended: { label: '종료', className: 'bg-red-100 text-red-700' },
};

const typeConfig = {
  auto: { label: '자동', className: 'bg-blue-100 text-blue-700' },
  scheduled: { label: '예약', className: 'bg-purple-100 text-purple-700' },
  manual: { label: '수동', className: 'bg-orange-100 text-orange-700' },
};

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === 'active').length,
    totalSent: campaigns.reduce((acc, c) => acc + c.sentCount, 0),
    avgConversion:
      campaigns.filter((c) => c.sentCount > 0).reduce((acc, c) => acc + c.conversionRate, 0) /
      campaigns.filter((c) => c.sentCount > 0).length,
  };

  return (
    <>
      <Header title="마케팅 캠페인" />
      <MainContent>
          {/* Stats */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  전체 캠페인
                </CardTitle>
                <Megaphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  진행중
                </CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  총 발송
                </CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSent.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  평균 전환율
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgConversion.toFixed(1)}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Header Actions */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="캠페인 검색..."
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
              캠페인 생성
            </Button>
          </div>

          {/* Campaign List */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => {
              const status = statusConfig[campaign.status];
              const type = typeConfig[campaign.type];

              return (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-xs font-medium',
                              status.className
                            )}
                          >
                            {status.label}
                          </span>
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-xs font-medium',
                              type.className
                            )}
                          >
                            {type.label}
                          </span>
                        </div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {campaign.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {campaign.startDate} ~ {campaign.endDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            대상 {campaign.targetCount.toLocaleString()}명
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {campaign.sentCount > 0 && (
                          <div className="text-right">
                            <div className="text-sm">
                              <span className="font-semibold">{campaign.usedCount.toLocaleString()}</span>
                              <span className="text-muted-foreground"> / {campaign.sentCount.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              전환율 {campaign.conversionRate}%
                            </div>
                            <div className="mt-1 h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${campaign.conversionRate}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              상세 분석
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {campaign.status === 'active' ? (
                                <>
                                  <Pause className="mr-2 h-4 w-4" />
                                  일시중지
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  시작하기
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              복제
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
      </MainContent>
    </>
  );
}

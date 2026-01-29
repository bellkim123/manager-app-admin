'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Image, MoreHorizontal, Eye, Calendar } from 'lucide-react';
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

const contents = [
  {
    id: '1',
    title: '1월 신메뉴 출시 안내',
    type: 'notice' as const,
    status: 'published' as const,
    views: 1234,
    createdAt: '2024-01-25',
    thumbnail: null,
  },
  {
    id: '2',
    title: '설 연휴 운영시간 변경',
    type: 'notice' as const,
    status: 'published' as const,
    views: 892,
    createdAt: '2024-01-23',
    thumbnail: null,
  },
  {
    id: '3',
    title: '겨울 시즌 프로모션 배너',
    type: 'banner' as const,
    status: 'published' as const,
    views: 3456,
    createdAt: '2024-01-20',
    thumbnail: '/placeholder.jpg',
  },
  {
    id: '4',
    title: '포인트 적립 이벤트',
    type: 'event' as const,
    status: 'draft' as const,
    views: 0,
    createdAt: '2024-01-28',
    thumbnail: null,
  },
  {
    id: '5',
    title: '앱 업데이트 안내',
    type: 'notice' as const,
    status: 'scheduled' as const,
    views: 0,
    createdAt: '2024-01-30',
    thumbnail: null,
  },
];

const typeConfig = {
  notice: { label: '공지사항', icon: FileText, className: 'bg-blue-100 text-blue-700' },
  banner: { label: '배너', icon: Image, className: 'bg-purple-100 text-purple-700' },
  event: { label: '이벤트', icon: Calendar, className: 'bg-orange-100 text-orange-700' },
};

const statusConfig = {
  published: { label: '게시됨', className: 'bg-green-100 text-green-700' },
  draft: { label: '임시저장', className: 'bg-gray-100 text-gray-700' },
  scheduled: { label: '예약됨', className: 'bg-yellow-100 text-yellow-700' },
};

export default function ContentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'notice' | 'banner' | 'event'>('all');

  const filteredContents = contents.filter((content) => {
    const matchesSearch = content.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || content.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <Header title="콘텐츠 관리" />
      <MainContent>
          {/* Tabs */}
          <div className="mb-6 flex items-center gap-1 border-b">
            {[
              { key: 'all', label: '전체' },
              { key: 'notice', label: '공지사항' },
              { key: 'banner', label: '배너' },
              { key: 'event', label: '이벤트' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === tab.key
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Header Actions */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="제목으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              새 콘텐츠
            </Button>
          </div>

          {/* Content List */}
          <div className="space-y-3">
            {filteredContents.map((content) => {
              const type = typeConfig[content.type];
              const status = statusConfig[content.status];
              const TypeIcon = type.icon;

              return (
                <Card key={content.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail or Icon */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted">
                        {content.thumbnail ? (
                          <Image className="h-6 w-6 text-muted-foreground" />
                        ) : (
                          <TypeIcon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={cn(
                              'rounded px-1.5 py-0.5 text-xs font-medium',
                              type.className
                            )}
                          >
                            {type.label}
                          </span>
                          <span
                            className={cn(
                              'rounded px-1.5 py-0.5 text-xs font-medium',
                              status.className
                            )}
                          >
                            {status.label}
                          </span>
                        </div>
                        <h3 className="font-medium truncate">{content.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{content.createdAt}</span>
                          {content.status === 'published' && (
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {content.views.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>미리보기</DropdownMenuItem>
                          <DropdownMenuItem>수정</DropdownMenuItem>
                          <DropdownMenuItem>복제</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        {filteredContents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">콘텐츠가 없습니다.</p>
          </div>
        )}
      </MainContent>
    </>
  );
}

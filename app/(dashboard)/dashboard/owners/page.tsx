'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, Store } from 'lucide-react';
import { Header, MainContent } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const owners = [
  {
    id: '1',
    name: '김점주',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    stores: ['강남점', '역삼점'],
    status: 'active' as const,
    joinedAt: '2023-01-15',
  },
  {
    id: '2',
    name: '이점주',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    stores: ['홍대점'],
    status: 'active' as const,
    joinedAt: '2023-03-20',
  },
  {
    id: '3',
    name: '박점주',
    email: 'park@example.com',
    phone: '010-3456-7890',
    stores: ['판교점', '분당점'],
    status: 'active' as const,
    joinedAt: '2023-05-10',
  },
  {
    id: '4',
    name: '최점주',
    email: 'choi@example.com',
    phone: '010-4567-8901',
    stores: ['신촌점'],
    status: 'inactive' as const,
    joinedAt: '2022-11-05',
  },
  {
    id: '5',
    name: '정점주',
    email: 'jung@example.com',
    phone: '010-5678-9012',
    stores: [],
    status: 'pending' as const,
    joinedAt: '2024-01-20',
  },
];

const statusConfig = {
  active: { label: '활성', className: 'bg-green-100 text-green-700' },
  inactive: { label: '비활성', className: 'bg-gray-100 text-gray-700' },
  pending: { label: '승인대기', className: 'bg-yellow-100 text-yellow-700' },
};

export default function OwnersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.stores.some((store) =>
        store.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <>
      <Header title="점주 관리" />
      <MainContent>
          {/* Header Actions */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="이름, 이메일, 매장 검색..."
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
              점주 추가
            </Button>
          </div>

          {/* Owners Table */}
          <div className="rounded-lg border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      점주
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      연락처
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      담당 매장
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      상태
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      가입일
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOwners.map((owner) => {
                    const status = statusConfig[owner.status];
                    return (
                      <tr key={owner.id} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback className="text-xs">
                                {owner.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{owner.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Mail className="h-3.5 w-3.5" />
                              {owner.email}
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              {owner.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <Store className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">
                              {owner.stores.length > 0
                                ? owner.stores.join(', ')
                                : '-'}
                            </span>
                          </div>
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
                          {owner.joinedAt}
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
                              <DropdownMenuItem>수정</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                비활성화
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

        {filteredOwners.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        )}
      </MainContent>
    </>
  );
}

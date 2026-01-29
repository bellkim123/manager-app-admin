'use client';

import { useState } from 'react';
import {
  Search,
  Archive,
  Edit,
  Paperclip,
  Send,
  MessageSquare,
} from 'lucide-react';
import { Header, MainContent } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const inquiries = [
  {
    id: 'INQ-001',
    brand: '매머드커피',
    store: '강남역점',
    category: '정산',
    title: '7월 3주차 정산금액이 맞나요?',
    content: '앱에 표시된 7월 3주차 정산금액과 실제 입금된 금액에 차이가 있습니다. 확인 부탁드립니다.',
    author: '김매머',
    createdAt: '2024-07-22T10:30:00Z',
    status: 'pending' as const,
    history: [],
  },
  {
    id: 'INQ-002',
    brand: '하삼동커피',
    store: '부산본점',
    category: '앱 기능',
    title: '신메뉴 등록은 어떻게 하나요?',
    content: '이번에 새로 출시된 딸기라떼를 점주앱에 등록하고 싶은데, 방법을 잘 모르겠습니다. 상세히 알려주세요.',
    author: '최하삼',
    createdAt: '2024-07-21T15:12:00Z',
    status: 'replied' as const,
    history: [
      {
        type: 'reply' as const,
        author: '관리자',
        content: '안녕하세요, 점주님. 신메뉴 등록은 [상품 관리 > 메뉴 추가] 페이지에서 가능합니다. 관련 매뉴얼을 첨부해드리니 참고 부탁드립니다.',
        createdAt: '2024-07-22T09:00:00Z',
        attachments: [{ name: '신메뉴_등록_가이드.pdf', size: '1.2MB' }],
      },
    ],
  },
  {
    id: 'INQ-003',
    brand: '더 리터',
    store: '서면점',
    category: '계정',
    title: '부점장 계정 추가 문의',
    content: '새로 온 부점장님 계정을 추가하고 싶습니다. 어떻게 해야 하나요?',
    author: '이리터',
    createdAt: '2024-07-20T11:00:00Z',
    status: 'closed' as const,
    history: [
      {
        type: 'reply' as const,
        author: '관리자',
        content: '점주님, 부점장 계정 추가는 저희 쪽에서 처리해드려야 합니다. 추가하실 계정 정보를 알려주시겠어요?',
        createdAt: '2024-07-20T14:20:00Z',
        attachments: [],
      },
      {
        type: 'inquiry' as const,
        author: '이리터',
        content: '네, 정보 보내드립니다. 이름: 박부점, 아이디: parkmanager, 연락처: 010-9876-5432 입니다.',
        createdAt: '2024-07-20T16:45:00Z',
      },
      {
        type: 'reply' as const,
        author: '관리자',
        content: '계정 추가 완료했습니다. 로그인 정보 전달드렸습니다.',
        createdAt: '2024-07-21T10:00:00Z',
        attachments: [],
      },
    ],
  },
];

const statusConfig = {
  pending: { label: '답변대기', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  replied: { label: '답변완료', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  closed: { label: '종료', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
};

type Inquiry = (typeof inquiries)[0];

export default function InquiriesPage() {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(inquiries[0]);

  return (
    <>
      <Header title="1:1 문의" />
      <MainContent className="p-0">
        <div className="flex h-[calc(100vh-57px)]">
          {/* Inquiry List */}
          <div className="w-1/3 min-w-87.5 border-r flex flex-col">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="문의 검색..." className="pl-8" />
              </div>
              <div className="mt-2 flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 상태</SelectItem>
                    <SelectItem value="pending">답변대기</SelectItem>
                    <SelectItem value="replied">답변완료</SelectItem>
                    <SelectItem value="closed">종료</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="브랜드" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 브랜드</SelectItem>
                    <SelectItem value="mammoth">매머드커피</SelectItem>
                    <SelectItem value="theliter">더 리터</SelectItem>
                    <SelectItem value="oakberry">오크베리</SelectItem>
                    <SelectItem value="hasamdong">하삼동커피</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {inquiries.map((inquiry) => (
                <button
                  key={inquiry.id}
                  className={cn(
                    'w-full text-left p-3 border-b hover:bg-muted/50',
                    selectedInquiry?.id === inquiry.id && 'bg-muted'
                  )}
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-muted-foreground">{inquiry.brand} &gt; {inquiry.store}</span>
                    <Badge variant="outline" className={cn(statusConfig[inquiry.status].className, 'border-none')}>
                      {statusConfig[inquiry.status].label}
                    </Badge>
                  </div>
                  <p className="font-medium truncate mt-1">{inquiry.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">{inquiry.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Inquiry Details */}
          <div className="flex-1 flex flex-col">
            {selectedInquiry ? (
              <>
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn(statusConfig[selectedInquiry.status].className, 'border-none')}>
                        {statusConfig[selectedInquiry.status].label}
                      </Badge>
                      <Badge variant="secondary">{selectedInquiry.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm"><Archive className="mr-2 h-4 w-4" /> 보관</Button>
                      <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> 상태 변경</Button>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mt-2">{selectedInquiry.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedInquiry.brand} &gt; {selectedInquiry.store} ({selectedInquiry.author})
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* History */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8 border">
                        <AvatarFallback>{selectedInquiry.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="w-full rounded-md bg-muted p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{selectedInquiry.author}</span>
                          <span className="text-xs text-muted-foreground">{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="mt-2 text-sm">{selectedInquiry.content}</p>
                      </div>
                    </div>
                    {selectedInquiry.history.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 border">
                          <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="w-full rounded-md bg-card border p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{item.author}</span>
                            <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="mt-2 text-sm">{item.content}</p>
                          {item.attachments && item.attachments.length > 0 && (
                            <div className="mt-3">
                              {item.attachments.map((file, fileIndex) => (
                                <Button key={fileIndex} variant="outline" size="sm" className="h-8">
                                  <Paperclip className="mr-2 h-3 w-3" /> {file.name} ({file.size})
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t bg-background">
                  <div className="relative">
                    <Textarea
                      placeholder="답변을 입력하세요..."
                      className="pr-20"
                      rows={3}
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                       <Button size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        전송
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">문의를 선택하세요</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    왼쪽 목록에서 문의를 선택하면 상세 내용을 볼 수 있습니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </MainContent>
    </>
  );
}

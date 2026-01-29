# CLAUDE.md - 소복소복 어드민

> Claude Code CLI 프로젝트 가이드라인

## Quick Reference

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트
npm run lint

# 타입 체크
npx tsc --noEmit
```

## Project Overview

**소복소복 어드민 대시보드** - 다양한 브랜드를 위한 범용 점주 앱 관리 시스템

| 항목 | 값 |
|------|-----|
| Framework | Next.js 16.1 (App Router) |
| React | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui |
| Package Manager | npm |

## Architecture

```
manager-app-admin/
├── app/                          # App Router (Pages & Layouts)
│   ├── (auth)/                   # 인증 관련 라우트 그룹
│   │   ├── login/                # 로그인 페이지
│   │   └── layout.tsx
│   ├── (dashboard)/              # 대시보드 라우트 그룹
│   │   ├── dashboard/            # 대시보드 하위 페이지
│   │   │   ├── page.tsx          # 대시보드 메인
│   │   │   ├── admins/           # 관리자 계정 관리
│   │   │   ├── analytics/        # 분석/통계
│   │   │   ├── contents/         # 콘텐츠 관리
│   │   │   ├── marketing/        # 마케팅
│   │   │   │   ├── campaigns/    # 캠페인
│   │   │   │   ├── coupons/      # 쿠폰
│   │   │   │   └── prepaid-cards/# 선불카드
│   │   │   ├── notifications/    # 알림
│   │   │   ├── orders/           # 주문 데이터
│   │   │   ├── owners/           # 점주 관리
│   │   │   ├── settings/         # 설정
│   │   │   └── stores/           # 매장 관리
│   │   └── layout.tsx
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Home Page (리다이렉트)
│   └── globals.css
├── components/                   # React Components
│   ├── ui/                       # shadcn/ui 컴포넌트
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── popover.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── tooltip.tsx
│   └── layouts/                  # 레이아웃 컴포넌트
│       ├── dashboard-layout.tsx
│       ├── header.tsx
│       ├── sidebar.tsx
│       └── index.ts
├── lib/                          # Utilities & Configurations
│   ├── stores/                   # Zustand 스토어
│   │   ├── sidebar-store.ts      # 사이드바 상태
│   │   └── index.ts
│   └── utils.ts                  # 유틸리티 함수 (cn 등)
├── types/                        # TypeScript Types
│   └── index.ts                  # 공통 타입 정의
└── public/                       # Static Assets
```

## Tech Stack Recommendations

### Core (설치됨)
- **Next.js 16** - App Router, Server Components, Server Actions
- **React 19** - Actions, use hook, Transitions
- **TypeScript 5** - 타입 안전성
- **Tailwind CSS 4** - 유틸리티 기반 스타일링

### UI & Components (설치됨)
- **shadcn/ui** - 커스터마이징 가능한 UI 컴포넌트
- **Lucide React** - 아이콘
- **class-variance-authority** - 조건부 스타일링
- **clsx / tailwind-merge** - 클래스 유틸리티

### Data & State
- **Zustand** - 클라이언트 상태 관리 (설치됨)
- **TanStack Query v5** - 서버 상태 관리 (권장)
- **TanStack Table** - 데이터 테이블 (권장)

### Form & Validation
- **React Hook Form** - 폼 관리
- **Zod** - 스키마 검증

### Charts & Visualization
- **Recharts** - 차트 (어드민 대시보드용)

### Auth (선택)
- **NextAuth.js v5** - 인증

## Code Patterns

### Server Component (기본)
```tsx
// app/(dashboard)/stores/page.tsx
import { getStores } from '@/lib/api/stores';
import { StoreList } from '@/components/features/stores/store-list';

export default async function StoresPage() {
  const stores = await getStores();

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">매장 관리</h1>
      <StoreList stores={stores} />
    </div>
  );
}
```

### Client Component
```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  initialData: Store[];
}

export function StoreList({ initialData }: Props) {
  const [stores, setStores] = useState(initialData);

  return (
    <div>
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}
```

### Server Action
```tsx
// app/actions/stores.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const createStoreSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

export async function createStore(formData: FormData) {
  const validated = createStoreSchema.safeParse({
    name: formData.get('name'),
    address: formData.get('address'),
  });

  if (!validated.success) {
    return { error: '유효하지 않은 입력입니다.' };
  }

  // API 호출 또는 DB 작업
  await fetch('/api/stores', {
    method: 'POST',
    body: JSON.stringify(validated.data),
  });

  revalidatePath('/stores');
  return { success: true };
}
```

### Route Handler (API)
```tsx
// app/api/stores/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') ?? '1';

  // 데이터 조회 로직
  const stores = await fetchStores({ page: parseInt(page) });

  return NextResponse.json(stores);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // 생성 로직
  const store = await createStore(body);

  return NextResponse.json(store, { status: 201 });
}
```

### Custom Hook
```tsx
// lib/hooks/use-stores.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStores, createStore } from '@/lib/api/stores';

export function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
  });
}

export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });
}
```

## Available Skills (Slash Commands)

| 명령어 | 설명 |
|--------|------|
| `/build` | 빌드 실행 및 오류 자동 수정 |
| `/lint` | ESLint 실행 및 자동 수정 |
| `/test` | 테스트 실행 |
| `/review` | 코드 리뷰 |
| `/commit` | 커밋 생성 |
| `/plan` | 기능 구현 계획 수립 |

## Available Agents

| 에이전트 | 역할 |
|----------|------|
| `ui-component-builder` | UI 컴포넌트 구현 |
| `api-designer` | API 설계 및 구현 |
| `security-reviewer` | 보안 취약점 검토 |

## Coding Conventions

### Naming
- **파일/폴더**: kebab-case (`store-list.tsx`, `use-stores.ts`)
- **컴포넌트**: PascalCase (`StoreList`, `OrderTable`)
- **함수/변수**: camelCase (`getStores`, `isLoading`)
- **상수**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **타입/인터페이스**: PascalCase (`Store`, `CreateStoreRequest`)

### Component Structure
```tsx
// 1. Imports
import { useState } from 'react';
import { cn } from '@/lib/utils';

// 2. Types
interface Props {
  title: string;
  className?: string;
}

// 3. Component
export function MyComponent({ title, className }: Props) {
  // 3.1 Hooks
  const [state, setState] = useState(false);

  // 3.2 Handlers
  const handleClick = () => {
    setState(true);
  };

  // 3.3 Render
  return (
    <div className={cn('base-class', className)}>
      {title}
    </div>
  );
}
```

### Import Order
```tsx
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query';

// 3. Internal - components
import { Button } from '@/components/ui/button';
import { StoreCard } from '@/components/features/stores/store-card';

// 4. Internal - utilities
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils/date';

// 5. Types
import type { Store } from '@/types';
```

## Rules Summary

### Next.js Best Practices
- Server Components를 기본으로 사용
- 'use client'는 필요한 곳에만 최소화
- Server Actions로 데이터 변경 처리
- revalidatePath/revalidateTag로 캐시 무효화
- Metadata API로 SEO 처리
- Image, Link, Font 컴포넌트 사용

### React 19 Features
- use() hook으로 비동기 데이터 처리
- Actions와 useActionState 활용
- useOptimistic으로 낙관적 업데이트
- useTransition으로 논블로킹 상태 업데이트

### TypeScript
- strict mode 사용
- any 타입 사용 금지
- 모든 props에 타입 정의
- 유틸리티 타입 활용 (Partial, Pick, Omit)

### Performance
- 적절한 코드 분할 (dynamic import)
- 이미지 최적화 (next/image)
- 불필요한 리렌더링 방지
- 적절한 캐싱 전략

### Security
- 입력값 검증 필수 (Zod)
- 환경 변수로 민감 정보 관리
- CSRF 방지
- XSS 방지 (React 기본 지원)

### Git Workflow
- 커밋: `{emoji} {type}: {description}`
- 브랜치: `{type}/{description}`

```
✨ feat: 새로운 기능
🐛 fix: 버그 수정
♻️ refactor: 코드 리팩토링
💄 style: 스타일 변경
📝 docs: 문서 수정
✅ test: 테스트 추가/수정
🔧 chore: 설정/빌드 변경
```

## Configuration Files

```
.claude/
├── settings.json           # Hooks 설정
├── settings.local.json     # 권한 및 환경 변수
├── agents/                 # 특화 에이전트
│   ├── ui-component-builder.md
│   ├── api-designer.md
│   └── security-reviewer.md
├── skills/                 # 슬래시 명령어
│   ├── build/SKILL.md
│   ├── lint/SKILL.md
│   ├── test/SKILL.md
│   ├── review/SKILL.md
│   ├── commit/SKILL.md
│   └── plan/SKILL.md
└── rules/                  # 코딩 규칙
    ├── react-patterns.md
    ├── typescript-style.md
    └── security.md
```

## Token Optimization

컨텍스트 효율화를 위해:

1. **Feature 단위 작업** - 관련 파일만 탐색
2. **.claudeignore 활용** - node_modules, .next 등 제외됨
3. **Agents 활용** - 특화된 작업 위임
4. **Skills 활용** - 반복 작업 자동화
5. **점진적 탐색** - 전체 검색보다 특정 디렉토리 우선

## Project-Specific Notes

### Admin Dashboard Features
- **매장 관리**: CRUD, 상태 변경, 검색/필터
- **점주 관리**: 계정 생성, 권한 설정
- **주문 데이터**: 조회, 통계, 내보내기
- **콘텐츠 관리**: 공지사항, 이벤트 배너
- **마케팅**: 캠페인, 쿠폰, 선불카드 관리
- **분석/통계**: 데이터 분석 및 시각화
- **알림**: 푸시 알림 관리
- **관리자 관리**: 어드민 계정 CRUD, 권한 설정
- **설정**: 시스템 설정
- **대시보드**: KPI 시각화, 차트

### API Integration
- 백엔드 API와 연동 필요
- 인증 토큰 관리
- 에러 핸들링 전략 수립 필요

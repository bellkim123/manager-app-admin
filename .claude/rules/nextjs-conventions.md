# Next.js Conventions

## App Router

### 파일 컨벤션
- `page.tsx` - 라우트의 UI
- `layout.tsx` - 공유 레이아웃
- `loading.tsx` - 로딩 UI
- `error.tsx` - 에러 UI
- `not-found.tsx` - 404 UI
- `route.ts` - API 엔드포인트

### 라우트 그룹
```
app/
├── (auth)/           # 인증 관련 (URL에 미반영)
│   ├── login/
│   └── register/
├── (dashboard)/      # 대시보드 (URL에 미반영)
│   ├── stores/
│   └── orders/
└── api/              # API Routes
```

### Dynamic Routes
```
app/stores/[id]/page.tsx      → /stores/123
app/stores/[...slug]/page.tsx → /stores/a/b/c
app/stores/[[...slug]]/page.tsx → /stores 또는 /stores/a/b
```

## Server vs Client Components

### Server Component (기본)
- 데이터 페칭
- 백엔드 리소스 접근
- 민감한 정보 처리
- 큰 의존성 (서버에 유지)

### Client Component ('use client')
- 상호작용 (onClick, onChange)
- useState, useEffect 사용
- 브라우저 API 사용
- 실시간 업데이트

### 패턴
```tsx
// Server Component (page)
async function Page() {
  const data = await fetchData();
  return <ClientComponent initialData={data} />;
}

// Client Component
'use client';
function ClientComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  // 인터랙션 처리
}
```

## Data Fetching

### Server Components
```tsx
// 직접 async/await 사용
async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

### Server Actions
```tsx
'use server';

export async function createItem(formData: FormData) {
  // 서버에서 실행
  await db.insert(formData);
  revalidatePath('/items');
}
```

### Client-side (TanStack Query)
```tsx
'use client';

function Component() {
  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });
}
```

## Caching

### fetch 옵션
```tsx
// 캐시 (기본)
fetch(url);

// 재검증
fetch(url, { next: { revalidate: 3600 } });

// 캐시 안함
fetch(url, { cache: 'no-store' });
```

### 경로 재검증
```tsx
import { revalidatePath, revalidateTag } from 'next/cache';

revalidatePath('/stores');
revalidateTag('stores');
```

## Metadata

```tsx
// Static
export const metadata: Metadata = {
  title: '매장 관리',
  description: '매장 정보를 관리합니다.',
};

// Dynamic
export async function generateMetadata({ params }): Promise<Metadata> {
  const store = await getStore(params.id);
  return { title: store.name };
}
```

## Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority  // LCP 이미지
/>
```

## Link & Navigation

```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 선언적
<Link href="/stores">매장</Link>

// 프로그래매틱
const router = useRouter();
router.push('/stores');
router.replace('/stores');
router.back();
```

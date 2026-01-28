# Security Guidelines

## 환경 변수

### 구분
```bash
# .env.local (gitignore)

# 서버 전용 (클라이언트에서 접근 불가)
DATABASE_URL=...
API_SECRET=...
JWT_SECRET=...

# 클라이언트 접근 가능 (NEXT_PUBLIC_ 접두사)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=Admin Dashboard
```

### 사용
```tsx
// Server Components, Server Actions, Route Handlers
const secret = process.env.API_SECRET; // OK

// Client Components
const secret = process.env.API_SECRET; // undefined (접근 불가)
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // OK
```

## 인증 & 인가

### 미들웨어 보호
```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

### Server Action 검증
```tsx
'use server';

import { auth } from '@/lib/auth';

export async function deleteStore(id: string) {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  if (session.user.role !== 'admin') {
    throw new Error('Forbidden');
  }

  await db.stores.delete(id);
}
```

### Route Handler 검증
```tsx
// app/api/admin/route.ts
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 관리자 전용 로직
}
```

## 입력 검증

### Zod 검증
```tsx
import { z } from 'zod';

const createStoreSchema = z.object({
  name: z
    .string()
    .min(1, '이름은 필수입니다')
    .max(100, '이름은 100자 이하여야 합니다')
    .trim(),
  email: z.string().email('유효한 이메일을 입력하세요'),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, '유효한 전화번호를 입력하세요'),
});

export async function createStore(formData: FormData) {
  const result = createStoreSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  });

  if (!result.success) {
    return { error: result.error.flatten() };
  }

  // result.data는 검증됨
}
```

### SQL Injection 방지
```tsx
// Bad - 직접 문자열 삽입
const query = `SELECT * FROM stores WHERE id = '${id}'`;

// Good - Parameterized Query (ORM/Query Builder 사용)
const store = await db.stores.findUnique({ where: { id } });

// Good - Prepared Statement
const store = await db.query('SELECT * FROM stores WHERE id = $1', [id]);
```

## XSS 방지

### React 자동 이스케이프
```tsx
// Good - React가 자동으로 이스케이프
<div>{userInput}</div>

// Dangerous - 절대 사용 금지 (필요시 DOMPurify 사용)
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### 안전한 HTML 렌더링
```tsx
import DOMPurify from 'dompurify';

function SafeHTML({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

## CSRF 방지

### Server Actions (자동 보호)
Next.js Server Actions는 Origin 체크로 자동 CSRF 보호됨.

### Route Handlers
```tsx
// CORS 설정
export async function GET(request: Request) {
  const origin = request.headers.get('origin');

  if (origin !== process.env.ALLOWED_ORIGIN) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // ...
}
```

## 보안 헤더

### next.config.ts
```tsx
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## 민감 파일 보호

### .gitignore
```
.env
.env.local
.env*.local
*.pem
*.key
```

### .claudeignore
```
.env*
*credentials*
*secret*
*.pem
*.key
```

## 로깅 주의사항

```tsx
// Bad - 민감 정보 로깅
console.log('User:', { email, password, token });

// Good - 민감 정보 제외
console.log('User login:', { email, timestamp: new Date() });
```

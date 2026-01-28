# TypeScript Style Guide

## Type Definitions

### Interface vs Type
```tsx
// Interface - 객체 타입, 확장 가능
interface Store {
  id: string;
  name: string;
}

interface StoreWithOwner extends Store {
  owner: Owner;
}

// Type - 유니온, 인터섹션, 유틸리티
type Status = 'active' | 'inactive' | 'pending';
type StoreWithMeta = Store & { meta: Metadata };
```

### Props 타입
```tsx
// Component Props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// HTML 확장
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}
```

### 제네릭
```tsx
// API 응답 타입
interface ApiResponse<T> {
  data: T;
  meta: {
    page: number;
    totalPages: number;
  };
}

// 사용
type StoresResponse = ApiResponse<Store[]>;
```

## Utility Types

### Partial & Required
```tsx
// 모든 필드 선택적
type UpdateStore = Partial<Store>;

// 모든 필드 필수
type RequiredStore = Required<Store>;
```

### Pick & Omit
```tsx
// 특정 필드만
type StorePreview = Pick<Store, 'id' | 'name'>;

// 특정 필드 제외
type StoreWithoutId = Omit<Store, 'id'>;
```

### Record
```tsx
// 키-값 매핑
type StatusMap = Record<Status, string>;
const statusLabels: StatusMap = {
  active: '활성',
  inactive: '비활성',
  pending: '대기',
};
```

## Best Practices

### any 금지
```tsx
// Bad
function process(data: any) { ... }

// Good
function process(data: unknown) {
  if (isStore(data)) { ... }
}

// Good - 타입 정의
function process(data: Store) { ... }
```

### Type Guards
```tsx
function isStore(value: unknown): value is Store {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}
```

### Assertion Functions
```tsx
function assertStore(value: unknown): asserts value is Store {
  if (!isStore(value)) {
    throw new Error('Invalid store data');
  }
}
```

### Const Assertions
```tsx
const STATUSES = ['active', 'inactive', 'pending'] as const;
type Status = typeof STATUSES[number]; // 'active' | 'inactive' | 'pending'
```

## React + TypeScript

### Event Handlers
```tsx
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setValue(e.target.value);
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  // ...
}
```

### Children
```tsx
interface Props {
  // 단일 또는 다중 React 엘리먼트
  children: React.ReactNode;

  // 렌더 프롭
  render: (data: Store) => React.ReactNode;

  // 단일 React 엘리먼트만
  children: React.ReactElement;
}
```

### Ref
```tsx
// forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// useRef
const inputRef = useRef<HTMLInputElement>(null);
```

## Zod Integration

```tsx
import { z } from 'zod';

// 스키마 정의
const storeSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  address: z.string().min(1, '주소를 입력하세요'),
  status: z.enum(['active', 'inactive']),
});

// 타입 추론
type StoreFormData = z.infer<typeof storeSchema>;

// React Hook Form과 함께
const form = useForm<StoreFormData>({
  resolver: zodResolver(storeSchema),
});
```

## Import Types

```tsx
// 타입만 import (번들에 포함 안됨)
import type { Store, Owner } from '@/types';

// 혼합
import { fetchStore, type Store } from '@/lib/api/stores';
```

## Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

```tsx
// 사용
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Store } from '@/types';
```

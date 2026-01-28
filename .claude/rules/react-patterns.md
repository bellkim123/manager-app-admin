# React Patterns

## Component Patterns

### Named Export
```tsx
// Good
export function StoreList() { ... }

// Avoid (default export for pages only)
export default function StoreList() { ... }
```

### Props Interface
```tsx
interface StoreCardProps {
  store: Store;
  onEdit?: (id: string) => void;
  className?: string;
}

export function StoreCard({ store, onEdit, className }: StoreCardProps) {
  // ...
}
```

### Composition
```tsx
// Good - 합성 패턴
<Card>
  <Card.Header>
    <Card.Title>제목</Card.Title>
  </Card.Header>
  <Card.Content>내용</Card.Content>
</Card>

// Avoid - 과도한 props
<Card
  title="제목"
  titleSize="lg"
  titleColor="primary"
  content="내용"
  contentPadding={4}
/>
```

## Hooks Patterns

### Custom Hook
```tsx
// lib/hooks/use-store.ts
export function useStore(id: string) {
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchStore(id)
      .then(setStore)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { store, isLoading, error };
}
```

### Hook Rules
- 최상위에서만 호출
- 조건문/반복문 내 호출 금지
- use 접두사 사용

## State Management

### Local State
```tsx
const [isOpen, setIsOpen] = useState(false);
```

### Form State (React Hook Form)
```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { name: '' },
});
```

### Server State (TanStack Query)
```tsx
const { data, isLoading } = useQuery({
  queryKey: ['stores', id],
  queryFn: () => getStore(id),
});
```

### Global State (Zustand)
```tsx
const useStore = create<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## React 19 Features

### use() Hook
```tsx
// Promise를 직접 읽기
function Component({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data}</div>;
}
```

### useActionState
```tsx
'use client';

function Form() {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    { message: '' }
  );

  return (
    <form action={formAction}>
      <button disabled={isPending}>
        {isPending ? '처리 중...' : '제출'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
```

### useOptimistic
```tsx
function TodoList({ todos }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function addTodo(formData) {
    const newTodo = { id: Date.now(), text: formData.get('text') };
    addOptimistic(newTodo);
    await createTodo(formData);
  }

  return (
    <ul>
      {optimisticTodos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## Performance Patterns

### Memoization
```tsx
// 비싼 계산
const expensive = useMemo(() => computeExpensive(data), [data]);

// 콜백 안정화
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// 컴포넌트 메모
const MemoizedComponent = memo(function Component({ data }) {
  return <div>{data}</div>;
});
```

### Lazy Loading
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

## Error Handling

### Error Boundary
```tsx
// app/stores/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
```

### Try-Catch in Server Actions
```tsx
'use server';

export async function createStore(data: FormData) {
  try {
    await db.stores.create(data);
    return { success: true };
  } catch (error) {
    return { error: '생성에 실패했습니다.' };
  }
}
```

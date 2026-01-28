# /commit - 커밋 생성

변경사항을 분석하고 적절한 커밋을 생성합니다.

## 실행 단계

1. **변경사항 확인**
   ```bash
   git status
   git diff --staged
   git diff
   ```

2. **변경사항 분석**
   - 변경 유형 파악 (feat, fix, refactor 등)
   - 영향 범위 확인
   - 관련 파일 그룹화

3. **커밋 메시지 생성**
   - 컨벤션에 맞는 메시지 작성
   - 적절한 이모지 선택
   - 변경 내용 요약

4. **커밋 실행**
   ```bash
   git add [files]
   git commit -m "메시지"
   ```

## 커밋 메시지 형식

```
{emoji} {type}: {description}

{body - optional}
```

### 타입 및 이모지
- ✨ feat: 새로운 기능
- 🐛 fix: 버그 수정
- ♻️ refactor: 코드 리팩토링
- 💄 style: 스타일/UI 변경
- 📝 docs: 문서 수정
- ✅ test: 테스트 추가/수정
- 🔧 chore: 설정/빌드 변경
- 🚀 perf: 성능 개선

## 출력

```
✅ 커밋 완료

커밋: abc1234
메시지: ✨ feat: 매장 목록 페이지 추가

변경 파일:
- app/(dashboard)/stores/page.tsx (new)
- components/features/stores/store-list.tsx (new)
```

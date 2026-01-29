# 소복소복 어드민 대시보드

소복소복 서비스의 다양한 브랜드를 관리하기 위한 범용 어드민 대시보드입니다. 운영팀 및 브랜드 관리자는 이 대시보드를 통해 매장 정보, 점주 계정, 주문 데이터, 공지사항 등을 통합적으로 관리할 수 있습니다.

## 주요 기능

- **브랜드별 로그인**: 브랜드 코드를 통한 멀티 브랜드 지원
- **매장 관리**: 신규 매장 등록, 정보 수정, 상태 변경
- **점주 관리**: 점주 계정 생성 및 권한 관리
- **주문 데이터 조회**: 기간별, 매장별 주문 내역 조회 및 통계
- **콘텐츠 관리**: 점주 앱 내 공지사항 및 이벤트 배너 관리
- **대시보드**: 주요 지표(일 매출, 주문 수 등) 시각화
- **어드민 계정 관리**: 관리자 계정 생성 및 권한 설정

## 기술 스택

- **프레임워크**: [Next.js 16](https://nextjs.org/) (App Router)
- **React**: [React 19](https://react.dev/)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **스타일링**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI 컴포넌트**: [shadcn/ui](https://ui.shadcn.com/)
- **상태관리**: [Zustand](https://zustand-demo.pmnd.rs/)
- **패키지 매니저**: npm

## 시작하기

### 사전 요구사항

- [Node.js](https://nodejs.org/ko/) v18.17.0 이상

### 설치 및 실행

1. **프로젝트 클론:**

   ```bash
   git clone https://github.com/bellkim123/manager-app-admin.git
   ```

2. **프로젝트 디렉토리로 이동:**

   ```bash
   cd manager-app-admin
   ```

3. **의존성 패키지 설치:**

   ```bash
   npm install
   ```

4. **환경 변수 설정:**

   ```bash
   cp .env.example .env.local
   ```

5. **개발 서버 실행:**

   ```bash
   npm run dev
   ```

6. 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속

## 사용 가능한 스크립트

- `npm run dev`: 개발 모드로 애플리케이션 실행
- `npm run build`: 프로덕션 빌드
- `npm run start`: 프로덕션 서버 시작
- `npm run lint`: ESLint 코드 검사

## 프로젝트 구조

```
manager-app-admin/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 인증 관련 페이지
│   │   └── login/                # 로그인
│   ├── (dashboard)/dashboard/    # 대시보드 페이지
│   │   ├── admins/               # 관리자 관리
│   │   ├── analytics/            # 분석/통계
│   │   ├── contents/             # 콘텐츠 관리
│   │   ├── marketing/            # 마케팅
│   │   │   ├── campaigns/        # 캠페인
│   │   │   ├── coupons/          # 쿠폰
│   │   │   └── prepaid-cards/    # 선불카드
│   │   ├── notifications/        # 알림
│   │   ├── orders/               # 주문 데이터
│   │   ├── owners/               # 점주 관리
│   │   ├── settings/             # 설정
│   │   └── stores/               # 매장 관리
│   └── page.tsx                  # 홈 (리다이렉트)
├── components/                   # React 컴포넌트
│   ├── layouts/                  # 레이아웃 컴포넌트
│   │   ├── dashboard-layout.tsx
│   │   ├── header.tsx
│   │   └── sidebar.tsx
│   └── ui/                       # shadcn/ui 컴포넌트
├── lib/                          # 유틸리티 및 설정
│   ├── stores/                   # Zustand 스토어
│   └── utils.ts                  # 유틸리티 함수
├── types/                        # TypeScript 타입
└── public/                       # 정적 파일
```

## 라이선스

© 2026 소복소복. All rights reserved.

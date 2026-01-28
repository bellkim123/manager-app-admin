import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: '커피 어드민',
    template: '%s | 커피 어드민',
  },
  description: '커피 브랜드 점주 앱 관리를 위한 어드민 대시보드',
  keywords: ['admin', 'dashboard', 'coffee', '커피', '어드민', '매장관리'],
  authors: [{ name: 'Coffee Admin Team' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '커피 어드민',
    description: '커피 브랜드 점주 앱 관리를 위한 어드민 대시보드',
    siteName: '커피 어드민',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

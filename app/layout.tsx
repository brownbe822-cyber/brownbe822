import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "나만의 교육용 웹앱",
  description: "선생님들을 위한 교육용 웹앱 기본 뼈대입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans bg-gray-50 text-gray-900 antialiased tracking-tight min-h-screen flex flex-col`}>
        {/* 상단 헤더 */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <h1 className="font-semibold text-lg tracking-tight text-gray-900">EduApp</h1>
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">홈</a>
              <a href="#" className="hover:text-gray-900 transition-colors">기능소개</a>
              <a href="#" className="hover:text-gray-900 transition-colors">설정</a>
            </nav>
          </div>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* 하단 푸터 */}
        <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
          <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} 교육용 웹앱. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

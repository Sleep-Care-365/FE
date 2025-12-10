import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Moon } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Moon className="w-6 h-6 fill-current" />
            <span>Sleep Care 365</span>
          </Link>
          
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link to="/upload" className="hover:text-blue-600 transition">데이터 업로드</Link>
            <Link to="/report" className="hover:text-blue-600 transition">수면 리포트</Link>
            <Link to="/coach" className="hover:text-blue-600 transition">AI 코칭</Link>
          </nav>
        </div>
      </header>

      {/* 페이지 콘텐츠가 들어갈 자리 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        © 2025 Sleep Care 365. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
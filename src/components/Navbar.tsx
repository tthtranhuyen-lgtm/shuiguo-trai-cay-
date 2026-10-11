import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { speechEngine } from '../utils/speech';

export type NavTab = 'home' | 'vocab' | 'grammar' | 'dialogue' | 'phrases' | 'speaking' | 'games' | 'whiteboard' | 'test';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  learnedCount: number;
  totalVocab: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  learnedCount,
  totalVocab,
}) => {
  const navItems: { id: NavTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Trang chủ', icon: '🏠' },
    { id: 'vocab', label: 'Từ vựng (17)', icon: '🍎' },
    { id: 'grammar', label: 'Ngữ pháp', icon: '📖' },
    { id: 'dialogue', label: 'Bài khóa', icon: '💬' },
    { id: 'phrases', label: 'Mẫu câu đi chợ', icon: '🏷️' },
    { id: 'speaking', label: 'Luyện nói', icon: '🗣️' },
    { id: 'games', label: 'Trò chơi', icon: '🎮' },
    { id: 'whiteboard', label: 'Tập viết Hán tự', icon: '✍️' },
    { id: 'test', label: 'Kiểm tra', icon: '✅' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer group"
          >
            <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              果
            </span>
            <div className="leading-tight">
              <span className="text-base font-bold text-stone-900 tracking-tight block">
                Tiếng Trung Trái Cây
              </span>
              <span className="text-[11px] font-medium text-emerald-700 tracking-wide block">
                水果专题课程 · HSK 2-3
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currentTab === item.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Voice Test */}
            <button
              onClick={() => speechEngine.speak('欢迎学习水果中文！新鲜水果，又甜又香。')}
              title="Thử giọng đọc chuẩn tiếng Trung"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Thử giọng đọc</span>
            </button>

            {/* Test CTA */}
            <button
              onClick={() => onSelectTab('test')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Làm bài thi</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab scrollbar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1.5 border-t border-stone-100 no-scrollbar">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === item.id
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 bg-stone-100 hover:bg-stone-200'
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Progress indicator bar */}
        <div className="w-full h-1 bg-stone-100">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${Math.round((learnedCount / Math.max(1, totalVocab)) * 100)}%` }}
            title={`Tiến độ: Đã thuộc ${learnedCount}/${totalVocab} từ`}
          />
        </div>
      </div>
    </header>
  );
};

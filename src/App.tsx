import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { VocabSection } from './components/VocabSection';
import { GrammarSection } from './components/GrammarSection';
import { DialogueSection } from './components/DialogueSection';
import { PhrasesSection } from './components/PhrasesSection';
import { SpeakingSection } from './components/SpeakingSection';
import { GamesSection } from './components/GamesSection';
import { WhiteboardSection } from './components/WhiteboardSection';
import { TestSection } from './components/TestSection';
import { GlobalInkOverlay } from './components/GlobalInkOverlay';
import { FRUITS } from './data/fruitData';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mastered_fruits');
      return saved ? JSON.parse(saved) : ['apple', 'banana', 'watermelon'];
    } catch {
      return ['apple', 'banana', 'watermelon'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mastered_fruits', JSON.stringify(masteredIds));
    } catch (e) {
      console.error(e);
    }
  }, [masteredIds]);

  const toggleMastered = (id: string) => {
    setMasteredIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleOpenWhiteboard = (fruitId: string) => {
    setCurrentTab('whiteboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50/60 text-stone-900 flex flex-col font-sans">
      {/* Navigation Top Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        learnedCount={masteredIds.length}
        totalVocab={FRUITS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'home' && (
          <HomeSection
            onNavigate={handleSelectTab}
            learnedCount={masteredIds.length}
          />
        )}

        {currentTab === 'vocab' && (
          <VocabSection
            masteredIds={masteredIds}
            onToggleMastered={toggleMastered}
            onOpenWhiteboardWithChar={handleOpenWhiteboard}
          />
        )}

        {currentTab === 'grammar' && <GrammarSection />}

        {currentTab === 'dialogue' && <DialogueSection />}

        {currentTab === 'phrases' && <PhrasesSection />}

        {currentTab === 'speaking' && <SpeakingSection />}

        {currentTab === 'games' && <GamesSection />}

        {currentTab === 'whiteboard' && <WhiteboardSection />}

        {currentTab === 'test' && <TestSection />}
      </main>

      {/* Global Inking Pen Tool */}
      <GlobalInkOverlay />

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              果
            </span>
            <span className="font-semibold text-stone-700">
              Bài Học Tiếng Trung: Trái Cây 水果 & Đi Chợ
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">HSK 2-3 Cấp độ Giao tiếp</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSelectTab('vocab')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              17 Từ vựng
            </button>
            <button
              onClick={() => handleSelectTab('grammar')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Ngữ pháp
            </button>
            <button
              onClick={() => handleSelectTab('whiteboard')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Luyện viết
            </button>
            <button
              onClick={() => handleSelectTab('test')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Kiểm tra
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

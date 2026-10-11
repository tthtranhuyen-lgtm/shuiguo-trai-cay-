import React, { useState, useEffect, useRef } from 'react';
import { DIALOGUE_DATA, DIALOGUE_QUIZ } from '../data/lessonData';
import { FRUITS } from '../data/fruitData';
import { speechEngine } from '../utils/speech';
import { Volume2, Play, Pause, RotateCcw, CheckCircle2, XCircle, MessageSquare, User, Sparkles } from 'lucide-react';

export const DialogueSection: React.FC = () => {
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [roleFilter, setRoleFilter] = useState<'all' | 'xiaoming' | 'boss'>('all');
  const [wordModal, setWordModal] = useState<{ word: string; pinyin?: string; vn?: string } | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const timerRef = useRef<number | null>(null);

  const stopAllPlayback = () => {
    speechEngine.stop();
    setIsPlayingAll(false);
    setActiveLineIndex(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopAllPlayback();
    };
  }, []);

  const handlePlayLine = (index: number) => {
    setActiveLineIndex(index);
    const line = DIALOGUE_DATA[index];
    speechEngine.speak(line.textZh, 0.85, () => {
      // Finished speaking this line
    });
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      stopAllPlayback();
      return;
    }

    setIsPlayingAll(true);
    let currentIdx = 0;

    const playNext = () => {
      if (currentIdx >= DIALOGUE_DATA.length) {
        setIsPlayingAll(false);
        setActiveLineIndex(null);
        return;
      }

      setActiveLineIndex(currentIdx);
      const line = DIALOGUE_DATA[currentIdx];
      speechEngine.speak(line.textZh, 0.85, () => {
        timerRef.current = window.setTimeout(() => {
          currentIdx++;
          playNext();
        }, 600);
      });
    };

    playNext();
  };

  const handleWordClick = (word: string) => {
    const matchedFruit = FRUITS.find(f => f.hanzi === word);
    if (matchedFruit) {
      setWordModal({
        word: matchedFruit.hanzi,
        pinyin: matchedFruit.pinyin,
        vn: `${matchedFruit.meaning} · ${matchedFruit.taste}`
      });
      speechEngine.speak(matchedFruit.hanzi);
      return;
    }

    const dict: Record<string, { pinyin: string; vn: string }> = {
      '火龙果': { pinyin: 'huǒlóngguǒ', vn: 'Thanh long (ruột đỏ/trắng)' },
      '新鲜': { pinyin: 'xīnxiān', vn: 'Tươi mới, vừa mới hái' },
      '怎么卖': { pinyin: 'zěnme mài', vn: 'Bán như thế nào? Giá bao nhiêu?' },
      '红心': { pinyin: 'hóngxīn', vn: 'Ruột đỏ (tim đỏ)' },
      '一斤': { pinyin: 'yì jīn', vn: 'Một cân Trung Quốc = 500 gram' },
      '越来越': { pinyin: 'yuè lái yuè', vn: 'Ngày càng..., càng ngày càng...' },
      '除了': { pinyin: 'chúle', vn: 'Ngoài... ra' },
      '山竹': { pinyin: 'shānzhú', vn: 'Măng cụt (nữ hoàng trái cây)' },
      '酸酸甜甜': { pinyin: 'suānsuān tiántián', vn: 'Chua chua ngọt ngọt' },
      '两斤': { pinyin: 'liǎng jīn', vn: 'Hai cân = 1000g = 1 kg' },
      '一共': { pinyin: 'yígòng', vn: 'Tổng cộng' },
      '算你': { pinyin: 'suàn nǐ', vn: 'Tính cho bạn, bớt hữu nghị' }
    };

    if (dict[word]) {
      setWordModal({
        word,
        pinyin: dict[word].pinyin,
        vn: dict[word].vn
      });
      speechEngine.speak(word);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              <MessageSquare className="w-4 h-4" />
              <span>Bài Khóa Đi Chợ · 买水果情景对话</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">Tiểu Minh Đi Mua Trái Cây</h2>
            <p className="text-sm text-stone-600 mt-0.5">
              Hội thoại thực tế giữa Tiểu Minh (khách mua) và Bác chủ quán về giá cả, độ tươi và nếm thử.
            </p>
          </div>

          {/* Action Player Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayAll}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isPlayingAll
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPlayingAll ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingAll ? 'Tạm dừng nghe' : 'Nghe toàn bài khóa'}</span>
            </button>
            <button
              onClick={stopAllPlayback}
              className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
              title="Đặt lại âm thanh"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Role Filters */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-2">
          <span className="text-xs font-medium text-stone-500 mr-1">Chế độ vai diễn:</span>
          {[
            { id: 'all', label: 'Tất cả câu thoại' },
            { id: 'xiaoming', label: '👦 Luyện vai Tiểu Minh' },
            { id: 'boss', label: '👨 Luyện vai Chủ quán' },
          ].map(role => (
            <button
              key={role.id}
              onClick={() => setRoleFilter(role.id as typeof roleFilter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                roleFilter === role.id
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dialogue Conversation List */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
        {DIALOGUE_DATA.map((line, idx) => {
          const isXiaoMing = line.speaker === 'xiaoming';
          const isHiddenByRole = roleFilter !== 'all' && roleFilter !== line.speaker;
          const isActive = activeLineIndex === idx;

          if (isHiddenByRole) {
            return (
              <div
                key={line.id}
                className={`p-4 rounded-2xl border-2 border-dashed ${
                  isXiaoMing ? 'border-amber-200 bg-amber-50/30' : 'border-emerald-200 bg-emerald-50/30'
                } flex items-center justify-between`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{isXiaoMing ? '👦' : '👨'}</span>
                  <div>
                    <span className="text-xs font-bold text-stone-700">Đến lượt bạn đọc vai: {line.speakerNameVn}</span>
                    <p className="text-sm text-stone-500 italic mt-0.5">"{line.textVn}"</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePlayLine(idx)}
                  className="px-3 py-1.5 bg-white border border-stone-200 text-stone-700 text-xs font-medium rounded-lg hover:bg-stone-50 cursor-pointer"
                >
                  Nghe phát âm mẫu 🔊
                </button>
              </div>
            );
          }

          return (
            <div
              key={line.id}
              className={`p-4 rounded-2xl transition-all border ${
                isActive
                  ? 'bg-emerald-50 border-emerald-400 shadow-sm ring-2 ring-emerald-400/20'
                  : isXiaoMing
                  ? 'bg-stone-50/80 border-stone-200'
                  : 'bg-amber-50/40 border-amber-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{isXiaoMing ? '👦' : '👨'}</span>
                  <div>
                    <span className="text-sm font-bold text-stone-900">{line.speakerNameZh}</span>
                    <span className="text-xs text-stone-500 ml-1.5 font-normal">({line.speakerNameVn})</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayLine(idx)}
                  className="flex items-center gap-1 px-3 py-1 bg-white border border-stone-200 hover:bg-emerald-50 hover:border-emerald-300 text-stone-700 hover:text-emerald-700 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu</span>
                </button>
              </div>

              {/* Chinese text with interactive clickable keywords */}
              <div className="text-lg font-bold text-stone-900 leading-relaxed font-sans mb-1">
                {line.textZh}
              </div>

              {/* Pinyin */}
              <div className="text-xs font-medium text-amber-700 font-mono mb-1">
                {line.pinyin}
              </div>

              {/* Vietnamese Translation */}
              <div className="text-sm text-stone-600">
                {line.textVn}
              </div>

              {/* Quick Keyword Tooltip Pills */}
              {line.vocabKeywords && line.vocabKeywords.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                  <span className="text-[11px] font-semibold text-stone-400">Từ khóa:</span>
                  {line.vocabKeywords.map(kw => (
                    <button
                      key={kw}
                      onClick={() => handleWordClick(kw)}
                      className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 hover:border-emerald-500 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reading Comprehension Quiz */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h3 className="text-base font-bold text-stone-900">
            Bài Tập Đọc Hiểu Sau Bài Khóa ({DIALOGUE_QUIZ.length} câu)
          </h3>
        </div>

        <div className="space-y-4">
          {DIALOGUE_QUIZ.map((q, idx) => {
            const selected = quizAnswers[idx];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.answer;

            return (
              <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-stone-900">
                    <span className="text-emerald-700 mr-1.5">{idx + 1}.</span>
                    {q.qZh}
                  </div>
                  <div className="text-xs text-stone-500">
                    {q.qVn}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map(opt => {
                    let optStyle = 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100';

                    if (isAnswered) {
                      if (opt === q.answer) {
                        optStyle = 'bg-emerald-600 border-emerald-600 text-white font-semibold';
                      } else if (selected === opt) {
                        optStyle = 'bg-red-500 border-red-500 text-white';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          setQuizAnswers(prev => ({ ...prev, [idx]: opt }));
                          speechEngine.playSound(opt === q.answer ? 'correct' : 'wrong');
                        }}
                        className={`text-left p-3 text-xs rounded-xl border transition-all cursor-pointer font-medium ${optStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-red-50 text-red-900 border border-red-200'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold">
                        {isCorrect ? 'Chính xác!' : `Chưa đúng. Đáp án: ${q.answer}`}
                      </div>
                      <div className="mt-0.5 opacity-90">{q.explanation}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Word Quick Definition Modal */}
      {wordModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-3xl font-bold text-stone-900">{wordModal.word}</span>
                {wordModal.pinyin && (
                  <span className="text-base font-semibold text-amber-600 block mt-0.5 font-mono">
                    {wordModal.pinyin}
                  </span>
                )}
              </div>
              <button
                onClick={() => speechEngine.speak(wordModal.word)}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {wordModal.vn && (
              <div className="p-3 bg-stone-50 rounded-xl text-sm text-stone-700">
                {wordModal.vn}
              </div>
            )}

            <button
              onClick={() => setWordModal(null)}
              className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

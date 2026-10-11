import React, { useState } from 'react';
import { GRAMMAR_LESSONS } from '../data/lessonData';
import { speechEngine } from '../utils/speech';
import { Volume2, CheckCircle2, XCircle, Sparkles, BookOpen, HelpCircle } from 'lucide-react';

export const GrammarSection: React.FC = () => {
  const [activeGrammarIndex, setActiveGrammarIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [orderInputs, setOrderInputs] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});

  const lesson = GRAMMAR_LESSONS[activeGrammarIndex];

  const handleSelectOption = (exerciseId: string, option: string, correctAnswer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [exerciseId]: option }));
    const isCorrect = option === correctAnswer;
    setSubmittedAnswers(prev => ({ ...prev, [exerciseId]: true }));
    speechEngine.playSound(isCorrect ? 'correct' : 'wrong');
  };

  const handleCheckOrder = (exerciseId: string, correctAnswer: string) => {
    const rawInput = (orderInputs[exerciseId] || '').replace(/[\s\p{P}]/gu, '');
    const cleanAnswer = correctAnswer.replace(/[\s\p{P}]/gu, '');
    const isCorrect = rawInput === cleanAnswer;
    setSubmittedAnswers(prev => ({ ...prev, [exerciseId]: true }));
    speechEngine.playSound(isCorrect ? 'correct' : 'wrong');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Ngữ Pháp Trọng Điểm · 核心语法</span>
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mt-1">3 Mẫu Ngữ Pháp Giao Tiếp Đi Chợ</h2>
        <p className="text-sm text-stone-600 mt-0.5">
          Nắm vững cách diễn đạt sự biến đổi, bổ sung thành phần và khả năng mua bán thực tế.
        </p>

        {/* Grammar Switcher Tabs */}
        <div className="flex gap-2 mt-5 overflow-x-auto pb-1">
          {GRAMMAR_LESSONS.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => {
                setActiveGrammarIndex(idx);
                speechEngine.playSound('click');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeGrammarIndex === idx
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <span>{idx + 1}. {g.title}</span>
              <span className="text-[11px] opacity-75 font-normal">({g.pinyin})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grammar Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-2xl font-bold text-stone-900">{lesson.title}</h3>
            <span className="text-sm font-semibold text-amber-600 font-mono">{lesson.pinyin}</span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed mt-2">{lesson.explanation}</p>
        </div>

        {/* Formula Display Box */}
        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            Cấu trúc chuẩn:
          </div>
          <div className="text-base font-bold text-emerald-950 font-mono">
            {lesson.formula}
          </div>
        </div>

        {/* Usage Tips */}
        <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/70 text-xs text-amber-950 space-y-1.5">
          <div className="font-semibold text-amber-900">💡 Lưu ý quan trọng khi dùng:</div>
          {lesson.usageTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span>•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>

        {/* Example Sentences */}
        <div>
          <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
            Ví dụ thực tế kèm giọng đọc:
          </h4>
          <div className="space-y-3">
            {lesson.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-emerald-300 transition-colors"
              >
                <div className="space-y-1">
                  <div className="text-base font-bold text-stone-900 leading-snug">
                    {ex.zh}
                  </div>
                  <div className="text-xs font-medium text-amber-700 font-mono">
                    {ex.pinyin}
                  </div>
                  <div className="text-xs text-stone-600">
                    {ex.vn}
                  </div>
                </div>

                <button
                  onClick={() => speechEngine.speak(ex.zh)}
                  className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-emerald-50 hover:border-emerald-300 text-stone-700 hover:text-emerald-700 transition-colors shrink-0 cursor-pointer shadow-2xs"
                  title="Nghe phát âm câu"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Exercises for this grammar point */}
        <div className="pt-6 border-t border-stone-100">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Bài tập áp dụng ngay ({lesson.exercises.length} câu)
            </h4>
          </div>

          <div className="space-y-4">
            {lesson.exercises.map((ex, idx) => {
              const hasSubmitted = submittedAnswers[ex.id];
              const selected = selectedAnswers[ex.id];
              const isCorrect = ex.type === 'order'
                ? (orderInputs[ex.id] || '').replace(/[\s\p{P}]/gu, '') === ex.correctAnswer.replace(/[\s\p{P}]/gu, '')
                : selected === ex.correctAnswer;

              return (
                <div key={ex.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-semibold text-stone-800">
                      <span className="text-emerald-700 mr-1.5">Câu {idx + 1}.</span>
                      {ex.question}
                    </div>
                  </div>

                  {/* Choice or Fill */}
                  {(ex.type === 'fill' || ex.type === 'choice') && ex.options && (
                    <div className="flex flex-wrap gap-2">
                      {ex.options.map(opt => {
                        const isThisSelected = selected === opt;
                        let btnStyle = 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100';

                        if (hasSubmitted) {
                          if (opt === ex.correctAnswer) {
                            btnStyle = 'bg-emerald-600 border-emerald-600 text-white font-semibold';
                          } else if (isThisSelected) {
                            btnStyle = 'bg-red-500 border-red-500 text-white';
                          }
                        }

                        return (
                          <button
                            key={opt}
                            onClick={() => handleSelectOption(ex.id, opt, ex.correctAnswer)}
                            className={`px-4 py-2 text-xs rounded-xl border transition-all cursor-pointer font-medium ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Sentence order rearrange */}
                  {ex.type === 'order' && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Nhập câu tiếng Trung sau khi sắp xếp..."
                          value={orderInputs[ex.id] || ''}
                          onChange={e => setOrderInputs(prev => ({ ...prev, [ex.id]: e.target.value }))}
                          className="flex-1 px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-600"
                        />
                        <button
                          onClick={() => handleCheckOrder(ex.id, ex.correctAnswer)}
                          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                        >
                          Kiểm tra
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Result & Explanation */}
                  {hasSubmitted && (
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
                          {isCorrect ? 'Chính xác! Đáp án đúng.' : `Chưa đúng! Đáp án chính xác là: "${ex.correctAnswer}"`}
                        </div>
                        <div className="mt-0.5 opacity-90">{ex.explanation}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

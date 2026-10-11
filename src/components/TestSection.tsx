import React, { useState, useEffect, useRef } from 'react';
import { COMPREHENSIVE_TEST, TestQuestion } from '../data/lessonData';
import { speechEngine } from '../utils/speech';
import { CheckCircle2, XCircle, Trophy, RotateCcw, Volume2, Sparkles } from 'lucide-react';

export const TestSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleSelectOption = (questionId: string, option: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    speechEngine.playSound('click');
  };

  const handleSubmit = () => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    setTimeTaken(elapsed);
    setIsSubmitted(true);

    const score = COMPREHENSIVE_TEST.reduce((acc, q) => {
      return acc + (answers[q.id] === q.answer ? 1 : 0);
    }, 0);

    const pct = Math.round((score / COMPREHENSIVE_TEST.length) * 100);
    if (pct >= 70) {
      speechEngine.playSound('correct');
      triggerConfetti();
    } else {
      speechEngine.playSound('wrong');
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    setStartTime(Date.now());
    setTimeTaken(0);
    speechEngine.playSound('click');
  };

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      vRot: number;
    }[] = [];

    const colors = ['#22c55e', '#f97316', '#fbbf24', '#ef4444', '#3b82f6'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width * 0.5 + (Math.random() - 0.5) * 300,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 12 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.2,
      });
    }

    let animationFrame: number;
    let frameCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (frameCount < 160) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
  };

  const correctCount = COMPREHENSIVE_TEST.reduce((acc, q) => {
    return acc + (answers[q.id] === q.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((correctCount / COMPREHENSIVE_TEST.length) * 100);

  let gradeBadge = { label: 'D - Cần cố gắng ôn lại', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  if (percentage >= 90) gradeBadge = { label: 'A - Xuất sắc!', color: 'text-emerald-800 bg-emerald-50 border-emerald-300' };
  else if (percentage >= 75) gradeBadge = { label: 'B - Khá tốt!', color: 'text-blue-800 bg-blue-50 border-blue-300' };
  else if (percentage >= 50) gradeBadge = { label: 'C - Đạt yêu cầu', color: 'text-stone-800 bg-stone-100 border-stone-300' };

  return (
    <div className="space-y-6 relative">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Đánh Giá Năng Lực · 综合测试</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">Đề Kiểm Tra Tổng Hợp (10 Câu)</h2>
            <p className="text-sm text-stone-600 mt-0.5">
              Bao quát toàn bộ từ vựng hoa quả, lượng từ, ngữ pháp và khẩu ngữ mua bán.
            </p>
          </div>

          {!isSubmitted && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-mono">
                Đã trả lời: {Object.keys(answers).length} / {COMPREHENSIVE_TEST.length}
              </span>
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length === 0}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Nộp bài chấm điểm
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Result Card if Submitted */}
      {isSubmitted && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-stone-900">Kết Quả Bài Kiểm Tra</h3>
            <p className="text-sm text-stone-500 mt-0.5">Thời gian làm bài: {timeTaken} giây</p>
          </div>

          <div className="flex items-center justify-center gap-6 py-2">
            <div>
              <span className="text-xs text-stone-400 block uppercase font-semibold">Điểm số</span>
              <span className="text-4xl font-extrabold text-emerald-700 font-mono">
                {correctCount} / {COMPREHENSIVE_TEST.length}
              </span>
            </div>
            <div className="h-10 w-px bg-stone-200" />
            <div>
              <span className="text-xs text-stone-400 block uppercase font-semibold">Tỷ lệ chính xác</span>
              <span className="text-4xl font-extrabold text-stone-900 font-mono">
                {percentage}%
              </span>
            </div>
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold border font-mono">
            Xếp loại: <span className={gradeBadge.color}>{gradeBadge.label}</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài thi</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {COMPREHENSIVE_TEST.map((q, idx) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.answer;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs transition-colors space-y-4 ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-red-300 bg-red-50/20'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-base font-bold text-stone-900 leading-snug">
                    <span className="text-emerald-700 font-mono mr-2">Câu {idx + 1}.</span>
                    {q.questionZh}
                  </div>
                  <div className="text-xs text-stone-500">
                    {q.questionVn}
                  </div>
                </div>

                <button
                  onClick={() => speechEngine.speak(q.questionZh)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors shrink-0 cursor-pointer"
                  title="Nghe câu hỏi"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map(opt => {
                  let optStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';

                  if (isSubmitted) {
                    if (opt === q.answer) {
                      optStyle = 'bg-emerald-600 border-emerald-600 text-white font-semibold';
                    } else if (selected === opt) {
                      optStyle = 'bg-red-500 border-red-500 text-white';
                    }
                  } else if (selected === opt) {
                    optStyle = 'bg-stone-900 border-stone-900 text-white font-medium shadow-2xs';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(q.id, opt)}
                      disabled={isSubmitted}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${optStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Submitted Feedback */}
              {isSubmitted && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                    isCorrect
                      ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                      : 'bg-red-50 text-red-950 border border-red-200'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold">
                      {isCorrect ? 'Chính xác!' : `Chưa đúng! Đáp án chính xác là: "${q.answer}"`}
                    </div>
                    <div className="mt-0.5 opacity-90">{q.explanation}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Submit Bar on mobile */}
      {!isSubmitted && (
        <div className="sticky bottom-4 z-30 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-lg flex items-center justify-between">
          <span className="text-xs text-stone-600">
            Đã làm <strong className="text-stone-900">{Object.keys(answers).length} / {COMPREHENSIVE_TEST.length}</strong> câu
          </span>
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length === 0}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Nộp bài chấm điểm
          </button>
        </div>
      )}
    </div>
  );
};

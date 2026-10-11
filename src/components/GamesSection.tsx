import React, { useState, useEffect, useRef } from 'react';
import { FRUITS, FruitItem } from '../data/fruitData';
import { FruitIllustration } from './FruitIllustrations';
import { speechEngine } from '../utils/speech';
import { Sparkles, Timer, Trophy, RotateCcw, Zap, Layers, Puzzle } from 'lucide-react';

export const GamesSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'speed' | 'match' | 'memory'>('speed');

  // ================= SPEED QUIZ STATE =================
  const [speedQuestions, setSpeedQuestions] = useState<{
    fruit: FruitItem;
    questionText: string;
    options: string[];
    correctAnswer: string;
  }[]>([]);
  const [speedCurrentIndex, setSpeedCurrentIndex] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedCombo, setSpeedCombo] = useState(1);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(60);
  const [speedIsRunning, setSpeedIsRunning] = useState(false);
  const [speedIsFinished, setSpeedIsFinished] = useState(false);
  const speedTimerRef = useRef<number | null>(null);

  const initSpeedQuiz = () => {
    const shuffled = [...FRUITS].sort(() => Math.random() - 0.5).slice(0, 10);
    const qs = shuffled.map(fruit => {
      const distractors = FRUITS.filter(f => f.id !== fruit.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(f => f.meaning);
      const options = [...distractors, fruit.meaning].sort(() => Math.random() - 0.5);
      return {
        fruit,
        questionText: `"${fruit.hanzi}" (${fruit.pinyin}) có nghĩa là gì?`,
        options,
        correctAnswer: fruit.meaning,
      };
    });

    setSpeedQuestions(qs);
    setSpeedCurrentIndex(0);
    setSpeedScore(0);
    setSpeedCombo(1);
    setSpeedTimeLeft(60);
    setSpeedIsRunning(true);
    setSpeedIsFinished(false);
    speechEngine.playSound('click');
  };

  useEffect(() => {
    if (speedIsRunning && speedTimeLeft > 0) {
      speedTimerRef.current = window.setInterval(() => {
        setSpeedTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(speedTimerRef.current!);
            setSpeedIsRunning(false);
            setSpeedIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (speedTimerRef.current) clearInterval(speedTimerRef.current);
    };
  }, [speedIsRunning, speedTimeLeft]);

  const handleSpeedAnswer = (selected: string) => {
    if (!speedIsRunning || speedIsFinished) return;
    const currentQ = speedQuestions[speedCurrentIndex];
    const isCorrect = selected === currentQ.correctAnswer;

    if (isCorrect) {
      setSpeedScore(prev => prev + 10 * speedCombo);
      setSpeedCombo(prev => Math.min(prev + 1, 4));
      speechEngine.playSound('correct');
    } else {
      setSpeedCombo(1);
      speechEngine.playSound('wrong');
    }

    if (speedCurrentIndex + 1 < speedQuestions.length) {
      setSpeedCurrentIndex(prev => prev + 1);
    } else {
      setSpeedIsRunning(false);
      setSpeedIsFinished(true);
      if (speedTimerRef.current) clearInterval(speedTimerRef.current);
    }
  };

  // ================= MATCHING PAIRS GAME STATE =================
  const [matchPairs, setMatchPairs] = useState<{
    left: { id: string; hanzi: string; pinyin: string }[];
    right: { id: string; meaning: string }[];
  }>({ left: [], right: [] });
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchWrongPair, setMatchWrongPair] = useState<boolean>(false);

  const initMatchingGame = () => {
    const selected = [...FRUITS].sort(() => Math.random() - 0.5).slice(0, 6);
    const left = selected.map(f => ({ id: f.id, hanzi: f.hanzi, pinyin: f.pinyin })).sort(() => Math.random() - 0.5);
    const right = selected.map(f => ({ id: f.id, meaning: f.meaning })).sort(() => Math.random() - 0.5);

    setMatchPairs({ left, right });
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
    setMatchWrongPair(false);
    speechEngine.playSound('click');
  };

  const handleSelectLeft = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedLeft(id);
    const fruit = FRUITS.find(f => f.id === id);
    if (fruit) speechEngine.speak(fruit.hanzi);

    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleSelectRight = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedRight(id);

    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      setMatchedIds(prev => [...prev, leftId]);
      setSelectedLeft(null);
      setSelectedRight(null);
      speechEngine.playSound('correct');
    } else {
      setMatchWrongPair(true);
      speechEngine.playSound('wrong');
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setMatchWrongPair(false);
      }, 700);
    }
  };

  // ================= MEMORY CARD FLIP STATE =================
  const [memoryCards, setMemoryCards] = useState<{
    uniqueId: number;
    fruitId: string;
    type: 'hanzi' | 'image';
    displayContent: string;
    isFlipped: boolean;
    isMatched: boolean;
  }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  const initMemoryGame = () => {
    const chosen = [...FRUITS].sort(() => Math.random() - 0.5).slice(0, 6);
    const cards: typeof memoryCards = [];

    chosen.forEach((f, idx) => {
      cards.push({
        uniqueId: idx * 2,
        fruitId: f.id,
        type: 'hanzi',
        displayContent: f.hanzi,
        isFlipped: false,
        isMatched: false,
      });
      cards.push({
        uniqueId: idx * 2 + 1,
        fruitId: f.id,
        type: 'image',
        displayContent: f.meaning,
        isFlipped: false,
        isMatched: false,
      });
    });

    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setFlippedIndices([]);
    speechEngine.playSound('click');
  };

  const handleMemoryFlip = (index: number) => {
    if (flippedIndices.length >= 2) return;
    if (memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    speechEngine.playSound('flip');

    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [idx1, idx2] = newFlipped;
      const card1 = updated[idx1];
      const card2 = updated[idx2];

      if (card1.fruitId === card2.fruitId) {
        // Matched!
        setTimeout(() => {
          setMemoryCards(prev =>
            prev.map((c, i) => (i === idx1 || i === idx2 ? { ...c, isMatched: true } : c))
          );
          setFlippedIndices([]);
          speechEngine.playSound('correct');
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          setMemoryCards(prev =>
            prev.map((c, i) => (i === idx1 || i === idx2 ? { ...c, isFlipped: false } : c))
          );
          setFlippedIndices([]);
          speechEngine.playSound('wrong');
        }, 800);
      }
    }
  };

  // Init games on mount
  useEffect(() => {
    initSpeedQuiz();
    initMatchingGame();
    initMemoryGame();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Góc Giải Trí & Ôn Tập · 趣味游戏</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">Đấu Trí Ghi Nhớ Từ Vựng</h2>
            <p className="text-sm text-stone-600 mt-0.5">
              Củng cố phản xạ ngôn ngữ qua các trò chơi tương tác vui nhộn và có chấm điểm.
            </p>
          </div>

          {/* Game Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setActiveGame('speed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeGame === 'speed' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Speed Quiz (60s)</span>
            </button>
            <button
              onClick={() => setActiveGame('match')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeGame === 'match' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nối Từ - Nghĩa</span>
            </button>
            <button
              onClick={() => setActiveGame('memory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeGame === 'memory' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Thẻ Trí Nhớ</span>
            </button>
          </div>
        </div>
      </div>

      {/* GAME 1: SPEED QUIZ */}
      {activeGame === 'speed' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Header Stats */}
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-600" />
              <div>
                <span className="text-[11px] font-semibold text-stone-500 uppercase block">Thời gian</span>
                <span className="text-xl font-bold font-mono text-stone-900">{speedTimeLeft}s</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="text-[11px] font-semibold text-stone-500 uppercase block">Điểm số</span>
                <span className="text-xl font-bold font-mono text-emerald-700">{speedScore}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-600 px-2 py-1 bg-amber-100 rounded-lg">
                Combo x{speedCombo}
              </span>
            </div>
          </div>

          {/* Quiz Screen */}
          {!speedIsFinished && speedQuestions.length > 0 && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="flex justify-center mb-3">
                  <FruitIllustration id={speedQuestions[speedCurrentIndex].fruit.id} size={90} />
                </div>
                <div className="text-3xl font-bold text-stone-900 mb-1">
                  {speedQuestions[speedCurrentIndex].fruit.hanzi}
                </div>
                <div className="text-base font-semibold text-amber-600 font-mono">
                  {speedQuestions[speedCurrentIndex].fruit.pinyin}
                </div>
                <p className="text-xs text-stone-500 mt-2">
                  Câu hỏi {speedCurrentIndex + 1} / {speedQuestions.length}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {speedQuestions[speedCurrentIndex].options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSpeedAnswer(opt)}
                    className="p-4 bg-white hover:bg-emerald-50 hover:border-emerald-500 border border-stone-200 rounded-xl text-sm font-semibold text-stone-800 transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Finished Screen */}
          {speedIsFinished && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
                🏆
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Hoàn Thành Thử Thách!</h3>
              <p className="text-sm text-stone-600">
                Bạn đã đạt được <strong className="text-emerald-700 text-lg font-mono">{speedScore}</strong> điểm!
              </p>
              <button
                onClick={initSpeedQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi lại ván mới</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: MATCHING PAIRS */}
      {activeGame === 'match' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900">Nối Cặp Từ Tiếng Trung & Tiếng Việt</h3>
              <p className="text-xs text-stone-500">Chạm một ô bên trái rồi chạm ô tương ứng bên phải</p>
            </div>
            <button
              onClick={initMatchingGame}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ván mới</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Column (Hanzi & Pinyin) */}
            <div className="space-y-2.5">
              {matchPairs.left.map(item => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedLeft === item.id;

                let cardStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:border-emerald-400';
                if (isMatched) {
                  cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60 pointer-events-none';
                } else if (isSelected) {
                  cardStyle = matchWrongPair
                    ? 'bg-red-50 border-red-500 text-red-800 ring-2 ring-red-400/20'
                    : 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectLeft(item.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer font-medium flex items-center justify-between ${cardStyle}`}
                  >
                    <div>
                      <div className="text-base font-bold">{item.hanzi}</div>
                      <div className="text-xs text-stone-500 font-mono">{item.pinyin}</div>
                    </div>
                    {isMatched && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Right Column (Meaning) */}
            <div className="space-y-2.5">
              {matchPairs.right.map(item => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedRight === item.id;

                let cardStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:border-emerald-400';
                if (isMatched) {
                  cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60 pointer-events-none';
                } else if (isSelected) {
                  cardStyle = matchWrongPair
                    ? 'bg-red-50 border-red-500 text-red-800 ring-2 ring-red-400/20'
                    : 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectRight(item.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer font-medium flex items-center justify-between ${cardStyle}`}
                  >
                    <span className="text-sm">{item.meaning}</span>
                    {isMatched && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {matchedIds.length === matchPairs.left.length && matchPairs.left.length > 0 && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <span className="text-2xl">🎉</span>
              <div className="text-sm font-bold text-emerald-900">Tuyệt vời! Bạn đã ghép đúng tất cả các cặp!</div>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: MEMORY MATCH */}
      {activeGame === 'memory' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900">Trí Nhớ Thẻ Lật (12 Thẻ)</h3>
              <p className="text-xs text-stone-500">Lật 2 thẻ trùng khớp giữa chữ Hán và quả</p>
            </div>
            <button
              onClick={initMemoryGame}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi lại</span>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {memoryCards.map((card, idx) => (
              <button
                key={card.uniqueId}
                onClick={() => handleMemoryFlip(idx)}
                className={`aspect-square rounded-2xl border flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer select-none ${
                  card.isMatched
                    ? 'bg-emerald-50 border-emerald-300 opacity-60 pointer-events-none'
                    : card.isFlipped
                    ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  card.type === 'hanzi' ? (
                    <span className="text-xl font-bold text-stone-900">{card.displayContent}</span>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FruitIllustration id={card.fruitId} size={36} className="mb-0.5" />
                      <span className="text-[11px] font-semibold text-stone-700">{card.displayContent}</span>
                    </div>
                  )
                ) : (
                  <span className="text-xl font-bold text-stone-500">?</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

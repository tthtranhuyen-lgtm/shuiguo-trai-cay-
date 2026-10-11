import React, { useState, useMemo } from 'react';
import { FRUITS, FruitItem } from '../data/fruitData';
import { FruitIllustration } from './FruitIllustrations';
import { speechEngine } from '../utils/speech';
import { 
  Volume2, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  HelpCircle, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  ShoppingBag,
  Trophy,
  Lightbulb
} from 'lucide-react';

interface CartItem {
  fruit: FruitItem;
  quantityJin: number; // in 斤 (500g)
}

export const SpeakingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shop' | 'fridge' | 'guess'>('shop');

  // --- ACTIVITY 1: SHOPPING CART SIMULATOR ---
  const [cart, setCart] = useState<CartItem[]>([
    { fruit: FRUITS[3], quantityJin: 2 }, // 2 斤 mango
    { fruit: FRUITS[8], quantityJin: 1 }  // 1 斤 dragonfruit
  ]);

  const addToCart = (fruit: FruitItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.fruit.id === fruit.id);
      if (existing) {
        return prev.map(item =>
          item.fruit.id === fruit.id
            ? { ...item, quantityJin: item.quantityJin + 1 }
            : item
        );
      }
      return [...prev, { fruit, quantityJin: 1 }];
    });
    speechEngine.playSound('coin');
  };

  const updateQuantity = (fruitId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.fruit.id === fruitId) {
            const newQty = item.quantityJin + delta;
            return newQty > 0 ? { ...item, quantityJin: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
    speechEngine.playSound('click');
  };

  const removeFromCart = (fruitId: string) => {
    setCart(prev => prev.filter(item => item.fruit.id !== fruitId));
    speechEngine.playSound('click');
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.fruit.pricePerJin * item.quantityJin, 0);
  }, [cart]);

  // Generated Dialogue based on current cart
  const generatedDialogue = useMemo(() => {
    if (cart.length === 0) return null;
    const itemsTextZh = cart
      .map(item => `${item.quantityJin}斤${item.fruit.hanzi}`)
      .join('、');
    const itemsTextPinyin = cart
      .map(item => `${item.quantityJin} jīn ${item.fruit.pinyin}`)
      .join(', ');
    const itemsTextVn = cart
      .map(item => `${item.quantityJin} cân ${item.fruit.meaning.replace('Quả ', '')}`)
      .join(', ');

    return {
      buyerZh: `老板，给我来${itemsTextZh}。一共多少钱？`,
      buyerPinyin: `Lǎobǎn, gěi wǒ lái ${itemsTextPinyin}. Yígòng duōshao qián?`,
      buyerVn: `Bác chủ quán ơi, cho cháu lấy ${itemsTextVn}. Tổng cộng bao nhiêu tiền ạ?`,
      sellerZh: `好嘞！一共${totalPrice}块钱。算你${Math.max(1, totalPrice - 2)}块吧！`,
      sellerPinyin: `Hǎo lei! Yígòng ${totalPrice} kuài qián. Suàn nǐ ${Math.max(1, totalPrice - 2)} kuài ba!`,
      sellerVn: `Được rồi! Tổng cộng ${totalPrice} đồng. Làm tròn tính cháu ${Math.max(1, totalPrice - 2)} đồng thôi nhé!`
    };
  }, [cart, totalPrice]);

  // --- ACTIVITY 2: FRIDGE SENTENCE BUILDER ---
  const [fridgeFruitIds, setFridgeFruitIds] = useState<string[]>(['apple', 'banana', 'watermelon']);

  const toggleFridgeFruit = (id: string) => {
    setFridgeFruitIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    speechEngine.playSound('click');
  };

  const fridgeSentence = useMemo(() => {
    const selected = FRUITS.filter(f => fridgeFruitIds.includes(f.id));
    if (selected.length === 0) return null;
    const namesZh = selected.map(f => f.hanzi).join('、');
    const namesPinyin = selected.map(f => f.pinyin).join(', ');
    const namesVn = selected.map(f => f.meaning.replace('Quả ', '')).join(', ');

    return {
      zh: `我的冰箱里有${namesZh}。除了${selected[0]?.hanzi || '水果'}以外，我还喜欢吃${selected[1]?.hanzi || '新鲜水果'}。`,
      pinyin: `Wǒ de bīngxiāng lǐ yǒu ${namesPinyin}. Chúle ${selected[0]?.pinyin || 'shuǐguǒ'} yǐwài, wǒ hái xǐhuan chī ${selected[1]?.pinyin || 'xīnxiān shuǐguǒ'}.`,
      vn: `Trong tủ lạnh của tôi có ${namesVn}. Ngoài ${selected[0]?.meaning.replace('Quả ', '') || 'trái cây'} ra, tôi còn thích ăn ${selected[1]?.meaning.replace('Quả ', '') || 'trái cây tươi'}.`
    };
  }, [fridgeFruitIds]);

  // --- ACTIVITY 3: GUESS THE FRUIT RIDDLE ---
  const [riddleIndex, setRiddleIndex] = useState(0);
  const [hintsUnlocked, setHintsUnlocked] = useState(1);
  const [guessInput, setGuessInput] = useState('');
  const [guessMode, setGuessMode] = useState<'choice' | 'text'>('choice');
  const [guessResult, setGuessResult] = useState<boolean | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [scoreCount, setScoreCount] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);

  const riddleFruit = FRUITS[riddleIndex % FRUITS.length];

  // 4 choice options (1 correct + 3 randomized distractors)
  const choices = useMemo(() => {
    const distractors = FRUITS.filter(f => f.id !== riddleFruit.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...distractors, riddleFruit].sort(() => Math.random() - 0.5);
  }, [riddleFruit]);

  const handleSelectChoice = (fruit: FruitItem) => {
    if (guessResult !== null) return;
    setSelectedChoiceId(fruit.id);
    const isCorrect = fruit.id === riddleFruit.id;
    setGuessResult(isCorrect);
    setTotalAttempted(prev => prev + 1);
    if (isCorrect) {
      setScoreCount(prev => prev + 1);
      speechEngine.playSound('correct');
    } else {
      speechEngine.playSound('wrong');
    }
  };

  const handleNextRiddle = () => {
    setRiddleIndex(prev => (prev + 1) % FRUITS.length);
    setHintsUnlocked(1);
    setGuessInput('');
    setSelectedChoiceId(null);
    setGuessResult(null);
    speechEngine.playSound('click');
  };

  const handleCheckGuess = () => {
    if (!guessInput.trim() || guessResult !== null) return;
    const cleanInput = guessInput.trim().toLowerCase().replace(/\s+/g, '');
    const isCorrect =
      cleanInput === riddleFruit.hanzi ||
      cleanInput === riddleFruit.pinyin.toLowerCase().replace(/\s+/g, '') ||
      cleanInput === riddleFruit.meaning.toLowerCase().replace(/\s+/g, '') ||
      cleanInput === riddleFruit.meaning.toLowerCase().replace('quả', '').replace(/\s+/g, '') ||
      cleanInput === riddleFruit.tag.toLowerCase().replace(/\s+/g, '');

    setGuessResult(isCorrect);
    setTotalAttempted(prev => prev + 1);
    if (isCorrect) {
      setScoreCount(prev => prev + 1);
      speechEngine.playSound('correct');
    } else {
      speechEngine.playSound('wrong');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Thực Hành Khẩu Ngữ · 口语互动练习</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">Phòng Luyện Phản Xạ Giao Tiếp</h2>
            <p className="text-sm text-stone-600 mt-0.5">
              Chọn hoa quả vào giỏ, mô phỏng cân đo thanh toán và giải đố giác quan.
            </p>
          </div>

          {/* Activity Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'shop' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tiệm hoa quả ảo
            </button>
            <button
              onClick={() => setActiveTab('fridge')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'fridge' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tủ lạnh của bạn
            </button>
            <button
              onClick={() => setActiveTab('guess')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'guess' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Đố vui đoán quả
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVITY 1: SHOPPING SIMULATOR */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Fruit Store Shelves */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>Sạp Trái Cây Tươi Mới (Chạm để thêm vào giỏ)</span>
              </h3>
              <span className="text-xs text-stone-500 font-mono">Đơn vị: 斤 (500g)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FRUITS.slice(0, 9).map(fruit => (
                <button
                  key={fruit.id}
                  onClick={() => addToCart(fruit)}
                  className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-500 bg-stone-50/50 hover:bg-emerald-50/20 text-center transition-all cursor-pointer flex flex-col items-center justify-between group shadow-2xs"
                >
                  <FruitIllustration id={fruit.id} size={50} className="mb-2 group-hover:scale-105 transition-transform" />
                  <div className="text-sm font-bold text-stone-900">{fruit.hanzi}</div>
                  <div className="text-[11px] text-amber-600 font-mono">{fruit.pinyin}</div>
                  <div className="text-xs font-semibold text-emerald-700 mt-1">
                    {fruit.pricePerJin} tệ / cân
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cart & Real-time Dialogue Script */}
          <div className="lg:col-span-5 space-y-4">
            {/* Cart Box */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-base font-bold text-stone-900">Giỏ Hàng Của Bạn</h3>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-xs text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Xóa sạch
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="py-8 text-center text-stone-400 text-xs">
                  Giỏ hàng đang trống. Hãy bấm chọn quả ở sạp bên cạnh!
                </div>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div
                      key={item.fruit.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <FruitIllustration id={item.fruit.id} size={28} />
                        <div>
                          <span className="font-bold text-stone-900">{item.fruit.hanzi}</span>
                          <span className="text-stone-500 ml-1">({item.fruit.pricePerJin}¥/斤)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white border border-stone-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.fruit.id, -1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono font-bold text-stone-900">
                            {item.quantityJin} 斤
                          </span>
                          <button
                            onClick={() => updateQuantity(item.fruit.id, 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-emerald-700 min-w-10 text-right">
                          {item.fruit.pricePerJin * item.quantityJin}¥
                        </span>
                        <button
                          onClick={() => removeFromCart(item.fruit.id)}
                          className="text-stone-300 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total Row */}
              {cart.length > 0 && (
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500 uppercase">Tổng cộng:</span>
                  <span className="text-xl font-bold text-emerald-700 font-mono">
                    ¥{totalPrice} Tệ
                  </span>
                </div>
              )}
            </div>

            {/* Auto-Generated Dialogue Box */}
            {generatedDialogue && (
              <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Hội thoại mua bán phát sinh
                  </span>
                  <button
                    onClick={() => {
                      speechEngine.speak(generatedDialogue.buyerZh, 0.85, () => {
                        setTimeout(() => {
                          speechEngine.speak(generatedDialogue.sellerZh, 0.85);
                        }, 500);
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe cả đoạn</span>
                  </button>
                </div>

                {/* Buyer line */}
                <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">👦 Khách mua (Tiểu Minh):</span>
                    <button
                      onClick={() => speechEngine.speak(generatedDialogue.buyerZh)}
                      className="text-emerald-400 hover:text-white cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-white">{generatedDialogue.buyerZh}</p>
                  <p className="text-xs text-amber-200/80 font-mono">{generatedDialogue.buyerPinyin}</p>
                  <p className="text-xs text-emerald-300/80">{generatedDialogue.buyerVn}</p>
                </div>

                {/* Seller line */}
                <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">👨 Bác chủ quán:</span>
                    <button
                      onClick={() => speechEngine.speak(generatedDialogue.sellerZh)}
                      className="text-emerald-400 hover:text-white cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-white">{generatedDialogue.sellerZh}</p>
                  <p className="text-xs text-amber-200/80 font-mono">{generatedDialogue.sellerPinyin}</p>
                  <p className="text-xs text-emerald-300/80">{generatedDialogue.sellerVn}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACTIVITY 2: FRIDGE SENTENCE BUILDER */}
      {activeTab === 'fridge' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-stone-900">打开你的冰箱 · Mở Tủ Lạnh Của Bạn</h3>
            <p className="text-sm text-stone-600 mt-0.5">
              Chọn các loại quả có trong tủ lạnh nhà bạn để tự động tạo câu mô tả chuẩn ngữ pháp.
            </p>
          </div>

          {/* Fruit selector checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {FRUITS.map(f => {
              const isInFridge = fridgeFruitIds.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggleFridgeFruit(f.id)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                    isInFridge
                      ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 opacity-60'
                  }`}
                >
                  <FruitIllustration id={f.id} size={42} className="mb-1" />
                  <span className="text-xs font-bold text-stone-900">{f.hanzi}</span>
                  <span className="text-[10px] text-stone-500">{f.meaning.replace('Quả ', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Generated Sentence Result */}
          {fridgeSentence && (
            <div className="p-5 bg-stone-900 text-white rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Câu khẩu ngữ hoàn chỉnh của bạn:
                </span>
                <button
                  onClick={() => speechEngine.speak(fridgeSentence.zh)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Luyện nghe phát âm</span>
                </button>
              </div>

              <div className="text-lg font-bold text-white leading-relaxed font-sans">
                {fridgeSentence.zh}
              </div>
              <div className="text-xs font-medium text-amber-300 font-mono">
                {fridgeSentence.pinyin}
              </div>
              <div className="text-sm text-stone-400">
                {fridgeSentence.vn}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ACTIVITY 3: GUESS THE FRUIT RIDDLE */}
      {activeTab === 'guess' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Header Info & Score */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Câu đố dân gian tương tác · 水果谜语</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mt-0.5">
                猜猜这是什么水果？
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Nghe câu đố vần điệu, lần theo manh mối giác quan để tìm ra loại quả ẩn danh
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Điểm: {scoreCount} / {totalAttempted}</span>
              </div>
              <button
                onClick={handleNextRiddle}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                title="Đổi câu đố khác"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Câu khác</span>
              </button>
            </div>
          </div>

          {/* Mode switch (Choice vs Text input) */}
          <div className="flex items-center justify-between gap-3 bg-stone-50 p-2 rounded-2xl border border-stone-200/80">
            <span className="text-xs font-medium text-stone-600 pl-2">Cách thức đoán:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setGuessMode('choice')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  guessMode === 'choice'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🎯 Chọn 4 đáp án (Khuyên dùng)
              </button>
              <button
                onClick={() => setGuessMode('text')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  guessMode === 'text'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ⌨️ Thử thách tự gõ
              </button>
            </div>
          </div>

          {/* MAIN RIDDLE POEM (Manh mối 1 trọng tâm) */}
          <div className="bg-gradient-to-br from-amber-50/80 via-emerald-50/40 to-stone-50 rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-200/60 text-amber-900 text-xs font-bold">
                🏮 Câu đố dân gian (谜语)
              </span>

              <button
                onClick={() => speechEngine.speak(riddleFruit.riddleZh)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                title="Nghe giọng đọc câu đố"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>Nghe câu đố</span>
              </button>
            </div>

            {/* Chinese Poem Text */}
            <div className="text-xl sm:text-2xl font-bold text-stone-900 leading-relaxed font-sans">
              "{riddleFruit.riddleZh}"
            </div>

            {/* Pinyin with tone marks */}
            <div className="text-xs sm:text-sm font-medium text-amber-700 font-mono">
              {riddleFruit.riddlePinyin}
            </div>

            {/* Vietnamese Translation */}
            <div className="text-xs sm:text-sm text-stone-600 pt-1 border-t border-amber-200/50">
              💡 <em>{riddleFruit.riddleVn}</em>
            </div>
          </div>

          {/* PROGRESSIVE HINTS SYSTEM */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
              <span>Manh mối bổ trợ ({hintsUnlocked}/3)</span>
              {hintsUnlocked < 3 && (
                <button
                  onClick={() => setHintsUnlocked(prev => Math.min(prev + 1, 3))}
                  className="text-emerald-700 hover:text-emerald-800 font-bold normal-case cursor-pointer flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Mở thêm gợi ý tiếp theo</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {/* Hint 1: Vỏ & Màu sắc */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
                <span className="text-[11px] font-semibold text-stone-500 block">🎨 Vỏ ngoài & Màu sắc:</span>
                <span className="font-bold text-stone-800">{riddleFruit.color} · {riddleFruit.shape}</span>
              </div>

              {/* Hint 2: Mùi vị */}
              {hintsUnlocked >= 2 ? (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5 animate-in fade-in">
                  <span className="text-[11px] font-semibold text-stone-500 block">👅 Hương vị đặc trưng:</span>
                  <span className="font-bold text-stone-800">{riddleFruit.taste} ({riddleFruit.tasteZh})</span>
                </div>
              ) : (
                <button
                  onClick={() => setHintsUnlocked(2)}
                  className="p-3 bg-stone-50/50 hover:bg-stone-100 rounded-xl border border-dashed border-stone-300 text-stone-500 text-center font-medium transition-colors cursor-pointer"
                >
                  🔒 Bấm để mở Manh mối Hương vị
                </button>
              )}

              {/* Hint 3: Pinyin & Lượng từ */}
              {hintsUnlocked >= 3 ? (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5 animate-in fade-in">
                  <span className="text-[11px] font-semibold text-stone-500 block">🔤 Chữ cái đầu & Lượng từ:</span>
                  <span className="font-bold text-stone-800 font-mono">
                    {riddleFruit.pinyin.charAt(0).toUpperCase()}___ · 一{riddleFruit.measureWord}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setHintsUnlocked(3)}
                  className="p-3 bg-stone-50/50 hover:bg-stone-100 rounded-xl border border-dashed border-stone-300 text-stone-500 text-center font-medium transition-colors cursor-pointer"
                >
                  🔒 Bấm để mở Manh mối Pinyin
                </button>
              )}
            </div>
          </div>

          {/* ANSWERING AREA */}
          <div className="space-y-4 pt-2">
            {/* Mode 1: 4-Choice Options */}
            {guessMode === 'choice' && (
              <div>
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  Chọn 1 trong 4 loại quả bên dưới:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {choices.map(choice => {
                    const isSelected = selectedChoiceId === choice.id;
                    const isCorrectAnswer = choice.id === riddleFruit.id;
                    let style = 'bg-stone-50 border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/30 text-stone-800';

                    if (guessResult !== null) {
                      if (isCorrectAnswer) {
                        style = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 font-bold';
                      } else if (isSelected) {
                        style = 'bg-red-50 border-red-500 text-red-950 font-bold';
                      } else {
                        style = 'opacity-40 border-stone-200 bg-stone-50 pointer-events-none';
                      }
                    }

                    return (
                      <button
                        key={choice.id}
                        onClick={() => handleSelectChoice(choice)}
                        disabled={guessResult !== null}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between shadow-2xs hover:scale-102 ${style}`}
                      >
                        <FruitIllustration id={choice.id} size={48} className="mb-2" />
                        <div className="text-base font-bold text-stone-900 leading-tight">
                          {choice.hanzi}
                        </div>
                        <div className="text-xs text-amber-600 font-mono font-medium">
                          {choice.pinyin}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {choice.meaning.replace('Quả ', '')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mode 2: Free text input */}
            {guessMode === 'text' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Gõ tên quả (chữ Hán, pinyin hoặc tiếng Việt)..."
                    value={guessInput}
                    onChange={e => setGuessInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCheckGuess()}
                    disabled={guessResult !== null}
                    className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 focus:bg-white disabled:opacity-60"
                  />
                  <button
                    onClick={handleCheckGuess}
                    disabled={guessResult !== null || !guessInput.trim()}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Kiểm tra
                  </button>
                </div>
              </div>
            )}

            {/* RESULT CARD & EXPLANATION */}
            {guessResult !== null && (
              <div
                className={`p-5 rounded-2xl border transition-all animate-in fade-in zoom-in-98 ${
                  guessResult
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50/90 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-2xl border border-stone-200 shadow-xs shrink-0">
                      <FruitIllustration id={riddleFruit.id} size={70} />
                    </div>

                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        {guessResult ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-200/80 text-emerald-900">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Chính xác 100%!</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-200/80 text-amber-900">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Đáp án chuẩn:</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-stone-900">{riddleFruit.hanzi}</span>
                        <span className="text-sm font-semibold text-amber-700 font-mono">{riddleFruit.pinyin}</span>
                        <span className="text-sm font-medium text-stone-700">· {riddleFruit.meaning}</span>
                      </div>

                      <p className="text-xs text-stone-600">
                        Lượng từ: <strong className="text-stone-900">一{riddleFruit.measureWord} ({riddleFruit.measurePinyin})</strong> · {riddleFruit.fact}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => speechEngine.speak(riddleFruit.hanzi)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 hover:bg-stone-50 cursor-pointer shadow-2xs"
                    >
                      <Volume2 className="w-4 h-4 text-emerald-700" />
                      <span>Phát âm lại</span>
                    </button>

                    <button
                      onClick={handleNextRiddle}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                    >
                      <span>Câu tiếp theo ➡️</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

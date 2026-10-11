import React, { useState, useMemo } from 'react';
import { FRUITS, FruitItem } from '../data/fruitData';
import { FruitIllustration } from './FruitIllustrations';
import { speechEngine } from '../utils/speech';
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Star, 
  Search, 
  Info, 
  Layers,
  Sparkles
} from 'lucide-react';

interface VocabSectionProps {
  masteredIds: string[];
  onToggleMastered: (id: string) => void;
  onOpenWhiteboardWithChar?: (fruitId: string) => void;
}

export const VocabSection: React.FC<VocabSectionProps> = ({
  masteredIds,
  onToggleMastered,
  onOpenWhiteboardWithChar
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'tropical' | 'temperate' | 'mastered'>('all');
  const [speechRate, setSpeechRate] = useState<number>(0.8);
  const [activeTab, setActiveTab] = useState<'flashcard' | 'grid'>('flashcard');

  // Filtered dataset
  const filteredFruits = useMemo(() => {
    return FRUITS.filter(item => {
      const matchSearch =
        item.hanzi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchSearch) return false;

      if (categoryFilter === 'tropical') return item.category === 'tropical';
      if (categoryFilter === 'temperate') return item.category === 'temperate';
      if (categoryFilter === 'mastered') return masteredIds.includes(item.id);
      return true;
    });
  }, [searchQuery, categoryFilter, masteredIds]);

  const currentFruit: FruitItem | undefined = filteredFruits[currentIndex] || filteredFruits[0] || FRUITS[0];

  const handleNext = () => {
    if (filteredFruits.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredFruits.length);
    speechEngine.playSound('flip');
  };

  const handlePrev = () => {
    if (filteredFruits.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredFruits.length) % filteredFruits.length);
    speechEngine.playSound('flip');
  };

  const handleShuffle = () => {
    if (filteredFruits.length <= 1) return;
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * filteredFruits.length);
    setCurrentIndex(rand);
    speechEngine.playSound('click');
  };

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    speechEngine.speak(text, speechRate);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Kho Từ Vựng Trái Cây · 水果词汇</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">17 Loại Quả Thông Dụng Nhất</h2>
            <p className="text-sm text-stone-600 mt-0.5">
              Học chữ Hán, phiên âm pinyin chuẩn thanh điệu, lượng từ và câu ví dụ thực tế.
            </p>
          </div>

          {/* Mode Switch (Flashcard vs Danh sách) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('flashcard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'flashcard' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Thẻ Flashcard 3D</span>
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Xem danh sách ({filteredFruits.length})</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo chữ Hán, pinyin hoặc tiếng Việt (táo, pingguo, chuối...)"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Tất cả (17)' },
              { id: 'tropical', label: 'Nhiệt đới' },
              { id: 'temperate', label: 'Ôn đới' },
              { id: 'mastered', label: `Đã thuộc (${masteredIds.length})` },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoryFilter(cat.id as typeof categoryFilter);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'flashcard' && currentFruit && (
        <div className="flex flex-col items-center">
          {/* Controls Bar */}
          <div className="w-full max-w-md flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
                title="Trộn ngẫu nhiên"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleMastered(currentFruit.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  masteredIds.includes(currentFruit.id)
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-white border-stone-200 text-stone-400 hover:text-stone-700'
                }`}
                title={masteredIds.includes(currentFruit.id) ? 'Đã nhớ từ này' : 'Đánh dấu đã nhớ'}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>

              {/* Speed rate selector */}
              <div className="flex items-center bg-stone-100 rounded-lg p-0.5 text-xs text-stone-600">
                {[
                  { r: 0.6, label: '0.6x' },
                  { r: 0.8, label: '0.8x' },
                  { r: 1.0, label: '1.0x' },
                ].map(item => (
                  <button
                    key={item.r}
                    onClick={() => setSpeechRate(item.r)}
                    className={`px-2 py-1 rounded-md font-medium cursor-pointer ${
                      speechRate === item.r ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-semibold text-stone-500 font-mono">
              {currentIndex + 1} / {filteredFruits.length}
            </div>
          </div>

          {/* 3D Flashcard Container */}
          <div
            onClick={() => {
              setIsFlipped(!isFlipped);
              speechEngine.playSound('flip');
            }}
            className="w-full max-w-md h-[460px] perspective-1000 cursor-pointer select-none"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT SIDE */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-3xl border border-stone-200 p-8 shadow-sm flex flex-col items-center justify-between text-center hover:border-emerald-500/50 transition-colors">
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    {currentFruit.category === 'tropical' ? 'Nhiệt đới · 热带' : 'Ôn đới · 温带'}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    Lượng từ: {currentFruit.measureWord} ({currentFruit.measurePinyin})
                  </span>
                </div>

                {/* Fruit Vector Illustration */}
                <div className="my-auto flex flex-col items-center">
                  <FruitIllustration id={currentFruit.id} size={150} className="drop-shadow-md mb-4" />
                  <div className="text-5xl font-bold text-stone-900 tracking-wide font-sans mb-1">
                    {currentFruit.hanzi}
                  </div>
                  <div className="text-2xl font-semibold text-amber-600 font-sans tracking-wide">
                    {currentFruit.pinyin}
                  </div>
                </div>

                <div className="w-full flex items-center justify-between pt-4 border-t border-stone-100">
                  <button
                    onClick={e => handleSpeak(currentFruit.hanzi, e)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe phát âm</span>
                  </button>

                  <span className="text-xs text-stone-400">
                    Chạm để xem nghĩa ↻
                  </span>
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-stone-900 text-white rounded-3xl p-8 shadow-md flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Ý nghĩa & Ứng dụng
                    </span>
                    <button
                      onClick={e => handleSpeak(currentFruit.hanzi, e)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-emerald-400 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-1">
                    {currentFruit.meaning}
                  </h3>
                  {currentFruit.literalMeaning && (
                    <p className="text-xs text-stone-400 mb-4">
                      Hán Việt: <span className="text-stone-300 font-medium">{currentFruit.literalMeaning}</span>
                    </p>
                  )}

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4 p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                    <div>
                      <span className="text-stone-400 block text-[11px]">Màu sắc (颜色):</span>
                      <span className="font-medium text-stone-200">{currentFruit.color}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Mùi vị (味道):</span>
                      <span className="font-medium text-stone-200">{currentFruit.taste}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Hình dáng (形状):</span>
                      <span className="font-medium text-stone-200">{currentFruit.shape}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">Mùa vụ (季节):</span>
                      <span className="font-medium text-stone-200">{currentFruit.season}</span>
                    </div>
                  </div>

                  {/* Example Sentence with Audio */}
                  <div className="p-3 bg-stone-800/90 rounded-xl border border-stone-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-emerald-400">Câu ví dụ:</span>
                      <button
                        onClick={e => handleSpeak(currentFruit.exampleZh, e)}
                        className="text-stone-400 hover:text-white cursor-pointer"
                        title="Nghe câu ví dụ"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {currentFruit.exampleZh}
                    </p>
                    <p className="text-xs text-amber-300 mt-0.5">
                      {currentFruit.examplePinyin}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      {currentFruit.exampleVn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-xs">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onToggleMastered(currentFruit.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium cursor-pointer ${
                      masteredIds.includes(currentFruit.id)
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{masteredIds.includes(currentFruit.id) ? 'Đã thuộc' : 'Đánh dấu đã thuộc'}</span>
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (onOpenWhiteboardWithChar) {
                        onOpenWhiteboardWithChar(currentFruit.id);
                      }
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                  >
                    Tập viết nét chữ ✍️
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full max-w-md flex items-center justify-between mt-5 gap-3">
            <button
              onClick={handlePrev}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 transition-colors cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Từ trước</span>
            </button>
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <span>Từ tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Grid Overview List View */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFruits.map(fruit => {
            const isMastered = masteredIds.includes(fruit.id);
            return (
              <div
                key={fruit.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <FruitIllustration id={fruit.id} size={54} className="shrink-0" />
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-stone-900">{fruit.hanzi}</span>
                          <span className="text-sm font-semibold text-amber-600">{fruit.pinyin}</span>
                        </div>
                        <div className="text-sm font-medium text-stone-700">{fruit.meaning}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleMastered(fruit.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isMastered ? 'text-amber-500 bg-amber-50' : 'text-stone-300 hover:text-stone-500'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Details Badges */}
                  <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl mb-3">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Lượng từ:</span>
                      <span className="font-medium text-stone-800">一{fruit.measureWord} ({fruit.measurePinyin})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Mùi vị & Màu:</span>
                      <span className="font-medium text-stone-800">{fruit.taste} · {fruit.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Giá tham khảo:</span>
                      <span className="font-medium text-emerald-700">{fruit.pricePerJin} tệ / cân (500g)</span>
                    </div>
                  </div>

                  {/* Mini Example with Chinese, Pinyin and Vietnamese */}
                  <div className="text-xs text-stone-500 mb-3 border-l-2 border-emerald-400 pl-2.5 space-y-0.5">
                    <p className="font-semibold text-stone-900 leading-snug">{fruit.exampleZh}</p>
                    <p className="text-[11px] text-amber-600 font-mono font-medium">{fruit.examplePinyin}</p>
                    <p className="text-[11px] text-stone-500 leading-snug">{fruit.exampleVn}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <button
                    onClick={() => handleSpeak(fruit.hanzi)}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Phát âm</span>
                  </button>
                  <button
                    onClick={() => handleSpeak(fruit.exampleZh)}
                    className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                  >
                    Nghe câu ví dụ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cultural Trivia Box */}
      {currentFruit && activeTab === 'flashcard' && (
        <div className="max-w-md mx-auto p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-amber-950">Góc văn hóa: </strong>
            {currentFruit.fact}
          </p>
        </div>
      )}
    </div>
  );
};

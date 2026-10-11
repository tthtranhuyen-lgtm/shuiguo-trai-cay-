import React from 'react';
import { NavTab } from './Navbar';
import { FRUITS } from '../data/fruitData';
import { FruitIllustration } from './FruitIllustrations';
import { speechEngine } from '../utils/speech';
import { 
  Volume2, 
  ArrowRight, 
  Layers, 
  BookOpen, 
  MessageSquare, 
  Tag, 
  Mic, 
  Gamepad2, 
  PenTool, 
  CheckSquare,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (tab: NavTab) => void;
  learnedCount: number;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, learnedCount }) => {
  const sections: {
    tab: NavTab;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    countTag?: string;
  }[] = [
    {
      tab: 'vocab',
      title: '17 Từ Vựng Trái Cây',
      subtitle: 'Thẻ Flashcard 3D, lượng từ, pinyin và câu ví dụ sinh động',
      icon: <Layers className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-200/80 hover:border-emerald-400',
      countTag: '17 loại quả'
    },
    {
      tab: 'grammar',
      title: '3 Điểm Ngữ Pháp Đi Chợ',
      subtitle: '越来越 (Càng ngày càng), 除了...还 (Ngoài ra còn), 买到/买不到',
      icon: <BookOpen className="w-5 h-5 text-amber-600" />,
      color: 'bg-amber-50 border-amber-200/80 hover:border-amber-400',
      countTag: '3 cấu trúc'
    },
    {
      tab: 'dialogue',
      title: 'Bài Khóa Đi Chợ Mua Bán',
      subtitle: 'Tiểu Minh đi sạp hoa quả: hỏi độ tươi, nếm thử măng cụt, trả tiền',
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200/80 hover:border-blue-400',
      countTag: 'Hội thoại HSK'
    },
    {
      tab: 'phrases',
      title: 'Mẫu Câu Người Bán & Người Mua',
      subtitle: 'Câu chào mời, mặc cả bớt tiền, hỏi cân đo và quét mã WeChat/Alipay',
      icon: <Tag className="w-5 h-5 text-orange-600" />,
      color: 'bg-orange-50 border-orange-200/80 hover:border-orange-400',
      countTag: '8 mẫu câu'
    },
    {
      tab: 'speaking',
      title: 'Phòng Khẩu Ngữ Tương Tác',
      subtitle: 'Cân hoa quả tính tiền ¥, mở tủ lạnh của bạn và đố vui 4 giác quan',
      icon: <Mic className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200/80 hover:border-purple-400',
      countTag: '3 hoạt động'
    },
    {
      tab: 'games',
      title: 'Trò Chơi Ôn Tập Phản Xạ',
      subtitle: 'Speed Quiz đếm ngược 60s, nối từ - nghĩa và lật thẻ trí nhớ',
      icon: <Gamepad2 className="w-5 h-5 text-pink-600" />,
      color: 'bg-pink-50 border-pink-200/80 hover:border-pink-400',
      countTag: '3 mini-games'
    },
    {
      tab: 'whiteboard',
      title: 'Bảng Tập Viết Chữ Hán',
      subtitle: 'Ô Mễ Tự Cách (米字格) có nét mẫu mờ, luyện bút thuận chuẩn',
      icon: <PenTool className="w-5 h-5 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-200/80 hover:border-indigo-400',
      countTag: 'Tập viết nét'
    },
    {
      tab: 'test',
      title: 'Kiểm Tra Tổng Hợp 10 Câu',
      subtitle: 'Đánh giá năng lực toàn diện, xếp loại A/B/C/D và confetti chúc mừng',
      icon: <CheckSquare className="w-5 h-5 text-rose-600" />,
      color: 'bg-rose-50 border-rose-200/80 hover:border-rose-400',
      countTag: '10 câu HSK'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Showcase Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-stone-900 to-amber-950 text-white rounded-3xl p-8 sm:p-10 shadow-md relative overflow-hidden">
        {/* Subtle decorative fruit icons background */}
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none text-9xl">
          🍉
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chuyên đề Giao tiếp Tiếng Trung Thực Tế · 水果专题</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Bài Học Tiếng Trung: <br />
            <span className="text-amber-300">Trái Cây (水果)</span> & Đi Chợ
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
            Làm chủ 17 loại quả phổ biến, thành thạo cách hỏi giá, mặc cả, cân đo theo cân Trung Quốc (斤) và nói chuyện tự tin với chủ tiệm trái cây!
          </p>

          {/* Quick Stats & Audio trigger */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('vocab')}
              className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-sm font-bold rounded-xl transition-all cursor-pointer shadow-sm hover:scale-102 active:scale-98"
            >
              <span>Bắt đầu bài học</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => speechEngine.speak('老板，今天的火龙果新鲜吗？非常新鲜，一斤八块钱！')}
              className="flex items-center gap-2 px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>Nghe câu thoại mẫu</span>
            </button>
          </div>
        </div>

        {/* Mini Preview Strip of Fruits */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>Tiến độ ghi nhớ:</span>
            <strong className="text-emerald-400 font-mono text-sm">{learnedCount} / 17</strong>
            <span>từ vựng</span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[11px] text-stone-400">
            <span>HSK 2-3 chuẩn</span>
            <span>·</span>
            <span>Phát âm Bắc Kinh</span>
          </div>
        </div>
      </div>

      {/* Featured Fruit Quick Carousel */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-stone-900">Xem Nhanh Các Loại Quả Tiêu Biểu</h2>
          </div>
          <button
            onClick={() => onNavigate('vocab')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            Xem tất cả 17 từ →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {FRUITS.slice(0, 6).map(f => (
            <div
              key={f.id}
              onClick={() => {
                speechEngine.speak(f.hanzi);
                onNavigate('vocab');
              }}
              className="p-3 rounded-xl bg-stone-50 border border-stone-100 hover:border-emerald-300 hover:bg-emerald-50/20 text-center transition-all cursor-pointer group"
            >
              <div className="flex justify-center mb-1">
                <FruitIllustration id={f.id} size={48} className="group-hover:scale-108 transition-transform" />
              </div>
              <div className="text-sm font-bold text-stone-900">{f.hanzi}</div>
              <div className="text-[11px] text-amber-600 font-mono">{f.pinyin}</div>
              <div className="text-xs text-stone-500 mt-0.5">{f.meaning.replace('Quả ', '')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modules Learning Pathway Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-stone-900">Nội Dung Bài Học Hoàn Chỉnh</h2>
          <span className="text-xs text-stone-500 font-mono">8 Phần Học Tương Tác</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map(sec => (
            <div
              key={sec.tab}
              onClick={() => onNavigate(sec.tab)}
              className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer shadow-xs hover:shadow-sm hover:scale-101 flex flex-col justify-between ${sec.color}`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white shadow-2xs border border-stone-100">
                    {sec.icon}
                  </div>
                  {sec.countTag && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-600">
                      {sec.countTag}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-stone-900 mb-1">
                  {sec.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {sec.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-stone-900">
                <span>Khám phá ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

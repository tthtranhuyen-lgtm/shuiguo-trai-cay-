import React, { useState } from 'react';
import { MARKET_PHRASES, PhraseItem } from '../data/lessonData';
import { speechEngine } from '../utils/speech';
import { Volume2, Tag, ShoppingBag, Store, Lightbulb } from 'lucide-react';

export const PhrasesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'seller' | 'buyer'>('all');

  const filteredPhrases = MARKET_PHRASES.filter(p => {
    if (activeTab === 'all') return true;
    return p.role === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              <Tag className="w-4 h-4" />
              <span>Mẫu Câu Đi Chợ · 实用买卖短语</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">Giao Tiếp Mua Bán Quả Chuẩn Bản Xứ</h2>
            <p className="text-sm text-stone-600 mt-0.5">
              Từ chào mời, hỏi giá, mặc cả đến quét mã thanh toán không tiền mặt.
            </p>
          </div>

          {/* Filter Tab */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tất cả ({MARKET_PHRASES.length})
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'seller' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>Người bán (老板)</span>
            </button>
            <button
              onClick={() => setActiveTab('buyer')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'buyer' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Người mua (顾客)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map(phrase => {
          const isSeller = phrase.role === 'seller';
          return (
            <div
              key={phrase.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
                isSeller
                  ? 'border-amber-200/90 hover:border-amber-400'
                  : 'border-emerald-200/90 hover:border-emerald-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                      isSeller
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {isSeller ? <Store className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                    <span>{isSeller ? 'Người bán' : 'Khách mua'} · {phrase.category}</span>
                  </span>

                  <button
                    onClick={() => speechEngine.speak(phrase.zh)}
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 text-stone-600 transition-colors cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Phrase Chinese text */}
                <h3 className="text-lg font-bold text-stone-900 leading-snug mb-1">
                  {phrase.zh}
                </h3>
                <p className="text-xs font-medium text-amber-700 font-mono mb-2">
                  {phrase.pinyin}
                </p>
                <p className="text-sm text-stone-700 mb-3">
                  {phrase.vn}
                </p>
              </div>

              {/* Cultural tip */}
              <div className="pt-3 border-t border-stone-100 flex items-start gap-1.5 text-xs text-stone-500">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-700">Mẹo thực tế: </strong>
                  {phrase.tips}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

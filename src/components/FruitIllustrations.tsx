import React from 'react';

interface FruitIllustrationProps {
  id: string;
  className?: string;
  size?: number | string;
}

const FRUIT_PHOTO_LABELS: Record<string, string> = {
  apple: 'Quả táo 苹果',
  banana: 'Quả chuối 香蕉',
  watermelon: 'Dưa hấu 西瓜',
  mango: 'Quả xoài 芒果',
  grape: 'Quả nho 葡萄',
  strawberry: 'Dâu tây 草莓',
  durian: 'Sầu riêng 榴莲',
  orange: 'Quả cam 橙子',
  dragonfruit: 'Thanh long 火龙果',
  mangosteen: 'Măng cụt 山竹',
  rambutan: 'Chôm chôm 红毛丹',
  avocado: 'Quả bơ 牛油果',
  pineapple: 'Quả dứa 菠萝',
  longan: 'Quả nhãn 龙眼',
  pomelo: 'Quả bưởi 柚子',
  papaya: 'Quả đu đủ 木瓜',
};

export const FruitIllustration: React.FC<FruitIllustrationProps> = ({ id, className = '', size = 120 }) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  if (FRUIT_PHOTO_LABELS[id]) {
    return (
      <img
        src={`./assets/fruits/${id}.png`}
        alt={FRUIT_PHOTO_LABELS[id]}
        draggable={false}
        style={{ width: dimension, height: dimension }}
        className={`object-contain select-none ${className}`}
      />
    );
  }

  if (id === 'lychee') {
    return (
      <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả vải 荔枝">
        <defs>
          <radialGradient id="lycheeShellGrad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="40%" stopColor="#e11d48" />
            <stop offset="75%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>
          <radialGradient id="lycheeArilGrad" cx="35%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#f8fafc" />
            <stop offset="85%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </radialGradient>
          <filter id="lycheeShadow" x="-15%" y="-15%" width="130%" height="135%">
            <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#881337" floodOpacity="0.25" />
          </filter>
        </defs>

        <ellipse cx="80" cy="146" rx="44" ry="8" fill="#1c1917" opacity="0.12" />

        <path d="M80 38 C82 22 80 14 86 10" stroke="#543310" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M84 26 C108 14 122 24 124 36 C108 42 94 36 84 26 Z" fill="#15803d" />
        <path d="M85 26 Q106 24 120 34" stroke="#86efac" strokeWidth="1" fill="none" opacity="0.7" />

        <g filter="url(#lycheeShadow)">
          <circle cx="80" cy="88" r="48" fill="url(#lycheeShellGrad)" />
          <g fill="#9f1239" opacity="0.5">
            {[
              [56, 62], [74, 56], [96, 60], [112, 70],
              [46, 82], [64, 78], [116, 84],
              [52, 102], [70, 114], [94, 116], [110, 104]
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3.5" />
            ))}
          </g>
        </g>

        <ellipse cx="88" cy="88" rx="24" ry="28" fill="url(#lycheeArilGrad)" stroke="#be123c" strokeWidth="1.5" />
        <ellipse cx="82" cy="80" rx="7" ry="12" transform="rotate(-15 82 80)" fill="#ffffff" opacity="0.7" />
        <circle cx="80" cy="74" r="3" fill="#ffffff" opacity="0.9" />
      </svg>
    );
  }

  return (
    <div style={{ width: dimension, height: dimension }} className={`flex items-center justify-center bg-amber-100 rounded-2xl text-4xl ${className}`}>
      🍎
    </div>
  );
};

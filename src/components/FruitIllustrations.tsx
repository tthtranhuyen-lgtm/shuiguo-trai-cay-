import React from 'react';

interface FruitIllustrationProps {
  id: string;
  className?: string;
  size?: number | string;
}

export const FruitIllustration: React.FC<FruitIllustrationProps> = ({ id, className = '', size = 120 }) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  switch (id) {
    case 'apple':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả táo 苹果">
          <defs>
            <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="60%" stopColor="#d91e18" />
              <stop offset="100%" stopColor="#960018" />
            </radialGradient>
            <linearGradient id="appleLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <filter id="shadowApple" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.18" />
            </filter>
          </defs>
          <ellipse cx="80" cy="142" rx="42" ry="10" fill="#000" opacity="0.08" />
          {/* Stem */}
          <path d="M80 50 Q83 24 94 18" stroke="#5c3818" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Leaf */}
          <path d="M84 40 Q110 26 118 42 Q105 52 84 40 Z" fill="url(#appleLeaf)" filter="url(#shadowApple)" />
          {/* Fruit Body */}
          <path
            d="M80 50 C55 42 32 58 32 88 C32 122 55 138 74 138 C80 138 80 134 86 138 C105 138 128 122 128 88 C128 58 105 42 80 50 Z"
            fill="url(#appleGrad)"
            filter="url(#shadowApple)"
          />
          {/* Gloss highlight */}
          <ellipse cx="58" cy="74" rx="14" ry="24" transform="rotate(-25 58 74)" fill="#ffffff" opacity="0.25" />
          <circle cx="50" cy="62" r="5" fill="#ffffff" opacity="0.4" />
        </svg>
      );

    case 'banana':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả chuối 香蕉">
          <defs>
            <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="bananaTip" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#4d7c0f" />
            </linearGradient>
          </defs>
          <ellipse cx="80" cy="140" rx="48" ry="8" fill="#000" opacity="0.08" />
          {/* Banana body */}
          <path
            d="M32 40 C65 55 125 78 128 122 C115 134 82 130 52 108 C32 94 22 72 32 40 Z"
            fill="url(#bananaGrad)"
            stroke="#ca8a04"
            strokeWidth="1.5"
          />
          {/* Ridge line */}
          <path d="M36 44 C66 65 116 88 124 120" stroke="#ca8a04" strokeWidth="2.5" fill="none" opacity="0.6" />
          {/* Stem top */}
          <path d="M28 35 L34 42 L26 46 Z" fill="url(#bananaTip)" />
          {/* Tip bottom */}
          <circle cx="127" cy="122" r="4" fill="#713f12" />
          {/* Soft shine */}
          <path d="M48 62 C70 78 100 95 112 114" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      );

    case 'watermelon':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Dưa hấu 西瓜">
          <defs>
            <radialGradient id="melonRind" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </radialGradient>
            <linearGradient id="melonFlesh" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="70%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>
          <ellipse cx="80" cy="142" rx="55" ry="9" fill="#000" opacity="0.08" />
          {/* Watermelon slice wedge */}
          <path d="M22 62 C50 145 110 145 138 62 Z" fill="#15803d" />
          <path d="M26 64 C52 140 108 140 134 64 Z" fill="#ecfdf5" />
          <path d="M30 66 C55 134 105 134 130 66 Z" fill="url(#melonFlesh)" />
          {/* Watermelon seeds */}
          {[[52, 85], [78, 92], [105, 86], [64, 108], [94, 110], [80, 75]].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="3" ry="5" fill="#1c1917" transform={`rotate(${i % 2 === 0 ? -15 : 15} ${cx} ${cy})`} />
          ))}
          {/* Rind stripes */}
          <path d="M42 120 Q50 135 60 140" stroke="#166534" strokeWidth="3" fill="none" />
          <path d="M118 120 Q110 135 100 140" stroke="#166534" strokeWidth="3" fill="none" />
        </svg>
      );

    case 'mango':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả xoài 芒果">
          <defs>
            <radialGradient id="mangoGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="140" rx="45" ry="9" fill="#000" opacity="0.08" />
          <path d="M78 30 Q80 20 86 16" stroke="#713f12" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M84 26 Q105 20 114 32 Q96 38 84 26 Z" fill="#22c55e" />
          <path
            d="M75 32 C45 32 32 60 35 90 C38 125 65 138 85 138 C115 138 132 110 128 75 C124 45 102 32 75 32 Z"
            fill="url(#mangoGrad)"
          />
          <ellipse cx="62" cy="65" rx="12" ry="20" transform="rotate(-30 62 65)" fill="#ffffff" opacity="0.3" />
        </svg>
      );

    case 'grape':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả nho 葡萄">
          <defs>
            <radialGradient id="grapeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="60%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#581c87" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="144" rx="36" ry="8" fill="#000" opacity="0.08" />
          {/* Stem & Vine */}
          <path d="M80 40 Q80 20 75 14" stroke="#713f12" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M78 28 Q60 16 54 26 Q66 35 78 28 Z" fill="#16a34a" />
          <path d="M82 28 Q100 16 106 26 Q94 35 82 28 Z" fill="#22c55e" />
          {/* Grape bunch circles */}
          {[
            [60, 52], [80, 48], [100, 52],
            [50, 68], [70, 66], [90, 66], [110, 68],
            [60, 84], [80, 82], [100, 84],
            [70, 100], [90, 100],
            [80, 116], [80, 130]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="13" fill="url(#grapeGrad)" stroke="#3b0764" strokeWidth="0.8" />
              <circle cx={cx - 4} cy={cy - 4} r="3.5" fill="#ffffff" opacity="0.35" />
            </g>
          ))}
        </svg>
      );

    case 'strawberry':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Dâu tây 草莓">
          <defs>
            <radialGradient id="berryGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="60%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="142" rx="38" ry="8" fill="#000" opacity="0.08" />
          {/* Fruit heart body */}
          <path
            d="M80 46 C50 44 34 65 36 94 C38 122 72 142 80 144 C88 142 122 122 124 94 C126 65 110 44 80 46 Z"
            fill="url(#berryGrad)"
          />
          {/* Seed specks */}
          {[
            [60, 68], [80, 65], [100, 68],
            [50, 86], [70, 86], [90, 86], [110, 86],
            [60, 105], [80, 106], [100, 105],
            [72, 124], [88, 124]
          ].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="1.8" ry="2.6" fill="#fef08a" transform={`rotate(${i % 2 === 0 ? -10 : 10} ${cx} ${cy})`} />
          ))}
          {/* Green Calyx Leaf Top */}
          <path d="M80 32 L80 48" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <path d="M80 46 Q60 36 48 46 Q64 54 80 48" fill="#22c55e" />
          <path d="M80 46 Q100 36 112 46 Q96 54 80 48" fill="#16a34a" />
          <path d="M80 46 Q70 28 80 26 Q90 28 80 48" fill="#4ade80" />
          <ellipse cx="58" cy="72" rx="10" ry="18" transform="rotate(-25 58 72)" fill="#ffffff" opacity="0.25" />
        </svg>
      );

    case 'durian':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Sầu riêng 榴莲">
          <defs>
            <radialGradient id="durianShell" cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="#84cc16" />
              <stop offset="90%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#4d7c0f" />
            </radialGradient>
            <radialGradient id="durianPod" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="144" rx="46" ry="9" fill="#000" opacity="0.08" />
          {/* Durian Spikes / Outline */}
          <path
            d="M80 26 L88 36 L98 28 L103 40 L115 36 L118 48 L129 48 L128 60 L138 64 L133 76 L141 82 L133 92 L140 100 L129 108 L133 118 L120 123 L121 133 L108 134 L103 143 L91 140 L80 146 L69 140 L57 143 L52 134 L39 133 L40 123 L27 118 L31 108 L20 100 L27 92 L19 82 L27 76 L22 64 L32 60 L31 48 L42 48 L45 36 L57 40 L62 28 L72 36 Z"
            fill="url(#durianShell)"
            stroke="#3f6212"
            strokeWidth="1.5"
          />
          {/* Stem */}
          <path d="M80 28 L80 14" stroke="#713f12" strokeWidth="6" strokeLinecap="round" />
          {/* Opened golden pod visible in middle */}
          <ellipse cx="68" cy="88" rx="20" ry="32" transform="rotate(-15 68 88)" fill="url(#durianPod)" stroke="#ca8a04" strokeWidth="1" />
          <ellipse cx="94" cy="88" rx="18" ry="30" transform="rotate(15 94 88)" fill="url(#durianPod)" stroke="#ca8a04" strokeWidth="1" />
          <ellipse cx="64" cy="80" rx="8" ry="16" transform="rotate(-15 64 80)" fill="#ffffff" opacity="0.3" />
        </svg>
      );

    case 'orange':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả cam 橙子">
          <defs>
            <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="142" rx="46" ry="9" fill="#000" opacity="0.08" />
          {/* Stem & Leaves */}
          <path d="M80 38 Q82 20 86 16" stroke="#713f12" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M82 32 Q105 18 116 28 Q100 38 82 32 Z" fill="#16a34a" />
          <path d="M78 34 Q58 22 50 32 Q66 40 78 34 Z" fill="#22c55e" />
          {/* Round fruit body */}
          <circle cx="80" cy="88" r="52" fill="url(#orangeGrad)" />
          {/* Texture dots */}
          <g fill="#ea580c" opacity="0.4">
            <circle cx="60" cy="65" r="1.5" /><circle cx="75" cy="58" r="1.5" /><circle cx="95" cy="62" r="1.5" />
            <circle cx="50" cy="85" r="1.5" /><circle cx="68" cy="82" r="1.5" /><circle cx="102" cy="88" r="1.5" />
            <circle cx="60" cy="108" r="1.5" /><circle cx="80" cy="115" r="1.5" /><circle cx="98" cy="110" r="1.5" />
          </g>
          {/* Gloss */}
          <ellipse cx="58" cy="68" rx="14" ry="24" transform="rotate(-30 58 68)" fill="#ffffff" opacity="0.28" />
        </svg>
      );

    case 'dragonfruit':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Thanh long 火龙果">
          <defs>
            <radialGradient id="dragonSkin" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="70%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </radialGradient>
            <linearGradient id="scaleGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <radialGradient id="pulpRed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="85%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="144" rx="46" ry="9" fill="#000" opacity="0.08" />
          {/* Main oval body */}
          <ellipse cx="80" cy="88" rx="46" ry="54" fill="url(#dragonSkin)" />
          {/* Wavy dragon scales */}
          {[
            'M40 60 Q20 48 35 32 Q48 50 40 60',
            'M120 60 Q140 48 125 32 Q112 50 120 60',
            'M34 90 Q12 85 24 68 Q40 80 34 90',
            'M126 90 Q148 85 136 68 Q120 80 126 90',
            'M42 120 Q24 122 34 105 Q48 112 42 120',
            'M118 120 Q136 122 126 105 Q112 112 118 120',
            'M70 34 Q80 12 90 34 Q80 26 70 34'
          ].map((d, i) => (
            <path key={i} d={d} fill="url(#scaleGreen)" stroke="#15803d" strokeWidth="1" />
          ))}
          {/* Sliced half showing vibrant red flesh & seeds */}
          <ellipse cx="80" cy="94" rx="28" ry="34" fill="url(#pulpRed)" stroke="#881337" strokeWidth="1.5" />
          {[[70, 78], [88, 76], [68, 92], [80, 94], [92, 92], [72, 108], [86, 110]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.4" fill="#09090b" />
          ))}
        </svg>
      );

    case 'mangosteen':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Măng cụt 山竹">
          <defs>
            <radialGradient id="mangosteenRind" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#701a75" />
              <stop offset="70%" stopColor="#4a044e" />
              <stop offset="100%" stopColor="#2e0233" />
            </radialGradient>
            <radialGradient id="segmentWhite" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="142" rx="44" ry="9" fill="#000" opacity="0.08" />
          {/* Stem & Calyx */}
          <path d="M80 40 L80 22" stroke="#4d7c0f" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="64" cy="42" rx="14" ry="9" fill="#65a30d" transform="rotate(-15 64 42)" />
          <ellipse cx="96" cy="42" rx="14" ry="9" fill="#4d7c0f" transform="rotate(15 96 42)" />
          {/* Purple round body */}
          <circle cx="80" cy="90" r="48" fill="url(#mangosteenRind)" />
          {/* Open window revealing pearly white segments */}
          <circle cx="80" cy="90" r="30" fill="#fdf4ff" opacity="0.1" />
          {/* 5 Snow white garlic-like segments */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 80 + Math.cos(rad) * 11;
            const cy = 90 + Math.sin(rad) * 11;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="8"
                ry="12"
                fill="url(#segmentWhite)"
                stroke="#e2e8f0"
                strokeWidth="0.8"
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
        </svg>
      );

    case 'rambutan':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Chôm chôm 红毛丹">
          <defs>
            <radialGradient id="rambutanBody" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="70%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="142" rx="42" ry="8" fill="#000" opacity="0.08" />
          {/* Soft Hair Spines (Hairy spines around) */}
          {[
            'M80 42 Q80 18 86 16', 'M95 46 Q112 24 118 26', 'M110 58 Q135 44 140 50',
            'M118 78 Q144 76 146 84', 'M115 98 Q142 108 138 116', 'M104 115 Q125 134 118 140',
            'M80 124 Q82 146 76 148', 'M56 115 Q35 134 42 140', 'M45 98 Q18 108 22 116',
            'M42 78 Q16 76 14 84', 'M50 58 Q25 44 20 50', 'M65 46 Q48 24 42 26'
          ].map((d, i) => (
            <path key={i} d={d} stroke="#84cc16" strokeWidth="3" strokeLinecap="round" fill="none" />
          ))}
          {/* Main red sphere */}
          <circle cx="80" cy="84" r="40" fill="url(#rambutanBody)" />
          {/* Surface hairs */}
          {[
            [70, 70], [90, 72], [65, 88], [85, 92], [76, 104]
          ].map(([cx, cy], i) => (
            <path key={i} d={`M${cx} ${cy} Q${cx + 8} ${cy - 12} ${cx + 14} ${cy - 10}`} stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          ))}
        </svg>
      );

    case 'avocado':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Bơ 牛油果">
          <defs>
            <radialGradient id="avocadoFlesh" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#65a30d" />
            </radialGradient>
            <radialGradient id="avocadoSeed" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#a16207" />
              <stop offset="70%" stopColor="#713f12" />
              <stop offset="100%" stopColor="#451a03" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="144" rx="42" ry="9" fill="#000" opacity="0.08" />
          {/* Pear-shaped outer skin */}
          <path
            d="M80 24 C64 24 52 42 50 64 C48 80 34 94 34 110 C34 130 54 144 80 144 C106 144 126 130 126 110 C126 94 112 80 110 64 C108 42 96 24 80 24 Z"
            fill="#1e3a1e"
          />
          {/* Inner creamy flesh */}
          <path
            d="M80 30 C66 30 56 46 54 66 C52 82 40 96 40 110 C40 127 58 138 80 138 C102 138 120 127 120 110 C120 96 108 82 106 66 C104 46 94 30 80 30 Z"
            fill="url(#avocadoFlesh)"
          />
          {/* Large brown seed */}
          <circle cx="80" cy="106" r="22" fill="url(#avocadoSeed)" />
          <circle cx="73" cy="99" r="5" fill="#ffffff" opacity="0.3" />
        </svg>
      );

    case 'pineapple':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả dứa 菠萝">
          <defs>
            <radialGradient id="pineappleBody" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="144" rx="40" ry="8" fill="#000" opacity="0.08" />
          {/* Pineapple body */}
          <rect x="44" y="52" width="72" height="84" rx="36" fill="url(#pineappleBody)" />
          {/* Cross hatch pattern */}
          <g stroke="#854d0e" strokeWidth="2" opacity="0.6">
            <line x1="48" y1="72" x2="108" y2="128" />
            <line x1="48" y1="94" x2="94" y2="136" />
            <line x1="60" y1="56" x2="114" y2="108" />
            <line x1="112" y1="72" x2="52" y2="128" />
            <line x1="112" y1="94" x2="66" y2="136" />
            <line x1="100" y1="56" x2="46" y2="108" />
          </g>
          {/* Crown leaves */}
          <path d="M80 54 L80 12 L72 32 Z" fill="#15803d" />
          <path d="M80 54 L60 20 L66 40 Z" fill="#22c55e" />
          <path d="M80 54 L100 20 L94 40 Z" fill="#16a34a" />
          <path d="M80 54 L44 32 L56 46 Z" fill="#4ade80" />
          <path d="M80 54 L116 32 L104 46 Z" fill="#15803d" />
        </svg>
      );

    case 'lychee':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả vải 荔枝">
          <defs>
            <radialGradient id="lycheeShell" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="70%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
            <radialGradient id="lycheePulp" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="142" rx="42" ry="8" fill="#000" opacity="0.08" />
          {/* Leaves and stem */}
          <path d="M80 40 Q84 20 80 14" stroke="#713f12" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M82 24 Q105 14 116 26 Q98 34 82 24 Z" fill="#16a34a" />
          {/* Bumpy shell round fruit */}
          <circle cx="80" cy="88" r="46" fill="url(#lycheeShell)" />
          {/* Textured pebble bumps */}
          <g fill="#991b1b" opacity="0.5">
            {[
              [60, 60], [78, 56], [98, 62],
              [48, 80], [66, 78], [88, 82], [108, 80],
              [56, 102], [76, 106], [98, 104]
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" />
            ))}
          </g>
          {/* Partially peeled window showing glistening white pulp */}
          <ellipse cx="86" cy="86" rx="20" ry="24" fill="url(#lycheePulp)" stroke="#991b1b" strokeWidth="1.5" />
          <circle cx="82" cy="80" r="4" fill="#ffffff" opacity="0.6" />
        </svg>
      );

    case 'longan':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả nhãn 龙眼">
          <defs>
            <radialGradient id="longanShell" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#d6d3d1" />
              <stop offset="40%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="142" rx="40" ry="8" fill="#000" opacity="0.08" />
          {/* Branch */}
          <path d="M80 34 L80 18" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          {/* Round tan sphere */}
          <circle cx="80" cy="84" r="44" fill="url(#longanShell)" stroke="#78350f" strokeWidth="1.2" />
          {/* Peeled window displaying dragon eye (translucent pulp & black seed) */}
          <circle cx="80" cy="84" r="25" fill="#f8fafc" stroke="#b45309" strokeWidth="1.5" />
          {/* Black dragon eye pupil */}
          <circle cx="80" cy="84" r="11" fill="#0f172a" />
          <circle cx="76" cy="80" r="3" fill="#ffffff" />
        </svg>
      );

    case 'pomelo':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả bưởi 柚子">
          <defs>
            <radialGradient id="pomeloGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#bef264" />
              <stop offset="100%" stopColor="#65a30d" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="144" rx="50" ry="10" fill="#000" opacity="0.08" />
          {/* Large drop / teardrop shape */}
          <path d="M80 24 Q80 14 84 12" stroke="#713f12" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M80 22 Q98 12 106 22 Q94 30 80 22 Z" fill="#16a34a" />
          <path
            d="M80 26 C62 26 52 46 44 70 C34 98 42 138 80 138 C118 138 126 98 116 70 C108 46 98 26 80 26 Z"
            fill="url(#pomeloGrad)"
          />
          {/* Soft shine */}
          <ellipse cx="65" cy="74" rx="14" ry="30" transform="rotate(-20 65 74)" fill="#ffffff" opacity="0.3" />
        </svg>
      );

    case 'papaya':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả đu đủ 木瓜">
          <defs>
            <radialGradient id="papayaSkin" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>
            <radialGradient id="papayaFlesh" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="80%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>
          </defs>
          <ellipse cx="80" cy="144" rx="44" ry="8" fill="#000" opacity="0.08" />
          {/* Elongated pear body */}
          <path
            d="M80 26 C64 26 54 44 50 68 C46 96 40 138 80 138 C120 138 114 96 110 68 C106 44 96 26 80 26 Z"
            fill="url(#papayaSkin)"
          />
          {/* Half sliced cavity */}
          <path
            d="M80 50 C68 50 60 70 60 92 C60 114 68 126 80 126 C92 126 100 114 100 92 C100 70 92 50 80 50 Z"
            fill="url(#papayaFlesh)"
            stroke="#9a3412"
            strokeWidth="1.2"
          />
          {/* Black glistening seeds inside cavity */}
          {[
            [76, 75], [84, 76], [74, 88], [82, 86], [88, 90],
            [75, 100], [83, 102], [78, 112], [84, 114]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.2" fill="#09090b" />
          ))}
        </svg>
      );

    default:
      return (
        <div style={{ width: dimension, height: dimension }} className={`flex items-center justify-center bg-amber-100 rounded-2xl text-4xl ${className}`}>
          🍉
        </div>
      );
  }
};

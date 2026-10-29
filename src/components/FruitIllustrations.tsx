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
            {/* Rich multi-stop radial gradient for realistic ripe apple blush */}
            <radialGradient id="appleBodyGrad" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="60%" stopColor="#dc2626" />
              <stop offset="85%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#580808" />
            </radialGradient>
            {/* Golden-yellow natural blush near stem cavity */}
            <radialGradient id="appleCavityGlow" cx="50%" cy="30%" r="40%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#facc15" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
            {/* Natural curved wooden stem gradient */}
            <linearGradient id="appleStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#854d0e" />
              <stop offset="50%" stopColor="#543310" />
              <stop offset="100%" stopColor="#2e1906" />
            </linearGradient>
            {/* Vivid leaf with natural vein lighting */}
            <linearGradient id="appleLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="35%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <filter id="appleSoftShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#7f1d1d" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Realistic ambient ground shadow */}
          <ellipse cx="80" cy="146" rx="46" ry="9" fill="#1c1917" opacity="0.12" />
          <ellipse cx="80" cy="145" rx="34" ry="6" fill="#1c1917" opacity="0.18" />

          {/* Wooden Stem rooted in top dip */}
          <path d="M80 44 C81 32 87 22 96 16 C98 15 101 16 99 18 C92 26 86 34 83 45 Z" fill="url(#appleStemGrad)" />

          {/* Dewy Green Leaf with vein */}
          <g filter="url(#appleSoftShadow)">
            <path
              d="M84 34 C100 18 126 22 130 38 C118 48 98 46 84 34 Z"
              fill="url(#appleLeafGrad)"
            />
            <path d="M85 35 C100 29 116 32 128 38" stroke="#bbf7d0" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
            <path d="M98 32 Q102 26 108 24" stroke="#bbf7d0" strokeWidth="0.8" fill="none" opacity="0.6" />
            <path d="M106 34 Q112 30 118 30" stroke="#bbf7d0" strokeWidth="0.8" fill="none" opacity="0.6" />
          </g>

          {/* Apple Main Body with natural clefts */}
          <path
            d="M80 44 C66 38 48 40 36 56 C22 74 24 104 38 126 C48 140 66 145 76 142 C79 141 81 141 84 142 C94 145 112 140 122 126 C136 104 138 74 124 56 C112 40 94 38 80 44 Z"
            fill="url(#appleBodyGrad)"
            filter="url(#appleSoftShadow)"
          />

          {/* Stem cavity depression & golden warm glow */}
          <ellipse cx="80" cy="46" rx="20" ry="8" fill="url(#appleCavityGlow)" />
          <path d="M72 44 Q80 49 88 44" stroke="#450a0a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Bottom blossom calyx indents */}
          <path d="M75 142 Q80 139 85 142" stroke="#2e0505" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />

          {/* Primary High-Gloss Specular Highlight */}
          <path
            d="M50 56 C42 66 40 82 44 98 C46 104 42 104 40 98 C36 82 38 64 48 54 C50 52 52 54 50 56 Z"
            fill="#ffffff"
            opacity="0.45"
          />
          {/* Soft secondary shine and light reflection */}
          <ellipse cx="58" cy="68" rx="8" ry="18" transform="rotate(-28 58 68)" fill="#ffffff" opacity="0.3" />
          <circle cx="52" cy="58" r="4.5" fill="#ffffff" opacity="0.5" />
          {/* Subtle rim light on the lower right curve */}
          <path d="M120 74 C128 88 128 108 118 124" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      );

    case 'banana':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả chuối 香蕉">
          <defs>
            {/* Ripe golden banana peel gradient */}
            <linearGradient id="bananaPeelGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            {/* Greenish stem crown */}
            <linearGradient id="bananaCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#65a30d" />
              <stop offset="70%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <filter id="bananaShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#854d0e" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="144" rx="52" ry="8" fill="#1c1917" opacity="0.1" />

          {/* Background second banana for realistic appetizing depth */}
          <g opacity="0.88">
            <path
              d="M38 48 C72 68 120 92 136 128 C124 136 94 130 68 110 C46 92 32 72 38 48 Z"
              fill="#eab308"
            />
            <path d="M40 50 C74 72 118 96 130 126" stroke="#ca8a04" strokeWidth="2" fill="none" opacity="0.5" />
          </g>

          {/* Main ripe banana with authentic curve and ridges */}
          <g filter="url(#bananaShadow)">
            <path
              d="M26 38 C56 54 116 80 134 124 C122 134 88 132 58 108 C34 88 20 62 26 38 Z"
              fill="url(#bananaPeelGrad)"
            />
            {/* Faceted longitudinal ridge lines with natural highlight and shadow */}
            <path
              d="M30 42 C60 64 112 88 128 122"
              stroke="#ca8a04"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M34 40 C62 58 106 78 124 112"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.45"
            />
            <path
              d="M48 68 C74 86 102 104 116 122"
              stroke="#a16207"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
          </g>

          {/* Stem crown at top */}
          <path d="M22 34 C24 28 29 25 34 32 L26 42 Z" fill="url(#bananaCrownGrad)" stroke="#4d7c0f" strokeWidth="1" />
          <path d="M22 34 L28 31" stroke="#365314" strokeWidth="2" strokeLinecap="round" />

          {/* Characteristic dark flower scar at tip */}
          <path d="M132 122 C135 124 136 127 133 129 C130 131 127 128 129 125 Z" fill="#451a03" />

          {/* Sweet ripe sugar freckles (tàn nhang chuối chín ngọt) */}
          <g fill="#713f12" opacity="0.55">
            <circle cx="58" cy="74" r="1.3" />
            <circle cx="64" cy="72" r="1.1" />
            <circle cx="82" cy="88" r="1.4" />
            <circle cx="92" cy="94" r="1.2" />
            <circle cx="104" cy="106" r="1.5" />
            <circle cx="76" cy="82" r="1.1" />
            <circle cx="112" cy="116" r="1.3" />
          </g>
        </svg>
      );

    case 'watermelon':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Dưa hấu 西瓜">
          <defs>
            {/* Outer dark jade rind with stripes */}
            <radialGradient id="melonOuterRind" cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="#15803d" />
              <stop offset="90%" stopColor="#166534" />
              <stop offset="100%" stopColor="#052e16" />
            </radialGradient>
            {/* Juicy mouthwatering red flesh */}
            <linearGradient id="melonPulpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="35%" stopColor="#f43f5e" />
              <stop offset="70%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </linearGradient>
            <filter id="melonShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#064e3b" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="80" cy="146" rx="55" ry="9" fill="#1c1917" opacity="0.12" />

          {/* Watermelon Slice Wedge */}
          <g filter="url(#melonShadow)">
            {/* Green outer rind */}
            <path d="M18 58 C46 148 114 148 142 58 Z" fill="url(#melonOuterRind)" />
            {/* Dark green rind jagged stripes */}
            <path d="M38 108 Q48 132 58 138" stroke="#052e16" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M72 136 Q80 144 88 136" stroke="#052e16" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M122 108 Q112 132 102 138" stroke="#052e16" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Crisp pale jade/white rind layer */}
            <path d="M22 60 C49 142 111 142 138 60 Z" fill="#ecfdf5" />
            <path d="M25 61 C51 138 109 138 135 61 Z" fill="#d1fae5" />

            {/* Vibrant crystalline crimson flesh */}
            <path d="M27 62 C53 134 107 134 133 62 Z" fill="url(#melonPulpGrad)" />

            {/* Translucent watery juice sheen */}
            <path d="M34 66 C56 116 104 116 126 66 Z" fill="#ffffff" opacity="0.12" />
          </g>

          {/* Shiny black seeds in natural teardrop recesses */}
          {[
            { cx: 52, cy: 84, rot: -20 },
            { cx: 78, cy: 92, rot: 5 },
            { cx: 106, cy: 85, rot: 22 },
            { cx: 64, cy: 110, rot: -10 },
            { cx: 94, cy: 112, rot: 15 },
            { cx: 80, cy: 74, rot: -5 },
            { cx: 44, cy: 72, rot: -35 },
            { cx: 116, cy: 73, rot: 35 }
          ].map((seed, i) => (
            <g key={i} transform={`rotate(${seed.rot} ${seed.cx} ${seed.cy})`}>
              {/* Seed pocket shadow */}
              <ellipse cx={seed.cx} cy={seed.cy + 1} rx="3.5" ry="5.5" fill="#4c0519" opacity="0.6" />
              {/* Shiny seed body */}
              <path
                d={`M${seed.cx} ${seed.cy - 5} C${seed.cx + 3} ${seed.cy - 2} ${seed.cx + 3} ${seed.cy + 4} ${seed.cx} ${seed.cy + 5} C${seed.cx - 3} ${seed.cy + 4} ${seed.cx - 3} ${seed.cy - 2} ${seed.cx} ${seed.cy - 5} Z`}
                fill="#18181b"
              />
              {/* Specular dot */}
              <circle cx={seed.cx - 1} cy={seed.cy - 1} r="0.9" fill="#ffffff" opacity="0.8" />
            </g>
          ))}

          {/* Glistening fresh juice drops on slice top */}
          <ellipse cx="65" cy="65" rx="3" ry="1.5" fill="#ffffff" opacity="0.6" />
          <ellipse cx="95" cy="66" rx="4" ry="1.8" fill="#ffffff" opacity="0.5" />
        </svg>
      );

    case 'mango':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả xoài 芒果">
          <defs>
            {/* Smooth sunset gradient: golden honey body with rosy coral blush at the shoulder */}
            <radialGradient id="mangoBodyGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#facc15" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="85%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </radialGradient>
            <radialGradient id="mangoBlush" cx="70%" cy="32%" r="45%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#ea580c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
            <filter id="mangoShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#78350f" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Shadow */}
          <ellipse cx="80" cy="145" rx="48" ry="9" fill="#1c1917" opacity="0.12" />

          {/* Little green twig & leaf at stem */}
          <path d="M78 28 C79 18 84 14 90 12" stroke="#543310" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M84 24 C104 14 120 22 122 34 C106 38 92 32 84 24 Z" fill="#15803d" />
          <path d="M85 24 Q104 22 118 32" stroke="#86efac" strokeWidth="1" fill="none" opacity="0.7" />

          {/* Mango Body with smooth sensuous S-curve */}
          <path
            d="M76 28 C50 28 32 54 34 86 C36 122 62 142 86 142 C116 142 134 116 132 80 C130 48 104 28 76 28 Z"
            fill="url(#mangoBodyGrad)"
            filter="url(#mangoShadow)"
          />
          {/* Sunset Rose Blush Overlay */}
          <path
            d="M76 28 C50 28 32 54 34 86 C36 122 62 142 86 142 C116 142 134 116 132 80 C130 48 104 28 76 28 Z"
            fill="url(#mangoBlush)"
          />

          {/* Stem cavity dent */}
          <ellipse cx="76" cy="30" rx="8" ry="4" fill="#713f12" opacity="0.6" />

          {/* Silky satin sheen */}
          <ellipse cx="58" cy="65" rx="14" ry="26" transform="rotate(-30 58 65)" fill="#ffffff" opacity="0.32" />
          <circle cx="50" cy="52" r="5" fill="#ffffff" opacity="0.45" />
          {/* Gentle edge reflection */}
          <path d="M122 70 C128 86 124 108 114 122" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      );

    case 'grape':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả nho 葡萄">
          <defs>
            {/* Translucent sapphire-purple grape sphere with waxy bloom */}
            <radialGradient id="grapeOrbGrad" cx="35%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="35%" stopColor="#9333ea" />
              <stop offset="70%" stopColor="#6b21a8" />
              <stop offset="95%" stopColor="#3b0764" />
              <stop offset="100%" stopColor="#1e053a" />
            </radialGradient>
            {/* Waxy powdery bloom (lớp phấn mờ phủ trên nho tươi) */}
            <radialGradient id="grapeBloom" cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="90%" stopColor="#e9d5ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.35" />
            </radialGradient>
            <filter id="grapeShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#3b0764" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="80" cy="146" rx="40" ry="8" fill="#1c1917" opacity="0.12" />

          {/* Gnarled wooden vine and green tendril */}
          <path d="M80 40 C80 24 74 16 68 12" stroke="#543310" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M80 34 C88 20 102 18 106 28 C94 36 84 38 80 34 Z" fill="#15803d" />
          <path d="M68 22 C60 20 54 26 56 34 C58 40 66 38 64 30" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Cascading 3D Grape Cluster */}
          <g filter="url(#grapeShadow)">
            {[
              // Background layer (darker shadows)
              { cx: 62, cy: 56, r: 14 },
              { cx: 98, cy: 56, r: 14 },
              { cx: 52, cy: 76, r: 14.5 },
              { cx: 108, cy: 76, r: 14.5 },
              { cx: 60, cy: 104, r: 13.5 },
              { cx: 100, cy: 104, r: 13.5 },
              // Mid-ground layer
              { cx: 80, cy: 52, r: 15 },
              { cx: 68, cy: 74, r: 15.5 },
              { cx: 92, cy: 74, r: 15.5 },
              { cx: 72, cy: 96, r: 15 },
              { cx: 88, cy: 96, r: 15 },
              { cx: 80, cy: 116, r: 14 },
              { cx: 80, cy: 132, r: 11.5 }
            ].map((grape, i) => (
              <g key={i}>
                <circle cx={grape.cx} cy={grape.cy} r={grape.r} fill="url(#grapeOrbGrad)" stroke="#2e0854" strokeWidth="0.6" />
                <circle cx={grape.cx} cy={grape.cy} r={grape.r} fill="url(#grapeBloom)" />
                {/* Specular pearl light reflection */}
                <ellipse
                  cx={grape.cx - grape.r * 0.32}
                  cy={grape.cy - grape.r * 0.32}
                  rx={grape.r * 0.28}
                  ry={grape.r * 0.2}
                  transform={`rotate(-35 ${grape.cx - grape.r * 0.32} ${grape.cy - grape.r * 0.32})`}
                  fill="#ffffff"
                  opacity="0.65"
                />
                <circle cx={grape.cx - grape.r * 0.35} cy={grape.cy - grape.r * 0.35} r={grape.r * 0.12} fill="#ffffff" opacity="0.9" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'strawberry':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Dâu tây 草莓">
          <defs>
            {/* Glowing crimson strawberry gradient */}
            <radialGradient id="berryBodyGrad" cx="40%" cy="32%" r="70%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="30%" stopColor="#ef4444" />
              <stop offset="65%" stopColor="#dc2626" />
              <stop offset="90%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#580808" />
            </radialGradient>
            <filter id="berryShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#991b1b" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="80" cy="146" rx="42" ry="8" fill="#1c1917" opacity="0.12" />

          {/* Strawberry Heart Body */}
          <g filter="url(#berryShadow)">
            <path
              d="M80 44 C50 42 32 64 34 94 C36 124 72 144 80 146 C88 144 124 124 126 94 C128 64 110 42 80 44 Z"
              fill="url(#berryBodyGrad)"
            />
          </g>

          {/* Hundreds of golden achenes (seeds) in realistic dimples with shadow */}
          {[
            [54, 62], [70, 58], [90, 58], [106, 62],
            [44, 78], [62, 74], [80, 74], [98, 74], [116, 78],
            [48, 96], [66, 94], [80, 94], [94, 94], [112, 96],
            [56, 114], [72, 114], [88, 114], [104, 114],
            [68, 130], [80, 132], [92, 130]
          ].map(([cx, cy], i) => (
            <g key={i}>
              {/* Dimple shadow depression */}
              <ellipse cx={cx} cy={cy + 1} rx="2.5" ry="3.5" fill="#450a0a" opacity="0.75" />
              {/* Golden-yellow seed */}
              <ellipse cx={cx} cy={cy} rx="1.6" ry="2.6" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
              {/* Specular dot on seed */}
              <circle cx={cx - 0.5} cy={cy - 0.8} r="0.6" fill="#ffffff" />
            </g>
          ))}

          {/* Wet glistening highlights */}
          <ellipse cx="52" cy="72" rx="10" ry="18" transform="rotate(-25 52 72)" fill="#ffffff" opacity="0.32" />
          <circle cx="46" cy="62" r="3.5" fill="#ffffff" opacity="0.55" />

          {/* Realistic star-shaped leafy green sepal crown (calyx) */}
          <g>
            <path d="M80 32 L80 46" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
            {/* Curved leaves draping over the berry */}
            <path d="M80 46 C62 34 44 42 36 54 C50 56 66 52 80 46 Z" fill="#16a34a" />
            <path d="M80 46 C98 34 116 42 124 54 C110 56 94 52 80 46 Z" fill="#15803d" />
            <path d="M80 46 C68 28 54 26 48 28 C56 38 68 44 80 46 Z" fill="#22c55e" />
            <path d="M80 46 C92 28 106 26 112 28 C104 38 92 44 80 46 Z" fill="#16a34a" />
            <path d="M80 46 C76 30 84 24 80 20 C76 26 74 34 80 46 Z" fill="#4ade80" />
          </g>
        </svg>
      );

    case 'durian':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Sầu riêng 榴莲">
          <defs>
            {/* Golden olive durian husk */}
            <radialGradient id="durianShellGrad" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="50%" stopColor="#65a30d" />
              <stop offset="85%" stopColor="#4d7c0f" />
              <stop offset="100%" stopColor="#283e06" />
            </radialGradient>
            {/* Rich creamy golden custard pulp pod */}
            <radialGradient id="durianCustardGrad" cx="35%" cy="30%" r="68%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="85%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </radialGradient>
            <filter id="durianShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#365314" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="52" ry="9" fill="#1c1917" opacity="0.14" />

          {/* Thick sturdy woody pedicel / stem */}
          <path d="M80 28 C79 18 83 12 86 8" stroke="#543310" strokeWidth="8" strokeLinecap="round" />
          <path d="M76 26 C82 28 88 28 92 26" stroke="#2e1906" strokeWidth="3" strokeLinecap="round" />

          {/* 3D Durian husk with faceted pyramidal spikes */}
          <g filter="url(#durianShadow)">
            <ellipse cx="80" cy="88" rx="52" ry="56" fill="url(#durianShellGrad)" />

            {/* Realistic sharp pyramidal 3D thorns around boundary */}
            {[
              'M80 26 L86 36 L74 36 Z', 'M96 30 L102 42 L90 40 Z', 'M112 40 L118 52 L106 50 Z',
              'M126 56 L134 68 L122 66 Z', 'M132 76 L142 86 L130 86 Z', 'M132 98 L140 108 L128 106 Z',
              'M122 118 L128 128 L116 124 Z', 'M104 134 L108 144 L96 138 Z', 'M80 144 L86 152 L74 152 Z',
              'M56 134 L52 144 L64 138 Z', 'M38 118 L32 128 L44 124 Z', 'M28 98 L20 108 L32 106 Z',
              'M28 76 L18 86 L30 86 Z', 'M34 56 L26 68 L38 66 Z', 'M48 40 L42 52 L54 50 Z', 'M64 30 L58 42 L70 40 Z'
            ].map((d, i) => (
              <path key={i} d={d} fill="#84cc16" stroke="#365314" strokeWidth="1" />
            ))}

            {/* Interior faceted spike texture */}
            <g fill="#4d7c0f" opacity="0.4">
              {[
                [50, 60], [70, 52], [90, 52], [110, 60],
                [42, 80], [118, 80], [44, 102], [116, 102],
                [56, 122], [76, 134], [96, 126]
              ].map(([cx, cy], i) => (
                <polygon key={i} points={`${cx},${cy - 5} ${cx + 4},${cy + 4} ${cx - 4},${cy + 4}`} />
              ))}
            </g>
          </g>

          {/* Ripe natural split revealing luscious golden custard pulp */}
          <path
            d="M60 52 C50 78 52 112 66 128 C74 122 78 110 74 88 C70 68 64 54 60 52 Z"
            fill="#2e1005"
            opacity="0.8"
          />
          {/* Plump, thick golden custard pod (múi sầu riêng vàng ươm thơm béo) */}
          <path
            d="M62 56 C54 74 54 104 68 124 C82 120 86 102 84 82 C82 66 74 56 62 56 Z"
            fill="url(#durianCustardGrad)"
            stroke="#a16207"
            strokeWidth="1.2"
          />
          {/* Creamy gloss highlight on custard pulp */}
          <ellipse cx="68" cy="78" rx="6" ry="18" transform="rotate(-15 68 78)" fill="#ffffff" opacity="0.45" />
          <circle cx="66" cy="68" r="3" fill="#ffffff" opacity="0.6" />
        </svg>
      );

    case 'orange':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả cam 橙子">
          <defs>
            {/* Saturated sphere gradient for citrus */}
            <radialGradient id="orangeBodyGrad" cx="35%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="30%" stopColor="#fb923c" />
              <stop offset="65%" stopColor="#f97316" />
              <stop offset="90%" stopColor="#c2410c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
            <filter id="orangeShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#7c2d12" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Shadow */}
          <ellipse cx="80" cy="146" rx="48" ry="9" fill="#1c1917" opacity="0.12" />

          {/* Woody stem & crisp green citrus leaves */}
          <path d="M80 34 C82 22 86 16 92 12" stroke="#543310" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Main leaf */}
          <path d="M84 28 C108 14 126 24 128 38 C110 46 94 40 84 28 Z" fill="#15803d" />
          <path d="M85 28 Q108 26 124 38" stroke="#86efac" strokeWidth="1.2" fill="none" opacity="0.7" />
          {/* Smaller secondary leaf */}
          <path d="M78 30 C60 18 46 26 44 38 C58 44 72 40 78 30 Z" fill="#16a34a" />

          {/* Round spherical orange body */}
          <circle cx="80" cy="90" r="52" fill="url(#orangeBodyGrad)" filter="url(#orangeShadow)" />

          {/* Calyx star button at stem base */}
          <polygon points="80,36 82,40 86,39 83,43 85,46 80,44 75,46 77,43 74,39 78,40" fill="#365314" />

          {/* Microscopic citrus peel pore texture (lỗ chân lông vỏ cam) */}
          <g fill="#9a3412" opacity="0.38">
            <circle cx="56" cy="68" r="1.2" /><circle cx="68" cy="60" r="1.3" /><circle cx="82" cy="58" r="1.2" /><circle cx="98" cy="64" r="1.3" />
            <circle cx="48" cy="84" r="1.3" /><circle cx="64" cy="80" r="1.4" /><circle cx="94" cy="82" r="1.3" /><circle cx="112" cy="86" r="1.4" />
            <circle cx="56" cy="106" r="1.4" /><circle cx="74" cy="102" r="1.3" /><circle cx="92" cy="106" r="1.4" /><circle cx="106" cy="104" r="1.3" />
            <circle cx="68" cy="122" r="1.2" /><circle cx="84" cy="126" r="1.3" /><circle cx="96" cy="120" r="1.2" />
          </g>

          {/* Glossy specular reflection */}
          <ellipse cx="58" cy="68" rx="14" ry="24" transform="rotate(-30 58 68)" fill="#ffffff" opacity="0.35" />
          <circle cx="50" cy="56" r="5" fill="#ffffff" opacity="0.5" />
        </svg>
      );

    case 'dragonfruit':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Thanh long 火龙果">
          <defs>
            {/* Dazzling magenta-pink dragon skin */}
            <radialGradient id="dragonSkinGrad" cx="40%" cy="35%" r="68%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="35%" stopColor="#f43f5e" />
              <stop offset="70%" stopColor="#e11d48" />
              <stop offset="90%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
            {/* Green scale leaf tips */}
            <linearGradient id="dragonBractGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="50%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            <filter id="dragonShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#881337" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="46" ry="9" fill="#1c1917" opacity="0.12" />

          {/* Dragonfruit body */}
          <g filter="url(#dragonShadow)">
            <ellipse cx="80" cy="90" rx="46" ry="54" fill="url(#dragonSkinGrad)" />

            {/* Layered curled succulent flame scales with lime green tips */}
            {[
              // Top crown bracts
              'M72 36 C70 14 80 10 84 12 C82 22 84 32 80 38 Z',
              'M64 42 C48 24 60 18 66 22 C68 30 72 38 72 44 Z',
              'M88 42 C104 24 92 18 86 22 C84 30 80 38 80 44 Z',
              // Upper flanks
              'M40 62 C18 46 24 34 36 38 C44 46 48 54 44 64 Z',
              'M120 62 C142 46 136 34 124 38 C116 46 112 54 116 64 Z',
              // Mid flanks
              'M34 88 C10 82 14 66 26 70 C36 78 40 84 38 90 Z',
              'M126 88 C150 82 146 66 134 70 C124 78 120 84 122 90 Z',
              // Lower flanks
              'M42 118 C20 120 22 104 34 106 C42 112 46 116 44 120 Z',
              'M118 118 C140 120 138 104 126 106 C118 112 114 116 116 120 Z'
            ].map((d, i) => (
              <path key={i} d={d} fill="url(#dragonBractGrad)" stroke="#15803d" strokeWidth="0.8" />
            ))}
          </g>

          {/* Center bract scales on body surface */}
          <path d="M68 76 C64 66 74 62 80 66 C78 72 74 76 68 76 Z" fill="url(#dragonBractGrad)" stroke="#15803d" strokeWidth="0.8" />
          <path d="M92 76 C96 66 86 62 80 66 C82 72 86 76 92 76 Z" fill="url(#dragonBractGrad)" stroke="#15803d" strokeWidth="0.8" />
          <path d="M72 102 C68 92 78 88 84 92 C82 98 78 102 72 102 Z" fill="url(#dragonBractGrad)" stroke="#15803d" strokeWidth="0.8" />

          {/* Glossy light reflection */}
          <ellipse cx="62" cy="74" rx="10" ry="22" transform="rotate(-25 62 74)" fill="#ffffff" opacity="0.3" />
        </svg>
      );

    case 'mangosteen':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Măng cụt 山竹">
          <defs>
            {/* Deep royal aubergine purple rind */}
            <radialGradient id="mangosteenRindGrad" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#86198f" />
              <stop offset="45%" stopColor="#581c87" />
              <stop offset="75%" stopColor="#3b0764" />
              <stop offset="100%" stopColor="#1e053a" />
            </radialGradient>
            {/* Pearly white garlic-like segment */}
            <radialGradient id="cloveWhiteGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
            <filter id="mangosteenShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#3b0764" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Shadow */}
          <ellipse cx="80" cy="146" rx="46" ry="9" fill="#1c1917" opacity="0.14" />

          {/* Sturdy green stem */}
          <path d="M80 34 L80 18" stroke="#3f6212" strokeWidth="7" strokeLinecap="round" />

          {/* Main royal purple sphere */}
          <g filter="url(#mangosteenShadow)">
            <circle cx="80" cy="90" r="50" fill="url(#mangosteenRindGrad)" />

            {/* Thick velvety 4-lobed green calyx sepals */}
            <ellipse cx="64" cy="42" rx="15" ry="10" fill="#65a30d" stroke="#365314" strokeWidth="1" transform="rotate(-20 64 42)" />
            <ellipse cx="96" cy="42" rx="15" ry="10" fill="#4d7c0f" stroke="#365314" strokeWidth="1" transform="rotate(20 96 42)" />
            <ellipse cx="78" cy="46" rx="14" ry="9" fill="#84cc16" stroke="#365314" strokeWidth="1" />
            <ellipse cx="82" cy="38" rx="12" ry="8" fill="#3f6212" />
          </g>

          {/* Cut window displaying snow-white sweet garlic-like segments */}
          <ellipse cx="80" cy="94" rx="28" ry="28" fill="#2e0538" stroke="#581c87" strokeWidth="1.5" />
          {/* 5 Snow-white segments */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 80 + Math.cos(rad) * 10;
            const cy = 94 + Math.sin(rad) * 10;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="7.5"
                ry="11.5"
                fill="url(#cloveWhiteGrad)"
                stroke="#e2e8f0"
                strokeWidth="0.6"
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
          <circle cx="80" cy="94" r="2.5" fill="#e2e8f0" />

          {/* Glossy specular highlight on purple rind */}
          <ellipse cx="56" cy="74" rx="12" ry="22" transform="rotate(-30 56 74)" fill="#ffffff" opacity="0.32" />
          <circle cx="48" cy="64" r="4" fill="#ffffff" opacity="0.5" />
        </svg>
      );

    case 'rambutan':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Chôm chôm 红毛丹">
          <defs>
            <radialGradient id="rambutanBodyGrad" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="40%" stopColor="#ef4444" />
              <stop offset="75%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
            <radialGradient id="rambutanPulp" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
            <filter id="rambutanShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#7f1d1d" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="44" ry="8" fill="#1c1917" opacity="0.12" />

          {/* Dense soft curved spines around the shell */}
          <g filter="url(#rambutanShadow)">
            {[
              'M80 44 Q76 16 88 12', 'M96 46 Q118 20 126 24', 'M112 56 Q142 38 146 46',
              'M122 76 Q152 72 154 82', 'M120 98 Q150 108 144 118', 'M108 116 Q130 140 122 146',
              'M80 126 Q84 152 74 154', 'M54 116 Q30 140 38 146', 'M42 98 Q12 108 18 118',
              'M38 76 Q8 72 10 82', 'M48 56 Q18 38 24 46', 'M64 46 Q42 20 48 24'
            ].map((d, i) => (
              <path key={i} d={d} stroke="#84cc16" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            ))}

            {/* Inner red sphere */}
            <circle cx="80" cy="86" r="42" fill="url(#rambutanBodyGrad)" />

            {/* Surface hairs */}
            {[
              [68, 66, 12, -14], [92, 68, 14, -10], [60, 88, 16, -8],
              [84, 94, 15, -12], [74, 110, 14, -6], [98, 104, 12, -10]
            ].map(([cx, cy, dx, dy], i) => (
              <path
                key={i}
                d={`M${cx} ${cy} Q${cx + dx} ${cy + dy} ${cx + dx * 1.5} ${cy + dy * 0.8}`}
                stroke="#facc15"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </g>

          {/* Peeled window displaying sweet glistening white jelly aril */}
          <ellipse cx="80" cy="86" rx="20" ry="24" fill="url(#rambutanPulp)" stroke="#991b1b" strokeWidth="1.2" />
          <ellipse cx="76" cy="80" rx="6" ry="10" transform="rotate(-15 76 80)" fill="#ffffff" opacity="0.65" />
        </svg>
      );

    case 'avocado':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Bơ 牛油果">
          <defs>
            {/* Buttery smooth avocado flesh gradient */}
            <radialGradient id="avocadoFleshGrad" cx="50%" cy="62%" r="52%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#d9f99d" />
              <stop offset="75%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#3f6212" />
            </radialGradient>
            {/* Glossy round wooden brown pit / seed */}
            <radialGradient id="avocadoPitGrad" cx="35%" cy="30%" r="68%">
              <stop offset="0%" stopColor="#a16207" />
              <stop offset="40%" stopColor="#713f12" />
              <stop offset="80%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c0a00" />
            </radialGradient>
            <filter id="avocadoShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#1e3a1e" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="44" ry="9" fill="#1c1917" opacity="0.14" />

          {/* Hass Avocado Pear-Shaped Body */}
          <g filter="url(#avocadoShadow)">
            {/* Dark pebbly alligator skin rim */}
            <path
              d="M80 22 C64 22 50 42 48 64 C46 80 32 96 32 114 C32 134 52 146 80 146 C108 146 128 134 128 114 C128 96 114 80 112 64 C110 42 96 22 80 22 Z"
              fill="#1e3a1e"
            />
            {/* Creamy rich edible flesh */}
            <path
              d="M80 28 C66 28 54 46 52 66 C50 82 38 98 38 114 C38 130 56 140 80 140 C104 140 122 130 122 114 C122 98 110 82 108 66 C106 46 94 28 80 28 Z"
              fill="url(#avocadoFleshGrad)"
            />

            {/* Smooth giant round brown seed */}
            <circle cx="80" cy="110" r="23" fill="url(#avocadoPitGrad)" />
            {/* Specular curved reflection on the pit */}
            <ellipse cx="73" cy="102" rx="7" ry="4" transform="rotate(-30 73 102)" fill="#ffffff" opacity="0.45" />
            <circle cx="71" cy="100" r="2.5" fill="#ffffff" opacity="0.8" />
          </g>
        </svg>
      );

    case 'pineapple':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả dứa 菠萝">
          <defs>
            {/* Golden pineapple body */}
            <radialGradient id="pineBodyGrad" cx="45%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#facc15" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="90%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </radialGradient>
            <filter id="pineShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#854d0e" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="42" ry="9" fill="#1c1917" opacity="0.14" />

          {/* Spiky crown of layered sword-shaped leaves at top */}
          <g>
            <path d="M80 54 L80 10 L70 32 Z" fill="#15803d" />
            <path d="M80 54 L54 18 L64 38 Z" fill="#22c55e" />
            <path d="M80 54 L106 18 L96 38 Z" fill="#16a34a" />
            <path d="M80 54 L38 30 L52 46 Z" fill="#4ade80" />
            <path d="M80 54 L122 30 L108 46 Z" fill="#15803d" />
            <path d="M80 54 L44 48 L58 56 Z" fill="#16a34a" />
            <path d="M80 54 L116 48 L102 56 Z" fill="#22c55e" />
          </g>

          {/* Barrel pineapple body with textured diamond eyes */}
          <g filter="url(#pineShadow)">
            <rect x="42" y="52" width="76" height="86" rx="38" fill="url(#pineBodyGrad)" />

            {/* Geometric diamond scale pattern (mắt dứa) */}
            <g stroke="#713f12" strokeWidth="1.8" opacity="0.65">
              <line x1="48" y1="72" x2="110" y2="128" />
              <line x1="48" y1="92" x2="98" y2="136" />
              <line x1="62" y1="56" x2="114" y2="108" />
              <line x1="112" y1="72" x2="50" y2="128" />
              <line x1="112" y1="92" x2="62" y2="136" />
              <line x1="98" y1="56" x2="46" y2="108" />
            </g>

            {/* Little brown bract eye center spikes in each diamond */}
            {[
              [80, 72], [65, 84], [95, 84], [80, 96],
              [65, 108], [95, 108], [80, 120]
            ].map(([cx, cy], i) => (
              <g key={i}>
                <polygon points={`${cx},${cy - 3} ${cx + 3},${cy + 2} ${cx - 3},${cy + 2}`} fill="#78350f" />
                <circle cx={cx} cy={cy} r="1" fill="#fef08a" />
              </g>
            ))}
          </g>

          {/* Glossy light reflection on left barrel side */}
          <path d="M52 68 C48 82 50 110 56 122" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      );

    case 'lychee':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả vải 荔枝">
          <defs>
            {/* Textured crimson-rose shell */}
            <radialGradient id="lycheeShellGrad" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="40%" stopColor="#e11d48" />
              <stop offset="75%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
            {/* Glistening pearly-white translucent aril pulp */}
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

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="44" ry="8" fill="#1c1917" opacity="0.12" />

          {/* Stem and rich green leaf */}
          <path d="M80 38 C82 22 80 14 86 10" stroke="#543310" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M84 26 C108 14 122 24 124 36 C108 42 94 36 84 26 Z" fill="#15803d" />
          <path d="M85 26 Q106 24 120 34" stroke="#86efac" strokeWidth="1" fill="none" opacity="0.7" />

          {/* Round bumpy textured shell */}
          <g filter="url(#lycheeShadow)">
            <circle cx="80" cy="88" r="48" fill="url(#lycheeShellGrad)" />

            {/* Authentic pebbled nodular surface bumps */}
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

          {/* Peeled section showing dew-covered pearly translucent pulp */}
          <ellipse cx="88" cy="88" rx="24" ry="28" fill="url(#lycheeArilGrad)" stroke="#be123c" strokeWidth="1.5" />
          {/* Glistening highlights on pearly aril */}
          <ellipse cx="82" cy="80" rx="7" ry="12" transform="rotate(-15 82 80)" fill="#ffffff" opacity="0.7" />
          <circle cx="80" cy="74" r="3" fill="#ffffff" opacity="0.9" />
        </svg>
      );

    case 'longan':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả nhãn 龙眼">
          <defs>
            {/* Tan ochre shell */}
            <radialGradient id="longanShellGrad" cx="35%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#e7e5e4" />
              <stop offset="35%" stopColor="#d6d3d1" />
              <stop offset="70%" stopColor="#a8a29e" />
              <stop offset="90%" stopColor="#78716c" />
              <stop offset="100%" stopColor="#57534e" />
            </radialGradient>
            {/* Glass-like translucent pulp */}
            <radialGradient id="longanPulpGrad" cx="35%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f8fafc" />
              <stop offset="90%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
            <filter id="longanShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#57534e" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="42" ry="8" fill="#1c1917" opacity="0.12" />

          {/* Branch & twig node */}
          <path d="M80 34 L80 14" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />

          {/* Main Longan fruit */}
          <g filter="url(#longanShadow)">
            <circle cx="80" cy="86" r="46" fill="url(#longanShellGrad)" stroke="#78716c" strokeWidth="0.8" />
          </g>

          {/* Peeled window displaying the famous "Dragon Eye" */}
          <circle cx="80" cy="86" r="28" fill="url(#longanPulpGrad)" stroke="#a8a29e" strokeWidth="1.2" />

          {/* Pitch-black seed pupil glowing from within */}
          <circle cx="80" cy="86" r="13" fill="#09090b" />
          {/* Specular eye white light pearl */}
          <circle cx="76" cy="82" r="4.5" fill="#ffffff" />
          <circle cx="82" cy="89" r="1.5" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case 'pomelo':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả bưởi 柚子">
          <defs>
            {/* Large pear-shaped celadon/golden pomelo skin */}
            <radialGradient id="pomeloSkinGrad" cx="38%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#d9f99d" />
              <stop offset="75%" stopColor="#a3e635" />
              <stop offset="92%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#3f6212" />
            </radialGradient>
            <filter id="pomeloShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#3f6212" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="52" ry="10" fill="#1c1917" opacity="0.12" />

          {/* Stem & leaf */}
          <path d="M80 24 C81 14 86 10 90 8" stroke="#543310" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M84 20 C106 10 120 20 122 30 C106 36 94 30 84 20 Z" fill="#15803d" />

          {/* Big pear-shaped body */}
          <path
            d="M80 24 C62 24 50 44 42 70 C32 98 40 142 80 142 C120 142 128 98 118 70 C110 44 98 24 80 24 Z"
            fill="url(#pomeloSkinGrad)"
            filter="url(#pomeloShadow)"
          />

          {/* Glossy sheen */}
          <ellipse cx="64" cy="74" rx="14" ry="32" transform="rotate(-20 64 74)" fill="#ffffff" opacity="0.32" />
          <circle cx="56" cy="62" r="5" fill="#ffffff" opacity="0.5" />
        </svg>
      );

    case 'papaya':
      return (
        <svg viewBox="0 0 160 160" style={{ width: dimension, height: dimension }} className={className} aria-label="Quả đu đủ 木瓜">
          <defs>
            {/* Elongated tropical papaya skin */}
            <radialGradient id="papayaSkinGrad" cx="38%" cy="35%" r="68%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="90%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </radialGradient>
            {/* Juicy salmon-orange flesh */}
            <radialGradient id="papayaFleshGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="60%" stopColor="#fb923c" />
              <stop offset="85%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>
            <filter id="papayaShadow" x="-15%" y="-15%" width="130%" height="135%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#7c2d12" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Cast shadow */}
          <ellipse cx="80" cy="146" rx="46" ry="9" fill="#1c1917" opacity="0.12" />

          {/* Body */}
          <g filter="url(#papayaShadow)">
            <path
              d="M80 24 C64 24 52 44 48 70 C44 100 40 142 80 142 C120 142 116 100 112 70 C108 44 96 24 80 24 Z"
              fill="url(#papayaSkinGrad)"
            />

            {/* Sliced center cavity revealing glistening black seeds */}
            <path
              d="M80 48 C68 48 58 70 58 94 C58 118 68 128 80 128 C92 128 102 118 102 94 C102 70 92 48 80 48 Z"
              fill="url(#papayaFleshGrad)"
              stroke="#9a3412"
              strokeWidth="1.2"
            />
          </g>

          {/* Caviar-like shiny black seeds in center pocket */}
          {[
            [74, 70], [86, 72], [72, 82], [80, 80], [88, 84],
            [74, 94], [82, 92], [88, 96], [76, 106], [84, 108], [80, 116]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="2.5" fill="#09090b" />
              <circle cx={cx - 0.7} cy={cy - 0.7} r="0.8" fill="#ffffff" />
            </g>
          ))}

          {/* Gloss */}
          <ellipse cx="58" cy="72" rx="8" ry="24" transform="rotate(-15 58 72)" fill="#ffffff" opacity="0.35" />
        </svg>
      );

    default:
      return (
        <div style={{ width: dimension, height: dimension }} className={`flex items-center justify-center bg-amber-100 rounded-2xl text-4xl ${className}`}>
          🍎
        </div>
      );
  }
};

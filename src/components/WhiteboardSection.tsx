import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FRUITS } from '../data/fruitData';
import { FruitIllustration } from './FruitIllustrations';
import { RotateCcw, Download, Eraser, PenTool, Check, Sparkles, Volume2, Eye, EyeOff, BookOpen, Layers } from 'lucide-react';
import { speechEngine } from '../utils/speech';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
  isEraser: boolean;
}

// Character metadata dictionary for rich calligraphy education
interface CharMeta {
  hanzi: string;
  pinyin: string;
  hanViet: string;
  radical: string;
  strokeCount: number;
  strokeOrder: string[];
  tips: string;
}

const CHAR_DATABASE: Record<string, CharMeta> = {
  '苹': {
    hanzi: '苹',
    pinyin: 'píng',
    hanViet: 'Bình',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 8,
    strokeOrder: ['1. 横 (ngang)', '2. 竖 (sổ trái)', '3. 竖 (sổ phải)', '4. 点 (chấm)', '5. 撇 (phẩy)', '6. 横 (ngang)', '7. 竖 (sổ đứng)', '8. 提 (hất)'],
    tips: 'Bộ Thảo ở trên viết trước: ngang dài rồi hai nét sổ ngắn đối xứng.'
  },
  '果': {
    hanzi: '果',
    pinyin: 'guǒ',
    hanViet: 'Quả',
    radical: '木 (Bộ Mộc)',
    strokeCount: 8,
    strokeOrder: ['1. 竖 (sổ)', '2. 横折 (ngang gập)', '3. 横 (ngang)', '4. 横 (ngang đóng)', '5. 横 (ngang dài)', '6. 竖 (sổ dài)', '7. 撇 (phẩy)', '8. 捺 (mác)'],
    tips: 'Phần chữ Điền (田) ở trên viết trước, sau đó là chữ Mộc (木) ở dưới với hai nét phẩy-mác mở rộng đều.'
  },
  '香': {
    hanzi: '香',
    pinyin: 'xiāng',
    hanViet: 'Hương',
    radical: '香 (Bộ Hương) / 禾',
    strokeCount: 9,
    strokeOrder: ['1. 撇 (phẩy)', '2. 横 (ngang)', '3. 竖 (sổ)', '4. 撇 (phẩy)', '5. 捺 (mác)', '6. 竖 (sổ)', '7. 横折 (ngang gập)', '8. 横 (ngang)', '9. 横 (ngang đóng)'],
    tips: 'Nửa trên là chữ Hòa (禾), nửa dưới là chữ Nhật (日).'
  },
  '蕉': {
    hanzi: '蕉',
    pinyin: 'jiāo',
    hanViet: 'Tiêu',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 15,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4. 撇', '5. 竖', '6. 撇', '7. 横', '8. 横', '9. 横', '10. 竖', '11. 横', '12-15. Bốn chấm Thủy 灬'],
    tips: 'Chữ nhiều nét: viết Bộ Thảo ở trên, giữa là chữ Tiêu (隹), dưới cùng là 4 chấm lửa/thủy 灬.'
  },
  '西': {
    hanzi: '西',
    pinyin: 'xī',
    hanViet: 'Tây',
    radical: '覀 (Bộ Tây)',
    strokeCount: 6,
    strokeOrder: ['1. 横 (ngang)', '2. 竖 (sổ)', '3. 横折 (ngang gập)', '4. 撇 (phẩy trong)', '5. 竖弯 (sổ cong)', '6. 横 (ngang đáy đóng)'],
    tips: 'Quy tắc ngoài trước trong sau, vào nhà trước đóng cửa sau.'
  },
  '瓜': {
    hanzi: '瓜',
    pinyin: 'guā',
    hanViet: 'Qua',
    radical: '瓜 (Bộ Qua)',
    strokeCount: 5,
    strokeOrder: ['1. 撇 (phẩy ngang)', '2. 竖提 (sổ hất)', '3. 竖 (sổ ngắn)', '4. 点 (chấm trong)', '5. 捺 (mác dài)'],
    tips: 'Nét phẩy đầu tiên nằm ngang, nét mác cuối cùng choãi dài thanh thoát đỡ cả chữ.'
  },
  '芒': {
    hanzi: '芒',
    pinyin: 'máng',
    hanViet: 'Mang',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 6,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4. 点 (chấm)', '5. 横 (ngang)', '6. 竖折/竖弯钩 (sổ cong móc)'],
    tips: 'Ở trên là bộ Thảo 艹, ở dưới là chữ Vong 亡.'
  },
  '葡': {
    hanzi: '葡',
    pinyin: 'pú',
    hanViet: 'Bồ',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 12,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4. 撇', '5. 横折钩', '6. 横', '7. 竖', '8. 横折', '9. 横', '10. 竖', '11. 横', '12. 点'],
    tips: 'Trên là bộ Thảo 艹, dưới là bộ Bao 勹 bọc lấy chữ Phủ 甫 bên trong.'
  },
  '萄': {
    hanzi: '萄',
    pinyin: 'táo',
    hanViet: 'Đào',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 11,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4. 撇', '5. 横折钩', '6. 撇', '7. 横', '8. 竖', '9. 横折', '10. 横', '11. 竖弯钩'],
    tips: 'Trên là bộ Thảo 艹, dưới là chữ Đào 匋 (gồm bộ Bao 勹 và chữ Đào 缶).'
  },
  '草': {
    hanzi: '草',
    pinyin: 'cǎo',
    hanViet: 'Thảo',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 9,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4-7. Chữ Nhật 日', '8. 横 (ngang dài)', '9. 竖 (sổ thẳng giữa)'],
    tips: 'Cấu tạo: Trên là Thảo 艹, giữa là Nhật 日, dưới là Thập 十.'
  },
  '莓': {
    hanzi: '莓',
    pinyin: 'méi',
    hanViet: 'Môi',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 11,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4. 撇', '5. 横', '6. 竖折', '7. 横折钩', '8. 点', '9. 横', '10. 点', '11. 横'],
    tips: 'Trên là Thảo 艹, dưới là chữ Mỗi 每 (người mẹ 母 mang theo cành lá).'
  },
  '榴': {
    hanzi: '榴',
    pinyin: 'liú',
    hanViet: 'Lựu',
    radical: '木 (Bộ Mộc)',
    strokeCount: 14,
    strokeOrder: ['1-4. Bộ Mộc 木', '5. 撇', '6. 竖', '7. 横折', '8. 横', '9. 竖', '10. 横', '11. 竖', '12. 横折', '13. 横', '14. 横'],
    tips: 'Trái là bộ Mộc 木, phải là chữ Lưu 留 (trên là Mão 卯, dưới là Điền 田).'
  },
  '莲': {
    hanzi: '莲',
    pinyin: 'lián',
    hanViet: 'Liên',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 10,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4-7. Chữ Xa 车', '8-10. Bộ Quai Xước 辶'],
    tips: 'Trên là Thảo 艹, trong là Xa 车, ngoài là bộ Quai xước 辶 viết sau cùng.'
  },
  '橙': {
    hanzi: '橙',
    pinyin: 'chéng',
    hanViet: 'Chanh',
    radical: '木 (Bộ Mộc)',
    strokeCount: 16,
    strokeOrder: ['1-4. Bộ Mộc 木', '5-9. Chữ Đăng 登 (trên là Bát 癶)', '10-16. Dưới là chữ Đậu 豆'],
    tips: 'Trái là Mộc 木 chỉ loài cây ăn quả, phải là chữ Đăng 登 chỉ âm thanh.'
  },
  '子': {
    hanzi: '子',
    pinyin: 'zǐ',
    hanViet: 'Tử',
    radical: '子 (Bộ Tử)',
    strokeCount: 3,
    strokeOrder: ['1. 横撇 (ngang phẩy)', '2. 竖钩 (sổ móc cong)', '3. 横 (ngang dài cắt ngang)'],
    tips: 'Chữ tượng hình đứa bé sơ sinh: nét ngang cuối cùng dang rộng.'
  },
  '火': {
    hanzi: '火',
    pinyin: 'huǒ',
    hanViet: 'Hỏa',
    radical: '火 (Bộ Hỏa)',
    strokeCount: 4,
    strokeOrder: ['1. 点 (chấm trái)', '2. 撇 (phẩy ngắn phải)', '3. 撇 (phẩy dài giữa)', '4. 捺 (mác vươn sang phải)'],
    tips: 'Viết hai đốm lửa hai bên trước (chấm trái, phẩy ngắn), rồi phẩy dài và mác sau.'
  },
  '龙': {
    hanzi: '龙',
    pinyin: 'lóng',
    hanViet: 'Long',
    radical: '龙 (Bộ Long)',
    strokeCount: 5,
    strokeOrder: ['1. 横 (ngang)', '2. 撇 (phẩy dài)', '3. 竖弯钩 (sổ cong móc)', '4. 撇 (phẩy nhỏ)', '5. 点 (chấm đuôi rồng)'],
    tips: 'Hình tượng con rồng uốn lượn: nét sổ cong móc là sống lưng, nét chấm là ngọc rồng.'
  },
  '山': {
    hanzi: '山',
    pinyin: 'shān',
    hanViet: 'Sơn',
    radical: '山 (Bộ Sơn)',
    strokeCount: 3,
    strokeOrder: ['1. 竖 (sổ giữa cao nhất)', '2. 竖折 (sổ gập ngang)', '3. 竖 (sổ ngắn phải)'],
    tips: 'Giữa trước hai bên sau: nét sổ giữa viết trước tiên, tạo thế đỉnh núi vững chãi.'
  },
  '竹': {
    hanzi: '竹',
    pinyin: 'zhú',
    hanViet: 'Trúc',
    radical: '竹 (Bộ Trúc)',
    strokeCount: 6,
    strokeOrder: ['1. 撇 (phẩy)', '2. 横 (ngang)', '3. 竖 (sổ đứng)', '4. 撇 (phẩy)', '5. 横 (ngang)', '6. 竖钩 (sổ móc)'],
    tips: 'Hai khóm trúc đối xứng: nửa trái kết thúc bằng nét sổ thẳng, nửa phải kết thúc bằng nét sổ móc.'
  },
  '红': {
    hanzi: '红',
    pinyin: 'hóng',
    hanViet: 'Hồng',
    radical: '纟 (Bộ Mịch)',
    strokeCount: 6,
    strokeOrder: ['1-3. Bộ Mịch 纟 (phẩy gập, phẩy gập, hất)', '4-6. Chữ Công 工 (ngang, sổ, ngang đáy)'],
    tips: 'Trái là sợi tơ đỏ 纟, phải là chữ Công 工 chỉ cách phát âm.'
  },
  '毛': {
    hanzi: '毛',
    pinyin: 'máo',
    hanViet: 'Mao',
    radical: '毛 (Bộ Mao)',
    strokeCount: 4,
    strokeOrder: ['1. 撇 (phẩy ngắn ngang)', '2. 横 (ngang)', '3. 横 (ngang dài)', '4. 竖弯钩 (sổ cong móc)'],
    tips: 'Nét sổ cong móc vươn rộng nâng đỡ ba nét ngang bên trên.'
  },
  '丹': {
    hanzi: '丹',
    pinyin: 'dān',
    hanViet: 'Đan',
    radical: '丶 (Bộ Chủ / Đan)',
    strokeCount: 4,
    strokeOrder: ['1. 撇 (phẩy)', '2. 横折钩 (ngang gập móc)', '3. 横 (ngang)', '4. 点 (chấm tâm đan)'],
    tips: 'Hình chiếc lò luyện đan, nét chấm ở giữa là viên linh đan đỏ thắm.'
  },
  '牛': {
    hanzi: '牛',
    pinyin: 'niú',
    hanViet: 'Ngưu',
    radical: '牛 (Bộ Ngưu)',
    strokeCount: 4,
    strokeOrder: ['1. 撇 (phẩy ngắn)', '2. 横 (ngang)', '3. 横 (ngang dài)', '4. 竖 (sổ dài xuyên qua tâm)'],
    tips: 'Nét sổ giữa thẳng tắp xuyên suốt ba nét ngang như chiếc sừng trâu.'
  },
  '油': {
    hanzi: '油',
    pinyin: 'yóu',
    hanViet: 'Dầu',
    radical: '氵 (Bộ Ba Chấm Thủy)',
    strokeCount: 8,
    strokeOrder: ['1-3. Bộ Thủy 氵', '4-8. Chữ Do 由 (sổ, ngang gập, ngang, ngang, sổ giữa)'],
    tips: 'Dầu là chất lỏng nên có ba chấm Thủy 氵 bên trái.'
  },
  '菠': {
    hanzi: '菠',
    pinyin: 'bō',
    hanViet: 'Ba',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 11,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4-6. Bộ Ba Chấm Thủy 氵', '7-11. Chữ Bì 皮 (ngang móc, phẩy, sổ, ngang gập, mác)'],
    tips: 'Trên là Thảo 艹, dưới trái là Thủy 氵, dưới phải là Bì 皮.'
  },
  '萝': {
    hanzi: '萝',
    pinyin: 'luó',
    hanViet: 'La',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 11,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4-8. Chữ Võng 罒 (ngang, sổ, ngang gập, sổ, sổ, ngang)', '9-11. Chữ Tịch 夕'],
    tips: 'Trên là bộ Thảo 艹, dưới là chữ La 罗 giản thể.'
  },
  '荔': {
    hanzi: '荔',
    pinyin: 'lì',
    hanViet: 'Lệ',
    radical: '艹 (Bộ Thảo)',
    strokeCount: 9,
    strokeOrder: ['1-3. Bộ Thảo 艹', '4-9. Ba chữ Lực 力 xếp tầng hình tam giác (1 lực trên, 2 lực dưới)'],
    tips: 'Dưới bộ Thảo là 3 chữ Lực 力 kết hợp lại tượng trưng cho sức sống mãnh liệt.'
  },
  '枝': {
    hanzi: '枝',
    pinyin: 'zhī',
    hanViet: 'Chi',
    radical: '木 (Bộ Mộc)',
    strokeCount: 8,
    strokeOrder: ['1-4. Bộ Mộc 木', '5. 横 (ngang)', '6. 撇 (phẩy)', '7. 竖 (sổ)', '8. 捺 (mác)'],
    tips: 'Trái là cành cây Mộc 木, phải là chữ Chi 支 (tay cầm cành tre).'
  },
  '眼': {
    hanzi: '眼',
    pinyin: 'yǎn',
    hanViet: 'Nhãn',
    radical: '目 (Bộ Mục)',
    strokeCount: 11,
    strokeOrder: ['1-5. Bộ Mục 目 (mắt)', '6-11. Chữ Cấn 艮 (ngang gập, ngang, ngang, sổ hất, phẩy, mác)'],
    tips: 'Trái là con mắt 目, phải là chữ Cấn 艮 chỉ hướng nhìn.'
  },
  '柚': {
    hanzi: '柚',
    pinyin: 'yòu',
    hanViet: 'Dữu',
    radical: '木 (Bộ Mộc)',
    strokeCount: 9,
    strokeOrder: ['1-4. Bộ Mộc 木', '5-9. Chữ Do 由 (sổ, ngang gập, ngang, ngang, sổ giữa)'],
    tips: 'Trái là cây thân gỗ Mộc 木, phải là chữ Do 由.'
  },
  '木': {
    hanzi: '木',
    pinyin: 'mù',
    hanViet: 'Mộc',
    radical: '木 (Bộ Mộc)',
    strokeCount: 4,
    strokeOrder: ['1. 横 (ngang)', '2. 竖 (sổ dài)', '3. 撇 (phẩy trái)', '4. 捺 (mác phải)'],
    tips: 'Tượng hình thân cây và rễ: ngang là cành, sổ là thân, phẩy và mác là rễ cây lan tỏa.'
  }
};

export const WhiteboardSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedFruitIndex, setSelectedFruitIndex] = useState(0);
  const [guideCharIndex, setGuideCharIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [gridType, setGridType] = useState<'mizige' | 'tianzige'>('mizige');
  const [brushColor, setBrushColor] = useState('#b91c1c'); // Traditional vermilion cinnabar red
  const [brushSize, setBrushSize] = useState(7);
  const [isEraser, setIsEraser] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStroke = useRef<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const fruit = FRUITS[selectedFruitIndex] || FRUITS[0];
  const characters = Array.from(fruit.hanzi);
  const currentChar = characters[guideCharIndex] || characters[0];
  const charMeta = CHAR_DATABASE[currentChar];

  // Robust, High-DPI Canvas Rendering
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Always reset transform to clean DPR scaling: all coordinates map 1:1 with CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const width = rect.width;
    const height = rect.height;

    // Clear whole area
    ctx.clearRect(0, 0, width, height);

    // Warm traditional paper background tone
    ctx.fillStyle = '#fffdfa';
    ctx.fillRect(0, 0, width, height);

    // Draw Classical Tianzige / Mizige Grid
    ctx.save();
    const margin = 16;
    const boxW = width - margin * 2;
    const boxH = height - margin * 2;
    const midX = width / 2;
    const midY = height / 2;

    // Outer grid border (warm vermilion red)
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.45)';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(margin, margin, boxW, boxH);

    // Dashed cross axis (vertical & horizontal)
    ctx.setLineDash([6, 5]);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.32)';
    ctx.beginPath();
    ctx.moveTo(midX, margin);
    ctx.lineTo(midX, height - margin);
    ctx.moveTo(margin, midY);
    ctx.lineTo(width - margin, midY);
    ctx.stroke();

    // Diagonals for Mizige (米字格)
    if (gridType === 'mizige') {
      ctx.beginPath();
      ctx.moveTo(margin, margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.moveTo(width - margin, margin);
      ctx.lineTo(margin, height - margin);
      ctx.stroke();
    }
    ctx.restore();

    // Draw Guide Template Character (Mẫu Nét Mờ 描红)
    if (showGuide && currentChar) {
      ctx.save();
      // Soft trace vermilion color
      ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
      // Font size carefully proportioned to 60% of box height: never clips or cuts off!
      const fontSize = Math.floor(Math.min(width, height) * 0.60);
      ctx.font = `bold ${fontSize}px "Noto Sans SC", "KaiTi", "STKaiti", "SimSun", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Optical vertical centering (+2px)
      ctx.fillText(currentChar, midX, midY + 2);
      ctx.restore();
    }

    // Draw Saved Inked Strokes
    strokes.forEach(stroke => {
      if (stroke.points.length === 0) return;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.width * 2.8;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
      }

      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        const p1 = stroke.points[i - 1];
        const p2 = stroke.points[i];
        const midPointX = (p1.x + p2.x) / 2;
        const midPointY = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, midPointX, midPointY);
      }
      ctx.stroke();
      ctx.restore();
    });
  }, [gridType, showGuide, currentChar, strokes]);

  // Window resize & font ready listener
  useEffect(() => {
    redrawCanvas();
    const handleResize = () => redrawCanvas();
    window.addEventListener('resize', handleResize);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => redrawCanvas());
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = getCanvasCoords(e);
    setIsDrawing(true);
    currentStroke.current = {
      points: [pt],
      color: brushColor,
      width: brushSize,
      isEraser,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke.current || !canvasRef.current) return;
    const pt = getCanvasCoords(e);
    currentStroke.current.points.push(pt);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2.8;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }

    const pts = currentStroke.current.points;
    if (pts.length > 2) {
      const p1 = pts[pts.length - 2];
      const p2 = pts[pts.length - 1];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    ctx.restore();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke.current) return;
    setIsDrawing(false);
    if (currentStroke.current.points.length > 1) {
      setStrokes(prev => [...prev, currentStroke.current!]);
    }
    currentStroke.current = null;
  };

  const handleUndo = () => {
    setStrokes(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `tap-viet-chu-${currentChar}-${fruit.pinyin}.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Info with Realistic Fruit Visual & Selector */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50/80 border border-amber-200/80 p-2 flex items-center justify-center shrink-0 shadow-xs">
              <FruitIllustration id={fruit.id} size={56} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Bảng Tập Viết Chữ Hán · 米字格描红</span>
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mt-1">Luyện Viết Chữ Hán Chuẩn Từng Nét</h2>
              <p className="text-xs md:text-sm text-stone-600 mt-0.5">
                Ô kẻ chuẩn quy tắc bút thuận, căn giữa cân đối 100% không lo bị lệch hay khuất nét.
              </p>
            </div>
          </div>

          {/* Quick Audio Pronunciation */}
          <button
            onClick={() => speechEngine.speak(fruit.hanzi)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs md:text-sm font-semibold rounded-xl border border-emerald-200 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe phát âm: {fruit.hanzi} ({fruit.pinyin})</span>
          </button>
        </div>

        {/* Character selector strip */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-500 mr-1">Chọn loại quả:</span>
          {FRUITS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedFruitIndex(idx);
                setGuideCharIndex(0);
                setStrokes([]);
                speechEngine.speak(item.hanzi);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedFruitIndex === idx
                  ? 'bg-emerald-600 text-white shadow-xs font-bold scale-105'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <span>{item.hanzi}</span>
              <span className="opacity-80 text-[11px]">({item.meaning.replace('Quả ', '')})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Toolbar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200 p-6 space-y-5 shadow-sm">
          {/* Character switcher within the selected word */}
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Chọn chữ Hán để luyện ({fruit.hanzi})
            </label>
            <div className="flex items-center gap-2.5">
              {characters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setGuideCharIndex(idx);
                    setStrokes([]);
                    speechEngine.speak(ch);
                  }}
                  className={`flex-1 py-3 text-3xl font-bold rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    guideCharIndex === idx
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm ring-2 ring-amber-400/30'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{ch}</span>
                  <span className="text-[11px] font-semibold text-stone-500">
                    {CHAR_DATABASE[ch]?.pinyin || ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Character Knowledge Breakdown Card */}
          {charMeta && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 text-sm">Chữ: {charMeta.hanzi}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900 font-semibold text-[11px]">
                  {charMeta.strokeCount} nét
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-stone-700">
                <div><span className="text-stone-500">Phiên âm:</span> <strong className="text-emerald-700">{charMeta.pinyin}</strong></div>
                <div><span className="text-stone-500">Hán Việt:</span> <strong>{charMeta.hanViet}</strong></div>
                <div className="col-span-2"><span className="text-stone-500">Bộ thủ:</span> <strong className="text-amber-800">{charMeta.radical}</strong></div>
              </div>
              <div className="pt-2 border-t border-amber-200/60 text-stone-600">
                <div className="font-semibold text-stone-800 mb-1">Mẹo viết đẹp:</div>
                <p className="text-[11px] leading-relaxed">{charMeta.tips}</p>
              </div>
            </div>
          )}

          {/* Tool toggle (Brush vs Eraser) */}
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Công cụ viết
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsEraser(false)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  !isEraser
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Bút lông (毛笔)</span>
              </button>
              <button
                onClick={() => setIsEraser(true)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isEraser
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Tẩy xóa</span>
              </button>
            </div>
          </div>

          {/* Color palette */}
          {!isEraser && (
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Màu mực thư pháp
              </label>
              <div className="flex items-center gap-2.5">
                {[
                  { color: '#b91c1c', name: 'Mực chu sa (Đỏ truyền thống)' },
                  { color: '#1c1917', name: 'Mực đen tàu (Mặc thảo)' },
                  { color: '#15803d', name: 'Mực ngọc bích' },
                  { color: '#1d4ed8', name: 'Mực thanh lam' },
                  { color: '#ca8a04', name: 'Mực hoàng kim' }
                ].map(c => (
                  <button
                    key={c.color}
                    onClick={() => setBrushColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                    className={`w-7 h-7 rounded-full transition-all cursor-pointer relative ${
                      brushColor === c.color ? 'scale-120 ring-2 ring-stone-900 ring-offset-2 shadow-xs' : 'hover:scale-110'
                    }`}
                  >
                    {brushColor === c.color && (
                      <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brush thickness */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              <span>Độ đậm nét bút</span>
              <span className="font-mono text-stone-900 font-bold">{brushSize}px</span>
            </div>
            <input
              type="range"
              min="3"
              max="18"
              value={brushSize}
              onChange={e => setBrushSize(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500 mt-1">
              <span>Nét mảnh</span>
              <span>Nét đậm</span>
            </div>
          </div>

          {/* Grid & Guide toggles */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {showGuide ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-stone-400" />}
                <span>Nét chữ mẫu mờ (描红)</span>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${showGuide ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
                {showGuide ? 'ĐANG BẬT' : 'ĐÃ TẮT'}
              </span>
            </button>
            <button
              onClick={() => setGridType(gridType === 'mizige' ? 'tianzige' : 'mizige')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Kiểu ô kẻ</span>
              </div>
              <span className="text-stone-900 font-bold">
                {gridType === 'mizige' ? 'Mễ Tự Cách (米)' : 'Điền Tự Cách (田)'}
              </span>
            </button>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleUndo}
              disabled={strokes.length === 0}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Lùi 1 nét</span>
            </button>
            <button
              onClick={handleClear}
              disabled={strokes.length === 0}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xl border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Xóa hết</span>
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Tải về ảnh bài viết ({currentChar})</span>
          </button>
        </div>

        {/* Right Canvas Area: Perfectly Centered Tianzige Square */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm flex flex-col items-center">
          <div
            ref={containerRef}
            className="w-full max-w-[480px] aspect-square relative rounded-3xl overflow-hidden border-4 border-amber-900/20 shadow-md bg-[#fffdfa]"
          >
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full h-full block cursor-crosshair touch-none select-none"
            />
          </div>

          {/* Quick Pronunciation & Character Focus below canvas */}
          <div className="w-full max-w-[480px] mt-4 flex items-center justify-between px-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-500">Chữ đang viết:</span>
              <span className="text-xl font-bold text-stone-900">{currentChar}</span>
              <span className="text-sm font-semibold text-emerald-700">({charMeta?.pinyin})</span>
            </div>
            <button
              onClick={() => speechEngine.speak(currentChar)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Nghe chữ này</span>
            </button>
          </div>

          {/* Stroke Rules & Step Guide */}
          <div className="w-full max-w-[480px] mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2.5">
            <div className="font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Thứ tự các nét cơ bản của chữ "{currentChar}":</span>
            </div>
            {charMeta?.strokeOrder ? (
              <div className="grid grid-cols-2 gap-1.5 font-medium text-[11px] text-stone-600 bg-white p-3 rounded-xl border border-stone-100">
                {charMeta.strokeOrder.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-stone-500 italic">
                1. Ngang trước sổ sau · 2. Phẩy trước mác sau · 3. Trên trước dưới sau · 4. Trái trước phải sau
              </p>
            )}
            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
              <span>💡 Mẹo: Dùng ngón tay hoặc bút cảm ứng trên màn hình để luyện nét như viết mực tàu thật.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

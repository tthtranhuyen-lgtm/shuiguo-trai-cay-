import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FRUITS } from '../data/fruitData';
import { RotateCcw, Download, Eraser, PenTool, Check, Sparkles, Volume2 } from 'lucide-react';
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

export const WhiteboardSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedFruitIndex, setSelectedFruitIndex] = useState(0);
  const [guideCharIndex, setGuideCharIndex] = useState(0); // For multi-character words like 苹 vs 果
  const [showGuide, setShowGuide] = useState(true);
  const [gridType, setGridType] = useState<'mizige' | 'tianzige'>('mizige');
  const [brushColor, setBrushColor] = useState('#b91c1c'); // Traditional cinnabar red / ink
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStroke = useRef<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const fruit = FRUITS[selectedFruitIndex];
  const characters = Array.from(fruit.hanzi);
  const currentChar = characters[guideCharIndex] || characters[0];

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw Background Grid (Tianzige or Mizige)
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.28)';
    ctx.lineWidth = 1.5;

    // Outer border
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Center cross lines (dashed)
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 10);
    ctx.lineTo(width / 2, height - 10);
    ctx.moveTo(10, height / 2);
    ctx.lineTo(width - 10, height / 2);
    ctx.stroke();

    // Diagonals for Mizige
    if (gridType === 'mizige') {
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(width - 10, height - 10);
      ctx.moveTo(width - 10, 10);
      ctx.lineTo(10, height - 10);
      ctx.stroke();
    }
    ctx.restore();

    // Draw Guide Character template if enabled
    if (showGuide && currentChar) {
      ctx.save();
      ctx.fillStyle = 'rgba(239, 68, 68, 0.16)';
      ctx.font = `600 ${Math.min(width, height) * 0.72}px "Noto Sans SC", "KaiTi", "STKaiti", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentChar, width / 2, height / 2 + 8);
      ctx.restore();
    }

    // Draw saved strokes
    strokes.forEach(stroke => {
      if (stroke.points.length === 0) return;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.width * 2.5;
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
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      }
      ctx.stroke();
      ctx.restore();
    });
  }, [gridType, showGuide, currentChar, strokes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      redrawCanvas();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [redrawCanvas]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
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

    // Incremental draw for instant fluid reaction
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2.5;
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
    a.download = `chu-han-${currentChar}.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Bảng Tập Viết Chữ Hán · 米字格描红</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">Luyện Viết Chữ Hán Chuẩn Từng Nét</h2>
            <p className="text-sm text-stone-600 mt-0.5">
              Chọn từ vựng trái cây để xem nét mẫu và luyện viết trên ô kẻ chuẩn quy tắc bút thuận.
            </p>
          </div>

          {/* Quick Audio */}
          <button
            onClick={() => speechEngine.speak(fruit.hanzi)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-medium rounded-xl border border-emerald-200 transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Phát âm: {fruit.hanzi} ({fruit.pinyin})</span>
          </button>
        </div>

        {/* Character selector strip */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-stone-500 mr-2">Chọn từ:</span>
          {FRUITS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedFruitIndex(idx);
                setGuideCharIndex(0);
                speechEngine.speak(item.hanzi);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                selectedFruitIndex === idx
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {item.hanzi} ({item.meaning.replace('Quả ', '')})
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Toolbar */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-stone-200 p-5 space-y-5 shadow-xs">
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Chữ đang luyện
            </label>
            <div className="flex items-center gap-2">
              {characters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setGuideCharIndex(idx);
                    speechEngine.speak(ch);
                  }}
                  className={`flex-1 py-3 text-2xl font-bold rounded-xl border transition-all cursor-pointer ${
                    guideCharIndex === idx
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs ring-2 ring-amber-400/20'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-2 text-center">
              Từ: <span className="font-semibold text-stone-800">{fruit.hanzi}</span> ({fruit.pinyin}) · {fruit.meaning}
            </p>
          </div>

          {/* Tool toggle */}
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Công cụ vẽ
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsEraser(false)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  !isEraser
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Bút lông</span>
              </button>
              <button
                onClick={() => setIsEraser(true)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  isEraser
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Tẩy</span>
              </button>
            </div>
          </div>

          {/* Color palette */}
          {!isEraser && (
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                Màu mực
              </label>
              <div className="flex items-center gap-2.5">
                {[
                  { color: '#b91c1c', name: 'Chu sa' },
                  { color: '#1c1917', name: 'Mực đen' },
                  { color: '#15803d', name: 'Ngọc bích' },
                  { color: '#1d4ed8', name: 'Thanh lam' },
                  { color: '#ca8a04', name: 'Mực vàng' }
                ].map(c => (
                  <button
                    key={c.color}
                    onClick={() => setBrushColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                    className={`w-7 h-7 rounded-full transition-transform cursor-pointer relative ${
                      brushColor === c.color ? 'scale-120 ring-2 ring-stone-900 ring-offset-2' : 'hover:scale-110'
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
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              <span>Nét bút</span>
              <span className="font-mono text-stone-800 lowercase">{brushSize}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="18"
              value={brushSize}
              onChange={e => setBrushSize(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500 mt-1">
              <span>Thanh mảnh</span>
              <span>Đậm đà</span>
            </div>
          </div>

          {/* Grid & Guide toggles */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              <span>Mẫu nét mờ (描红)</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${showGuide ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
                {showGuide ? 'BẬT' : 'TẮT'}
              </span>
            </button>
            <button
              onClick={() => setGridType(gridType === 'mizige' ? 'tianzige' : 'mizige')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              <span>Kiểu ô lưới</span>
              <span className="text-stone-800 font-semibold">
                {gridType === 'mizige' ? 'Mễ Tự Cách (米)' : 'Điền Tự Cách (田)'}
              </span>
            </button>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={handleUndo}
              disabled={strokes.length === 0}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hoàn tác</span>
            </button>
            <button
              onClick={handleClear}
              disabled={strokes.length === 0}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-xl border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Xóa sạch</span>
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Lưu ảnh chữ viết</span>
          </button>
        </div>

        {/* Right Canvas Area */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col items-center">
          <div className="w-full max-w-[520px] aspect-square relative rounded-2xl overflow-hidden bg-amber-50/20 border-2 border-stone-200 shadow-inner">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full h-full block cursor-crosshair touch-none select-none"
            />
          </div>

          {/* Stroke Rules Tip */}
          <div className="w-full max-w-[520px] mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
            <div className="font-semibold text-stone-800 flex items-center gap-1.5">
              <span>✍️ Quy tắc bút thuận cơ bản:</span>
            </div>
            <p>1. Ngang trước sổ sau · 2. Phẩy trước mác sau · 3. Trên trước dưới sau</p>
            <p>4. Trái trước phải sau · 5. Ngoài trước trong sau · 6. Vào trước đóng sau</p>
          </div>
        </div>
      </div>
    </div>
  );
};

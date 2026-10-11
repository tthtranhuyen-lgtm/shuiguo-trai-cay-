import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Pen, Eraser, Trash2, X } from 'lucide-react';

export const GlobalInkOverlay: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [tool, setTool] = useState<'pen' | 'fine' | 'eraser'>('pen');
  const [color, setColor] = useState('#22c55e');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctxRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    if (isEnabled) {
      initCanvas();
      window.addEventListener('resize', initCanvas);
      return () => window.removeEventListener('resize', initCanvas);
    }
  }, [isEnabled, initCanvas]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isEnabled || !ctxRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctxRef.current) return;
    const ctx = ctxRef.current;

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 28;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = tool === 'fine' ? 2 : 6;
    }

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      {/* Full screen canvas for annotations */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`fixed inset-0 z-40 w-full h-full touch-none select-none ${
          isEnabled ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none hidden'
        }`}
      />

      {/* Floating Toolbar when Ink is Active */}
      {isEnabled && (
        <div className="fixed right-20 bottom-6 z-50 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 shadow-xl p-2 flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              tool === 'pen' ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-700'
            }`}
            title="Bút vừa (6px)"
          >
            <Pen className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTool('fine')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              tool === 'fine' ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-700'
            }`}
            title="Bút nét thanh (2px)"
          >
            <span className="text-xs font-mono font-bold">1px</span>
          </button>

          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              tool === 'eraser' ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-700'
            }`}
            title="Tẩy nét vẽ"
          >
            <Eraser className="w-4 h-4" />
          </button>

          {/* Color Picker */}
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0"
            title="Chọn màu mực"
          />

          <div className="w-px h-6 bg-stone-200 mx-1" />

          <button
            onClick={clearCanvas}
            className="p-2 rounded-xl hover:bg-red-50 text-stone-600 hover:text-red-600 transition-colors cursor-pointer"
            title="Xóa toàn bộ nét vẽ"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              clearCanvas();
              setIsEnabled(false);
            }}
            className="p-2 rounded-xl hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
            title="Đóng chế độ viết"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Toggle Button in bottom right */}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`fixed right-6 bottom-6 z-50 w-12 h-12 rounded-full border shadow-lg flex items-center justify-center transition-all cursor-pointer ${
          isEnabled
            ? 'bg-emerald-600 text-white border-emerald-500 scale-105'
            : 'bg-white text-stone-700 border-stone-200 hover:scale-105 hover:bg-stone-50'
        }`}
        title={isEnabled ? 'Tắt chế độ viết toàn trang' : 'Bật chế độ viết toàn trang (bút vẽ trực tiếp)'}
      >
        <Pen className="w-5 h-5" />
      </button>
    </>
  );
};

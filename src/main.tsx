import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

try {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
} catch (err) {
  console.error('Fatal initialization error:', err);
  const container = document.getElementById('root');
  if (container) {
    container.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; padding: 20px; text-align: center; background: #fafaf9;">
        <div style="background: white; border: 1px solid #e7e5e4; border-radius: 20px; padding: 28px; max-width: 420px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
          <div style="font-size: 36px; margin-bottom: 8px;">⚠️</div>
          <h2 style="font-size: 18px; font-weight: 700; color: #1c1917; margin-bottom: 8px;">Không thể tải ứng dụng</h2>
          <p style="font-size: 13px; color: #78716c; margin-bottom: 16px;">${(err && (err as Error).message) || 'Vui lòng xóa cache trình duyệt hoặc tải lại.'}</p>
          <button onclick="localStorage.clear(); window.location.reload();" style="padding: 10px 20px; background: #059669; color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">Tải lại trang</button>
        </div>
      </div>
    `;
  }
}

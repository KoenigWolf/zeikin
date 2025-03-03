import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// =============================
// ルート要素の取得
// `document.getElementById('root')` でルート要素を取得
// 取得できなかった場合はエラーをスロー
// =============================
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Ensure there is an element with id="root" in index.html.');
}

// =============================
// React アプリケーションのマウント
// `StrictMode` を適用し、開発時のエラーを厳格にチェック
// `createRoot(rootElement).render(<App />)` を使用し、React 18 の並列レンダリングを活用
// =============================
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

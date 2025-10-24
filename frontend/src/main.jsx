/**
 * src/main.jsx
 * 이 파일은 React 애플리케이션의 최상위 진입점입니다.
 * ReactDOM을 사용하여 App 컴포넌트를 DOM에 렌더링합니다.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Tailwind CSS를 전역으로 적용
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker CSS 추가

// 'root'라는 id를 가진 DOM 요소를 찾아 React 루트를 생성합니다.
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode는 잠재적인 문제를 감지하기 위한 개발 도구입니다.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

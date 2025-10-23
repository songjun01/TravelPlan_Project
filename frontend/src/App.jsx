/**
 * src/App.jsx
 * 이 파일은 애플리케이션의 최상위 컴포넌트입니다.
 * React Router를 사용하여 페이지 간의 라우팅을 설정합니다.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TravelDetailPage from './pages/TravelDetailPage';
import PlanEditorPage from './pages/PlanEditorPage';

function App() {
  return (
    // BrowserRouter를 사용하여 라우팅을 활성화합니다.
    <Router>
      {/* Routes는 여러 Route를 감싸는 컨테이너입니다. */}
      <Routes>
        {/* 각 Route는 특정 경로(path)와 렌더링할 컴포넌트(element)를 정의합니다. */}
        <Route path="/" element={<MainPage />} />
        <Route path="/travel/:id" element={<TravelDetailPage />} />
        <Route path="/editor" element={<PlanEditorPage />} />
        {/* ID와 함께 에디터 경로 추가 */}
        <Route path="/editor/:id" element={<PlanEditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

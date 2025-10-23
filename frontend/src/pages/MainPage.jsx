/**
 * src/pages/MainPage.jsx
 * 
 * 메인 페이지 컴포넌트입니다.
 * 사용자의 모든 여행 계획을 카드 형태의 그리드 레이아웃으로 보여줍니다.
 * 또한, 새로운 여행 계획을 추가할 수 있는 버튼을 포함합니다.
 */
import React from 'react';
import { Link } from 'react-router-dom';

// 초기 렌더링을 위한 목업(mock) 데이터
const mockTravelPlans = [
  {
    id: 1,
    title: '도쿄 미식 탐방',
    location: '도쿄, 일본',
    startDate: '2025.10.26',
    endDate: '2025.10.28',
    lastModified: '2025.10.20',
  },
  {
    id: 2,
    title: '제주도 힐링 여행',
    location: '제주도, 대한민국',
    startDate: '2025.11.15',
    endDate: '2025.11.18',
    lastModified: '2025.10.18',
  },
  {
    id: 3,
    title: '파리 예술 기행',
    location: '파리, 프랑스',
    startDate: '2025.12.20',
    endDate: '2025.12.27',
    lastModified: '2025.09.30',
  },
];

// 날짜 포맷을 'YYYY.MM.DD' 형태로 변환하는 헬퍼 함수
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

/**
 * 개별 여행 계획을 나타내는 카드 컴포넌트
 * @param {object} plan - 여행 계획 데이터 객체
 */
const TravelPlanCard = ({ plan }) => (
  <Link to={`/travel/${plan.id}`} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <h3 className="text-xl font-bold text-gray-800 truncate">{plan.title}</h3>
    <p className="text-gray-600 mt-2">{plan.location}</p>
    <p className="text-gray-500 text-sm mt-4">{`${formatDate(plan.startDate)} ~ ${formatDate(plan.endDate)}`}</p>
    <p className="text-gray-400 text-xs mt-2 text-right">Last modified: {formatDate(plan.lastModified)}</p>
  </Link>
);

/**
 * 새로운 계획을 추가하는 버튼 역할을 하는 카드 컴포넌트
 */
const AddNewPlanCard = () => (
  <Link to="/editor" className="flex items-center justify-center bg-gray-50 p-6 rounded-lg border-2 border-dashed border-primary hover:bg-primary group transition-all duration-300 ease-in-out"> {/* 메인 색상 테두리 및 호버 효과 */}
    <div className="text-center">
      <span className="text-5xl text-primary group-hover:text-white transition-colors duration-300">+</span> {/* 메인 색상 아이콘 및 호버 효과 */}
    </div>
  </Link>
);


function MainPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-primary mb-8">My Travel Plans</h1> {/* 메인 색상 적용 */}
        
        {/* 반응형 그리드 레이아웃 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* 목업 데이터를 순회하며 여행 계획 카드를 렌더링합니다. */}
          {mockTravelPlans.map(plan => (
            <TravelPlanCard key={plan.id} plan={plan} />
          ))}
          
          {/* 새로운 계획 추가 카드를 렌더링합니다. */}
          <AddNewPlanCard />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

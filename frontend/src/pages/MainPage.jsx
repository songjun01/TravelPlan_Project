/**
 * src/pages/MainPage.jsx
 * 
 * 메인 페이지 컴포넌트입니다.
 * 사용자의 모든 여행 계획을 카드 형태의 그리드 레이아웃으로 보여줍니다.
 * 또한, 새로운 여행 계획을 추가할 수 있는 버튼을 포함합니다.
 */
import React, { useState, useMemo } from 'react'; // useState와 useMemo import
import { Link } from 'react-router-dom';

// 초기 렌더링을 위한 목업(mock) 데이터
const mockTravelPlans = [
  {
    id: 1,
    title: '도쿄 미식 탐방',
    location: '도쿄, 일본',
    startDate: '2025-10-26', // ISO 8601 형식으로 변경
    endDate: '2025-10-28',
    lastModified: '2025-10-20T10:00:00Z', // ISO 8601 형식으로 변경
  },
  {
    id: 2,
    title: '제주도 힐링 여행',
    location: '제주도, 대한민국',
    startDate: '2025-11-15',
    endDate: '2025-11-18',
    lastModified: '2025-10-18T15:30:00Z',
  },
  {
    id: 3,
    title: '파리 예술 기행',
    location: '파리, 프랑스',
    startDate: '2025-12-20',
    endDate: '2025-12-27',
    lastModified: '2025-09-30T08:00:00Z',
  },
  {
    id: 4,
    title: '부산 해변 투어',
    location: '부산, 대한민국',
    startDate: '2025-09-01',
    endDate: '2025-09-05',
    lastModified: '2025-08-25T11:00:00Z',
  },
  {
    id: 5,
    title: '런던 역사 탐방',
    location: '런던, 영국',
    startDate: '2026-01-10',
    endDate: '2026-01-15',
    lastModified: '2025-10-05T14:00:00Z',
  },
];

// 날짜 포맷을 'YYYY.MM.DD' 형태로 변환하는 헬퍼 함수
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    // Date 객체가 유효한지 확인
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

/**
 * 개별 여행 계획을 나타내는 카드 컴포넌트
 * @param {object} plan - 여행 계획 데이터 객체
 */
const TravelPlanCard = ({ plan }) => (
  // Link 컴포넌트를 사용하여 카드 전체를 클릭 가능한 링크로 만듭니다.
  // 마우스를 올리면 그림자가 짙어지고 카드가 약간 확대되는 호버 효과를 추가합니다.
  <Link 
    to={`/plan/${plan.id}`} 
    className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
  >
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
  <Link to="/create-plan" className="flex items-center justify-center bg-gray-50 p-6 rounded-lg border-2 border-dashed border-primary hover:bg-primary group transition-all duration-300 ease-in-out"> {/* 메인 색상 테두리 및 호버 효과 */}
    <div className="text-center">
      <span className="text-5xl text-primary group-hover:text-white transition-colors duration-300">+</span> {/* 메인 색상 아이콘 및 호버 효과 */}
    </div>
  </Link>
);


function MainPage() {
  // 3. 현재 정렬 순서를 저장하기 위한 상태 (기본값: 마지막 수정시간 최근순)
  const [sortOrder, setSortOrder] = useState('modified_desc');

  // 5. 정렬 로직 구현: sortOrder 상태에 따라 여행 계획을 정렬합니다.
  const sortedPlans = useMemo(() => {
    const sortablePlans = [...mockTravelPlans]; // 원본 배열을 변경하지 않기 위해 복사본 생성

    sortablePlans.sort((a, b) => {
      switch (sortOrder) {
        case 'modified_desc': // 마지막 수정시간 (최근순)
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        case 'modified_asc': // 마지막 수정시간 (과거순)
          return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
        case 'title_asc': // 제목 (오름차순)
          return a.title.localeCompare(b.title);
        case 'title_desc': // 제목 (내림차순)
          return b.title.localeCompare(a.title);
        case 'date_asc': // 여행일정 (최근 다가오는 순)
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'date_desc': // 여행일정 (과거 다가오는 순)
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        default:
          return 0;
      }
    });
    return sortablePlans;
  }, [mockTravelPlans, sortOrder]); // mockTravelPlans 또는 sortOrder 변경 시 재계산

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">My Travel Plans</h1> {/* 메인 색상 적용 */}
          
          {/* 4. 정렬 UI (Select Dropdown) */}
          <div className="flex justify-end">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded-md px-3 py-2 text-gray-700"
            >
              <option value="modified_desc">마지막 수정시간 (최근순)</option>
              <option value="modified_asc">마지막 수정시간 (과거순)</option>
              <option value="title_asc">제목 (오름차순)</option>
              <option value="title_desc">제목 (내림차순)</option>
              <option value="date_asc">여행일정 (최근 다가오는 순)</option>
              <option value="date_desc">여행일정 (과거 다가오는 순)</option>
            </select>
          </div>
        </div>
        
        {/* 반응형 그리드 레이아웃 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* 6. 정렬된 데이터를 순회하며 여행 계획 카드를 렌더링합니다. */}
          {sortedPlans.map(plan => (
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

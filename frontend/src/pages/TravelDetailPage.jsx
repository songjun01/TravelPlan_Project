// frontend/src/pages/TravelDetailPage.jsx

/**
 * src/pages/TravelDetailPage.jsx
 * [수정] 
 * 1. 목업 데이터 대신, URL의 planId를 사용하여 백엔드 API에서
 * 특정 여행 계획 데이터를 불러와 렌더링합니다.
 * 2. PlanEditorPage에서 추가한 'time' 필드를 타임라인에 표시합니다.
 * 3. 시간(time)순으로 이벤트를 정렬하여 렌더링합니다.
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // axios import
// 아이콘 라이브러리에서 아이콘들을 가져옵니다.
import { FaMapPin, FaBus, FaPen } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5'; // 뒤로가기 아이콘

// 🚨 목업 데이터(mockPlanDetail)는 사용하지 않습니다.

// 이벤트 유형에 따라 적절한 아이콘을 반환하는 컴포넌트
const EventIcon = ({ type }) => {
  const iconStyle = "text-primary w-6 h-6"; // 아이콘 스타일
  if (type === 'visit') {
    return <FaMapPin className={iconStyle} />;
  }
  if (type === 'move') {
    return <FaBus className={iconStyle} />;
  }
  return null;
};

// 날짜 포맷을 'YYYY.MM.DD' 형태로 변환하는 헬퍼 함수
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    // Date 객체가 유효한지 확인
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function TravelDetailPage() {
  // URL 파라미터에서 planId를 가져옵니다.
  const { planId } = useParams();

  // API 데이터를 저장할 상태
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // planId가 변경될 때마다 백엔드 API를 호출합니다.
  useEffect(() => {
    if (!planId) return;

    setLoading(true);
    setError(null);

    axios.get(`/api/travel-plans/${planId}`) // 백엔드 상세 조회 API 호출
      .then(response => {
        setPlan(response.data); // 성공 시 상태에 저장
        setLoading(false);
      })
      .catch(err => {
        console.error('데이터 로딩 오류:', err);
        setError('여행 계획을 찾을 수 없습니다.');
        setLoading(false);
      });
  }, [planId]); // planId가 바뀔 때마다 재실행

  // 로딩 및 에러 상태에 따른 UI 처리
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-gray-700">데이터를 불러오는 중...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 text-center">
        <p className="text-2xl text-red-500">{error}</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          메인으로 돌아가기
        </Link>
      </div>
    );
  }
  // plan이 null (비어있는) 상태일 때 (로딩/에러가 아닌 경우)
  if (!plan) {
    return null; 
  }

  // 이제 plan 변수는 API에서 받아온 실제 데이터입니다.
  return (
    // 페이지 배경색 및 패딩
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* 콘텐츠 중앙 정렬을 위한 래퍼 */}
      <div className="max-w-4xl mx-auto">
        
        {/* 메인 페이지로 돌아가는 뒤로가기 버튼 */}
        <Link 
          to="/"
          className="inline-block p-2 mb-4 rounded-full hover:bg-gray-200 transition-colors"
          title="메인으로 돌아가기"
        >
          <IoArrowBack size={24} className="text-gray-700" />
        </Link>

        {/* 여행 기본 정보를 표시하는 카드(박스) UI */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">{plan.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{plan.location}</p>
          <p className="text-sm text-gray-500 mt-1">Last Modified: {formatDate(plan.lastModified)}</p>
        </div>

        {/* 세부 일정 (Itinerary) */}
        <main>
          {plan.itinerary && plan.itinerary.map((day, index) => (
            // 각 날짜별 일정을 별도의 카드로 표시
            <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
              {/* 날짜 제목 및 내부 구분선 */}
              <div className="flex items-center border-b pb-3 mb-4">
                <h2 className="text-2xl font-bold text-primary">{`Day ${index + 1}`}</h2>
                <p className="ml-4 text-xl font-medium text-gray-700">{formatDate(day.date)}</p>
              </div>
              
              {/* 이벤트 목록 (타임라인 형태) */}
              <div className="border-l-2 border-primary pl-8 relative mt-6">
                {/* [수정] 🚨 DB에 저장된 events 배열을 'time' 기준으로 정렬합니다. */}
                {day.events && [...day.events].sort((a, b) => (a.time || '').localeCompare(b.time || '')).map((event, eventIndex) => (
                  <div key={eventIndex} className="mb-10 relative">
                    {/* 타임라인의 원형 아이콘 마커 */}
                    <div className="absolute -left-11 top-0.5 w-8 h-8 bg-gray-50 rounded-full border-2 border-primary flex items-center justify-center">
                      <EventIcon type={event.type} />
                    </div>

                    <div className="ml-4">
                      {/* [수정] 🚨 시간(time) 필드 표시 (DB에서 가져옴) */}
                      <p className="text-md font-semibold text-gray-800">{event.time}</p>
                      
                      {/* 이벤트 제목 (장소 또는 이동 경로) */}
                      <h3 className="text-xl font-bold text-gray-900 mt-1">
                        {event.type === 'visit' ? event.place : `${event.start} → ${event.end}`}
                      </h3>

                      {/* 이벤트 세부 정보 */}
                      <div className="text-gray-600 mt-2 text-sm">
                        {event.type === 'visit' && <p>주소: {event.address}</p>}
                        {event.type === 'move' && <p>교통수단: {event.transport}</p>}
                        <p>소요시간: {event.duration || event.stayTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* 수정하기 플로팅 액션 버튼 (FAB) */}
      <Link
        to={`/edit/${plan._id}`} // Mongoose의 _id 사용
        className="fixed bottom-8 right-8 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-300"
        title="수정하기"
      >
        <FaPen className="w-6 h-6" />
      </Link>
    </div>
  );
}

export default TravelDetailPage;
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

// 아이콘 라이브러리에서 아이콘들을 가져옵니다.
import { FaMapPin, FaBus, FaPen } from 'react-icons/fa';
// IoStar와 IoStarOutline 아이콘을 import합니다. (즐겨찾기 기능용)
import { IoArrowBack, IoStar, IoStarOutline } from 'react-icons/io5';

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

  // 5. 데이터 로드 로직 (`useEffect`) 추가:
  // 컴포넌트 마운트 시 또는 planId가 변경될 때마다 API에서 데이터를 가져옵니다.
  useEffect(() => {
    // planId가 없으면 데이터를 가져올 필요가 없습니다. (예: 페이지 로드 초기)
    if (!planId) {
      setLoading(false); // planId가 없으므로 로딩 완료 처리
      setError('유효한 여행 계획 ID가 없습니다.');
      return;
    }

    const fetchPlanData = async () => {
      setLoading(true); // 데이터 로딩 시작
      setError(null);   // 에러 상태 초기화

      try {
        // 백엔드 API에 GET 요청을 보내 특정 planId의 데이터를 가져옵니다.
        const response = await fetch(`/api/travel-plans/${planId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // 응답이 성공적이면 plan 상태를 업데이트합니다.
        setPlan(data);
      } catch (err) {
        console.error('여행 계획 데이터 로딩 오류:', err);
        // 에러 발생 시 에러 상태를 설정합니다.
        setError('여행 계획을 찾을 수 없거나 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchPlanData(); // 데이터 가져오는 함수 호출
  }, [planId]); // planId가 변경될 때마다 이 훅을 재실행합니다.

  /**
   * 즐겨찾기 상태를 토글하는 핸들러 함수.
   * '낙관적 업데이트'를 사용하여 사용자 경험을 향상시킵니다.
   */
  const handleToggleFavorite = async () => {
    if (!plan) return;

    // 1. (롤백 대비) 현재 plan 상태를 백업합니다.
    const originalPlan = plan;

    // 2. (낙관적 UI 업데이트)
    // API 요청을 기다리지 않고 UI를 즉시 업데이트하여 사용자에게 빠른 피드백을 제공합니다.
    setPlan(prevPlan => ({
      ...prevPlan,
      isFavorite: !prevPlan.isFavorite
    }));

    try {
      // 3. (API 호출) 백그라운드에서 서버에 변경된 즐겨찾기 상태를 전송합니다.
      await fetch(`/api/travel-plans/${planId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !originalPlan.isFavorite }), // 이전 상태의 반대 값을 전송
      });
      // 성공 시 별다른 처리가 필요 없습니다. UI는 이미 업데이트되었습니다.
      // 사용자에게 상태 변경을 알립니다.
      window.alert(
        !originalPlan.isFavorite
          ? "즐겨찾기에 추가되었습니다."
          : "즐겨찾기에서 해제되었습니다."
      );

    } catch (err) {
      // 4. (에러 롤백) API 호출이 실패하면 UI를 원래 상태로 되돌립니다.
      console.error('즐겨찾기 상태 업데이트 실패:', err);
      window.alert('즐겨찾기 상태 변경에 실패했습니다.'); // [추가] 실패 알림
      setPlan(originalPlan); // 백업해둔 원래 plan으로 상태를 복원
    }
  };


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

        {/* 
          여행 기본 정보를 표시하는 카드(박스) UI.
          'relative' 클래스를 추가하여 내부의 즐겨찾기 버튼을 absolute 포지셔닝하기 위한 기준점으로 설정합니다.
        */}
        <div className="relative bg-white rounded-lg shadow-md p-6 mb-8">
          {/* 
            즐겨찾기 버튼.
            'absolute'를 사용하여 부모('relative' 컨테이너)의 우측 상단에 배치합니다.
            'top-6 right-6'은 부모의 패딩(p-6)과 일치시켜 정렬합니다.
          */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            title={plan.isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            {plan.isFavorite ? (
              <IoStar size={24} className="text-yellow-500" />
            ) : (
              <IoStarOutline size={24} className="text-gray-400" />
            )}
          </button>

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
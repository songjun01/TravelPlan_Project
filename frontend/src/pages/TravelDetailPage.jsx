/**
 * src/pages/TravelDetailPage.jsx
 * 
 * 개별 여행 계획의 상세 정보를 보여주는 페이지 컴포넌트입니다.
 * URL 파라미터로 받은 planId를 기반으로 상세 데이터를 렌더링합니다. (현재는 목업 데이터 사용)
 * 날짜별 일정, 이벤트(방문, 이동)를 타임라인 형태로 보여주고,
 * 수정 페이지로 이동할 수 있는 플로팅 액션 버튼(FAB)을 포함합니다.
 */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
// 아이콘 라이브러리에서 아이콘들을 가져옵니다.
import { FaMapPin, FaBus, FaPen } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5'; // 뒤로가기 아이콘 추가

// 상세 페이지 렌더링을 위한 단일 여행 계획 목업(mock) 데이터
// 실제 애플리케이션에서는 useParams로 받은 ID를 이용해 서버에서 데이터를 가져와야 합니다.
const mockPlanDetail = {
  id: 'mock-id-1',
  title: '가을의 교토, 3박 4일',
  region: '일본, 교토',
  lastModified: '2025년 10월 23일',
  itinerary: [
    {
      date: '2025.11.01',
      events: [
        { type: 'visit', time: '10:00', place: '청수사 (기요미즈데라)', address: '1 Chome-294 Kiyomizu, Higashiyama Ward, Kyoto', duration: '2시간' },
        { type: 'move', time: '12:00', transport: '버스', from: '청수사', to: '금각사', duration: '45분' },
        { type: 'visit', time: '13:00', place: '금각사 (킨카쿠지)', address: '1 Kinkakujicho, Kita Ward, Kyoto', duration: '1.5시간' },
        { type: 'move', time: '14:30', transport: '도보', from: '금각사', to: '료안지', duration: '20분' },
        { type: 'visit', time: '15:00', place: '료안지', address: '13 Ryoanji Goryonoshitacho, Ukyo Ward, Kyoto', duration: '1시간' },
      ],
    },
    {
      date: '2025.11.02',
      events: [
        { type: 'visit', time: '09:30', place: '아라시야마 대나무 숲', address: 'Sagaogurayama Tabuchiyamacho, Ukyo Ward, Kyoto', duration: '1.5시간' },
        { type: 'move', time: '11:00', transport: '전철', from: '아라시야마', to: '후시미 이나리 신사', duration: '50분' },
        { type: 'visit', time: '12:00', place: '후시미 이나리 신사', address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto', duration: '2.5시간' },
      ],
    },
  ],
};

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

function TravelDetailPage() {
  // URL 파라미터에서 planId를 가져옵니다. 현재는 사용하지 않지만, 실제 데이터 연동 시 필요합니다.
  const { planId } = useParams();

  // 목업 데이터를 사용합니다.
  const plan = mockPlanDetail;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* 메인 페이지로 돌아가는 뒤로가기 버튼 */}
        <Link 
          to="/"
          className="inline-block p-2 mb-4 rounded-full hover:bg-gray-200 transition-colors"
          title="메인으로 돌아가기"
        >
          <IoArrowBack size={24} className="text-gray-700" />
        </Link>

        {/* 1. 최상단 헤더 */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">{plan.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{plan.region}</p>
          <p className="text-sm text-gray-500 mt-1">Last Modified: {plan.lastModified}</p>
        </header>

        {/* 2. 세부 일정 (Itinerary) */}
        <main>
          {plan.itinerary.map((day, index) => (
            // 날짜별 섹션
            <section key={index} className="mb-12">
              {/* 날짜 구분 */}
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">{`Day ${index + 1}`}</h2>
                <p className="ml-4 text-xl font-medium text-gray-700">{day.date}</p>
              </div>
              
              {/* 이벤트 목록 (타임라인 형태) */}
              <div className="border-l-2 border-primary pl-8 relative">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="mb-10 relative">
                    {/* 타임라인의 원형 아이콘 마커 */}
                    <div className="absolute -left-11 top-0.5 w-8 h-8 bg-gray-50 rounded-full border-2 border-primary flex items-center justify-center">
                      <EventIcon type={event.type} />
                    </div>

                    <div className="ml-4">
                      {/* 시간 */}
                      <p className="text-md font-semibold text-gray-800">{event.time}</p>
                      
                      {/* 이벤트 제목 (장소 또는 이동 경로) */}
                      <h3 className="text-xl font-bold text-gray-900 mt-1">
                        {event.type === 'visit' ? event.place : `${event.from} → ${event.to}`}
                      </h3>

                      {/* 이벤트 세부 정보 */}
                      <div className="text-gray-600 mt-2 text-sm">
                        {event.type === 'visit' && <p>주소: {event.address}</p>}
                        {event.type === 'move' && <p>교통수단: {event.transport}</p>}
                        <p>소요시간: {event.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* 3. 수정하기 플로팅 액션 버튼 (FAB) */}
      <Link
        to={`/edit/${plan.id}`} // 수정 페이지로 이동
        className="fixed bottom-8 right-8 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-300"
        title="수정하기"
      >
        <FaPen className="w-6 h-6" />
      </Link>
    </div>
  );
}

export default TravelDetailPage;
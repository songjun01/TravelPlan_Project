/**
 * src/pages/PlanEditorPage.jsx
 * 
 * 새로운 여행 계획을 생성하거나 기존 계획을 수정하는 페이지입니다.
 * 사용자는 이 페이지에서 여행의 제목, 지역, 기간을 설정하고,
 * 날짜별로 방문 장소나 이동 경로 등 세부 일정을 추가하고 편집할 수 있습니다.
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft, FaTrash, FaPlus } from 'react-icons/fa';
import { differenceInDays, addDays } from 'date-fns';

function PlanEditorPage() {
  const { planId } = useParams(); // URL에서 planId를 가져옵니다 (수정 모드용)
  const isEditMode = Boolean(planId); // planId가 있으면 수정 모드

  // 여행 계획 전체 데이터를 관리하는 상태
  const [plan, setPlan] = useState({
    title: '',
    region: '',
    startDate: new Date(),
    endDate: new Date(),
    itinerary: [], // 날짜별 일정을 담는 배열
  });

  /**
   * 날짜 범위가 변경될 때마다 itinerary 배열을 자동으로 업데이트합니다.
   * - 시작일과 종료일 사이의 기간을 계산합니다.
   * - 각 날짜에 해당하는 객체를 itinerary 배열에 생성합니다.
   * - 기존에 있던 이벤트는 최대한 유지합니다.
   */
  useEffect(() => {
    const newItinerary = [];
    if (plan.startDate && plan.endDate && plan.startDate <= plan.endDate) {
      const days = differenceInDays(plan.endDate, plan.startDate) + 1;
      for (let i = 0; i < days; i++) {
        const currentDate = addDays(plan.startDate, i);
        // 기존 itinerary에서 같은 날짜의 이벤트를 찾아 유지합니다.
        const existingDay = plan.itinerary.find(day => 
          day.date && new Date(day.date).toDateString() === currentDate.toDateString()
        );
        newItinerary.push({
          date: currentDate,
          events: existingDay ? existingDay.events : [], // 기존 이벤트가 있으면 유지, 없으면 빈 배열
        });
      }
    }
    setPlan(p => ({ ...p, itinerary: newItinerary }));
  }, [plan.startDate, plan.endDate]);


  // 기본 정보(제목, 지역) 입력 필드 변경 핸들러
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setPlan(prevPlan => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  // 날짜 선택기 변경 핸들러
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setPlan(prevPlan => ({
      ...prevPlan,
      startDate: start,
      endDate: end,
    }));
  };

  // 세부 일정 항목(이벤트)의 내용을 변경하는 핸들러
  const handleItineraryItemChange = (dayIndex, eventIndex, e) => {
    const { name, value } = e.target;
    const newItinerary = [...plan.itinerary];
    newItinerary[dayIndex].events[eventIndex][name] = value;
    setPlan(prevPlan => ({ ...prevPlan, itinerary: newItinerary }));
  };

  // 새로운 세부 일정 항목(이벤트)을 추가하는 핸들ler
  const addItineraryItem = (dayIndex, type) => {
    const newItem = type === 'visit'
      ? { type: 'visit', place: '', address: '', stayTime: '' }
      : { type: 'move', transport: '', start: '', end: '', duration: '' };
    
    const newItinerary = [...plan.itinerary];
    newItinerary[dayIndex].events.push(newItem);
    setPlan(prevPlan => ({ ...prevPlan, itinerary: newItinerary }));
  };

  // 세부 일정 항목(이벤트)을 삭제하는 핸들러
  const removeItineraryItem = (dayIndex, eventIndex) => {
    const newItinerary = [...plan.itinerary];
    newItinerary[dayIndex].events.splice(eventIndex, 1);
    setPlan(prevPlan => ({ ...prevPlan, itinerary: newItinerary }));
  };

  // '저장하기' 버튼 클릭 핸들러 (현재는 콘솔에 데이터 출력)
  const handleSave = () => {
    // 나중에 이 부분에 백엔드 API 호출 로직을 추가합니다.
    console.log('Saving plan:', plan);
    alert('계획이 저장되었습니다! (콘솔 확인)');
  };

  // 날짜를 'YYYY.MM.DD' 형식의 문자열로 포맷하는 함수
  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    // 1. 페이지 전체 배경색과 패딩을 적용합니다.
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* 2. 콘텐츠를 중앙에 배치하기 위한 max-width 및 mx-auto 래퍼입니다. */}
      <div className="max-w-4xl mx-auto">
        {/* 페이지 헤더: 뒤로가기 버튼 */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-block p-2 rounded-full hover:bg-gray-200 transition-colors"
            title="메인으로 돌아가기"
          >
            <FaArrowLeft size={24} className="text-gray-700" />
          </Link>
        </div>

        {/* 3. 메인 폼 카드: 모든 입력 필드와 버튼을 포함하는 컨테이너입니다. */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 3a. 카드 헤더 */}
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? '여행 계획 수정하기' : '새로운 여행 계획 만들기'}
            </h1>
          </div>

          {/* 3b. 폼 섹션 (기본 정보) */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">기본 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">여행 제목</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={plan.title}
                  onChange={handleBasicInfoChange}
                  placeholder="예: 제주도 힐링 여행"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">여행 지역</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={plan.region}
                  onChange={handleBasicInfoChange}
                  placeholder="예: 제주도, 대한민국"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* 3c. 폼 섹션 (날짜 선택) */}
          <div className="p-6 border-t">
            <label className="block text-sm font-medium text-gray-700 mb-2">여행 날짜</label>
            <DatePicker
              selected={plan.startDate}
              onChange={handleDateChange}
              startDate={plan.startDate}
              endDate={plan.endDate}
              selectsRange
              inline
              className="w-full"
              calendarClassName="border-none"
            />
          </div>

          {/* 3d. 폼 섹션 (세부 일정) */}
          <div className="p-6 border-t">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">세부 일정</h2>
            {plan.itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-6 border-t pt-4 first:border-t-0 first:pt-0">
                <h3 className="text-lg font-bold text-primary mb-4">
                  Day {dayIndex + 1} - {formatDate(day.date)}
                </h3>
                
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="bg-gray-50 p-4 rounded-md mb-4 relative">
                    <button 
                      onClick={() => removeItineraryItem(dayIndex, eventIndex)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="이벤트 삭제"
                    >
                      <FaTrash />
                    </button>

                    {event.type === 'visit' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input type="text" name="place" value={event.place} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="방문 장소" className="w-full p-2 border rounded" />
                        <input type="text" name="address" value={event.address} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="주소" className="w-full p-2 border rounded" />
                        <input type="text" name="stayTime" value={event.stayTime} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="체류 시간 (예: 2시간)" className="w-full p-2 border rounded" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <input type="text" name="transport" value={event.transport} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="교통수단 (예: 택시)" className="w-full p-2 border rounded" />
                        <input type="text" name="start" value={event.start} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="출발 장소" className="w-full p-2 border rounded" />
                        <input type="text" name="end" value={event.end} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="도착 장소" className="w-full p-2 border rounded" />
                        <input type="text" name="duration" value={event.duration} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="소요 시간 (예: 30분)" className="w-full p-2 border rounded" />
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex space-x-4">
                  <button onClick={() => addItineraryItem(dayIndex, 'visit')} className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
                    <FaPlus className="mr-2" /> 방문 추가
                  </button>
                  <button onClick={() => addItineraryItem(dayIndex, 'move')} className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
                    <FaPlus className="mr-2" /> 이동 추가
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 3e. 카드 푸터 (저장 버튼) */}
          <div className="p-6 border-t text-right">
            <button
              onClick={handleSave}
              className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanEditorPage;
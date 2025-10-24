// frontend/src/pages/PlanEditorPage.jsx

/**
 * src/pages/PlanEditorPage.jsx
 * [수정] 
 * 1. (GET/PATCH) '수정 모드'일 때, API에서 기존 데이터를 불러오고, 수정 API를 호출합니다.
 * 2. (POST) '저장하기' 핸들러가 itinerary를 포함하여 POST(생성) API를 호출합니다.
 * 3. (Validation) '저장하기' 핸들러에 유효성 검사 로직을 추가합니다.
 * 4. (UI) 세부 일정(itinerary)에 '시간(time)' 필드를 추가하고 관련 핸들러를 수정합니다.
 * 5. [수정] 🚨 '생성' 후 상세 페이지 이동 시, 백엔드 응답에서 실제 MongoDB '_id'를 사용합니다.
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft, FaTrash, FaPlus } from 'react-icons/fa';
import { differenceInDays, addDays } from 'date-fns';
import axios from 'axios';

function PlanEditorPage() {
  const { planId } = useParams(); // URL에서 planId를 가져옵니다 (수정 모드용)
  const isEditMode = Boolean(planId); // planId가 있으면 수정 모드
  const navigate = useNavigate(); // 페이지 이동 훅
  const [loading, setLoading] = useState(false); // 로딩 상태

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
   * (단, 수정 모드에서 데이터 로딩 중에는 이 로직이 실행되는 것을 방지)
   */
  useEffect(() => {
    if (isEditMode && loading) return; 

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
  }, [plan.startDate, plan.endDate, isEditMode, loading]); // 의존성 배열에 isEditMode, loading 추가


  // '수정 모드'일 때, API에서 기존 데이터를 불러옵니다.
  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      axios.get(`/api/travel-plans/${planId}`)
        .then(response => {
          const data = response.data;
          
          // DB에서 받은 데이터를 프론트엔드 상태(plan)에 맞게 설정합니다.
          setPlan({
            title: data.title,
            region: data.location, // 백엔드 'location'을 프론트 'region'으로 매핑
            startDate: new Date(data.startDate), // 날짜 문자열을 Date 객체로
            endDate: new Date(data.endDate),     // 날짜 문자열을 Date 객체로
            // DB에서 받은 itinerary의 날짜 문자열도 Date 객체로 변환
            itinerary: data.itinerary.map(day => ({
              ...day,
              date: new Date(day.date)
            })) || []
          });
          setLoading(false);
        })
        .catch(err => {
          console.error('수정할 계획 로딩 오류:', err);
          alert('데이터를 불러오는데 실패했습니다.');
          setLoading(false);
          navigate('/'); // 오류 발생 시 메인 페이지로 이동
        });
    }
  }, [isEditMode, planId, navigate]);


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

  // 새로운 세부 일정 항목(이벤트)을 추가 (time 필드 기본값 추가)
  const addItineraryItem = (dayIndex, type) => {
    const newItem = type === 'visit'
      ? { type: 'visit', time: '09:00', place: '', address: '', stayTime: '' }
      : { type: 'move', time: '10:00', transport: '', start: '', end: '', duration: '' };
    
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

  // '저장하기' 버튼 클릭 핸들러 (유효성 검사, 수정/생성 API 호출, 상세 페이지 이동)
  const handleSave = async () => {
    // 1. 사용자 입력 유효성 검사
    if (!plan.title.trim() || !plan.region.trim()) {
      alert('여행 제목과 지역은 필수 입력 항목입니다.');
      return; // 저장 로직 중단
    }

    // 2. 프론트엔드 상태(plan)를 백엔드 스키마에 맞게 변환
    const dataToSend = {
      title: plan.title,
      location: plan.region, // 'region'을 'location'으로 매핑
      startDate: plan.startDate,
      endDate: plan.endDate,
      itinerary: plan.itinerary // 세부 일정(itinerary) 포함
    };

    // 3. API 호출 (수정 / 생성 분기)
    try {
      let response; // API 응답을 저장할 변수
      if (isEditMode) {
        // [수정 모드] PATCH API 호출
        response = await axios.patch(`/api/travel-plans/${planId}`, dataToSend); //
        alert('계획이 성공적으로 수정되었습니다!');
        // 4. 저장이 성공하면 수정된 계획의 상세 페이지로 이동
        navigate(`/plan/${planId}`); // 기존 planId 사용
      } else {
        // [생성 모드] POST API 호출
        response = await axios.post('/api/travel-plans', dataToSend); //
        alert('새로운 여행 계획이 저장되었습니다!');
        
        // [수정] 🚨 백엔드 응답에서 MongoDB가 생성한 '_id'를 가져옵니다.
        const newPlanId = response.data._id; // response.data.id -> response.data._id
        
        // 4. 저장이 성공하면 새로 생성된 계획의 상세 페이지로 이동
        if (newPlanId) {
          navigate(`/plan/${newPlanId}`); // 실제 생성된 _id 사용
        } else {
          // 혹시 모를 예외 처리: _id가 응답에 없는 경우 (이론상 발생하면 안 됨)
          console.error('API 응답에서 새 계획 ID를 찾을 수 없습니다.', response.data);
          alert('저장은 되었으나 상세 페이지로 이동할 수 없습니다. 메인 페이지로 이동합니다.');
          navigate('/'); // 메인 페이지로 대신 이동
        }
      }
    } catch (error) {
      console.error('계획 저장 중 오류 발생:', error);
      alert(`저장 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
    }
  };

  // 날짜를 'YYYY.MM.DD' 형식의 문자열로 포맷하는 함수
  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // 수정 모드에서 데이터 로딩 중일 때 UI
  if (isEditMode && loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          기존 계획을 불러오는 중입니다...
        </h1>
      </div>
    );
  }

  // JSX 렌더링 시작
  return (
    // 1. 페이지 전체 배경색과 패딩
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* 2. 콘텐츠 중앙 정렬 래퍼 */}
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

        {/* 3. 메인 폼 카드 */}
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

          {/* 3d. 폼 섹션 (세부 일정) - time 필드 input 추가 및 grid 레이아웃 조정 */}
          <div className="p-6 border-t">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">세부 일정</h2>
            {plan.itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-6 border-t pt-4 first:border-t-0 first:pt-0">
                <h3 className="text-lg font-bold text-primary mb-4">
                  Day {dayIndex + 1} - {formatDate(day.date)}
                </h3>
                
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="bg-gray-50 p-4 rounded-md mb-4 relative">
                    {/* 이벤트 삭제 버튼 */}
                    <button 
                      onClick={() => removeItineraryItem(dayIndex, eventIndex)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="이벤트 삭제"
                    >
                      <FaTrash />
                    </button>

                    {/* 이벤트 타입에 따른 입력 폼 렌더링 */}
                    {event.type === 'visit' ? (
                      // 방문(visit) 폼: time 필드 추가, grid-cols-2 md:grid-cols-4
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <input type="time" name="time" value={event.time || '09:00'} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} className="w-full p-2 border rounded" />
                        <input type="text" name="place" value={event.place} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="방문 장소" className="w-full p-2 border rounded" />
                        <input type="text" name="address" value={event.address} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="주소" className="w-full p-2 border rounded" />
                        <input type="text" name="stayTime" value={event.stayTime} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="체류 시간 (예: 2시간)" className="w-full p-2 border rounded" />
                      </div>
                    ) : (
                      // 이동(move) 폼: time 필드 추가, grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <input type="time" name="time" value={event.time || '10:00'} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} className="w-full p-2 border rounded" />
                        <input type="text" name="transport" value={event.transport} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="교통수단 (예: 택시)" className="w-full p-2 border rounded" />
                        <input type="text" name="start" value={event.start} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="출발 장소" className="w-full p-2 border rounded" />
                        <input type="text" name="end" value={event.end} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="도착 장소" className="w-full p-2 border rounded" />
                        <input type="text" name="duration" value={event.duration} onChange={(e) => handleItineraryItemChange(dayIndex, eventIndex, e)} placeholder="소요 시간 (예: 30분)" className="w-full p-2 border rounded" />
                      </div>
                    )}
                  </div>
                ))}

                {/* 방문/이동 추가 버튼 */}
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

          {/* 3e. 카드 푸터 (저장 버튼) - 유효성 검사가 추가된 handleSave 연결 */}
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
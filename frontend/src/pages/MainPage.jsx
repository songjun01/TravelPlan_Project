// frontend/src/pages/MainPage.jsx

/**
 * src/pages/MainPage.jsx
 * [수정] 
 * 1. (GET) 목업 데이터 대신 API로 실제 여행 목록을 불러옵니다.
 * 2. (DELETE) 삭제 API를 호출하는 핸들러를 추가합니다.
 * 3. (UI) TravelPlanCard 컴포넌트에 삭제 버튼을 추가하고, 핸들러를 prop으로 전달합니다.
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// [수정] 🚨 삭제 아이콘 대신 더보기, 즐겨찾기, 삭제 아이콘을 import 합니다.
import { IoEllipsisVertical, IoStar, IoStarOutline, IoTrashOutline } from 'react-icons/io5';

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
 * [수정] 🚨 개별 여행 계획을 나타내는 카드 컴포넌트
 * onDelete prop 대신 openMenuId, setOpenMenuId, handleToggleFavorite, handleDelete prop을 받아서 처리합니다.
 */
const TravelPlanCard = ({ plan, openMenuId, setOpenMenuId, handleToggleFavorite, handleDelete }) => {
  // [추가] 🚨 메뉴 열림 상태 확인
  const isMenuOpen = openMenuId === plan._id;

  // [추가] 🚨 더보기 버튼 클릭 핸들러 (메뉴 토글)
  const handleEllipsisClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(prevId => (prevId === plan._id ? null : plan._id)); // 현재 메뉴를 열거나 닫습니다.
  };

  // [추가] 🚨 즐겨찾기 버튼 클릭 핸들러
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggleFavorite(plan._id, plan.isFavorite);
  };

  // [추가] 🚨 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`'${plan.title}' 계획을 정말 삭제하시겠습니까?`)) {
      handleDelete(plan._id);
    }
  };

  return (
    <Link 
      to={`/plan/${plan._id}`}
      className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out relative"
    >
      {/* [수정] 🚨 기존 삭제 버튼 대신 Actions 영역 (즐겨찾기 아이콘 + 더보기 메뉴) */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {/* [추가] 🚨 즐겨찾기 표시 아이콘 */}
        {plan.isFavorite && (
          <IoStar className="text-yellow-500 text-xl" title="즐겨찾기됨" />
        )}

        {/* [추가] 🚨 더보기 메뉴 */}
        <div className="relative">
          <button
            onClick={handleEllipsisClick}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
            title="더보기"
          >
            <IoEllipsisVertical className="text-xl" />
          </button>

          {isMenuOpen && (
            // [추가] 🚨 드롭다운 메뉴
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-20 overflow-hidden">
              <ul className="py-1">
                <li>
                  <button
                    onClick={handleFavoriteClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {plan.isFavorite ? <IoStar className="mr-2 text-yellow-500" /> : <IoStarOutline className="mr-2" />}
                    {plan.isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleDeleteClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <IoTrashOutline className="mr-2" />
                    삭제
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 truncate pr-8">{plan.title}</h3> 
      <p className="text-gray-600 mt-2">{plan.location}</p>
      <p className="text-gray-500 text-sm mt-4">{`${formatDate(plan.startDate)} ~ ${formatDate(plan.endDate)}`}</p>
      <p className="text-gray-400 text-xs mt-2 text-right">Last modified: {formatDate(plan.lastModified)}</p>
    </Link>
  );
};

/**
 * 새로운 계획을 추가하는 버튼 역할을 하는 카드 컴포넌트
 */
const AddNewPlanCard = () => (
  <Link to="/create-plan" className="flex items-center justify-center bg-gray-50 p-6 rounded-lg border-2 border-dashed border-primary hover:bg-primary group transition-all duration-300 ease-in-out">
    <div className="text-center">
      <span className="text-5xl text-primary group-hover:text-white transition-colors duration-300">+</span>
    </div>
  </Link>
);


function MainPage() {
  // 현재 정렬 순서를 저장하기 위한 상태
  const [sortOrder, setSortOrder] = useState('modified_desc');
  // [추가] 🚨 필터 상태를 저장하기 위한 상태. 'all', 'ongoing', 'future', 'past' 중 하나.
  const [filterStatus, setFilterStatus] = useState('all');
  // [추가] 🚨 현재 열려있는 '더보기' 메뉴의 plan._id를 저장합니다. null이면 모든 메뉴가 닫혀있습니다.
  const [openMenuId, setOpenMenuId] = useState(null);

  // [수정] 🚨 API로 받아온 여행 계획 목록을 저장할 상태
  const [travelPlans, setTravelPlans] = useState([]);

  // [추가] 🚨 오늘 날짜를 자정 기준으로 계산하여 저장합니다. useMemo를 사용하여 한 번만 계산되도록 합니다.
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // 시간을 00:00:00.000으로 설정하여 날짜만 비교할 수 있도록 합니다.
    return now;
  }, []); // 빈 의존성 배열: 컴포넌트가 처음 마운트될 때 한 번만 계산됩니다.

  // [수정] 🚨 컴포넌트 마운트 시 백엔드에서 데이터를 가져옵니다.
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Vite 프록시 덕분에 '/api/...'로 요청을 보낼 수 있습니다.
        const response = await axios.get('/api/travel-plans');
        setTravelPlans(response.data); // 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error('여행 목록을 불러오는 중 오류가 발생했습니다:', error);
        // 사용자에게 오류를 알리는 UI를 추가하는 것이 좋습니다.
      }
    };

    fetchPlans();
  }, []); // 빈 의존성 배열: 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // [수정] 🚨 여행 계획 삭제 핸들러: 메뉴를 닫는 로직 추가
  const handleDelete = async (planId) => {
    try {
      // 1. 백엔드에 DELETE API 요청
      await axios.delete(`/api/travel-plans/${planId}`);
      
      // 2. API 호출 성공 시, 프론트엔드 상태(UI)에서도 즉시 제거
      setTravelPlans(prevPlans => 
        prevPlans.filter(plan => plan._id !== planId)
      );
      
      alert('계획이 삭제되었습니다.');

    } catch (error) {
      console.error('계획 삭제 중 오류 발생:', error);
      alert('삭제에 실패했습니다.');
    } finally {
      // [추가] 🚨 메뉴 닫기
      setOpenMenuId(null);
    }
  };

  // [추가] 🚨 즐겨찾기 토글 핸들러
  const handleToggleFavorite = async (planId, currentIsFavorite) => {
    // [주석] 🚨 1. 낙관적 UI 업데이트: 서버 응답을 기다리지 않고 UI를 즉시 업데이트합니다.
    // 이는 사용자 경험을 향상시키지만, 서버 요청 실패 시 롤백 로직이 필요합니다.
    setTravelPlans(prevPlans => 
      prevPlans.map(plan => 
        plan._id === planId ? { ...plan, isFavorite: !currentIsFavorite } : plan
      )
    );
    // [주석] 🚨 메뉴 닫기 (낙관적 업데이트와 함께 수행)
    setOpenMenuId(null);

    try {
      // [주석] 🚨 2. 서버 API 호출: 백엔드에 PATCH 요청을 보내 즐겨찾기 상태를 업데이트합니다.
      const response = await axios.patch(`/api/travel-plans/${planId}`, { isFavorite: !currentIsFavorite });
      
      if (response.status !== 200) { // 또는 !response.ok (fetch API 사용 시)
        throw new Error('서버에서 즐겨찾기 업데이트 실패');
      }
      
      alert(`계획이 즐겨찾기 ${currentIsFavorite ? '해제' : '추가'}되었습니다.`);

    } catch (error) {
      console.error('즐겨찾기 상태 변경 중 오류 발생:', error);
      alert('즐겨찾기 상태 변경에 실패했습니다.');
      // [주석] 🚨 3. 에러 롤백: 서버 요청 실패 시, 낙관적으로 변경했던 UI 상태를 원래대로 되돌립니다.
      setTravelPlans(prevPlans => 
        prevPlans.map(plan => 
          plan._id === planId ? { ...plan, isFavorite: currentIsFavorite } : plan
        )
      );
    }
  };

  // [추가] 🚨 필터링 로직 구현: travelPlans, filterStatus, today가 변경될 때마다 필터링을 다시 수행합니다.
  const filteredPlans = useMemo(() => {
    switch (filterStatus) {
      case 'ongoing':
        return travelPlans.filter(plan => {
          const startDate = new Date(plan.startDate);
          const endDate = new Date(plan.endDate);
          // 오늘 날짜가 시작일과 종료일 사이에 있는 경우 (시작일 포함, 종료일 포함)
          return today >= startDate && today <= endDate;
        });
      case 'future':
        return travelPlans.filter(plan => {
          const startDate = new Date(plan.startDate);
          // 시작일이 오늘보다 미래인 경우
          return startDate > today;
        });
      case 'past':
        return travelPlans.filter(plan => {
          const endDate = new Date(plan.endDate);
          // 종료일이 오늘보다 과거인 경우
          return endDate < today;
        });
      case 'all':
      default:
        return travelPlans; // 'all' 또는 기본값일 경우 모든 계획 반환
    }
  }, [travelPlans, filterStatus, today]); // 의존성 배열: travelPlans, filterStatus, today가 변경될 때 재계산

  // [수정] 🚨 정렬 로직 구현: 이제 `travelPlans` 대신 `filteredPlans`를 기반으로 정렬합니다.
  const sortedPlans = useMemo(() => {
    const sortablePlans = [...filteredPlans]; // 원본 배열을 `filteredPlans`로 변경

    sortablePlans.sort((a, b) => {
      switch (sortOrder) {
        case 'modified_desc': 
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        case 'modified_asc': 
          return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
        case 'title_asc': 
          return a.title.localeCompare(b.title);
        case 'title_desc': 
          return b.title.localeCompare(a.title);
        case 'date_asc': 
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'date_desc': 
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        default:
          return 0;
      }
    });
    return sortablePlans;
  }, [filteredPlans, sortOrder]); // 의존성 배열을 `filteredPlans`로 변경

  const getFilterButtonClass = (status) => (
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ` +
    (filterStatus === status
      ? 'bg-primary text-white'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-primary">My Travel Plans</h1>
          
          {/* [추가] 🚨 필터 UI (버튼 그룹) */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={getFilterButtonClass('all')}
            >
              전체
            </button>
            <button
              onClick={() => setFilterStatus('ongoing')}
              className={getFilterButtonClass('ongoing')}
            >
              진행중
            </button>
            <button
              onClick={() => setFilterStatus('future')}
              className={getFilterButtonClass('future')}
            >
              미래
            </button>
            <button
              onClick={() => setFilterStatus('past')}
              className={getFilterButtonClass('past')}
            >
              과거
            </button>
          </div>

          {/* 정렬 UI (Select Dropdown) */}
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
          {/* [수정] 🚨 렌더링 시 onDelete prop으로 핸들러를 전달합니다. */}
          {sortedPlans.map(plan => (
            <TravelPlanCard 
              key={plan._id} 
              plan={plan} 
              openMenuId={openMenuId} // [추가] 🚨 메뉴 열림 상태 전달
              setOpenMenuId={setOpenMenuId} // [추가] 🚨 메뉴 상태 변경 함수 전달
              handleToggleFavorite={handleToggleFavorite} // [추가] 🚨 즐겨찾기 토글 핸들러 전달
              handleDelete={handleDelete} // [수정] 🚨 삭제 핸들러 전달
            />
          ))}
          
          {/* 새로운 계획 추가 카드를 렌더링합니다. */}
          <AddNewPlanCard />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
// frontend/src/pages/MainPage.jsx

/**
 * src/pages/MainPage.jsx
 * [수정] 
 * 1. (GET) 목업 데이터 대신 API로 실제 여행 목록을 불러옵니다.
 * 2. (DELETE) 삭제 API를 호출하는 핸들러를 추가합니다.
 * 3. (UI) TravelPlanCard 컴포넌트에 삭제 버튼을 추가하고, 핸들러를 prop으로 전달합니다.
 */
import React, { useState, useMemo, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react';
// [수정] 🚨 삭제 아이콘 대신 더보기, 즐겨찾기, 삭제 아이콘을 import 합니다.
import { IoEllipsisVertical, IoStar, IoStarOutline, IoTrashOutline, IoChevronDown, IoCheckmark } from 'react-icons/io5';

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
 * [수정] group-hover를 사용하여 마우스를 올렸을 때 텍스트가 나타나는 효과를 추가합니다.
 * [수정] hover:scale-105를 추가하여 마우스를 올렸을 때 카드가 확대되는 효과를 추가합니다.
 */
const AddNewPlanCard = () => (
  // 1. <Link>에 `group` 클래스를 추가하여 하위 엘리먼트에서 `group-hover`를 사용할 수 있도록 합니다.
  // 2. `flex-col`을 추가하여 아이콘과 텍스트를 수직으로 정렬합니다.
  // 3. `transform`과 `hover:scale-105`를 추가하여 호버 시 확대되는 애니메이션 효과를 적용합니다.
  <Link 
    to="/create-plan" 
    className="group flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg border-2 border-dashed border-primary hover:bg-primary transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    {/* 아이콘: group-hover 시 색상이 흰색으로 변경됩니다. */}
    <span className="text-5xl text-primary group-hover:text-white transition-colors duration-300">+</span>
    
    {/* 
      설명 텍스트:
      - 기본적으로 `opacity-0`으로 숨겨져 있습니다.
      - 부모(`group`)에 호버하면 `group-hover:opacity-100`에 의해 부드럽게 나타납니다.
      - `transition-opacity`와 `duration-300`으로 애니메이션 효과를 줍니다.
    */}
    <p className="font-medium text-sm text-primary group-hover:text-white mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      새로운 여행 계획을 추가합니다
    </p>
  </Link>
);

const sortOptions = [
  { id: 'modified_desc', name: '마지막 수정시간 (최근순)' },
  { id: 'modified_asc', name: '마지막 수정시간 (과거순)' },
  { id: 'title_asc', name: '제목 (오름차순)' },
  { id: 'title_desc', name: '제목 (내림차순)' },
  { id: 'date_asc', name: '여행일정 (최근순)' },
  { id: 'date_desc', name: '여행일정 (과거순)' },
];


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
  // [추가] 🚨 즐겨찾기된 항목이 항상 최상단에 오도록 1차 정렬 기준을 추가합니다.
  const sortedPlans = useMemo(() => {
    const copy = [...filteredPlans]; // 원본 배열을 `filteredPlans`로 변경

    copy.sort((a, b) => {
      // [주석] 🚨 1순위 정렬: 즐겨찾기 여부 (true가 항상 먼저 오도록)
      // a.isFavorite가 true이면 -1 (a를 b보다 앞으로), b.isFavorite가 true이면 1 (b를 a보다 앞으로)
      // 즉, isFavorite가 true인 항목이 false인 항목보다 먼저 오게 됩니다.
      if (a.isFavorite !== b.isFavorite) {
        return a.isFavorite ? -1 : 1; 
      }

      // [주석] 🚨 2순위 정렬: 사용자가 선택한 정렬 기준 (즐겨찾기 상태가 동일할 때만 적용)
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
    return copy;
  }, [filteredPlans, sortOrder]); // 의존성 배열을 `filteredPlans`로 변경

  const getFilterButtonClass = (status) => (
    `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-110 ` +
    (filterStatus === status
      ? 'bg-primary text-white'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-primary">My Travel Plans</h1>
          
          {/* 
            [추가] 🚨 필터 UI (버튼 그룹)
            - 각 버튼은 호버 시 확대되는 애니메이션 효과(transform, hover:scale-110)를 가집니다.
          */}
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

          {/* 정렬 UI (Listbox로 교체) */}
          {/* 기존 <select>는 OS 기본 UI를 사용하여 스타일링에 한계가 있으므로,
              @headlessui/react의 Listbox를 사용하여 커스텀 드롭다운을 구현합니다. */}
          <div className="relative w-72"> {/* Listbox를 감싸는 컨테이너, relative 필수 */}
            <Listbox value={sortOrder} onChange={setSortOrder}>
              {/* 1. Listbox 버튼 (현재 선택된 값 표시) */}
              <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-light">
                <span className="block truncate">
                  {/* 현재 선택된 옵션의 'name'을 표시 */}
                  {sortOptions.find(opt => opt.id === sortOrder)?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <IoChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              
              {/* 2. Listbox 옵션 목록 (애니메이션 및 스타일 적용) */}
              {/* Transition 컴포넌트의 enter/leave 관련 클래스는 '부드러운 애니메이션 효과'를 담당합니다. */}
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                // (참고) '펼쳐질 때' 애니메이션은 'enter' 클래스를 사용합니다.
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
              >
                {/* Listbox.Options의 'rounded-md' 클래스가 '둥근 모서리'를 구현합니다. */}
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                  
                  {sortOptions.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      value={option.id}
                      // 'active' 상태(마우스 호버)에 따라 배경색을 동적으로 변경합니다.
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-primary/10 text-primary' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        // 'selected' 상태에 따라 글꼴 두께와 체크마크를 다르게 표시합니다.
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {option.name}
                          </span>
                          {/* 선택된 항목은 체크마크 표시 */}
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                              <IoCheckmark className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
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
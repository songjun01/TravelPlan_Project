# 개발 일지

## 프로젝트 개요
- 프로젝트명: 여행플래너
- 개발 기간: 2025.10.23 -
- 목표: 여행 추가, 수정, 삭제 등 기능 구현. 데이터베이스를 활용한 계획저장 및 관리.


## 개발 과정

### Day 1 (2025.10.23)
- **작업 내용**: 작업을 위한 웹페이지 구성을 알려주고 Gemini CLI를 위한 프롬프트를 생성.
- **Gemini CLI 사용 프롬프트**:
```당신은 MERN 스택과 Tailwind CSS에 능숙한 전문 풀스택 개발자입니다.

개인 여행 계획 웹사이트를 만드는 새로운 프로젝트를 생성해 주세요. 우선 **메인 화면** 구현에 중점을 둡니다.

다음은 프로젝트의 요구 사항입니다.

### 1. 사용할 기술 스택
* **프론트엔드:** React (최신 버전, Vite 사용)
* **백엔드:** Node.js (Express 프레임워크 사용)
* **데이터베이스:** MongoDB
* **스타일링:** Tailwind CSS

### 2. UI/UX 디자인 컨셉
* **디자인:** 깨끗하고 미니멀하며 고급스러운 느낌.
* **색상:** 화이트와 파스텔 톤을 메인 색상으로 사용.
* **레이아웃:** 반응형 웹 디자인 (데스크톱, 태블릿, 모바일 최적화).
* **UI:** 직관적이고 사용하기 쉬운 인터페이스.

### 3. 초기 구현 범위: 메인 화면
전체적인 웹페이지 구성을 고려하되, 이번 작업에서는 **메인 화면** 컴포넌트(`MainPage.jsx`)만 실제 UI를 구현합니다.

* **메인 화면 (`MainPage.jsx`):**
    * 초기 렌더링을 위해 3-4개의 목업(mock) 여행 계획 데이터를 사용해 주세요.
    * Google Drive와 유사한 **카드형 그리드 레이아웃**을 구현합니다.
    * **여행 계획 상자 (카드):** 각 카드는 다음 정보를 표시해야 합니다.
        1.  제목
        2.  여행 지역
        3.  일정 (예: '2025.10.26 ~ 2025.10.28')
        4.  마지막 수정 날짜
    * **새 계획 추가 버튼:**
        * 그리드의 마지막 항목으로 표시합니다.
        * 기존 여행 계획 상자와 동일한 크기와 모양을 가집니다.
        * 스타일: **점선 테두리**와 **가운데 큰 '+' 아이콘**으로 디자인합니다.

### 4. 기타 페이지 (플레이스홀더)
* `TravelDetailPage.jsx`
* `PlanEditorPage.jsx`

위의 두 파일은 우선 "여행 상세 페이지", "계획 추가/수정 페이지"라는 텍스트만 렌더링하는 빈 컴포넌트로 생성합니다. 라우팅 설정은 `App.jsx`에 포함해 주세요.

### 5. 필수 산출물
1.  **상세한 주석:** 생성된 모든 코드 파일(React 컴포넌트, 백엔드 라우터, 모델 등)에 각 코드 블록의 역할과 로직을 이해하기 쉽도록 상세한 주석을 달아주세요.
2.  **프로젝트 폴더 구조 설명:** 프론트엔드(`frontend`)와 백엔드(`backend`)가 분리된 모노레포 구조를 설명하는 내용을 `README.md`에 포함해 주세요.
3.  **`README.md` 파일:**
    * 프로젝트에 대한 간략한 설명.
    * 위에서 요청한 폴더 구조 설명.
    * 프론트엔드 및 백엔드 각각의 종속성 설치 방법 (`npm install` 또는 `yarn install`).
    * 프로젝트 실행 방법 (개발 모드에서 프론트엔드와 백엔드를 동시에 실행하는 방법).
4.  **`package.json` 파일:**
    * `frontend` 및 `backend` 폴더 각각에 `package.json` 파일을 생성해 주세요.
    * 필요한 **주요 라이브러리** 목록을 `dependencies` 또는 `devDependencies`에 명시해 주세요.
        * **Frontend:** `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `postcss`, `autoprefixer`
        * **Backend:** `express`, `mongoose`, `cors`, `dotenv`, `nodemon`
```
- **결과 및 수정사항**: 메인페이지의 구성과 세부 페이지의 작동을 구현하였고, 백엔드 개발 성공
- **학습 내용**: Gemini CLI 프로젝트 생성 및 빌드 명령어 사용법

---

- **작업 내용**: 메인페이지 css 수정
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, 방금 생성한 여행 계획 웹사이트 프로젝트의 스타일을 수정합니다.

새로운 메인 색상으로 `#2ecc71`를 사용하고 싶습니다.

다음 작업을 수행해 주세요.

1.  **`frontend/tailwind.config.js` 파일 수정:**
    * `theme.extend.colors` 객체 안에 새로운 `primary` 색상 키를 추가하고 값을 `#2ecc71`로 설정해 주세요.
    * 이 수정 사항에 대한 주석을 코드에 추가해 주세요.

2.  **`frontend/src/pages/MainPage.jsx` 파일 수정:**
    * `tailwind.config.js`에 방금 추가한 `primary` 색상을 사용하여 메인 페이지의 주요 UI 요소를 강조해 주세요.
    * **페이지 제목:** `MainPage.jsx`의 최상단 제목(예: "내 여행 계획")의 텍스트 색상을 `text-primary`로 변경해 주세요. (Tailwind 유틸리티 클래스 사용)
    * **'새 계획 추가' 버튼:**
        * 점선 테두리 색상을 `border-primary`로 변경해 주세요.
        * 가운데 '+' 아이콘의 텍스트 색상을 `text-primary`로 변경해 주세요.
        * **호버(hover) 효과 추가:** 마우스를 올리면 배경색은 `bg-primary`로, 아이콘 색상은 `text-white`로 변경되도록 트랜지션 효과와 함께 적용해 주세요.
    * 이 수정 사항들에 대한 주석도 코드에 상세히 달아주세요.
```
- **결과 및 수정사항**: 메인페이지의 css를 일부 성공적 수정
- **학습 내용**: Gemini CLI AI를 이용한 페이지의 css 수정방법

---

### Day 2 (2025.10.24)

- **작업 내용**: 여행 상세 페이지 구현
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, 여행 계획 웹사이트의 **여행 상세 페이지**를 구현합니다.

이 페이지는 메인 화면에서 특정 여행 계획 카드를 클릭했을 때 이동하는 페이지입니다.

### 1. 라우팅 설정 (동적 라우팅)

1.  **`frontend/src/App.jsx` 수정:**
    * `react-router-dom`을 사용하여 동적 라우트를 설정합니다.
    * 기존의 `<Route path="/detail" ... />` (가정)을 `<Route path="/plan/:planId" element={<TravelDetailPage />} />`로 수정하여, URL 파라미터(`planId`)를 받을 수 있게 해주세요.

2.  **`frontend/src/pages/MainPage.jsx` 수정:**
    * `react-router-dom`의 `Link` 컴포넌트를 import 하세요.
    * 기존의 "여행 계획 상자 (카드)" 전체를 `<Link>` 태그로 감싸주세요.
    * 클릭 시 목업 데이터의 ID를 사용하여 동적 URL(예: `/plan/mock-id-1`)로 이동하도록 링크를 설정해 주세요.
    * 카드에 마우스를 올리면 부드럽게 확대되거나 그림자가 짙어지는 호버 효과를 추가해 주세요.

### 2. 여행 상세 페이지 구현 (`frontend/src/pages/TravelDetailPage.jsx`)

이전에 플레이스홀더로 만들었던 `TravelDetailPage.jsx` 파일의 내용을 다음 요구사항에 맞게 구현해 주세요.

1.  **목업 데이터 (Mock Data):**
    * 페이지 상단에 상세 페이지를 렌더링하기 위한 단일 여행 계획 목업 데이터를 정의해 주세요. 이 데이터는 다음 구조를 가져야 합니다:
        * `title` (예: "가을의 교토, 3박 4일")
        * `region` (예: "일본, 교토")
        * `lastModified` (예: "2025년 10월 23일")
        * `itinerary` (배열): 날짜별 객체를 포함.
            * 각 날짜별 객체는 `date` (예: "2025.11.01")와 `events` (배열)를 가짐.
            * `events` 배열은 "방문"과 "이동" 객체를 포함.
                * **방문 객체:** `{ type: 'visit', time: '10:00', place: '청수사', address: '...', duration: '2시간' }`
                * **이동 객체:** `{ type: 'move', time: '12:00', transport: '버스', from: '청수사', to: '금각사', duration: '45분' }`
    * 이 목업 데이터를 기반으로 UI를 렌더링합니다.

2.  **UI 구성:**
    * **최상단 헤더:**
        * `title` (큰 글씨, 굵게)
        * `region`
        * `lastModified` (작은 글씨, 회색 톤)
    * **세부 일정 (Itinerary):**
        * `itinerary` 배열을 순회하며 렌더링합니다.
        * **날짜 구분:** "Day 1 - 2025.11.01"과 같이 날짜별로 섹션을 명확히 구분합니다. (Tailwind의 `border-b` 등으로 구분선 추가)
        * **이벤트 목록:** 각 날짜의 `events` 배열을 순회하며 렌더링합니다.
            * "방문"과 "이동" 이벤트를 구분하여 다른 아이콘(예: `react-icons` 라이브러리 사용 - `MapPin` 아이콘, `Bus` 아이콘 등)과 함께 표시해 주세요.
            * 각 이벤트의 세부 정보(시간, 장소, 주소, 교통수단 등)를 깔끔하게 표시합니다.
            * (옵션) 타임라인 형태로 표시하면 더욱 좋습니다.
    * **수정하기 버튼:**
        * 페이지의 **우측 하단**에 **고정**되어 떠 있는 **플로팅 액션 버튼(FAB)** 형태로 구현합니다.
        * `react-router-dom`의 `Link`를 사용하여 `/edit/:planId` (가정)와 같은 수정 페이지로 이동하도록 설정합니다.
        * **스타일:** `tailwind.config.js`에 설정한 `primary` 색상(`bg-primary`)을 배경으로 사용하고, 내부에 "수정하기" 텍스트 또는 "연필" 아이콘을 넣습니다.

3.  **스타일링 및 주석:**
    * 전체적으로 깨끗하고 미니멀한 디자인 컨셉을 유지합니다.
    * Tailwind CSS 유틸리티 클래스를 적극적으로 사용합니다.
    * 모든 코드 블록과 로직에 상세한 주석을 달아주세요.
```
- **결과 및 수정사항**: 여행 상세 페이지 생성 및 구현
- **학습 내용**: Gemini CLI 페이지 생성 명령어 사용법

---

- **작업 내용**: 여행 상세 페이지에서 뒤로가기 구현
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, `TravelDetailPage.jsx`에 **메인 페이지로 돌아가는 '뒤로가기' 버튼**을 추가합니다.

### 1. 수정할 파일
* `frontend/src/pages/TravelDetailPage.jsx`

### 2. 요구 사항
1.  **아이콘 Import:**
    * `react-icons` 라이브러리에서 뒤로가기 화살표 아이콘을 import 합니다. (예: `react-icons/io5`의 `IoArrowBack`)

2.  **`Link` 컴포넌트 Import:**
    * `react-router-dom`에서 `Link` 컴포넌트를 import 합니다.

3.  **버튼 배치:**
    * 페이지의 **최상단**, 즉 이전에 만든 헤더 영역(제목, 지역, 날짜가 나오는 곳) **바로 위**에 `Link` 컴포넌트를 배치합니다.

4.  **버튼 기능 및 스타일:**
    * `Link` 컴포넌트의 `to` 속성을 `/"`로 설정하여, 클릭 시 메인 페이지로 이동하도록 합니다.
    * **스타일링:**
        * 버튼은 아이콘만 표시합니다. (예: `<IoArrowBack size={24} />`)
        * Tailwind CSS를 사용하여 깔끔하고 미니멀한 스타일을 적용합니다.
        * 예시 클래스: `inline-block p-2 rounded-full hover:bg-gray-100 transition-colors`
        * 버튼과 아래 헤더 콘텐츠 사이에 적절한 하단 여백(`mb-4` 등)을 추가하여 공간을 확보합니다.

5.  **주석:**
    * 새로 추가된 import 구문과 `Link` 버튼 코드에 대해 상세한 주석을 달아주세요.
```
- **결과 및 수정사항**: 여행 상세 페이지에서 메인페이지로 이동하는 기능을 구현
- **학습 내용**: Gemini CLI를 이용한 웹페이지 기능 추가 방법

---

- **작업 내용**: 여행 추가 페이지 구현
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, 메인 화면의 '+' 버튼을 클릭했을 때 이동하는 **'새 여행 계획 추가 페이지'**를 구현합니다.

이 페이지는 사용자가 여행의 기본 정보를 설정하고, 날짜별 일정을 추가하는 페이지입니다.

### 1. 신규 라이브러리 설치 (프롬프트 내 지시)

* 이 기능을 위해 날짜 선택 라이브러리가 필요합니다. `frontend` 폴더에 `react-datepicker`와 `date-fns`를 설치하도록 `package.json`을 수정하고, 관련 안내를 `README.md`에 추가해 주세요.
* `react-datepicker`의 기본 CSS를 `frontend/src/main.jsx` (또는 `index.css`)에 import 해주세요. (예: `import 'react-datepicker/dist/react-datepicker.css';`)

### 2. 라우팅 및 링크 설정

1.  **`frontend/src/App.jsx` 수정:**
    * 새 페이지를 위한 라우트를 추가합니다.
    * `<Route path="/create-plan" element={<PlanEditorPage />} />`

2.  **`frontend/src/pages/MainPage.jsx` 수정:**
    * 메인 페이지의 마지막에 있던 "새 계획 추가" 버튼을 `react-router-dom`의 `<Link>` 컴포넌트로 감싸주세요.
    * 클릭 시 `/create-plan` 경로로 이동하도록 `to` 속성을 설정합니다.

### 3. 계획 추가/수정 페이지 구현 (`frontend/src/pages/PlanEditorPage.jsx`)

이전에 플레이스홀더로 만들었던 `PlanEditorPage.jsx` 파일의 내용을 다음 요구사항에 맞게 구현합니다. 이 페이지는 상태 관리가 중요하므로 `useState`를 적극적으로 활용합니다.

1.  **페이지 전체 레이아웃:**
    * 페이지 상단에 "새로운 여행 계획 만들기" 제목을 표시합니다.
    * 메인 페이지로 돌아가는 '뒤로가기' 버튼을 `TravelDetailPage`에서 구현한 것과 동일하게 추가합니다. (`to="/"`)
    * 페이지 하단에 "저장하기" 버튼을 배치합니다.

2.  **상태(State) 관리 (`useState`):**
    * 여행 전체 데이터를 관리할 `plan` 상태를 정의합니다.
        * `title` (문자열, 초기값: "")
        * `region` (문자열, 초기값: "")
        * `startDate` (Date 객체, 초기값: `new Date()`)
        * `endDate` (Date 객체, 초기값: `startDate`와 동일)
        * `itinerary` (배열, 초기값: `[]`)

3.  **컴포넌트 구현:**

    * **1) 기본 정보 입력 (폼):**
        * **여행 제목:** `input` 필드. (값: `plan.title`, `onChange` 핸들러)
        * **여행 지역:** `input` 필드. (값: `plan.region`, `onChange` 핸들러)

    * **2) 여행 날짜 선택 (Date Picker):**
        * `react-datepicker` 라이브러리를 사용합니다.
        * **시작 날짜:** `<DatePicker selected={plan.startDate} ... />`
        * **종료 날짜:** `<DatePicker selected={plan.endDate} ... />`
        * `selectsRange`, `startDate`, `endDate` 옵션을 사용하여 범위 선택(range selection)을 구현합니다.
        * 날짜가 변경되면 `plan.startDate`와 `plan.endDate` 상태를 업데이트하는 핸들러를 구현합니다.
        * (중요) 날짜 범위가 변경되면, 해당 날짜 범위에 맞게 `itinerary` 상태를 자동으로 생성하거나 초기화하는 로직을 추가합니다. (예: 3일짜리 여행이면 `itinerary`가 3개의 빈 날짜 객체를 가지도록 설정)

    * **3) 세부 일정 편집기 (Itinerary Editor):**
        * `plan.itinerary` 배열을 `map`으로 순회하며 날짜별 편집 섹션을 렌더링합니다.
        * 각 날짜 섹션(예: "Day 1 - 2025.11.01") 하단에 두 개의 버튼을 배치합니다:
            * **[+ 방문 장소 추가] 버튼**
            * **[+ 이동 경로 추가] 버튼**
        * 각 버튼 클릭 시, `itinerary` 상태의 해당 날짜 `events` 배열에 새로운 '방문(visit)' 또는 '이동(move)' 객체를 추가하는 핸들러를 구현합니다. (초기에는 빈 값으로)

    * **4) 이벤트 입력 폼 (동적 생성):**
        * `itinerary`의 `events` 배열을 `map`으로 순회하며 렌더링합니다.
        * `event.type === 'visit'`일 경우:
            * '방문 장소', '주소', '거주 시간'을 입력할 수 있는 `input` 필드들을 보여줍니다.
        * `event.type === 'move'`일 경우:
            * '교통수단', '출발 장소', '도착 장소', '소요 시간'을 입력할 수 있는 `input` 필드들을 보여줍니다.
        * 각 `input` 필드는 `itinerary` 상태와 양방향 바인딩되어야 합니다. (상태 변경 핸들러 필요)
        * 각 이벤트 항목 옆에 '삭제' (휴지통 아이콘) 버튼을 만들어 해당 이벤트를 `itinerary` 상태에서 제거하는 기능을 구현합니다.

4.  **스타일링 및 주석:**
    * 입력 폼과 버튼에 `tailwind.config.js`의 `primary` 색상을 적절히 사용하여 디자인 통일성을 유지합니다.
    * `react-datepicker`가 기본 CSS 외에도 미니멀한 디자인에 어울리도록 Tailwind 클래스로 일부 스타일을 오버라이드합니다.
    * 복잡한 상태 관리 로직과 컴포넌트 구조에 대해 상세한 주석을 달아주세요.
```
- **결과 및 수정사항**: 여행 계획 페이지 생성 및 구현
- **학습 내용**: Gemini CLI 페이지 생성 명령어 프롬프트

---

- **작업 내용**: 계획 추가 페이지 디자인 수정
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, `TravelDetailPage.jsx`의 UI를 개선합니다.

현재 평면적인 디자인 대신, 메인 페이지의 카드처럼 **(1) 여행 기본 정보(제목, 장소 등)**와 **(2) 각 날짜별 세부 일정**을 시각적으로 구분되는 **별도의 '박스' 컨테이너**로 만들고 싶습니다.

### 1. 수정할 파일
* `frontend/src/pages/TravelDetailPage.jsx`

### 2. 요구 사항

1.  **페이지 배경색 추가:**
    * 카드(박스) UI가 시각적으로 돋보이도록, 페이지의 최상위(루트) `div`에 배경색과 패딩을 추가합니다.
    * **적용할 클래스:** `min-h-screen bg-gray-50 p-4 md:p-8`
    * (참고: '뒤로가기' 버튼은 이 패딩 영역 내의 최상단에 위치해야 합니다.)

2.  **여행 기본 정보 '박스' 생성:**
    * '뒤로가기' 버튼 바로 아래에 있던 **여행 `title`, `region`, `lastModified`를 렌더링하는 JSX 부분**을 하나의 `<div>`로 감싸주세요.
    * 이 `<div>`에 카드 스타일을 적용합니다.
    * **적용할 클래스:** `bg-white rounded-lg shadow-md p-6 mb-6` (또는 `mb-8`)
    * 이 `div`가 새로 추가된 래퍼(wrapper)임을 주석으로 명시해 주세요.

3.  **각 '날짜별 일정' '박스' 생성:**
    * `plan.itinerary.map(...)` 메서드 내부의 로직을 수정합니다.
    * 기존에는 각 날짜를 `border-b` 등으로 구분했다면, 이제는 **각 날짜별 콘텐츠 전체(예: "Day 1" 제목 + 해당 날짜의 이벤트 목록)를** `map` 순회 시마다 하나의 `<div>`로 감싸주세요.
    * 이 `<div>`에 위와 동일한 카드 스타일을 적용합니다.
    * **적용할 클래스:** `bg-white rounded-lg shadow-md p-6 mb-4` (각 날짜 카드 사이의 간격을 위해 `mb-4` 추가)
    * **내부 구분선:** 박스 내부에서 날짜 제목(예: "Day 1 - 2025.11.01")과 이벤트 목록을 구분하는 `border-b pb-3 mb-4` 클래스를 날짜 제목 `<h3>` 태그에 적용하여 내부 구조를 명확히 합니다.

4.  **주석:**
    * 페이지 배경색, 기본 정보 박스, 날짜별 일정 박스를 감싸기 위해 추가된 `div` 래퍼와 스타일 변경 사항에 대해 상세한 주석을 달아주세요.
```
- **결과 및 수정사항**: 계획 추가 페이지의 디자인 박스 형식으로 수정
- **학습 내용**: Gemini CLI를 이용한 웹페이지 디자인 수정

---

- **작업 내용**: 여행 상세 페이지 디자인 수정
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, `TravelDetailPage.jsx`의 레이아웃을 수정합니다.

현재 페이지의 모든 정보(정보 박스, 날짜별 일정 박스 등)가 특히 넓은 화면에서 너무 왼쪽에 붙어 있습니다. 이 콘텐츠 블록들이 페이지 중앙에 오도록 정렬하고 싶습니다.

### 1. 수정할 파일
* `frontend/src/pages/TravelDetailPage.jsx`

### 2. 요구 사항
1.  **중앙 정렬 래퍼(Wrapper) 추가:**
    * 기존의 최상위 루트 `div` (배경색 `bg-gray-50`이 적용된) **바로 안쪽**에 새로운 `<div>` 래퍼를 추가합니다.
    * 이 새로운 래퍼는 '뒤로가기' 버튼, '여행 기본 정보 박스', 그리고 `itinerary`를 매핑하는 '날짜별 일정 박스' 리스트 **전부**를 감싸야 합니다.
2.  **스타일 적용:**
    * 새로 추가한 래퍼 `<div>`에 최대 너비(max-width)와 자동 마진(auto-margin)을 적용하여 콘텐츠 영역을 중앙에 배치합니다.
    * **적용할 클래스:** `max-w-4xl mx-auto`
    * (참고: `max-w-4xl`은 적절한 콘텐츠 너비 예시이며, `max-w-3xl` 또는 `max-w-5xl` 등으로 조절할 수 있습니다.)
3.  **주석:**
    * 이 새로운 중앙 정렬 래퍼 `div`의 역할에 대해 설명하는 주석을 코드에 추가해 주세요.
```
- **결과 및 수정사항**: 여행 상세 페이지 디자인 정렬
- **학습 내용**: Gemini CLI를 이용한 웹페이지 디자인 수정

---

- **작업 내용**: 계획 추가 페이지 디자인 수정
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, `PlanEditorPage.jsx` (여행 계획 생성 페이지)의 레이아웃을 `TravelDetailPage.jsx`와(과) 동일한 스타일(배경색, 중앙 정렬, 카드 UI)로 통일합니다.

### 1. 수정할 파일
* `frontend/src/pages/PlanEditorPage.jsx`

### 2. 요구 사항

1.  **페이지 배경 및 중앙 정렬 래퍼(Wrapper) 적용:**
    * `TravelDetailPage`와 동일하게, 최상위 루트 `div`에 페이지 배경색과 기본 패딩을 적용합니다.
    * **적용할 클래스:** `min-h-screen bg-gray-50 p-4 md:p-8`
    * 그 바로 안쪽에, '뒤로가기' 버튼을 포함한 **페이지의 모든 콘텐츠를 감싸는** 중앙 정렬 래퍼 `<div>`를 추가합니다.
    * **적용할 클래스:** `max-w-4xl mx-auto`

2.  **메인 폼 카드(Box) 생성:**
    * 중앙 정렬 래퍼(`max-w-4xl`) 내부, 그리고 '뒤로가기' 버튼 바로 아래에, **"새로운 여행 계획 만들기" 제목과 모든 폼 요소, "저장하기" 버튼까지 하나로 묶는** 메인 `<div>`를 생성합니다.
    * 이 `<div>`에 `TravelDetailPage`의 박스와 동일한 카드 스타일을 적용합니다.
    * **적용할 클래스:** `bg-white rounded-lg shadow-md overflow-hidden`

3.  **카드 내부 구조화:**
    * 새로 만든 흰색 카드 `<div>` 내부의 콘텐츠들을 시각적으로 구분합니다.
    * **a. 카드 헤더:** "새로운 여행 계획 만들기" `h1` (또는 `h2`) 태그를 `div`로 감싸거나 직접 스타일을 적용하여 카드 헤더처럼 만듭니다.
        * **적용할 클래스:** `p-6 border-b`
    * **b. 폼 섹션 (기본 정보):** "여행 제목", "여행 지역" `input` 필드가 있는 영역을 `div`로 감싸고 패딩을 줍니다.
        * **적용할 클래스:** `p-6`
    * **c. 폼 섹션 (날짜 선택):** `react-datepicker`가 있는 영역을 `div`로 감싸고, 이전 섹션과 구분하기 위해 상단 테두리와 패딩을 줍니다.
        * **적용할 클래스:** `p-6 border-t`
    * **d. 폼 섹션 (세부 일정):** `itinerary`를 `map`으로 순회하는 세부 일정 편집기 영역 전체를 `div`로 감싸고, 상단 테두리와 패딩을 줍니다.
        * **적용할 클래스:** `p-6 border-t`
    * **e. 카드 푸터 (저장 버튼):** "저장하기" 버튼을 `div`로 감싸고, 상단 테두리와 패딩을 주어 카드 푸터처럼 만듭니다. 버튼을 오른쪽으로 정렬합니다.
        * **적용할 클래스:** `p-6 border-t text-right`

4.  **주석:**
    * 새로 추가된 배경, 중앙 정렬 래퍼, 그리고 폼 전체를 감싸는 메인 카드 `div`의 역할에 대해 상세한 주석을 달아주세요.
```
- **결과 및 수정사항**: 계획 추가 페이지의 디자인 및 정렬 수정
- **학습 내용**: Gemini CLI를 이용한 웹페이지 디자인 수정

---

- **작업 내용**: 메인 페이지 정렬기능 추가
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, `MainPage.jsx` (메인 페이지)에 여행 계획을 정렬하는 기능을 추가합니다.

### 1. 수정할 파일
* `frontend/src/pages/MainPage.jsx`

### 2. 요구 사항

1.  **`useMemo` 및 `useState` Import:**
    * `react`에서 `useState`와 `useMemo`를 import 합니다.

2.  **목업 데이터(Mock Data) 구조 확인:**
    * `mockTravelPlans` (또는 유사한 이름의) 배열에 있는 각 객체가 정렬을 위한 표준화된 키를 가지고 있는지 확인하고, 없다면 수정해 주세요.
    * **`startDate`:** '여행일정' 정렬을 위해 필요합니다. (예: `startDate: '2025-11-01'`)
    * **`lastModified`:** '마지막 수정시간' 정렬을 위해 필요합니다. (예: `lastModified: '2025-10-24T14:30:00Z'`)
    * `title`은 이미 있어야 합니다.

3.  **정렬 상태(State) 추가:**
    * 현재 정렬 순서를 저장하기 위한 `useState`를 추가합니다.
    * `const [sortOrder, setSortOrder] = useState('modified_desc');`
    * `'modified_desc'` (마지막 수정시간 최근순)를 기본값으로 설정합니다.

4.  **정렬 UI (Select Dropdown) 추가:**
    * 페이지 제목(예: "내 여행 계획")과 여행 계획 카드 그리드 **사이**에 정렬 옵션을 선택할 수 있는 `<select>` 드롭다운 메뉴를 추가합니다.
    * 이 드롭다운을 감싸는 `div`를 추가하고, Tailwind CSS를 사용해 **오른쪽 정렬**(`flex justify-end`) 시켜주세요.
    * `<select>` 요소의 스타일은 미니멀하게 적용합니다. (예: `border rounded-md px-3 py-2`)
    * `<select>`의 `value`는 `sortOrder` 상태와 바인딩합니다.
    * `onChange` 이벤트 핸들러를 추가하여, 옵션 선택 시 `setSortOrder`를 호출해 상태를 업데이트하도록 합니다.
    * `<option>` 태그로 다음 정렬 옵션들을 추가합니다:
        * `value="modified_desc"`: 마지막 수정시간 (최근순)
        * `value="modified_asc"`: 마지막 수정시간 (과거순)
        * `value="title_asc"`: 제목 (오름차순)
        * `value="title_desc"`: 제목 (내림차순)
        * `value="date_asc"`: 여행일정 (최근순)
        * `value="date_desc"`: 여행일정 (과거순)

5.  **정렬 로직 구현 (`useMemo`):**
    * 원본 `mockTravelPlans` 배열을 `sortOrder` 상태에 따라 정렬한 `sortedPlans` 배열을 생성하기 위해 `useMemo`를 사용합니다.
    * `useMemo`의 의존성 배열에는 `[mockTravelPlans, sortOrder]`를 포함합니다.
    * 로직 내부:
        * 원본 배열을 변형하지 않기 위해 `[...mockTravelPlans]`로 복사본을 만듭니다.
        * `switch (sortOrder)` 문을 사용하여 각 케이스별로 `sort()` 메서드를 구현합니다.
            * `modified_...`: `new Date(b.lastModified) - new Date(a.lastModified)` (desc)
            * `date_...`: `new Date(a.startDate) - new Date(b.startDate)` (asc, 최근 다가오는 순)
            * `title_...`: `a.title.localeCompare(b.title)` (asc)
        * 정렬된 배열을 반환합니다.

6.  **렌더링 업데이트:**
    * 기존에 `mockTravelPlans.map(...)`을 사용하던 부분을 `sortedPlans.map(...)`으로 변경하여, 정렬된 리스트가 렌더링되도록 수정합니다.

7.  **주석:**
    * 새로 추가된 `useState`, `useMemo` 로직, 그리고 `<select>` UI 부분에 대해 상세한 주석을 달아주세요.
```
- **결과 및 수정사항**: 메인 페이지에 정렬기능 추가 및 구현 확인
- **학습 내용**: Gemini CLI를 이용한 웹페이지 기능 추가

---

- **작업 내용**: 프론트엔드-백엔드-데이터베이스 간 연결
- **Gemini CLI 사용 프롬프트**:
```
프론트엔드-백엔드-데이터베이스를 실시간으로 연동시키고싶어. 코드를 수정해줘
```
- **결과 및 수정사항**: 연결 성공 및 데이터 저장, 수정 확인
- **학습 내용**: 프론트엔드-백엔드-데이터베이스의 통신 방법

---

- **작업 내용**: 계획 수정/생성 페이지에서 저장 시 여행 상세 페이지로 이동하게 수정
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, '여행 계획 생성/수정 페이지'(`PlanEditorPage.jsx`)에서 "저장하기" 버튼을 눌렀을 때의 동작을 변경합니다.

**현재:** 저장 후 메인 페이지(`/`)로 이동합니다.
**목표:** 저장 후 방금 저장한/수정한 계획의 **상세 페이지**(`/plan/:planId`)로 이동합니다.

### 1. `frontend/src/App.jsx` 파일 수정

`PlanEditorPage`가 '수정' 모드일 때의 라우트가 필요합니다. (이전에 `/create-plan`만 추가했을 수 있습니다.)

1.  `PlanEditorPage`를 import 했는지 확인합니다.
2.  `<Routes>` 내부에 다음 라우트를 추가하거나 확인합니다.
    * `<Route path="/edit/:planId" element={<PlanEditorPage />} />`
    * (기존의 `<Route path="/create-plan" element={<PlanEditorPage />} />`는 그대로 둡니다.)
3.  주석을 추가하여 '생성'과 '수정'이 같은 컴포넌트를 공유함을 명시합니다.

### 2. `frontend/src/pages/PlanEditorPage.jsx` 파일 수정

1.  **필요한 훅(Hook) Import:**
    * `react-router-dom`에서 `useNavigate`와 `useParams`를 import 합니다.
    * 예: `import { useNavigate, useParams } from 'react-router-dom';`

2.  **훅 초기화:**
    * 컴포넌트 최상단에 `useNavigate`와 `useParams`를 초기화합니다.
    * `const navigate = useNavigate();`
    * `const { planId } = useParams();` // URL에서 :planId 값을 가져옵니다.

3.  **"저장하기" 버튼 핸들러 수정:**
    * "저장하기" 버튼의 `onClick`에 연결된 함수(예: `handleSave`)를 찾습니다.
    * 이 함수 내부의 맨 마지막에 있는 기존 `Maps('/')` (메인 페이지 이동) 코드를 수정합니다.
    * **로직 변경:**
        * **(수정 모드일 때):** `planId`가 존재한다면(즉, `/edit/:planId` 경로로 접근했다면), 저장 로직이 끝난 후 `Maps(`/plan/${planId}`);`를 호출합니다.
        * **(생성 모드일 때):** `planId`가 `undefined`라면(즉, `/create-plan` 경로로 접근했다면), (목업) 저장 로직이 새 ID를 생성했다고 가정합니다.
            * `const newMockId = 'mock-id-' + Date.now();` // 새 ID 생성 시뮬레이션
            * `Maps(`/plan/${newMockId}`);` // 생성된 새 ID의 상세 페이지로 이동
    * **상세한 주석:** `planId`의 존재 여부로 '생성'과 '수정' 모드를 구분하고, 그에 따라 다른 ID로 상세 페이지에 리디렉션하는 로직임을 주석으로 상세히 설명해 주세요.
```
- **결과 및 수정사항**: 계획을 수정했을 때는 여행 상세 페이지로 이동하지만, 새로 생성을 했을때는 '여행 계획을 찾을 수 없습니다'라는 글이 나오며 정상적으로 동작하지 않음을 확인.
- **학습 내용**: Gemini CLI를 활용한 웹페이지 기능 수정

---

- **작업 내용**: 여행 추가 후 추가한 여행 상세 페이지로 이동하는 작업 2차 시도
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, '새 계획 생성' 후 리디렉션 오류를 **실제 MongoDB 데이터베이스 아키텍처**에 맞게 수정합니다. (이전의 'location.state' 방식은 사용하지 않습니다.)

**문제:** '계획 생성' 페이지가 '상세 페이지'로 이동할 때, 상세 페이지가 MongoDB에서 데이터를 가져오지 않아 "찾을 수 없음" 오류가 발생합니다.
**해결:** '생성' 페이지는 API 호출로 새 ID를 받고, '상세' 페이지는 API 호출로 데이터를 직접 로드하도록 수정합니다.

---

### 1. `frontend/src/pages/PlanEditorPage.jsx` 파일 수정 (데이터 저장 및 리디렉션)

1.  **`useNavigate`, `useParams` Import:** `react-router-dom`에서 `useNavigate`와 `useParams`를 import 했는지 확인합니다.
2.  **`handleSave` (저장 핸들러) 함수 수정:**
    * "저장하기" 버튼에 연결된 `handleSave` 함수를 `async` 함수로 변경합니다.
    * **(a) '생성' 모드 로직 (planId가 없을 때):**
        * `planId`가 없는 `if` 블록을 찾습니다.
        * (기존 로직 삭제)
        * `try...catch` 블록으로 API 호출을 감쌉니다.
        * 백엔드 API에 `POST` 요청을 보내 새 계획을 생성합니다. (API 엔드포인트는 예시입니다. `/api/plans`)
            * `const response = await fetch('/api/plans', {`
            * `  method: 'POST',`
            * `  headers: { 'Content-Type': 'application/json' },`
            * `  body: JSON.stringify(plan) // 'plan'은 현재 컴포넌트의 useState 상태`
            * `});`
        * `if (!response.ok)` 에러 처리를 추가합니다.
        * 응답에서 MongoDB가 생성한 **새 계획 데이터(와 `_id`)**를 JSON으로 받습니다.
            * `const newPlan = await response.json();`
        * 이 `newPlan._id`를 사용하여 **상세 페이지로 이동**합니다.
            * `Maps(`/plan/${newPlan._id}`);`
    * **(b) '수정' 모드 로직 (planId가 있을 때):**
        * `planId`가 있는 `else` 블록을 찾습니다.
        * `PUT` (또는 `PATCH`) 요청을 백엔드 API로 보냅니다.
            * `await fetch(`/api/plans/${planId}`, { ... body: JSON.stringify(plan) ... });`
        * 저장 후 상세 페이지로 이동합니다.
            * `Maps(`/plan/${planId}`);`
    * **주석:** API 호출, 응답에서 `_id` 추출, `Maps` 경로 설정에 대해 상세한 주석을 달아주세요.

---

### 2. `frontend/src/pages/TravelDetailPage.jsx` 파일 수정 (데이터 로드)

1.  **필요한 훅 Import:**
    * `react`에서 `useState`, `useEffect`를 import 합니다.
    * `react-router-dom`에서 `useParams`를 import 합니다.
    * (중요) `useLocation` 및 `location.state`를 사용한 로직은 **모두 삭제**합니다.
2.  **컴포넌트 상태(State) 추가:**
    * `const [plan, setPlan] = useState(null);`
    * `const [loading, setLoading] = useState(true);`
    * `const [error, setError] = useState(null);`
3.  **URL 파라미터(planId) 가져오기:**
    * `const { planId } = useParams();`
4.  **데이터 로드 로직 (`useEffect`) 추가:**
    * 컴포넌트 마운트 시 `planId`를 기반으로 API에서 데이터를 가져오도록 `useEffect`를 추가합니다.
    * `useEffect(() => { ... }, [planId]);`
    * `useEffect` 내부에 `async` 함수(예: `fetchPlanData`)를 정의하고 즉시 호출합니다.
    * `try...catch` 블록을 사용합니다.
    * `setLoading(true);`
    * 백엔드 API에 `GET` 요청을 보냅니다.
        * `const response = await fetch(`/api/plans/${planId}`);`
    * 응답이 `ok`가 아니면 (예: 404 Not Found) `setError`를 호출하고 `setLoading(false)` 후 `return` 합니다.
    * 응답이 `ok`이면, JSON 데이터를 `setPlan`에 저장합니다.
        * `setPlan(await response.json());`
    * `catch` 블록에서 `setError`를 호출합니다.
    * `finally` 블록에서 `setLoading(false)`를 호출합니다.
5.  **로딩 및 에러 처리 UI:**
    * JSX의 `return` 문 상단에 로딩 및 에러 상태를 렌더링합니다.
    * `if (loading) { return <div>로딩 중...</div>; }`
    * `if (error || !plan) { return <div>여행 계획을 찾을 수 없습니다.</div>; }`
6.  **기존 렌더링 로직:**
    * 위 `if`문들 통과 후, 기존 JSX 렌더링 로직이 `plan` 상태를 사용하여 정상적으로 렌더링되도록 둡니다.
    * (기존 목업 데이터 관련 로직은 모두 삭제합니다.)
7.  **주석:** `useEffect` 훅, API fetch 로직, 로딩/에러 상태 처리에 대해 상세한 주석을 달아주세요.
```
- **결과 및 수정사항**: '여행 계획을 찾을 수 없습니다'라는 글이 나오며 정상적으로 동작하지 않음을 확인.
- **학습 내용**: Gemini CLI를 활용한 웹페이지 기능 수정

---

- **작업 내용**: 여행 추가 후 추가한 여행 상세 페이지로 이동하는 작업 3차 시도
- **Gemini CLI 사용 프롬프트**:
```
새로운 계획을 추가하고 저장하면 계속 url이 '/plan/mock-id-'와 같은 형식으로 생성되면서 '여행 계획을 찾을 수 없거나 데이터를 불러오는 데 실패했습니다.' 이런 문구가 나오며 정상작동을 하지 않아. 새로운 계획을 추가하면 추가한 여행 세부 페이지로 이동하게 수정해줘
```
- **결과 및 수정사항**: 구현 성공 및 정상 작동 확인
- **학습 내용**: Gemini AI를 활용한 웹페이지 기능 수정

---

### Day 3 (2025.10.25)

- **작업 내용**: 오늘 날짜를 기준으로 현재 진행중 / 과거 / 미래 계획만 필터링해서 볼 수 있는 기능을 추가
- **Gemini CLI 사용 프롬프트**:
```
이전 프롬프트에 이어서, `MainPage.jsx` (메인 페이지)에 날짜 기반 **필터링 기능**을 추가합니다.

기존의 정렬 기능은 그대로 유지되어야 하며, 필터링된 결과에 정렬이 적용되어야 합니다.

### 1. 수정할 파일
* `frontend/src/pages/MainPage.jsx`

### 2. 요구 사항

1.  **필터 상태(State) 추가:**
    * `useState`를 사용하여 현재 필터 상태를 저장합니다.
    * `const [filterStatus, setFilterStatus] = useState('all');`
    * `'all'` (전체)을 기본값으로 설정합니다.

2.  **필터 UI (버튼 그룹) 추가:**
    * 페이지 제목(예: "내 여행 계획")과 기존의 정렬 드롭다운 **사이**에 필터 버튼 그룹을 추가합니다.
    * '전체', '진행중', '미래', '과거' 4개의 `<button>`을 만듭니다.
    * Tailwind CSS를 사용하여 버튼 그룹을 `flex`와 `space-x-2` 등으로 스타일링합니다.
    * `onClick` 핸들러를 추가하여, 각 버튼 클릭 시 `setFilterStatus`를 호출합니다. (예: `onClick={() => setFilterStatus('ongoing')}`)
    * **활성 스타일:** 현재 `filterStatus`와 일치하는 버튼은 `bg-primary` (메인 컬러)와 `text-white` 스타일을, 나머지는 `bg-white` 또는 `bg-gray-200` 스타일을 적용하여 활성화 상태를 시각적으로 표시합니다.

3.  **날짜 비교 로직 추가:**
    * `useMemo` 훅을 사용하여 오늘 날짜(자정 기준)를 계산하고 저장합니다.
    * `const today = useMemo(() => { const now = new Date(); now.setHours(0, 0, 0, 0); return now; }, []);`
    * (참고: `useMemo`의 의존성 배열이 `[]`이므로 이 값은 한 번만 계산됩니다.)

4.  **로직 수정 (`useMemo` 체이닝):**

    * **(a) [신규] `filteredPlans` 생성 (필터링 단계):**
        * 기존의 `sortedPlans` `useMemo` **앞에** 새로운 `useMemo` 훅을 추가하여 `filteredPlans` 변수를 생성합니다.
        * 이 `useMemo`는 `[plans, filterStatus, today]`에 의존합니다. (`plans`는 API에서 가져온 전체 목록 상태 변수라고 가정합니다.)
        * 내부 로직:
            * `switch (filterStatus)` 문을 사용합니다.
            * `case 'ongoing'`: `today`가 `startDate`와 `endDate` 사이에 있는 계획만 반환합니다.
            * `case 'future'`: `startDate`가 `today`보다 미래인 계획만 반환합니다.
            * `case 'past'`: `endDate`가 `today`보다 과거인 계획만 반환합니다.
            * `case 'all'` (및 `default`): `plans` 원본 배열을 그대로 반환합니다.
            * (주의: `plan.startDate` 등은 `new Date()`로 파싱해서 `today`와 비교해야 합니다.)

    * **(b) [수정] `sortedPlans` 수정 (정렬 단계):**
        * **기존의 `sortedPlans`** `useMemo` 로직을 수정합니다.
        * **입력값 변경:** `[...plans]` (또는 `[...mockTravelPlans]`) 대신, 방금 만든 `filteredPlans`를 사용하도록 변경합니다. (예: `const copy = [...filteredPlans];`)
        * **의존성 배열 변경:** `[plans, sortOrder]` 대신 `[filteredPlans, sortOrder]`를 사용하도록 변경합니다.

5.  **렌더링:**
    * 최종적으로 `map`을 돌리는 배열은 `sortedPlans`를 그대로 사용합니다. (이 변수는 이제 필터링과 정렬이 모두 적용된 결과입니다.)

6.  **주석:**
    * `today` `useMemo`의 역할, 새로 추가된 `filteredPlans` `useMemo`의 필터링 로직, 그리고 `sortedPlans` `useMemo`가 `filteredPlans`를 입력으로 받도록 수정한 부분에 대해 상세한 주석을 달아주세요.
```
- **결과 및 수정사항**: 필터링 기능 구현 성공
- **학습 내용**: Gemini CLI를 활용한 웹페이지 기능 추가



## 주요 도전 과제 및 해결 방법  
1. **문제**: 목업데이터 대신 mongoDB에 연결하고 계획 작성 후 저장하기를 누르면 "저장 중 오류가 발생했습니다: Request failed with status code 500" 오류가 발생하는 것을 확인.
   - **해결**: 시스템 환경 내 mongoDB가 제대로 설치되어있지 않아 mongoDB 재설치 후 --fork 옵션으로 백그라운드에서 mongoDB를 실행시켜 해결
   - **AI 활용**: Gemini AI에 우분투 환경에 mongoDB 설치 방법 및 실행 방법 질문

2. **문제**: 여행 계획을 생성 후 저장하기를 누르면 '여행 계획을 찾을 수 없습니다'라는 글이 나오며 정상적으로 동작하지 않음을 확인.
   - **해결**: 새 계획 생성 후 백엔드로부터 받은 응답 데이터에서 MongoDB가 생성한 실제 _id를 가져오는 것이 아닌 존재하지 않는 id필드를 참조하려 했다는것을 발견하여 'frontend/src/pages/PlanEditorPage.jsx'파일의 handleSave 함수의 '생성 모드' 로직에서 response.data.id를 response.data._id로 수정.
   - **AI 활용**: Gemini AI에 문제 해결 방법 질문

---



 ## 바이브 코딩 활용 소감
 - AI와의 협업 경험
 - 효과적이었던 프롬프트 패턴
 - 개선이 필요한 부분
 ## 최종 결과물 평가
 - 달성한 목표:
 - 미완성 기능:
 - 향후 개선 계획:
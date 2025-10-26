# Personal Travel Planner (개인 여행 플래너)

## 1. 프로젝트 소개 ✈️

이 프로젝트는 개인적인 여행 계획을 **생성**, **조회**, **수정**, **삭제**(CRUD)하고 관리할 수 있는 웹 애플리케이션입니다. MERN 스택(MongoDB, Express, React, Node.js) 기반으로 개발되었으며, Tailwind CSS를 사용하여 깔끔하고 반응형적인 사용자 인터페이스를 제공합니다.

**개발 과정에서의 AI 활용:**
이 프로젝트는 **Gemini AI 어시스턴트(Gemini CLI)**와 협업하여 개발되었습니다. 초기 프로젝트 구조 설정부터 시작하여, React 컴포넌트 생성, 기능 구현(정렬, 필터링, 즐겨찾기 등), 코드 수정 및 디버깅 과정 전반에 걸쳐 AI의 도움을 받았습니다. 개발 일지(`DEVELOPMENT_LOG.md`)에 각 단계별 구체적인 프롬프트와 결과가 기록되어 있습니다.

---

## 2. 주요 기능 ✨

* **여행 계획 CRUD:** 새로운 여행 계획을 생성하고, 기존 계획을 수정하거나 삭제할 수 있습니다.
* **상세 일정 관리:** 날짜별로 방문 장소, 이동 경로 등의 세부 일정을 시간과 함께 추가하고 관리할 수 있습니다.
* **목록 조회 및 정렬:** 전체 여행 계획 목록을 카드 형태로 조회하고, 마지막 수정 시간, 제목, 여행 시작일 기준으로 정렬할 수 있습니다.
* **날짜 기반 필터링:** 오늘 날짜를 기준으로 '전체', '진행중', '미래', '과거' 계획을 필터링하여 볼 수 있습니다.
* **즐겨찾기:** 중요한 여행 계획을 즐겨찾기(⭐)로 표시하고, 즐겨찾기된 계획을 목록 상단에 우선적으로 표시할 수 있습니다.
* **반응형 UI:** 데스크톱, 태블릿, 모바일 등 다양한 화면 크기에서 최적화된 화면을 제공합니다.

---

## 3. 프로젝트 폴더 구조 📂

이 프로젝트는 프론트엔드와 백엔드가 분리된 모노레포 구조를 가집니다.
```
/home/songjun/20222267-midterm-project
├── backend/ # Express.js 백엔드 서버
│   ├── models/ # MongoDB 스키마 정의
│   ├── routes/ # API 라우트
│   ├── .env # ⭐️ 환경 변수 파일 (Git 제외됨)
│   ├── package.json
│   └── server.js # 서버 메인 파일
│
├── frontend/ # React 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── pages/ # 페이지 컴포넌트
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── package.json # 프로젝트 전체 관리용
├── README.md # 프로젝트 설명 (현재 파일)
└── DEVELOPMENT_LOG.md # 개발 과정 기록
```

* **`backend/`**: Node.js와 Express로 구현된 API 서버입니다. 데이터베이스 모델, 라우팅 로직 등이 포함됩니다.
* **`frontend/`**: Vite 기반의 React 애플리케이션입니다. 사용자가 보는 UI 컴포넌트, 페이지, 스타일링 관련 파일이 포함됩니다.
* **루트 `package.json`**: `concurrently` 라이브러리를 사용하여 프론트엔드와 백엔드 개발 서버를 동시에 실행하는 스크립트를 관리합니다.

---

## 4. 시작하기 🚀

### 사전 요구사항

* [Node.js](https://nodejs.org/) (v18.x 이상 권장)
* [MongoDB Community Edition](https://www.mongodb.com/try/download/community) 설치 및 실행 중이어야 함

### 설치

1.  **백엔드 종속성 설치:** 터미널을 열고 **`backend`** 디렉토리로 이동한 후, 아래 명령어를 실행합니다.
    ```bash
    cd backend
    npm install
    ```

2.  **프론트엔드 종속성 설치:** **새 터미널 창**(또는 기존 터미널에서 상위 폴더로 이동 후 `frontend` 폴더로 이동)을 열고 **`frontend`** 디렉토리로 이동한 후, 아래 명령어를 실행합니다.
    ```bash
    cd ../frontend  # 만약 backend 폴더에서 바로 이동한다면
    # 또는 cd /path/to/project/frontend
    npm install
    ```

3.  **환경 변수 파일 생성 (⭐️ 중요):**
    Git 저장소에는 보안상 `.env` 파일이 포함되어 있지 않습니다. 따라서 **`backend` 폴더 안에 `.env` 파일을 직접 생성**하고 아래 내용을 입력해야 합니다.
    ```dotenv
    # backend/.env 파일 내용

    # MongoDB 연결 주소 (기본 설정)
    MONGODB_URI=mongodb://localhost:27017/travel_planner

    # 백엔드 서버 실행 포트 (기본값 5000)
    PORT=5000
    ```
    * MongoDB 서버 주소나 포트가 다르다면 `MONGODB_URI` 값을 실제 환경에 맞게 수정해야 합니다.
    * `travel_planner`는 사용할 데이터베이스 이름입니다. MongoDB가 자동으로 생성합니다.

### 실행

1.  **MongoDB 서버 시작 확인:** MongoDB 서버가 실행 중인지 확인합니다. WSL Ubuntu 환경에서는 터미널에 다음 명령어를 실행합니다.
    ```bash
    sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log --fork
     ```

2.  **백엔드 서버 시작:** **첫 번째 터미널 창**에서 **`backend`** 디렉토리로 이동한 후, 개발 서버를 시작합니다.
    ```bash
    cd backend  # 이미 backend 폴더에 있다면 생략 가능
    npm run dev
    ```
    * `nodemon`이 서버를 실행하며 코드 변경 시 자동으로 재시작합니다.

3.  **프론트엔드 서버 시작:** **두 번째 터미널 창**에서 **`frontend`** 디렉토리로 이동한 후, 개발 서버를 시작합니다.
    ```bash
    cd ../frontend # backend 폴더에서 바로 이동 시
    # 또는 cd /path/to/project/frontend
    npm run dev
    ```
    * Vite 개발 서버가 실행됩니다.

4.  **애플리케이션 접속:** 웹 브라우저에서 프론트엔드 주소(`http://localhost:5173` 또는 터미널에 표시되는 주소)로 접속하여 애플리케이션을 확인합니다.
    * 백엔드 API 서버는 `http://localhost:5000`에서 실행됩니다.

---

## 5. 기술 스택 🛠️

### Frontend

* **React (v18)**: 사용자 인터페이스 구축 라이브러리
* **Vite**: 빠른 개발 서버 및 빌드 도구
* **React Router DOM (v6)**: 클라이언트 사이드 라우팅
* **Tailwind CSS (v3)**: 유틸리티 우선 CSS 프레임워크
* **Axios**: HTTP 클라이언트 (API 통신)
* **React Icons**: 아이콘 라이브러리
* **React Datepicker**: 날짜 선택 컴포넌트
* **Date-fns**: 날짜 유틸리티 라이브러리

### Backend

* **Node.js**: JavaScript 런타임
* **Express (v4)**: 웹 애플리케이션 프레임워크
* **MongoDB**: NoSQL 데이터베이스
* **Mongoose (v7)**: MongoDB 객체 모델링(ODM)
* **Cors**: Cross-Origin Resource Sharing 미들웨어
* **Dotenv**: 환경 변수 로드
* **Nodemon**: 개발용 서버 자동 재시작 도구

### Root

* **Concurrently**: 여러 npm 스크립트 동시 실행 도구
# Personal Travel Planner

이 프로젝트는 개인적인 여행 계획을 생성하고 관리할 수 있는 웹 애플리케이션입니다. MERN 스택(MongoDB, Express, React, Node.js)과 Tailwind CSS를 사용하여 구축되었습니다.

## 1. 프로젝트 폴더 구조

이 프로젝트는 프론트엔드와 백엔드가 분리된 모노레포 구조를 가집니다.

```
/home/songjun/20222267-midterm-project
├── backend/         # Express.js 백엔드 서버
│   ├── models/      # MongoDB 스키마 정의
│   ├── routes/      # API 라우트
│   ├── .env         # 환경 변수 파일
│   ├── package.json
│   └── server.js    # 서버 메인 파일
│
├── frontend/        # React 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── pages/     # 페이지 컴포넌트
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── package.json     # 프로젝트 전체 관리용
└── README.md
```

- **`backend/`**: Node.js와 Express로 구현된 API 서버입니다. 데이터베이스 모델, 라우팅 로직 등이 포함됩니다.
- **`frontend/`**: Vite 기반의 React 애플리케이션입니다. 사용자가 보는 UI 컴포넌트, 페이지, 스타일링 관련 파일이 포함됩니다.
- **루트 `package.json`**: `concurrently` 라이브러리를 사용하여 프론트엔드와 백엔드 개발 서버를 동시에 실행하는 스크립트를 관리합니다.

## 2. 시작하기

### 사전 요구사항

-   [Node.js](https://nodejs.org/) (v18.x 이상 권장)
-   [MongoDB Community Edition](https://www.mongodb.com/try/download/community) 설치

### 설치

1.  프로젝트 루트 디렉토리에서 모든 종속성을 설치합니다. 이 명령어는 루트, `backend`, `frontend` 폴더의 `npm install`을 모두 실행합니다.

    ```bash
    npm install-all
    ```

### 실행

1.  **MongoDB 서버 시작:** **새 터미널 창**을 열고 다음 명령어를 실행하여 MongoDB 데이터베이스 서버를 시작합니다. **이 터미널 창은 애플리케이션을 사용하는 동안 계속 열어두어야 합니다.**
    ```bash
    # (WSL Ubuntu 환경 기준)
    sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log --fork
    ```
    * `--fork` 옵션으로 백그라운드 실행을 시도합니다. 만약 이 명령어가 아무 출력 없이 바로 종료되지 않고 계속 메시지를 출력하며 실행 중이라면, `--fork` 옵션을 빼고 실행한 뒤 해당 터미널을 계속 열어두세요 (`sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log`).

2.  **백엔드 및 프론트엔드 서버 동시 시작:** 프로젝트 **루트 디렉토리**에서 다음 명령어를 실행하세요.
    ```bash
    npm run dev
    ```

3.  명령이 성공적으로 실행되면 다음과 같이 서버가 시작됩니다.
    * **백엔드 API 서버:** `http://localhost:5000`
    * **프론트엔드 React 앱:** `http://localhost:5173` (또는 Vite가 지정하는 다른 포트)

4.  웹 브라우저에서 프론트엔드 주소(`http://localhost:5173`)로 접속하여 애플리케이션을 확인할 수 있습니다.

## 3. 주요 라이브러리

### Frontend

-   **`react-router-dom`**: 클라이언트 사이드 라우팅을 구현하여 페이지 간 이동을 관리합니다.
-   **`react-icons`**: 다양한 아이콘을 쉽게 사용할 수 있도록 지원하는 라이브러리입니다.
-   **`tailwindcss`**: 유틸리티-우선 CSS 프레임워크로, 신속한 UI 개발을 돕습니다.
-   **`react-datepicker`**: 날짜 선택 기능을 구현하기 위한 라이브러리입니다.
-   **`date-fns`**: 날짜 및 시간 관련 유틸리티 함수를 제공합니다.
-   **`axios`**: 백엔드 API와 통신하기 위한 HTTP 클라이언트 라이브러리입니다.

### Backend

-   **`express`**: Node.js 웹 애플리케이션 프레임워크입니다.
-   **`mongoose`**: MongoDB 객체 모델링(ODM) 라이브러리입니다.
-   **`cors`**: Cross-Origin Resource Sharing을 활성화하는 미들웨어입니다.
-   **`dotenv`**: `.env` 파일에서 환경 변수를 로드합니다.
-   **`nodemon`**: 개발 중 서버 코드 변경 시 자동으로 서버를 재시작합니다.

### Root

-   **`concurrently`**: 여러 명령어를 동시에 실행할 수 있게 해줍니다.
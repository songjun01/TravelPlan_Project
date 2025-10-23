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

- [Node.js](https://nodejs.org/) (v18.x 이상 권장)
- [MongoDB](https://www.mongodb.com/try/download/community) 데이터베이스 실행

### 설치

1.  프로젝트 루트 디렉토리에서 모든 종속성을 설치합니다. 이 명령어는 루트, `backend`, `frontend` 폴더의 `npm install`을 모두 실행합니다.

    ```bash
    npm install-all
    ```

### 실행

1.  백엔드 서버와 프론트엔드 개발 서버를 동시에 시작하려면 루트 디렉토리에서 다음 명령어를 실행하세요.

    ```bash
    npm run dev
    ```

2.  명령이 실행되면 다음과 같이 서버가 시작됩니다.
    -   **백엔드 API 서버:** `http://localhost:5000`
    -   **프론트엔드 React 앱:** `http://localhost:5173` (또는 Vite가 지정하는 다른 포트)

3.  웹 브라우저에서 프론트엔드 주소(`http://localhost:5173`)로 접속하여 애플리케이션을 확인할 수 있습니다.

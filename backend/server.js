/**
 * server.js
 * 이 파일은 Express.js를 사용하여 백엔드 서버를 설정하고 실행합니다.
 * MongoDB 데이터베이스 연결, 미들웨어 설정, API 라우팅을 처리합니다.
 */

// .env 파일의 환경 변수를 로드합니다.
require('dotenv').config();

// 필요한 모듈들을 가져옵니다.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Express 애플리케이션을 생성합니다.
const app = express();

// 미들웨어를 설정합니다.
app.use(cors()); // Cross-Origin Resource Sharing 활성화
app.use(express.json()); // 요청 본문을 JSON으로 파싱

// MongoDB에 연결합니다.
// 연결 문자열은 .env 파일에서 가져옵니다.
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch(err => {
  console.error('Connection error', err);
  process.exit();
});

// 기본 라우트를 설정합니다.
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Personal Travel Planner backend.' });
});

// API 라우트를 설정합니다.
// '/api/travel-plans' 경로로 들어오는 요청은 travelPlanRoutes에서 처리합니다.
const travelPlanRoutes = require('./routes/travelPlanRoutes');
app.use('/api/travel-plans', travelPlanRoutes);

// 서버가 리스닝할 포트를 설정합니다.
// .env 파일에 PORT가 지정되어 있지 않으면 5000번 포트를 사용합니다.
const PORT = process.env.PORT || 5000;

// 지정된 포트에서 서버를 시작합니다.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

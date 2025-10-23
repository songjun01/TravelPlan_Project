/**
 * routes/travelPlanRoutes.js
 * 이 파일은 여행 계획(TravelPlan)과 관련된 API 엔드포인트를 정의합니다.
 * Express.Router를 사용하여 라우팅 로직을 모듈화합니다.
 */

const express = require('express');
const router = express.Router();
const TravelPlan = require('../models/TravelPlan');

// GET /api/travel-plans
// 모든 여행 계획 목록을 가져오는 엔드포인트
router.get('/', async (req, res) => {
  try {
    // 데이터베이스에서 모든 여행 계획을 찾습니다.
    const plans = await TravelPlan.find();
    // 성공 시, JSON 형태로 계획 목록을 응답합니다.
    res.json(plans);
  } catch (err) {
    // 오류 발생 시, 500 상태 코드와 오류 메시지를 응답합니다.
    res.status(500).json({ message: err.message });
  }
});

// POST /api/travel-plans
// 새로운 여행 계획을 생성하는 엔드포인트
router.post('/', async (req, res) => {
  // 요청 본문(body)으로부터 새로운 여행 계획 객체를 생성합니다.
  const plan = new TravelPlan({
    title: req.body.title,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    // 새로운 계획을 데이터베이스에 저장합니다.
    const newPlan = await plan.save();
    // 성공 시, 201 상태 코드와 생성된 계획을 응답합니다.
    res.status(201).json(newPlan);
  } catch (err) {
    // 유효성 검사 실패 등 오류 발생 시, 400 상태 코드와 오류 메시지를 응답합니다.
    res.status(400).json({ message: err.message });
  }
});

// 라우터 객체를 내보내서 server.js에서 사용할 수 있도록 합니다.
module.exports = router;

// backend/routes/travelPlanRoutes.js

/**
 * routes/travelPlanRoutes.js
 * [수정] 오류 처리(catch) 블록을 개선합니다.
 * - 'ValidationError' (사용자 입력 오류)일 때는 400 코드를,
 * - 그 외 (DB 연결 오류 등) 서버 문제일 때는 500 코드를 반환하도록 수정합니다.
 */

const express = require('express');
const router = express.Router();
const TravelPlan = require('../models/TravelPlan');

// GET /api/travel-plans (전체 목록 조회)
router.get('/', async (req, res) => {
  try {
    const plans = await TravelPlan.find().sort({ lastModified: -1 });
    res.json(plans);
  } catch (err) {
    // [수정] DB 연결 오류 등은 500
    res.status(500).json({ message: err.message });
  }
});

// POST /api/travel-plans (새 계획 생성)
router.post('/', async (req, res) => {
  const plan = new TravelPlan({
    title: req.body.title,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    itinerary: req.body.itinerary
  });

  try {
    const newPlan = await plan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    // [수정] 🚨 오류 유형에 따라 다른 상태 코드를 반환
    if (err.name === 'ValidationError') {
      // Mongoose 스키마의 required 필드 등을 위반한 경우 (사용자 잘못)
      res.status(400).json({ message: err.message });
    } else {
      // DB 연결 실패 등 그 외 모든 서버 오류
      res.status(500).json({ message: err.message });
    }
  }
});

// GET /api/travel-plans/:id (단일 계획 조회)
router.get('/:id', getPlan, (req, res) => {
  res.json(res.plan);
});

// PATCH /api/travel-plans/:id (계획 수정)
router.patch('/:id', getPlan, async (req, res) => {
  if (req.body.title != null) {
    res.plan.title = req.body.title;
  }
  if (req.body.location != null) {
    res.plan.location = req.body.location;
  }
  if (req.body.startDate != null) {
    res.plan.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.plan.endDate = req.body.endDate;
  }
  if (req.body.itinerary != null) {
    res.plan.itinerary = req.body.itinerary;
  }

  try {
    const updatedPlan = await res.plan.save();
    res.json(updatedPlan);
  } catch (err) {
    // [수정] 🚨 오류 유형에 따라 다른 상태 코드를 반환
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

// DELETE /api/travel-plans/:id (계획 삭제)
router.delete('/:id', getPlan, async (req, res) => {
  try {
    await res.plan.deleteOne();
    res.json({ message: 'Deleted Travel Plan' });
  } catch (err) {
    // [수정] DB 연결 오류 등은 500
    res.status(500).json({ message: err.message });
  }
});


// 공통 미들웨어: ID로 계획 찾기
async function getPlan(req, res, next) {
  let plan;
  try {
    plan = await TravelPlan.findById(req.params.id);
    if (plan == null) {
      return res.status(404).json({ message: 'Cannot find travel plan' });
    }
  } catch (err) {
    // DB 연결이 안 되거나, ID 형식이 잘못된 경우 500
    return res.status(500).json({ message: err.message });
  }

  res.plan = plan;
  next();
}

module.exports = router;
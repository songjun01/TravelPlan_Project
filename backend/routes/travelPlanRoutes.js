// backend/routes/travelPlanRoutes.js

/**
 * routes/travelPlanRoutes.js
 * [수정] PATCH 핸들러에 console.log를 추가하여 디버깅합니다.
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
    console.error("Error fetching plans:", err); // [추가] 에러 로그
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
    itinerary: req.body.itinerary,
    // isFavorite는 default: false 이므로 여기서 명시할 필요 없음
  });

  try {
    const newPlan = await plan.save();
    console.log("New plan created:", newPlan); // [추가] 생성 로그
    res.status(201).json(newPlan);
  } catch (err) {
    console.error("Error creating plan:", err); // [추가] 에러 로그
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
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
  // [추가] 🚨 요청받은 내용과 수정할 계획 ID 로깅
  console.log(`--- PATCH Request Received ---`);
  console.log(`Plan ID to update: ${req.params.id}`);
  console.log(`Request body (update data):`, req.body);

  // 기존 업데이트 로직 (isFavorite 포함)
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
  // isFavorite 필드 업데이트 (명시적으로 추가하여 확인)
  if (req.body.isFavorite != null) {
    res.plan.isFavorite = req.body.isFavorite;
    console.log(`Updating isFavorite to: ${req.body.isFavorite}`); // [추가] 🚨 isFavorite 변경 로깅
  }

  try {
    // [추가] 🚨 저장 전 데이터 상태 로깅
    console.log(`Data before save:`, res.plan);
    
    const updatedPlan = await res.plan.save(); // save() 호출 시 pre('save') 훅 실행됨
    
    // [추가] 🚨 저장 후 (DB 반영 후) 데이터 로깅
    console.log(`Data after save (from DB):`, updatedPlan);
    console.log(`--- PATCH Request Processed ---`);
    
    res.json(updatedPlan); // 성공 응답 전송
  } catch (err) {
    // [추가] 🚨 저장 중 에러 로깅
    console.error(`Error saving plan (ID: ${req.params.id}):`, err);
    console.log(`--- PATCH Request Failed ---`);
    
    // 기존 에러 처리
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
    console.log(`Plan deleted: ${req.params.id}`); // [추가] 삭제 로그
    res.json({ message: 'Deleted Travel Plan' });
  } catch (err) {
    console.error(`Error deleting plan (ID: ${req.params.id}):`, err); // [추가] 에러 로그
    res.status(500).json({ message: err.message });
  }
});


// 공통 미들웨어: ID로 계획 찾기
async function getPlan(req, res, next) {
  let plan;
  try {
    plan = await TravelPlan.findById(req.params.id);
    if (plan == null) {
      console.log(`Plan not found: ${req.params.id}`); // [추가] 404 로그
      return res.status(404).json({ message: 'Cannot find travel plan' });
    }
  } catch (err) {
    console.error(`Error finding plan by ID (${req.params.id}):`, err); // [추가] 500 로그
    return res.status(500).json({ message: err.message });
  }

  res.plan = plan;
  next();
}

module.exports = router;
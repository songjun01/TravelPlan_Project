// backend/models/TravelPlan.js

/**
 * models/TravelPlan.js
 * [수정] 세부 일정(itinerary)을 저장하기 위해 하위 스키마(sub-schema)를 추가하고, 'time' 필드를 추가합니다.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. 세부 이벤트 스키마 (방문 또는 이동)
// PlanEditorPage.jsx의 state 구조를 따릅니다.
const eventSchema = new Schema({
  type: { type: String, required: true, enum: ['visit', 'move'] },
  
  // [추가] 🚨 일정 시작 시간 (예: '10:00')
  time: { type: String, trim: true }, 

  // 'visit' 유형 필드
  place: { type: String, trim: true },
  address: { type: String, trim: true },
  stayTime: { type: String, trim: true },
  // 'move' 유형 필드
  transport: { type: String, trim: true },
  start: { type: String, trim: true }, // 'from' 대신 'start' 사용 (PlanEditorPage 기준)
  end: { type: String, trim: true },   // 'to' 대신 'end' 사용 (PlanEditorPage 기준)
  duration: { type: String, trim: true },
}, { _id: false }); // sub-document는 자체 _id가 필요 없습니다.

// 2. 날짜별 일정 스키마
const itineraryDaySchema = new Schema({
  date: { type: Date, required: true },
  events: [eventSchema] // 위에서 정의한 eventSchema의 배열
}, { _id: false });

// 3. 메인 여행 계획 스키마 (기존 스키마 수정)
const travelPlanSchema = new Schema({
  // 여행 계획의 제목
  title: {
    type: String,
    required: true,
    trim: true
  },
  // 여행 지역 (기존 location)
  location: {
    type: String,
    required: true,
    trim: true
  },
  // 여행 시작일
  startDate: {
    type: Date,
    required: true
  },
  // 여행 종료일
  endDate: {
    type: Date,
    required: true
  },
  
  // [추가] 4. itinerary 필드를 날짜별 일정 배열로 정의합니다.
  itinerary: {
    type: [itineraryDaySchema],
    default: [] // 기본값은 빈 배열
  },

  // 마지막 수정 날짜 (기존과 동일)
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // createdAt, updatedAt 자동 추가
});

// 스키마가 변경될 때마다 마지막 수정 날짜(lastModified)를 업데이트하는 미들웨어 (기존과 동일)
travelPlanSchema.pre('save', function(next) {
  this.lastModified = Date.now();
  next();
});

// travelPlanSchema를 기반으로 'TravelPlan'이라는 이름의 모델을 생성하고 내보냅니다.
module.exports = mongoose.model('TravelPlan', travelPlanSchema);
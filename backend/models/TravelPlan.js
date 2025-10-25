// backend/models/TravelPlan.js

/**
 * models/TravelPlan.js
 * [수정] travelPlanSchema에 isFavorite 필드를 추가합니다.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. 세부 이벤트 스키마 (방문 또는 이동) - 기존과 동일
const eventSchema = new Schema({
  type: { type: String, required: true, enum: ['visit', 'move'] },
  time: { type: String, trim: true }, 
  place: { type: String, trim: true },
  address: { type: String, trim: true },
  stayTime: { type: String, trim: true },
  transport: { type: String, trim: true },
  start: { type: String, trim: true }, 
  end: { type: String, trim: true },   
  duration: { type: String, trim: true },
}, { _id: false });

// 2. 날짜별 일정 스키마 - 기존과 동일
const itineraryDaySchema = new Schema({
  date: { type: Date, required: true },
  events: [eventSchema] 
}, { _id: false });

// 3. 메인 여행 계획 스키마 (기존 스키마 수정)
const travelPlanSchema = new Schema({
  // 기존 필드들...
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  itinerary: {
    type: [itineraryDaySchema],
    default: []
  },
  lastModified: {
    type: Date,
    default: Date.now
  },

  // [추가] 🚨 즐겨찾기 상태 필드
  isFavorite: {
    type: Boolean,
    default: false // 기본값은 false (즐겨찾기 아님)
  }

}, {
  timestamps: true // createdAt, updatedAt 자동 추가
});

// 스키마 pre-save 훅 (기존과 동일)
travelPlanSchema.pre('save', function(next) {
  // [수정] isFavorite 필드가 변경될 때도 lastModified를 업데이트합니다.
  if (this.isModified('title') || this.isModified('location') || this.isModified('startDate') || this.isModified('endDate') || this.isModified('itinerary') || this.isModified('isFavorite')) {
      this.lastModified = Date.now();
  }
  next();
});

// 모델 export (기존과 동일)
module.exports = mongoose.model('TravelPlan', travelPlanSchema);
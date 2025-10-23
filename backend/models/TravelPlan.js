/**
 * models/TravelPlan.js
 * 이 파일은 Mongoose를 사용하여 MongoDB에 저장될 여행 계획(TravelPlan) 데이터의 스키마를 정의합니다.
 */

const mongoose = require('mongoose');

// Mongoose의 Schema 객체를 가져옵니다.
const Schema = mongoose.Schema;

// 여행 계획의 데이터 구조를 정의하는 스키마를 생성합니다.
const travelPlanSchema = new Schema({
  // 여행 계획의 제목
  title: {
    type: String, // 데이터 타입은 문자열
    required: true, // 필수 항목
    trim: true      // 문자열 앞뒤의 공백 제거
  },
  // 여행 지역
  location: {
    type: String,
    required: true,
    trim: true
  },
  // 여행 시작일
  startDate: {
    type: Date, // 데이터 타입은 날짜
    required: true
  },
  // 여행 종료일
  endDate: {
    type: Date,
    required: true
  },
  // 마지막 수정 날짜
  lastModified: {
    type: Date,
    default: Date.now // 기본값으로 현재 날짜/시간을 설정
  }
}, {
  // 타임스탬프 옵션: createdAt과 updatedAt 필드를 자동으로 추가합니다.
  timestamps: true
});

// 스키마가 변경될 때마다 마지막 수정 날짜(lastModified)를 업데이트하는 미들웨어
travelPlanSchema.pre('save', function(next) {
  this.lastModified = Date.now();
  next();
});

// travelPlanSchema를 기반으로 'TravelPlan'이라는 이름의 모델을 생성하고 내보냅니다.
module.exports = mongoose.model('TravelPlan', travelPlanSchema);

// frontend/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 👇 [추가된 부분]
  // 개발 서버 프록시 설정
  server: {
    proxy: {
      // '/api'로 시작하는 모든 요청은
      // 백엔드 서버 'http://localhost:5000'으로 전달합니다.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // CORS 오류를 방지하기 위해 origin을 변경합니다.
      },
    },
  },
})
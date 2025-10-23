/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 새로운 메인 색상 추가
      colors: {
        primary: '#2ecc71',
      },
    },
  },
  plugins: [],
}

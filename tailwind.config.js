/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        flipo: {
          navy:       '#0B0D1F',
          'navy-2':   '#13162E',
          blue:       '#2B45FF',
          'blue-h':   '#1A34EE',
          'blue-l':   '#4D64FF',
          purple:     '#7B26EF',
          'pink-p':   '#C868FF',
          pink:       '#FF5EC8',
          silver:     '#E4E4F0',
          'off-white':'#F0F0FF',
        },
      },
    },
  },
  plugins: [],
}

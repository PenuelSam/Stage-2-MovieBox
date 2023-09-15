/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainRed: "#BE123C",
        movieGray: '#9CA3AF',
        softRed: 'rgba(190, 18, 60, 0.20)',
        favourite: 'rgba(243, 244, 246, 0.50)',
      },

    },
  },
  plugins: [],
}


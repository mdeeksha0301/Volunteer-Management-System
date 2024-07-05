/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          // primary: '#0C243C',
          primary: '#011c2b',
          secondary: '#C9D1D5',
          third: '#55C2C3',
          fourth: '#7E8C9C',
          fivth: '#ffffff'
        
      },
    },
  },
  plugins: [],
}


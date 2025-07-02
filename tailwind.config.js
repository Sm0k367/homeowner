/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'epic-blue': '#667eea',
        'epic-purple': '#764ba2',
      },
      fontFamily: {
        'epic': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

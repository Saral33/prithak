/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#f3f4f6',
        danger: '#dc2626',
        success: '#34d399',
        warning: '#f59e0b',
        info: '#3b82f6',
      },
    },
  },
  plugins: [],
};

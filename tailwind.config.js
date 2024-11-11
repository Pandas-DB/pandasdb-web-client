/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        },
        blue: {
          500: '#3182CE',
          600: '#2B6CB0',
          700: '#2C5282',
        },
      },
    },
  },
  plugins: [],
}
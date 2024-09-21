/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'matemaise': '"Matemasie", sans-serif',
        'inter': '"Inter", system-ui'
      }
    },
  },
  plugins: [require('daisyui'),],
}


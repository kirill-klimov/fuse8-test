/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'mont': ['Montserrat'],
        'fira': ['Fira Sans']
      }
    },
  },
  plugins: [],
}


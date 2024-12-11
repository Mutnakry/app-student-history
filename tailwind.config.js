// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//       "./node_modules/flowbite/**/*.js"
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         KhmerMoul: 'Moul',
//         NotoSansKhmer: 'Noto Sans Khmer',
//       },
//     },
//   },
//   plugins: [
//     require('flowbite/plugin')
//   ],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        KhmerMoul: 'Moul',
        NotoSansKhmer: 'Noto Sans Khmer',
      }
    },
  },
  plugins: [],
}
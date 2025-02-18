/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing_script: ["Dancing Script", "serif"],
        quickSand: ["Quicksand", "serif"],
      },
      colors: {
        primary: "#f5f2f2",  //as bg color
        accent: "#AC0404", // as primary 
        secondary: "#D4AF37", // as accent
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

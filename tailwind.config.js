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
        primary: "#f5f2f2",
        accent: "#AC0404",
        charcoal: "#4A4A4A",
        offWhite: "#FFF8F0",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

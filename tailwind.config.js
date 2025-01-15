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
    },
  },
  plugins: [require("flowbite/plugin")],
};

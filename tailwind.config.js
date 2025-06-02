/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
    "./.storybook/**/*.{js,ts}",
    "./stories/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

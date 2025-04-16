/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // или "./app/**/*.{js,ts,jsx,tsx}" — если ты используешь App Router
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require("tailwind-scrollbar"),
    ],
};
  
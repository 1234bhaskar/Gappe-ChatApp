/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/src/chatApp1.jpg')",
      },
      textColor: {
        testColor: "#6c5ce7",
      },
    },
  },
  plugins: [],
};

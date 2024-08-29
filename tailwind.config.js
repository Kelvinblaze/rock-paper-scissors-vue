/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-text": "#1d2a4a",
        "score-text": "#3e5e8d",
        "header-outline": "#6d7a8d",
      },
      fontSize: {
        "3xl": ["1.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        5: "1.25rem",
        8: "2rem",
      },
      borderWidth: {
        4: "4px",
      },
    },
  },
  plugins: [],
};

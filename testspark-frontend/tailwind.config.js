/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables dark mode toggle
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        background: {
          light: "#F9FAFB",
          dark: "#0F172A",
        },
        card: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
      },
    },
  },
  plugins: [],
};
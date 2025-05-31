/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e0f4f2",
          100: "#b3e2dd",
          200: "#80d0c7",
          300: "#4dbcb0",
          400: "#26a99c",
          500: "#006a60", // base
          600: "#00584f",
          700: "#00463f",
          800: "#00342e",
          900: "#00241f",
        },
        secondary: {
          50: "#edf1f0",
          100: "#d1dad8",
          200: "#b3c2be",
          300: "#95aaa4",
          400: "#78938a",
          500: "#4a635f", // base
          600: "#3e524f",
          700: "#32413f",
          800: "#26312f",
          900: "#1a211f",
        },
        tertiary: {
          50: "#ebedf1",
          100: "#cfd4dd",
          200: "#b2b9c9",
          300: "#959fb5",
          400: "#7885a1",
          500: "#466179", // base
          600: "#3a5063",
          700: "#2e404e",
          800: "#222f38",
          900: "#161f23",
        },
        sidebar: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1", // Light text on dark bg
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155", // Border color
          800: "#1e293b", // Main dark background
          900: "#0f172a", // Darkest
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

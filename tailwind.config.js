const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        brown: {
          50: "#efebe9",
          100: "#d7ccc8",
          200: "#bcaaa4",
          300: "#a1887f",
          400: "#8d6e63",
          500: "#795548",
          600: "#6d4c41",
          700: "#5d4037",
          800: "#4e342e",
          900: "#3e2723",
        },
      },
    },
  },
  plugins: [],
  safelist: ["blue", "orange", "gray", "brown", "yellow", "purple", "green", "red"].reduce(
    (classNames, color) => [
      ...classNames,
      `text-${color}-500`,
      `bg-${color}-300`,
      `bg-${color}-600/10`,
      `text-${color}-400`,
    ],
    []
  ),
};

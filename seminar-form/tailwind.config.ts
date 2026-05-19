import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f7f4",
          100: "#e4ede4",
          200: "#c8dbc9",
          300: "#9ec19f",
          400: "#6da06e",
          500: "#4a834b",
          600: "#386639",
          700: "#2d512e",
          800: "#264127",
          900: "#203622",
        },
        peach: {
          50: "#fff7f3",
          100: "#ffe8dc",
          200: "#ffd0b8",
          300: "#ffb08a",
          400: "#ff855a",
          500: "#f95f2e",
          600: "#e04318",
          700: "#ba3313",
          800: "#962c16",
          900: "#7a2716",
        },
        cream: "#fdf8f3",
      },
      fontFamily: {
        sans: ["Hiragino Kaku Gothic ProN", "Hiragino Sans", "Meiryo", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

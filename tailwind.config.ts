import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#38362D",
        olive: "#867B4B",
        sage: "#C2BB92",
        terracotta: "#A75A29",
        sand: "#CEAE7A",
        cream: "#F0E7DB",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(56, 54, 45, 0.08)',
        'luxury': '0 20px 40px -15px rgba(56, 54, 45, 0.12)',
      }
    },
  },
  plugins: [],
};

export default config;

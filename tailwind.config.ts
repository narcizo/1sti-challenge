import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "night-50": "#0B79B5",
        "night-100": "#085985",
        "night-200": "#053752",
        "day-50": "#FFA012",
        "day-100": "#FF8A0F",
        "day-200": "#EF810E",
        "background-1": "#e5ac0b",
        "background-2": "#e89b00",
        "background-3": "#ea8800",
        "background-4": "#eb7504",
        "background-5": "#eb6112",
      },
    },
  },
  plugins: [],
};
export default config;

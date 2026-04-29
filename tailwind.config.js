/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0b",
          900: "#101012",
          800: "#17171a",
          700: "#1f1f23",
          600: "#2a2a30",
        },
        bone: {
          50: "#f5f3ee",
          100: "#ebe7df",
          200: "#d4cfc4",
          300: "#a8a294",
        },
        lime: {
          DEFAULT: "#d8ff3d",
          dim: "#b8df1d",
        },
        magenta: {
          DEFAULT: "#ff2d8a",
          dim: "#d11066",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        body: ['"Inter Tight"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "grain": "grain 8s steps(10) infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Soot. The world before the flame.
        void: {
          950: "#070605",
          900: "#0d0b09",
          800: "#141110",
          700: "#1c1815",
          600: "#26211c",
          500: "#332c25",
        },
        // Lothric stone: cold, desaturated, standing in for daylight.
        ash: {
          50: "#e9e6e1",
          100: "#d5d0c8",
          200: "#b8b2a8",
          300: "#938c82",
          400: "#6f6a62",
          500: "#4e4a44",
          600: "#332f2b",
        },
        // Warm text. Never pure white.
        bone: {
          50: "#f4efe6",
          100: "#e6dfd2",
          200: "#cfc5b4",
          300: "#a89e8d",
        },
        // The fire. Energy and action only.
        ember: {
          100: "#ffe4b8",
          200: "#ffc684",
          300: "#ffa14f",
          400: "#ff7a2b",
          500: "#e85a10",
          600: "#b83d08",
          700: "#7d2604",
          800: "#4a1603",
        },
        // Death. You know the colour.
        blood: {
          400: "#cf5a43",
          500: "#a83424",
          700: "#6d1b12",
        },
        // Coiled sword, estus rim, item frames.
        brass: {
          300: "#d8b98a",
          500: "#b08a52",
          700: "#7a5c30",
        },
      },
      fontFamily: {
        display: ['"Cinzel"', '"Trajan Pro"', "Georgia", "serif"],
        body: ['"Spectral"', "Georgia", '"Times New Roman"', "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-ember": "0 0 60px -12px rgba(255,122,43,0.35)",
        "glow-blood": "0 0 50px -14px rgba(168,52,36,0.45)",
        "inset-card":
          "inset 0 0 0 1px rgba(176,138,82,0.10), inset 0 0 70px rgba(0,0,0,0.75)",
      },
      letterSpacing: {
        widest2: "0.3em",
      },
      transitionTimingFunction: {
        cinder: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

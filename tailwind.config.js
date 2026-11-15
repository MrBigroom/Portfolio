/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Burnt umber. Sampled from the Darksign: #100500 to #220902.
        void: {
          950: "#0d0400",
          900: "#150600",
          800: "#1b0b05",
          700: "#231009",
          600: "#2c170e",
          500: "#3a2016",
        },
        // Warm stone, for what used to be cold.
        ash: {
          50: "#efe7dd",
          100: "#d8cec2",
          200: "#b9ad9f",
          300: "#998c7d",
          400: "#766a5d",
          500: "#574d43",
          600: "#3b332c",
        },
        // Text. Cream, not chalk.
        bone: {
          50: "#fbf4ea",
          100: "#f1e6d8",
          200: "#dbcbb6",
          300: "#b6a691",
        },
        // The fire. #c44407 and #e4661c are the reference's own ring colours.
        ember: {
          100: "#ffe9c0",
          200: "#ffcf94",
          300: "#ffab5e",
          400: "#e4661c",
          500: "#c44407",
          600: "#96330a",
          700: "#6b2408",
          800: "#451605",
        },
        // Frames and rules. Pewter standing in firelight, so it reads warm.
        steel: {
          300: "#d8cfc4",
          500: "#9b9086",
          700: "#6a6058",
        },
        // Death stays red.
        blood: {
          400: "#cf5a43",
          500: "#a83424",
          700: "#6d1b12",
        },
      },
      fontFamily: {
        display: ['"Cinzel"', '"Trajan Pro"', "Georgia", "serif"],
        body: ['"Spectral"', "Georgia", '"Times New Roman"', "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-ember": "0 0 60px -12px rgba(228,102,28,0.35)",
        "glow-blood": "0 0 50px -14px rgba(168,52,36,0.45)",
        "inset-card":
          "inset 0 0 0 1px rgba(155,144,134,0.14), inset 0 0 70px rgba(0,0,0,0.8)",
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Cold soot. The world after the fire has gone out of it.
        void: {
          950: "#05060a",
          900: "#0a0c11",
          800: "#10131a",
          700: "#171b23",
          600: "#1f242e",
          500: "#2a3038",
        },
        // Lothric stone: colder still than the ash it is made of.
        ash: {
          50: "#dfe5e9",
          100: "#c6ced5",
          200: "#a8b2bb",
          300: "#86929c",
          400: "#66717b",
          500: "#4a535c",
          600: "#313941",
        },
        // Text. Cool, but never dim — legibility outranks the colour story.
        bone: {
          50: "#f2f4f5",
          100: "#e2e6e8",
          200: "#c8cfd3",
          300: "#a2abb1",
        },
        // The cold accent that used to be ember: frost on steel.
        rime: {
          100: "#eef4f6",
          200: "#d5e2e8",
          300: "#b1c4cd",
          400: "#8a9ea9",
          500: "#667f8c",
          600: "#4a626e",
          700: "#33474f",
          800: "#1f2d33",
        },
        // Frames, the guard, the seal. Pewter, not brass.
        steel: {
          300: "#cbd2d6",
          500: "#8e9aa1",
          700: "#5b666c",
        },
        // EMBLEM ONLY. Nothing in the page chrome may use these — the fire
        // belongs to the Darksign, and to nothing else.
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
        // Death stays red. The one deliberate warmth outside the mark.
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
        "glow-rime": "0 0 60px -12px rgba(177,196,205,0.3)",
        "glow-blood": "0 0 50px -14px rgba(168,52,36,0.45)",
        "inset-card":
          "inset 0 0 0 1px rgba(142,154,161,0.12), inset 0 0 70px rgba(0,0,0,0.78)",
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#141F3D",     // deep navy-black for hero, derived from logo navy
        navy: "#233563",         // exact navy sampled from the RD logo
        "navy-light": "#3B4F8C",
        gold: "#FFF139",         // exact yellow sampled from the RD logo
        "gold-light": "#FFF77A",
        "gold-deep": "#8A6D0E",  // darker gold for text on light backgrounds (accessibility)
        cream: "#F6F1E6",        // section backgrounds
        "cream-dark": "#EBE1CC",
        ink: "#22201B",          // body text
        rust: "#9C3B2E",         // stamp / alert accent
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Work Sans", "Helvetica", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // === Light Mode ===
        primary: "#695F12",
        "on-primary": "#FFFFFF",
        "primary-container": "#F3E48A",
        "on-primary-container": "#504700",

        secondary: "#645F41",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#EBE3BD",
        "on-secondary-container": "#4C472B",

        tertiary: "#416651",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#C3ECD2",
        "on-tertiary-container": "#294E3B",

        error: "#BA1A1A",
        "on-error": "#FFFFFF",
        "error-container": "#FFDAD6",
        "on-error-container": "#93000A",

        background: "#FFF9EB",
        "on-background": "#1D1C13",
        surface: "#FFF9EB",
        "on-surface": "#1D1C13",

        "surface-variant": "#E8E2D0",
        "on-surface-variant": "#4A4739",
        outline: "#7B7768",
        "outline-variant": "#CCC6B5",

        shadow: "#000000",
        scrim: "#000000",
        "inverse-surface": "#323027",
        "inverse-on-surface": "#F6F0E2",
        "inverse-primary": "#D6C871",

        "primary-fixed": "#F3E48A",
        "on-primary-fixed": "#201C00",
        "primary-fixed-dim": "#D6C871",
        "on-primary-fixed-variant": "#504700",

        "secondary-fixed": "#EBE3BD",
        "on-secondary-fixed": "#1F1C05",
        "secondary-fixed-dim": "#CFC7A2",
        "on-secondary-fixed-variant": "#4C472B",

        "tertiary-fixed": "#C3ECD2",
        "on-tertiary-fixed": "#002112",
        "tertiary-fixed-dim": "#A7D0B6",
        "on-tertiary-fixed-variant": "#294E3B",

        "surface-dim": "#DFDACC",
        "surface-bright": "#FFF9EB",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F9F3E5",
        "surface-container": "#F3EDE0",
        "surface-container-high": "#EDE8DA",
        "surface-container-highest": "#E7E2D5",

        // === Dark Mode ===
        dark: {
          primary: "#D6C871",
          "on-primary": "#383000",
          "primary-container": "#504700",
          "on-primary-container": "#F3E48A",

          secondary: "#CFC7A2",
          "on-secondary": "#353117",
          "secondary-container": "#4C472B",
          "on-secondary-container": "#EBE3BD",

          tertiary: "#A7D0B6",
          "on-tertiary": "#123727",
          "tertiary-container": "#294E3B",
          "on-tertiary-container": "#C3ECD2",

          error: "#FFB4AB",
          "on-error": "#690005",
          "error-container": "#93000A",
          "on-error-container": "#FFDAD6",

          background: "#1D1C13",
          "on-background": "#E7E2D5",
          surface: "#1D1C13",
          "on-surface": "#E7E2D5",

          "surface-variant": "#4A4739",
          "on-surface-variant": "#CCC6B5",
          outline: "#959181",
          "outline-variant": "#4A4739",

          shadow: "#000000",
          scrim: "#000000",
          "inverse-surface": "#E7E2D5",
          "inverse-on-surface": "#323027",
          "inverse-primary": "#695F12",

          "primary-fixed": "#F3E48A",
          "on-primary-fixed": "#201C00",
          "primary-fixed-dim": "#D6C871",
          "on-primary-fixed-variant": "#504700",

          "secondary-fixed": "#EBE3BD",
          "on-secondary-fixed": "#1F1C05",
          "secondary-fixed-dim": "#CFC7A2",
          "on-secondary-fixed-variant": "#4C472B",

          "tertiary-fixed": "#C3ECD2",
          "on-tertiary-fixed": "#002112",
          "tertiary-fixed-dim": "#A7D0B6",
          "on-tertiary-fixed-variant": "#294E3B",

          "surface-dim": "#1D1C13",
          "surface-bright": "#454438",
          "surface-container-lowest": "#14130B",
          "surface-container-low": "#252419",
          "surface-container": "#29281D",
          "surface-container-high": "#343328",
          "surface-container-highest": "#3F3D32",
        },
      },
    },
  },
  plugins: [],
};

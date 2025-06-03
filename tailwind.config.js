/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // === Light Mode ===
        primary: "#578F9C",
        "on-primary": "#FFFFFF",
        "primary-container": "#C8E6EF",
        "on-primary-container": "#0F3A42",

        secondary: "#356261",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#B8D6D5",
        "on-secondary-container": "#0A2625",

        tertiary: "#E7C400",
        "on-tertiary": "#3D3300",
        "tertiary-container": "#F5E880",
        "on-tertiary-container": "#2A2200",

        error: "#BA1A1A",
        "on-error": "#FFFFFF",
        "error-container": "#FFDAD6",
        "on-error-container": "#93000A",

        background: "#F5FAFB",
        "on-background": "#191C1D",
        surface: "#F2FAF8FF",
        "on-surface": "#191C1D",

        "surface-variant": "#DDE4E6",
        "on-surface-variant": "#40484A",
        outline: "#70787A",
        "outline-variant": "#C0C8CA",

        shadow: "#000000",
        scrim: "#000000",
        "inverse-surface": "#2E3132",
        "inverse-on-surface": "#EFF1F2",
        "inverse-primary": "#9BC4CF",

        "primary-fixed": "#C8E6EF",
        "on-primary-fixed": "#0F3A42",
        "primary-fixed-dim": "#9BC4CF",
        "on-primary-fixed-variant": "#3D7582",

        "secondary-fixed": "#B8D6D5",
        "on-secondary-fixed": "#0A2625",
        "secondary-fixed-dim": "#9CBAB9",
        "on-secondary-fixed-variant": "#204E4D",

        "tertiary-fixed": "#F5E880",
        "on-tertiary-fixed": "#2A2200",
        "tertiary-fixed-dim": "#D8CC00",
        "on-tertiary-fixed-variant": "#B59700",

        "surface-dim": "#D9DDDCFF",
        "surface-bright": "#F8FDFCFF",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff5f2",
        "surface-container": "#E6EFE9FF",
        "surface-container-high": "#E0E9E4FF",
        "surface-container-highest": "#DBE4DFFF",

        // === Dark Mode ===
        dark: {
          primary: "#9BC4CF",
          "on-primary": "#1F5A65",
          "primary-container": "#3D7582",
          "on-primary-container": "#C8E6EF",

          secondary: "#9CBAB9",
          "on-secondary": "#15403F",
          "secondary-container": "#204E4D",
          "on-secondary-container": "#B8D6D5",

          tertiary: "#D8CC00",
          "on-tertiary": "#3D3300",
          "tertiary-container": "#B59700",
          "on-tertiary-container": "#F5E880",

          error: "#FFB4AB",
          "on-error": "#690005",
          "error-container": "#93000A",
          "on-error-container": "#FFDAD6",

          background: "#0F1415",
          "on-background": "#E1E4E5",
          surface: "#0F1415",
          "on-surface": "#E1E4E5",

          "surface-variant": "#40484A",
          "on-surface-variant": "#C0C8CA",
          outline: "#8A9294",
          "outline-variant": "#40484A",

          shadow: "#000000",
          scrim: "#000000",
          "inverse-surface": "#E1E4E5",
          "inverse-on-surface": "#2E3132",
          "inverse-primary": "#578F9C",

          "primary-fixed": "#C8E6EF",
          "on-primary-fixed": "#0F3A42",
          "primary-fixed-dim": "#9BC4CF",
          "on-primary-fixed-variant": "#3D7582",

          "secondary-fixed": "#B8D6D5",
          "on-secondary-fixed": "#0A2625",
          "secondary-fixed-dim": "#9CBAB9",
          "on-secondary-fixed-variant": "#204E4D",

          "tertiary-fixed": "#F5E880",
          "on-tertiary-fixed": "#2A2200",
          "tertiary-fixed-dim": "#D8CC00",
          "on-tertiary-fixed-variant": "#B59700",

          "surface-dim": "#0F1415",
          "surface-bright": "#353A3B",
          "surface-container-lowest": "#0A0F10",
          "surface-container-low": "#171C1D",
          "surface-container": "#1B2021",
          "surface-container-high": "#252A2B",
          "surface-container-highest": "#303536",
        },
      },
    },
  },
  plugins: [],
};

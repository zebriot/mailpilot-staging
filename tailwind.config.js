module.exports = {
  content: [
    "./pages/**/*.js",
    "./LandingPage/*.tsx",
    "./LandingPage/**/*.tsx",
    "./pages/**/*.tsx",
    "./pages/**/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.tsx",
    "./components/*.tsx",
  ],
  variants: {},
  plugins: [],
  theme: {
    colors: {
      primary: {
        50: "#EFEFFF",
        400: "#6666FF",
        500: "#5353DA",
        DEFAULT: "#6666FF",
      },

      darkGrey: "#7D7D7D",
      lightGrey: "#98A2B3",

      light: {
        100: "#EAECF0",
        200: "#D0D5DD",
        300: "#98A2B3",
      },

      blackLogo: "#171821",
      dark100: "#72777B",
      neutral100: "#ffff",
      neutral900: "#000",

      danger300: "#F97066",
      danger400: "#F04438",
      danger50: "#FEE4E2",

      success50: "#DCFAE6",
      success300: "#47CD89",

      info50: "#E9EEF9",
      info100: "#BACCEA",
      info400: "#5481C1",

      warn300: "#FDB022",
      warn50: "#FEF0C7",

      transparent: "rgba(0,0,0,0)",
    },
  },
};

import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Avenir Light",
    },
    h2: {
      fontFamily: "Arial Black",
      fontSize: "80px",
      letterSpacing: "-0.04px",
      lineHeight: "1.2px",
    },
    h3: {
      fontFamily: "Avenir Light",
      fontSize: "17px",
      letterSpacing: "0.7px",
    },
    h4: {
      fontFamily: "Arial Black",
      fontSize: "28px",
      letterSpacing: "0px",
      fontWeight: "bold",
    },
    h5: {
      fontFamily: "Avenir",
      fontSize: "25px",
      letterSpacing: "0.04px",
      lineHeight: "1.2px",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "Arial Black",
      fontSize: "16px",
      letterSpacing: "0px",
      lineHeight: "normal",
    },
    subtitle2: {
      fontFamily: "Avenir Light",
      fontSize: "20px",
      letterSpacing: "0px",
      lineHeight: "normal",
    },
    body1: {
      fontFamily: "Avenir Light",
      fontSize: "16px",
    },
    body2: {
      fontFamily: "Avenir Light",
      fontSize: "11px",
      letterSpacing: "0.7px",
      lineHeight: "1.4px",
    },
    button: {
      fontFamily: "Avenir Light",
    },
  },
  palette: {
    mode: "light",
    text: {
      primary: "#000000",
      secondary: "#4c4a46",
      disabled: "#686868",
    },
    primary: {
      main: "#f8ebe1",
      light: "#f8852d",
      dark: "#f99d57",
      contrastText: "#eaeaea",
    },
    secondary: {
      main: "#4c4a46",
      light: "#353535",
      dark: "#030303",
      contrastText: "#fff5f3",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f2e5",
    },
  },
});
export default theme;

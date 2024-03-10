import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
      xxl: 1900,
    },
  },
  palette: {
    GrayPhoneNav: {
      main: "#605f5d",
    },
    Transparent: {
      main: "rgba(0,0,0,0)",
    },
    LogoActive: {
      main: "#C7B3A3",
    },
    PinkChiffon: {
      main: "#FFF5F3",
    },
    SteelMist: {
      main: "#EAEAEA",
    },
    CreamyDawn: {
      main: "#F9F2E5",
    },
    PinkMarbleSky: {
      main: "#F8EBE1",
    },
    ChatBraun: {
      main: "#69513d",
    },
    ButtonBlack: {
      main: "#030303",
      dark: "#353535",
      contrastText: "#ffffff",
    },
    FieryOrange: {
      main: "#F8852D",
      dark: "#F99D57",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Arial Black",

    FontArialBlack1: {
      fontFamily: "Arial Black",
      fontSize: "42px",
      letterSpacing: "0",
      lineHeight: "normal",
      fontWeight: "bold",
    },
    FontArialBlack2: {
      fontFamily: "Arial Black",
      fontSize: "22px",
    },
    FontArialBlack3: {
      fontFamily: "Arial Black",
      fontSize: "30px",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    FontAvenirLight1: {
      fontFamily: "Nunito",
      fontSize: "17px",
      letterSpacing: "0.7rem",
      lineHeight: "normal",
    },
    FontAvenirLight2: {
      fontFamily: "Nunito",
      fontSize: "17px",
      letterSpacing: "0.7rem",
      lineHeight: "1.8rem",
    },
    FontAvenirLight3: {
      fontFamily: "Nunito",
      fontSize: "16px",
      letterSpacing: "0",
      lineHeight: "2rem",
    },
    FontAvenirLight4: {
      fontFamily: "Nunito",
      fontSize: "16px",
      letterSpacing: "0.7rem",
      lineHeight: "normal",
    },
    h2: {
      fontFamily: "Arial Black",
      fontSize: "80px",
      letterSpacing: "-0.04rem",
      lineHeight: "1.1",
    },
    h4: {
      fontFamily: "Arial Black",
      fontSize: "28px",
      letterSpacing: "0",
      fontWeight: "bold",
      lineHeight: "1.3",
    },
    h5: {
      fontFamily: "Avenir, sans-serif",
      fontSize: "25px",
      letterSpacing: "0.04",
      lineHeight: "1.2",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "Arial Black",
      fontSize: "16px",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    subtitle2: {
      fontFamily: "Nunito",
      fontSize: "20px",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    body1: {
      fontFamily: "Nunito",
      fontSize: "14px",
      letterSpacing: "0",
      lineHeight: "2.2rem",
    },
    body2: {
      fontFamily: "Nunito",
      fontSize: "11px",
      letterSpacing: "0.7rem",
      lineHeight: "1.4rem",
    },
  },
});

export default theme;

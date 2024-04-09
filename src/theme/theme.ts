import { createTheme } from "@mui/material";
import { MuiButtonStyles } from "./components/Button.styles.ts";
import { MuiTextFieldStyles } from "./components/TextField.styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
      tm: 1000,
    },
  },
  components: {
    MuiTextField: MuiTextFieldStyles,
    MuiButton: MuiButtonStyles,
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
    FieryOrange: {
      main: "#F8852D",
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
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeightRegular: 300,
    heading: {
      fontFamily: "Arial Black",
      fontSize: "42px",
    },
    paragraph: {
      fontFamily: "Nunito",
      fontSize: "16px",
    },
  },
});

export default theme;

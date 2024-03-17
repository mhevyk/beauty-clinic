import { createTheme } from "@mui/material";
import { CSSProperties } from "react";

const baseButtonStyles: CSSProperties = {
  textTransform: "none",
  borderRadius: 0,
  transition: "all 400ms",
  fontFamily: "Nunito",
  fontWeight: "300",
  fontSize: "16px",
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "default",
      },
      variants: [
        {
          props: { variant: "default" },
          style: {
            ...baseButtonStyles,
            fontWeight: "400",
            backgroundColor: "rgba(0,0,0,0)",
            color: "rgb(3, 3, 3)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0)",
              opacity: 0.8,
            },
            "&:focus": {
              backgroundColor: "rgba(0,0,0,0)",
              opacity: 0.8,
            },
          },
        },
        {
          props: { variant: "primary" },
          style: {
            ...baseButtonStyles,
            fontSize: "15px",
            padding: "11px 45px",
            border: "2px solid #030303",
            backgroundColor: "#030303",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#353535",
              borderColor: "#353535",
            },
            "&:focus": {
              backgroundColor: "#353535",
              borderColor: "#353535",
            },
          },
        },
        {
          props: { variant: "primary-outlined" },
          style: {
            ...baseButtonStyles,
            backgroundColor: "rgba(0,0,0,0)",
            border: "1px solid #030303",
            color: "#030303",
            padding: "10px 35px",
            fontSize: "17px",
            "&:hover": {
              backgroundColor: "#030303",
              color: "#ffffff",
            },
            "&:focus": {
              backgroundColor: "#030303",
              color: "#ffffff",
            },
          },
        },
        {
          props: { variant: "accent" },
          style: {
            ...baseButtonStyles,
            fontSize: "16px",
            fontWeight: "200",
            padding: "9px 62px",
            backgroundColor: "#f8852d",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#f99d57",
            },
            "&:focus": {
              backgroundColor: "#f99d57",
            },
          },
        },
      ],
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
    fontFamily: "Arial Black",
    fontSize: 14,

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

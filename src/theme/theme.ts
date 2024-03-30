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
    MuiTextField: {
      defaultProps: {
        InputProps: {
          sx: {
            borderRadius: 0,
          },
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "rgb(3, 3, 3)",
              borderWidth: "0.15rem",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(3, 3, 3)",
            },
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "default",
        disableRipple: true,
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

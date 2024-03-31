import { Components } from "@mui/material";
import { CSSProperties } from "react";

const baseButtonStyles: CSSProperties = {
  textTransform: "none",
  borderRadius: 0,
  transition: "all 400ms",
  fontFamily: "Nunito",
  fontWeight: "300",
  fontSize: "16px",
};

export const MuiButtonStyles: Components["MuiButton"] = {
  defaultProps: {
    variant: "default",
    disableRipple: true,
  },
  styleOverrides: {
    sizeSmall: {
      padding: "5.28px 50px",
    },
    sizeMedium: {
      variants: [
        { props: { variant: "primary" }, style: { padding: "11px 45px" } },
        {
          props: { variant: "primary-outlined" },
          style: { padding: "10px 35px" },
        },
        { props: { variant: "accent", style: { padding: "9px 62px" } } },
      ],
    },
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
};

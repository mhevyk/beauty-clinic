import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme.ts";

export const BoxStyled = styled(Box)({
  [theme.breakpoints.up("xs")]: {
    height: 460,
  },
  [theme.breakpoints.up("lg")]: {
    height: 560,
  },
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const ImgStyled = styled("img")({
  position: "relative",
  zIndex: 5,
  top: "15%",
  objectFit: "cover",
  width: "auto",
  height: "40%",
  [theme.breakpoints.down("md")]: {
    height: "50%",
    top: "12%",
  },
});

export const TitleStyled = styled("h4")({
  [theme.breakpoints.up("sm")]: {
    fontSize: "28px",
  },
  [theme.breakpoints.up("md")]: {
    width: 210,
  },
  marginBottom: "30px",
  ...theme.typography.heading,
  marginTop: "100px",
  fontSize: "20px",
  textAlign: "center",
});

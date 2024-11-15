import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme";

const smallScreenMediaQuery = theme.breakpoints.down("md");
const middleScreenMediaQuery = theme.breakpoints.down(1200);

export const HelloImg = styled("img")({
  userSelect: "none",
  zIndex: 1,
  width: 580,
  height: 380,
  transform: "rotate(350deg)",
  position: "relative",
  top: 80,
  right: 80,
  [middleScreenMediaQuery]: {
    width: 406,
    height: 266,
    top: 56,
    right: 56,
  },
  [smallScreenMediaQuery]: {
    width: 201,
    height: 114,
    top: 10,
    left: 22,
  },
});

export const BoxStyled = styled(Box)({
  transform: "translateX(-20px)",
  display: "flex",
  [middleScreenMediaQuery]: {
    transform: "translateX(0px)",
  },
  [smallScreenMediaQuery]: {
    transform: "translateX(0px)",
    flexDirection: "column-reverse",
    alignItems: "center",
  },
});

export const BoxTitleStyled = styled(Box)({
  marginBottom: 240,
});

export const SectionStyled = styled("section")({
  overflow: "hidden",
  height: "1060px",
  backgroundColor: "#F8EBE1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [smallScreenMediaQuery]: {
    height: "900px",
  },
});

export const Description = styled("h1")({
  fontFamily: "Avenir, sans-serif",
  fontSize: "25px",
  letterSpacing: "0.04",
  lineHeight: "1.2",
  fontWeight: "bold",
  margin: "19px 0 19px 5px",

  [middleScreenMediaQuery]: {
    fontSize: "23px",
  },
  [smallScreenMediaQuery]: {
    position: "relative",
    fontSize: "22px",
    width: 200,
    textAlign: "center",
    margin: 0,
    left: 10,
    bottom: 20,
  },
});

export const Header = styled("h1")({
  ...theme.typography.heading,
  fontSize: "80px",
  letterSpacing: "-0.04rem",
  lineHeight: "1.1",
  zIndex: 2,
  margin: 0,
  position: "relative",
  [middleScreenMediaQuery]: {
    fontSize: "55px",
  },
  [smallScreenMediaQuery]: {
    fontSize: "35px",
    bottom: 35,
    textAlign: "center",
  },
});

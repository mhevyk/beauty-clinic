import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme";

const smallScreenMediaQuery = theme.breakpoints.down("md");
const middleScreenMediaQuery = theme.breakpoints.down(1200);

export const FlowerImage = styled("img")({
  width: 325,
  height: 738,
  [middleScreenMediaQuery]: {
    width: 227.5,
    height: 516.6,
  },
  [smallScreenMediaQuery]: {
    width: 155,
    height: 352,
  },
});

export const CottonImage = styled("img")({
  position: "relative",
  width: 331,
  height: 165,
  top: 540,
  right: 690,
  transform: "rotate(353deg)",
  [middleScreenMediaQuery]: {
    width: 231.7,
    height: 115.5,
    top: 378,
    right: 483,
  },
  [smallScreenMediaQuery]: {
    width: 163,
    height: 87,
    top: 240,
    right: 320,
  },
});

export const CocoImage = styled("img")({
  position: "relative",
  width: 235,
  height: 240,
  top: 230,
  right: 395,
  [middleScreenMediaQuery]: {
    width: 164.5,
    height: 168,
    top: 161,
    right: 276.5,
  },
  [smallScreenMediaQuery]: {
    width: 90,
    height: 90,
    top: 120,
    right: 215,
  },
});

export const PetalImage = styled("img")({
  position: "relative",
  width: 154,
  height: 134,
  top: 40,
  right: 215,
  transform: "rotate(334deg)",
  [middleScreenMediaQuery]: {
    width: 107.8,
    height: 93.8,
    top: 28,
    right: 150.5,
  },
  [smallScreenMediaQuery]: {
    width: 90,
    height: 87,
    top: 15,
    right: 100,
  },
});

export const BoxImageStyled = styled(Box)({
  userSelect: "none",
  width: 330,
  display: "flex",
  marginTop: 100,
  [middleScreenMediaQuery]: {
    width: 231,
    marginTop: 70,
  },
  [smallScreenMediaQuery]: {
    marginTop: 320,
    width: 155,
  },
});

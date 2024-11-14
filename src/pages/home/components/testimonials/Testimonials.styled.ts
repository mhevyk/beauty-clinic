import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme.ts";

export const PinkChiffon = theme.palette.PinkChiffon.main;
export const SteelMist = theme.palette.SteelMist.main;

export const BoxStyled = styled(Box)({
  height: "0",
  [theme.breakpoints.up("md")]: {
    height: "123px",
  },
});
export const GridBoxStyled = styled(Box)({
  justifyContent: "center",
  display: "grid",
  gridTemplateRows: "auto",
  paddingBottom: "80px",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridTemplateAreas: `"firstCard""imageCard""secondCard"`,
  [theme.breakpoints.up("md")]: {
    paddingBottom: "0",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateAreas: `"firstCard secondCard"
  "imageCard imageCard"`,
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"firstCard imageCard secondCard"`,
  },
});

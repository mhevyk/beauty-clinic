import { Grid, styled } from "@mui/material";
import Container from "@mui/material/Container";

import FernDecorationSvg from "@/assets/decorations/fern.svg";

import theme from "@/theme/theme";

export const Section = styled("section")({
  backgroundColor: theme.palette.CreamyDawn.main,
  padding: "100px 15px",
});

export const TreatmentsWrapper = styled(Container)({
  maxWidth: "1000px",
});

export const TreatmentDecoration = styled(FernDecorationSvg)({
  position: "relative",
  width: "446px",
  height: "225px",
  transform: "rotate(356deg)",
  left: "50%",
  display: "none",
  overflow: "hidden",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
  [theme.breakpoints.down("lg")]: {
    width: "356px",
    height: "180px",
    transform: "rotate(362deg)",
  },
});

export const TreatmentsGrid = styled(Grid)({
  justifyContent: "center",
});

export const Title = styled("h2")({
  ...theme.typography.heading,
  margin: 0,
  fontSize: "24px",
  lineHeight: "1.2em",
  maxWidth: "250px",
  width: "100%",
  display: "flex",
  [theme.breakpoints.up("sm")]: {
    fontSize: "42px",
    maxWidth: "500px",
  },
});

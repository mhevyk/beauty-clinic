import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import LeafDecorationSvg from "@/assets/decorations/sharp-leaf.svg";

export const EmployeeImageWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.between("sm", "md")]: {
    padding: "0 8vw",
    backgroundColor: theme.palette.CreamyDawn.main,
  },
}));

export const EmployeeImage = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "cover",
  aspectRatio: "4/5",
  [theme.breakpoints.up("xl")]: {
    aspectRatio: "17/14",
  },
}));

export const EmployeeDetails = styled(Grid)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  backgroundColor: theme.palette.CreamyDawn.main,
  padding: "0 4%",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
    justifyContent: "flex-end",
  },
  [theme.breakpoints.up(1050)]: {
    justifyContent: "center",
    padding: "0 8%",
  },
}));

export const LeafDecoration = styled(LeafDecorationSvg)(({ theme }) => ({
  margin: "0 auto",
  width: "220px",
  marginBottom: "43px",
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    right: "50%",
    transform: "translateX(35%)",
    top: "-90px",
    width: "443px",
    marginBottom: 0,
  },
}));

// NOTE: used to create layers effect in this section
export const EmployeeDetailsExpandDecoration = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  width: "65%",
  height: "90px",
  backgroundColor: theme.palette.CreamyDawn.main,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const EmployeeSummary = styled(Typography)(({ theme }) => ({
  lineHeight: "35.2px",
  margin: 0,
  marginBottom: "42px",
  [theme.breakpoints.up("md")]: {
    marginBottom: "20px",
  },
  [theme.breakpoints.up(1050)]: {
    marginBottom: 0,
  },
}));

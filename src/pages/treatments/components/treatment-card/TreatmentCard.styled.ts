import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import theme from "@/theme/theme";

export const BoxStyled = styled(Box)({
  backgroundColor: theme.palette.primary.main,
  height: "252px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "auto",
  padding: "31px",
  gap: "10px",
});

export const ButtonStyled = styled(Button)({
  fontSize: "16px",
  fontWeight: 700,
  width: "115px",
  padding: "5px 10px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "14px",
  },
}) as typeof Button;

export const TitleStyled = styled("h4")({
  ...theme.typography.heading,
  margin: 0,
  textAlign: "center",
  fontSize: "20px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "22px",
  },
});

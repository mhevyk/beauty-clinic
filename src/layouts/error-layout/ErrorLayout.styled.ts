import { alpha } from "@mui/material";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ErrorIcon from "@/assets/icons/error-icon.svg";

export const BookNowLinkButton = styled(Button)({
  padding: "8px 30px",
  display: "block",
  marginTop: "22px",
  width: "max-content",
}) as typeof Button;

export const ErrorStyled = styled(ErrorIcon)({
  height: "60px",
});

export const ErrorFallback = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.5),
  padding: "42px 56px",
  margin: "100px 0",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: "42px 6px",
  },
}));

export const BoxStyled = styled(Box)({
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
});

export const TitleStyled = styled("h4")(({ theme }) => ({
  ...theme.typography.heading,
  margin: 0,
  padding: "0 32px",
  fontSize: "22px",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    padding: "0 12px",
  },
}));

export const ButtonGroup = styled(Box)({
  display: "flex",
  justifyContent: "end",
});

export const Description = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  margin: "12px 0",
  fontSize: "14px",
  letterSpacing: "0.1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

export const ListItemStyled = styled("li")({
  marginBottom: "4px",
  fontSize: "14px",
  letterSpacing: "0.1rem",
});

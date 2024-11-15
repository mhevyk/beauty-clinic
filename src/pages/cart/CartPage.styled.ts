import { Link } from "react-router-dom";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme.ts";

export const SectionStyled = styled("section")({
  backgroundColor: theme.palette.PinkMarbleSky.main,
  display: "flex",
  justifyContent: "center",
});

export const ContainerStyled = styled(Box)({
  maxWidth: "940px",
  width: "100%",
  margin: "140px 10px 48px 10px",
});

export const LinkStyled = styled(Link)({
  textDecoration: "underline",
  fontSize: "15px",
});

export const BoxStyled = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "410px",
});

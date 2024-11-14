import { styled } from "@mui/material";
import Button from "@mui/material/Button";

import theme from "@/theme/theme.ts";

export const SectionStyled = styled("section")({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: "120px 0",
});

export const TitleStyled = styled("h2")({
  margin: 0,
  paddingBottom: 20,
  ...theme.typography.paragraph,
  fontSize: "17px",
  letterSpacing: "0.7em",
  fontWeight: 400,
});

export const ButtonStyled = styled(Button)({
  margin: "auto",
}) as typeof Button;

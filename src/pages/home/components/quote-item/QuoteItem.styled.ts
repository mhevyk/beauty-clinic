import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme.ts";

export const BoxInFade = styled(Box)({
  position: "absolute",
});

export const TypographyAuthorStyled = styled("p")({
  ...theme.typography.paragraph,
  textAlign: "center",
  fontSize: "16px",
  letterSpacing: "0.7em",
  textTransform: "uppercase",
});

export const TypographyDescriptionStyled = styled("h4")({
  ...theme.typography.heading,
  fontSize: "20px",
  textAlign: "center",
  width: 256,
  textWrap: "balance",
  [theme.breakpoints.up("lg")]: {
    fontSize: "28px",
    width: 310,
  },
});

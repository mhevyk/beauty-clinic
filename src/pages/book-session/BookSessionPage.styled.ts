import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme.ts";

export const ContainerStyled = styled(Box)({
  maxWidth: "800px",
  width: "100%",
  margin: "140px 10px 48px 10px",
});

export const SectionStyled = styled("section")({
  backgroundColor: theme.palette.CreamyDawn.main,
  display: "flex",
  justifyContent: "center",
});

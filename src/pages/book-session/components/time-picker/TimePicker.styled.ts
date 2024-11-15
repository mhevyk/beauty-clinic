import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import theme from "@/theme/theme.ts";

export const BoxGridStyled = styled(Box)({
  width: "375px",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "48px",
  [theme.breakpoints.down(393)]: {
    justifyContent: "center",
  },
});

export const ButtonStyled = styled(Button)({
  marginTop: "30px",
});

export const ButtonShowSessionStyled = styled(ButtonStyled)({
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "underline",
  },
});

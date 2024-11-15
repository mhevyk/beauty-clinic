import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const ButtonStyled = styled(Button)({
  textAlign: "left",
  paddingBottom: "42px",
  fontWeight: 330,
}) as typeof Button;

export const DateNow = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  margin: "0",
}));

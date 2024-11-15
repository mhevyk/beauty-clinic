import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

export const BoxStyled = styled(Box)({
  display: "flex",
  gap: "24px",
});

export const TextFieldStyled = styled(TextField)(({ theme, disabled }) => ({
  backgroundColor: theme.palette.CreamyDawn.main,
  ...(disabled && { pointerEvents: "none" }),
}));

export const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  marginTop: "32px",
});

export const Counter = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  display: "flex",
  justifyContent: "end",
  margin: "8px 0 0 0",
  position: "absolute",
  right: 0,
  top: "58px",
}));

import { styled } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

export const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "19px",
});

export const LabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "15px",
  marginBottom: "2px",
  fontWeight: 400,
}));

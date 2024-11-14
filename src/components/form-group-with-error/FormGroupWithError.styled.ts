import { styled } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

export const Feedback = styled(FormHelperText)(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "12px",
  lineHeight: "1rem",
}));

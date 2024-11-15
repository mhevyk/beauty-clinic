import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";

export const DialogContentTextStyled = styled(DialogContentText)(
  ({ theme }) => ({
    ...theme.typography.paragraph,
    fontSize: "17px",
    color: theme.palette.text.primary,
    margin: "0 0 28px 0",
    lineHeight: 1.4,
    textAlign: "center",
  })
);

export const ReCAPTCHABox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(350)]: {
    transform: "scale(0.7)",
  },
}));

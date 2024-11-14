import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CloseIconSvg from "@/assets/icons/close-icon-thin.svg";

import ButtonWithSpinner from "@/components/button-with-spinner/ButtonWithSpinner";

export const CircleWrapper = styled(Box)(({ theme }) => ({
  width: "115px",
  height: "115px",
  border: `6px solid ${theme.palette.secondary.main}`,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "25px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
  },
}));

export const Information = styled(Box)({
  maxWidth: "244px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginLeft: "21px",
});

export const Digit = styled(Typography)({
  fontSize: "55px",
  fontWeight: "bold",
});

export const DialogContentStyled = styled(DialogContent)({
  padding: "62px 32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const Title = styled(Typography)({
  letterSpacing: "1px",
  fontSize: "19px",
  fontWeight: "bold",
  textAlign: "center",
});

export const Description = styled(Typography)({
  fontSize: "11px",
  letterSpacing: "1.28px",
  lineHeight: "26px",
  textAlign: "center",
});

export const SubmitButton = styled(ButtonWithSpinner)(({ theme }) => ({
  "&.Mui-disabled": {
    color: theme.palette.primary.main,
    opacity: 0.5,
  },
}));

export const CloseIconButton = styled(IconButton)({
  position: "absolute",
  right: 16,
  top: 16,
});

export const CloseIcon = styled(CloseIconSvg)(({ theme }) => ({
  width: 30,
  aspectRatio: "1 / 1",
  [theme.breakpoints.up("md")]: {
    width: 20,
  },
}));

export const DividerStyled = styled(Divider)({
  "&::before, &::after": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  margin: "25px auto",
  width: "100%",
  maxWidth: "198px",
});

export const ResetPasswordFormWrapper = styled(Box)({
  width: "100%",
  marginBottom: "25px",
});

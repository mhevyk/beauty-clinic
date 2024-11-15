import { styled } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

import CloseIconSvg from "@/assets/icons/close-icon-thin.svg";

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "51.2px 0",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
  [theme.breakpoints.up("md")]: {
    margin: "51.2px 60px",
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

export const DialogContentTitle = styled("h2")(({ theme }) => ({
  ...theme.typography.heading,
  fontWeight: "bold",
  fontSize: "35px",
  margin: "0 0 18px 0",
}));

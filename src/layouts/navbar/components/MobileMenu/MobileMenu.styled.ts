import { styled } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  background: theme.palette.PinkMarbleSky.main,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: 0,
}));

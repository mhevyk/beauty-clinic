import { styled } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";

export const CalendarCell = styled(ButtonBase)(({ theme }) => ({
  [theme.breakpoints.down(320)]: {
    fontSize: "12px",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Nunito",
  fontSize: "16px",
}));

import { ButtonBase, styled } from "@mui/material";

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

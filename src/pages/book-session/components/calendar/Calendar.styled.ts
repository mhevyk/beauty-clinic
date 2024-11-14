import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import { CalendarCell } from "@/pages/book-session/components/calendar-cell/CalendarCell.styled";
import theme from "@/theme/theme";

export const CalendarCellsContainer = styled(Box)(() => {
  const CALENDAR_SMALL_CELL_SIZE = "30px";
  const CALENDAR_CELL_SIZE = "40px";

  return {
    [theme.breakpoints.up(380)]: {
      gap: "16px",
    },
    [theme.breakpoints.down(320)]: {
      gridTemplateColumns: `repeat(7, ${CALENDAR_SMALL_CELL_SIZE})`,
      gridAutoRows: CALENDAR_SMALL_CELL_SIZE,
    },
    display: "grid",
    gridTemplateColumns: `repeat(7, ${CALENDAR_CELL_SIZE})`,
    gridAutoRows: CALENDAR_CELL_SIZE,
    gap: "6px",
  };
});

export const CalendarWeekDay = styled(CalendarCell)({
  color: "rgb(96, 95, 93)",
});

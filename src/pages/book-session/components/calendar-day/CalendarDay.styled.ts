import { SxProps, alpha, styled } from "@mui/material";

import { CalendarCell } from "@/pages/book-session/components/calendar-cell/CalendarCell.styled";
import { CalendarSize } from "@/pages/book-session/hooks/use-calendar/useCalendar.types";
import theme from "@/theme/theme";

type CalendarDayCellProps = {
  isToday?: boolean;
  isSelected?: boolean;
  hasAvailableSessions?: boolean;
  isAnotherMonth?: boolean;
  calendarSize: CalendarSize;
};

export const CalendarDayCell = styled(CalendarCell, {
  shouldForwardProp: prop =>
    prop !== "isToday" &&
    prop !== "isSelected" &&
    prop !== "isAnotherMonth" &&
    prop !== "hasAvailableSessions" &&
    prop !== "calendarSize",
})<CalendarDayCellProps>(({
  isToday,
  isSelected,
  isAnotherMonth,
  hasAvailableSessions = false,
  calendarSize,
}) => {
  const outlineBoxShadow = "0 0 0 1px #ffffff, 0 0 0 3px #116dff";

  const styles: Record<string, SxProps | string> = {
    "&:focus-visible": {
      boxShadow: outlineBoxShadow,
    },
    "&:disabled": {
      color: "rgb(181, 180, 177)",
      "&::after": {
        content: "none",
      },
    },
  };

  const isMobileCalendar = calendarSize === "compact";

  if (isMobileCalendar) {
    styles["&:active"] = {
      boxShadow: outlineBoxShadow,
    };
  }

  const shouldDisplayDot = !isAnotherMonth && hasAvailableSessions;

  if (shouldDisplayDot) {
    styles["&::after"] = {
      content: "''",
      position: "absolute",
      bottom: "4.5px",
      width: "4px",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      backgroundColor: theme.palette.secondary.main,
    };
  }

  if (isSelected && !isAnotherMonth) {
    styles.backgroundColor = theme.palette.secondary.main;
    styles.color = theme.palette.primary.main;
    styles["&:hover"] = {
      opacity: 0.75,
    };
  } else {
    if (isToday) {
      styles.color = theme.palette.FieryOrange.main;
    }
    styles["&:hover"] = {
      backgroundColor: isMobileCalendar
        ? alpha(theme.palette.secondary.main, 0.1)
        : alpha(theme.palette.FieryOrange.main, 0.1),
    };
  }

  return styles;
});

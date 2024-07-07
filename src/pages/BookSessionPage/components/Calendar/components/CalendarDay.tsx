import { SxProps, alpha } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { format, isBefore, isToday, startOfToday } from "date-fns";

import { useDatetimePickerContext } from "@/pages/BookSessionPage/context/DatetimePickerProvider";

import { CalendarSize, CalendarUtils } from "../types";
import { CalendarCell } from "./CalendarCell";

type CalendarDayCellProps = {
  isToday?: boolean;
  isSelected?: boolean;
  hasAvailableSessions?: boolean;
  isAnotherMonth?: boolean;
  calendarSize: CalendarSize;
};

const CalendarDayCell = styled(CalendarCell, {
  shouldForwardProp: prop =>
    prop !== "isToday" &&
    prop !== "isSelected" &&
    prop !== "isAnotherMonth" &&
    prop !== "hasAvailableSessions" &&
    prop !== "calendarSize",
})<CalendarDayCellProps>(({
  theme,
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

type CalendarDayProps = {
  day: Date;
  utils: CalendarUtils;
  calendarSize: CalendarSize;
  hasAvailableSessions: boolean;
};

export default function CalendarDay({
  day,
  calendarSize,
  hasAvailableSessions,
  utils: { checkSelected, checkAnotherMonth },
}: CalendarDayProps) {
  const { setSelectedDate, setSelectedTime } = useDatetimePickerContext();

  const isAnotherMonth = checkAnotherMonth(day);
  const isSelected = checkSelected(day);

  return (
    <CalendarDayCell
      key={day.getTime()}
      calendarSize={calendarSize}
      disabled={isBefore(day, startOfToday()) || isAnotherMonth}
      // comparing object references here because we use same object with debounce
      hasAvailableSessions={hasAvailableSessions}
      isAnotherMonth={isAnotherMonth}
      isToday={isToday(day)}
      isSelected={isSelected}
      disableRipple
      onClick={() => {
        setSelectedDate(day);
        setSelectedTime(null);
      }}
    >
      <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
    </CalendarDayCell>
  );
}

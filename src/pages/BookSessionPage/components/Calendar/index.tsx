import {
  Box,
  ButtonBase,
  SxProps,
  styled,
  useMediaQuery,
  alpha,
} from "@mui/material";
import { format, isBefore, startOfToday } from "date-fns";
import { CalendarSize, useCalendar } from "./hooks/useCalendar";
import theme from "@theme/theme";
import CalendarHeader from "./components/CalendarHeader";
import useNextPageListener from "./hooks/useNextPageListener";

const CalendarContainer = styled(Box)({
  minWidth: "200px",
  maxWidth: "min-content",
});

const CalendarCellsContainer = styled(Box)(() => {
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

const CalendarCell = styled(ButtonBase)({
  [theme.breakpoints.down(320)]: {
    fontSize: "12px",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Nunito",
  fontSize: "16px",
});

const CalendarWeekDay = styled(CalendarCell)({
  color: "rgb(96, 95, 93)",
});

type CalendarDayProps = {
  isToday?: boolean;
  isSelected?: boolean;
  hasAvailableSessions?: boolean;
  isAnotherMonth?: boolean;
  calendarSize: CalendarSize;
};

const CalendarDay = styled(CalendarCell, {
  shouldForwardProp: (prop) =>
    prop !== "isToday" &&
    prop !== "isSelected" &&
    prop !== "isAnotherMonth" &&
    prop !== "hasAvailableSessions" &&
    prop !== "calendarSize",
})<CalendarDayProps>(({
  theme,
  isToday,
  isSelected,
  isAnotherMonth,
  hasAvailableSessions,
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

type CalendarProps = {
  selectedDayDate: Date;
  setSelectedDayDate: (date: Date) => void;
};

const Calendar = ({ selectedDayDate, setSelectedDayDate }: CalendarProps) => {
  const isBiggerThanSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const calendarSize = isBiggerThanSmallScreen ? "normal" : "compact";
  const { data, controls, pageUtils } = useCalendar({
    selectedDayDate,
    size: calendarSize,
  });

  useNextPageListener({ calendarSize, showNextPage: pageUtils.showNextPage });

  return (
    <CalendarContainer>
      <CalendarHeader
        controls={controls}
        selectedPageLabel={data.selectedPageLabel}
      />
      <CalendarCellsContainer>
        {data.weekDays.map((weekDay) => (
          <CalendarWeekDay key={weekDay} as="div">
            {weekDay}
          </CalendarWeekDay>
        ))}
        {data.days.map((day) => (
          <CalendarDay
            key={day.date.getTime()}
            calendarSize={calendarSize}
            disabled={isBefore(day.date, startOfToday()) || day.isAnotherMonth}
            hasAvailableSessions={true} // TODO: replace with event data
            isAnotherMonth={day.isAnotherMonth}
            isToday={day.isToday}
            isSelected={day.isSelected}
            disableRipple
            onClick={() => setSelectedDayDate(day.date)}
          >
            <time dateTime={format(day.date, "yyyy-MM-dd")}>
              {format(day.date, "d")}
            </time>
          </CalendarDay>
        ))}
      </CalendarCellsContainer>
    </CalendarContainer>
  );
};

export default Calendar;

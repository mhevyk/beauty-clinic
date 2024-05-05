import { Box, styled, useMediaQuery } from "@mui/material";
import { useCalendar } from "./hooks/useCalendar";
import theme from "@theme/theme";
import CalendarHeader from "./components/CalendarHeader";
import useNextPageListener from "./hooks/useNextPageListener";
import useTreatmentSessionAvailabilities from "./hooks/useTreatmentSessionAvailabilities";
import { useDatetimePickerContext } from "@pages/BookSessionPage/context/DatetimePickerProvider";
import useDebouncedValue from "@hooks/useDebouncedValue";
import CalendarDay from "./components/CalendarDay";
import { CalendarCell } from "./components/CalendarCell";
import { isBefore, startOfToday } from "date-fns";

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

const CalendarWeekDay = styled(CalendarCell)({
  color: "rgb(96, 95, 93)",
});

const Calendar = () => {
  const { selectedDate, selectedEmployeeId } = useDatetimePickerContext();

  const isBiggerThanSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const calendarSize = isBiggerThanSmallScreen ? "normal" : "compact";

  const {
    data: { weekDays, days, selectedPageLabel, selectedPage },
    utils,
    controls,
  } = useCalendar({
    selectedDayDate: selectedDate,
    size: calendarSize,
  });

  // tries to fetch only for last paged where user stopped if user clicks on previous or next page buttons very quickly
  const debouncedDays = useDebouncedValue(days);

  const treatmentSessionAvailabilities = useTreatmentSessionAvailabilities({
    days: debouncedDays,
    shouldFetch: !isBefore(selectedPage, startOfToday()),
    employeeId: selectedEmployeeId,
  });

  useNextPageListener({
    checkSamePage: utils.checkSamePage,
    showNextPage: controls.showNextPage,
  });

  return (
    <CalendarContainer>
      <CalendarHeader
        controls={controls}
        selectedPageLabel={selectedPageLabel}
      />
      <CalendarCellsContainer>
        {weekDays.map((weekDay) => (
          <CalendarWeekDay key={weekDay} as="div">
            {weekDay}
          </CalendarWeekDay>
        ))}
        {days.map((day, index) => (
          <CalendarDay
            key={day.getTime()}
            day={day}
            calendarSize={calendarSize}
            hasAvailableSessions={Boolean(
              days === debouncedDays && treatmentSessionAvailabilities?.[index]
            )}
            utils={utils}
          />
        ))}
      </CalendarCellsContainer>
    </CalendarContainer>
  );
};

export default Calendar;

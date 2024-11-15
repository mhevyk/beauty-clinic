import { useMemo } from "react";

import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { isBefore, startOfToday, subMinutes } from "date-fns";

import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import CalendarDay from "@/pages/book-session/components/calendar-day/CalendarDay";
import CalendarHeader from "@/pages/book-session/components/calendar-header/CalendarHeader";
import {
  CalendarCellsContainer,
  CalendarWeekDay,
} from "@/pages/book-session/components/calendar/Calendar.styled";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";
import { useCalendar } from "@/pages/book-session/hooks/use-calendar/useCalendar";
import useNextPageListener from "@/pages/book-session/hooks/use-next-page-listener/useNextPageListener";
import useTreatmentSessionAvailabilities from "@/pages/book-session/hooks/use-treatment-session-availabilities/useTreatmentSessionAvailabilities";
import theme from "@/theme/theme";

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

  // don't remove useMemo because this variable is used as a dependency in useTreatmentSessionAvailabilities useEffect
  const dateRange = useMemo(() => {
    const startDate = days[0]!;
    const endDate = days[days.length - 1]!;

    return {
      start: subMinutes(startDate, startDate.getTimezoneOffset()),
      end: subMinutes(endDate, endDate.getTimezoneOffset()),
    };
  }, [days]);

  // tries to fetch only for last paged where user stopped if user clicks on previous or next page buttons very quickly
  const debouncedDateRange = useDebouncedValue(dateRange);

  const treatmentSessionAvailabilities = useTreatmentSessionAvailabilities({
    range: debouncedDateRange,
    shouldFetch: !isBefore(selectedPage, startOfToday()),
    employeeId: selectedEmployeeId,
  });

  useNextPageListener({
    checkSamePage: utils.checkSamePage,
    showNextPage: controls.showNextPage,
  });

  const calendarWeekDays = useMemo(
    () =>
      weekDays.map(weekDay => (
        <CalendarWeekDay key={weekDay} data-testid="weekday" as="div">
          {weekDay}
        </CalendarWeekDay>
      )),
    [weekDays]
  );

  const calendarDays = days.map((day, index) => {
    const hasAvailableSessions = Boolean(
      dateRange === debouncedDateRange &&
        treatmentSessionAvailabilities?.[index]
    );

    return (
      <CalendarDay
        key={day.getTime()}
        day={day}
        calendarSize={calendarSize}
        hasAvailableSessions={hasAvailableSessions}
        utils={utils}
      />
    );
  });

  return (
    <Box>
      <CalendarHeader
        controls={controls}
        selectedPageLabel={selectedPageLabel}
      />
      <CalendarCellsContainer>
        {calendarWeekDays}
        {calendarDays}
      </CalendarCellsContainer>
    </Box>
  );
};

export default Calendar;

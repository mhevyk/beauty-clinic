import { format, isBefore, isToday, startOfToday } from "date-fns";

import { CalendarDayCell } from "@/pages/book-session/components/calendar-day/CalendarDay.styles";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";
import {
  CalendarSize,
  CalendarUtils,
} from "@/pages/book-session/hooks/use-calendar/useCalendar.types";

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

  const handleClick = () => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  return (
    <CalendarDayCell
      key={day.getTime()}
      calendarSize={calendarSize}
      disabled={isBefore(day, startOfToday()) || isAnotherMonth}
      hasAvailableSessions={hasAvailableSessions}
      isAnotherMonth={isAnotherMonth}
      isToday={isToday(day)}
      isSelected={isSelected}
      disableRipple
      onClick={handleClick}
    >
      <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
    </CalendarDayCell>
  );
}

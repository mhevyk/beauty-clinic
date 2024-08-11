import { Duration } from "date-fns";

import { CalendarSize } from "@/pages/book-session/hooks/use-calendar/useCalendar.types";
import getMonthRange from "@/pages/book-session/utils/get-month-range/getMonthRange.ts";
import { getWeekRange } from "@/pages/book-session/utils/get-week-range/getWeekRange";

type CalendarConfigItem = {
  unit: keyof Duration;
  getRange: (date: Date) => Date[];
};

type CalendarConfig = Record<CalendarSize, CalendarConfigItem>;

export const calendarConfig: CalendarConfig = {
  normal: {
    unit: "months",
    getRange: getMonthRange,
  },
  compact: {
    unit: "weeks",
    getRange: getWeekRange,
  },
};

import { Duration } from "date-fns";

import { CalendarSize } from "@/pages/book-session/hooks/use-calendar/useCalendar.types";
import getMonthRange from "@/pages/book-session/utils/get-month-range/getMonthRange";
import { getWeekRange } from "@/pages/book-session/utils/get-week-range/getWeekRange";

export const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

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

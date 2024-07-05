import { Duration } from "date-fns";

import { CalendarSize } from "../types";
import { getMonthRange } from "../utils/getMonthRange";
import { getWeekRange } from "../utils/getWeekRange";

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

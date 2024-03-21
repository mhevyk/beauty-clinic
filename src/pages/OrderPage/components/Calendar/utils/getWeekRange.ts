import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export function getWeekRange(date: Date) {
  return eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });
}

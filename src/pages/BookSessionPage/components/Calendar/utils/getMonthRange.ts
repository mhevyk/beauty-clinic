import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export default function getMonthRange(month: Date) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  // adding days for another week to force 42 days output
  while (days.length < 42) {
    const lastDay = days.at(-1)!;
    days.push(addDays(lastDay, 1));
  }

  return days;
}

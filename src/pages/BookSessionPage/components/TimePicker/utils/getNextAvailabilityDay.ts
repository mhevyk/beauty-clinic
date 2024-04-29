import { addDays, isWeekend } from "date-fns";

export default function getNextAvailabilityDay(date: Date) {
  let nextDay = date;

  do {
    nextDay = addDays(nextDay, 1);
  } while (isWeekend(nextDay));

  return nextDay;
}

import {
  eachHourOfInterval,
  getHours,
  isToday,
  isWeekend,
  set,
  setHours,
} from "date-fns";

export default function getHoursSession(date: Date) {
  if (isWeekend(date)) {
    return null;
  }

  const currentHour = getHours(new Date());
  const endHour = 16;

  if (isToday(date) && currentHour >= endHour) {
    return null;
  }

  const startHour = isToday(date) ? Math.max(currentHour + 1, 10) : 10;

  if (isToday(date) && startHour > endHour) {
    return null;
  }

  const startDate = setHours(date, startHour);

  const endDate = set(date, {
    hours: endHour,
    minutes: 30,
  });

  return eachHourOfInterval(
    {
      start: startDate,
      end: endDate,
    },
    { step: 0.5 },
  );
}

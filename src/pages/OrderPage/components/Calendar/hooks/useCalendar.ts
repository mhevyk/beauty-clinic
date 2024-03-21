import { useCallback, useState } from "react";
import {
  startOfToday,
  isToday,
  isSameMonth,
  isSameDay,
  sub,
  add,
  format,
} from "date-fns";
import { calendarConfig } from "../data/calendarConfig";

export type CalendarSize = "normal" | "compact";

export type CalendarDay = {
  date: Date;
  isToday: boolean;
  isAnotherMonth: boolean;
  isSelected: boolean;
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type UseCalendar = {
  selectedDayDate: Date | null;
  size: CalendarSize;
};

export function useCalendar({ selectedDayDate, size }: UseCalendar) {
  const [selectedPage, setSelectedPage] = useState(
    selectedDayDate ?? startOfToday()
  );

  const { unit, getRange } = calendarConfig[size];

  const showPreviousPage = useCallback(() => {
    setSelectedPage((page) => sub(page, { [unit]: 1 }));
  }, [unit]);

  const showNextPage = useCallback(() => {
    setSelectedPage((page) => add(page, { [unit]: 1 }));
  }, [unit]);

  const daysRange = getRange(selectedPage);

  const days: CalendarDay[] = daysRange.map((day) => ({
    date: day,
    isToday: isToday(day),
    isAnotherMonth: size === "normal" ? !isSameMonth(day, selectedPage) : false,
    isSelected: selectedDayDate ? isSameDay(day, selectedDayDate) : false,
  }));

  const firstDateInRange = daysRange[0]!;
  const lastDayInRange = daysRange.at(-1)!;

  let selectedPageLabel;

  if (size === "normal" || isSameMonth(firstDateInRange, lastDayInRange)) {
    selectedPageLabel = format(selectedPage, "MMMM yyyy");
  } else {
    const monthRange = [
      format(firstDateInRange, "MMM"),
      format(lastDayInRange, "MMM"),
    ].join(" - ");
    selectedPageLabel = `${monthRange} ${format(selectedPage, "yyyy")}`;
  }

  return {
    data: {
      selectedPageLabel,
      days,
      weekDays,
    },
    controls: {
      showNextPage,
      showPreviousPage,
    },
  } as const;
}

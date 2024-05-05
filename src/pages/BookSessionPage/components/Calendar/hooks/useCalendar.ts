import { useCallback, useMemo, useState } from "react";
import {
  startOfToday,
  isSameMonth,
  isSameDay,
  sub,
  add,
  format,
} from "date-fns";
import { calendarConfig } from "../data/calendarConfig";
import { WEEK_DAYS } from "../data/weekDays";
import {
  CalendarControls,
  CalendarData,
  CalendarSize,
  CalendarUtils,
} from "../types";

export type CalendarInput = {
  selectedDayDate: Date | null;
  size: CalendarSize;
};

export type CalendarOutput = {
  data: CalendarData;
  utils: CalendarUtils;
  controls: CalendarControls;
};

export function useCalendar({
  selectedDayDate,
  size,
}: CalendarInput): CalendarOutput {
  const [selectedPage, setSelectedPage] = useState(
    selectedDayDate ?? startOfToday()
  );

  const { unit, getRange } = calendarConfig[size];

  const showPreviousPage = useCallback(() => {
    setSelectedPage((page) => sub(page, { [unit]: 1 }));
  }, [setSelectedPage, unit]);

  const showNextPage = useCallback(() => {
    setSelectedPage((page) => add(page, { [unit]: 1 }));
  }, [setSelectedPage, unit]);

  const days = useMemo(() => getRange(selectedPage), [selectedPage]);

  const checkSelected = useCallback(
    (day: Date) => {
      return selectedDayDate ? isSameDay(day, selectedDayDate) : false;
    },
    [selectedDayDate]
  );

  const checkAnotherMonth = useCallback(
    (day: Date) => {
      return size === "normal" ? !isSameMonth(day, selectedPage) : false;
    },
    [size, selectedPage]
  );

  const firstDateInRange = days[0]!;
  const lastDayInRange = days.at(-1)!;

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
      weekDays: WEEK_DAYS,
    },
    utils: {
      checkSelected,
      checkAnotherMonth,
    },
    controls: {
      showNextPage,
      showPreviousPage,
    },
  } as const;
}

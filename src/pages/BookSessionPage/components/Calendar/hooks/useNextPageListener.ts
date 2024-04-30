import useEventEmitter from "@hooks/useEventEmitter";
import { isSameMonth, isSameWeek } from "date-fns";
import { useEffect } from "react";
import { CalendarSize } from "./useCalendar";

type UseNextPageListener = {
  calendarSize: CalendarSize;
  showNextPage: () => void;
};

export default function useNextPageListener({
  calendarSize,
  showNextPage,
}: UseNextPageListener) {
  const { subscribe, unsubscribe } = useEventEmitter();

  useEffect(() => {
    subscribe("CALENDAR_NEXT_PAGE", ({ date1, date2 }) => {
      const isSamePage =
        calendarSize === "normal"
          ? isSameMonth(date1, date2)
          : isSameWeek(date1, date2);

      if (!isSamePage) {
        showNextPage();
      }
    });

    return () => {
      unsubscribe("CALENDAR_NEXT_PAGE");
    };
  }, [calendarSize]);
}

import { useEffect } from "react";

import useEventEmitter from "@/hooks/useEventEmitter";

import { CalendarControls, CalendarUtils } from "../types";

type UseNextPageListener = {
  showNextPage: CalendarControls["showNextPage"];
  checkSamePage: CalendarUtils["checkSamePage"];
};

export default function useNextPageListener({
  checkSamePage,
  showNextPage,
}: UseNextPageListener) {
  const { subscribe, unsubscribe } = useEventEmitter();

  useEffect(() => {
    subscribe("CALENDAR_NEXT_PAGE", ({ date1, date2 }) => {
      const isSamePage = checkSamePage(date1, date2);

      if (!isSamePage) {
        showNextPage();
      }
    });

    return () => {
      unsubscribe("CALENDAR_NEXT_PAGE");
    };
  }, [checkSamePage, showNextPage]);
}

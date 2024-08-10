import { useEffect } from "react";

import useToggle from "@/hooks/useToggle.ts";
import { useDatetimePickerContext } from "@/pages/book-session/context/DatetimePickerProvider.tsx";

export default function useLimitedSessionHours(hours: Date[] | null) {
  const {
    isOpen: shouldShowAllSessions,
    open: showAllSessions,
    close,
  } = useToggle();
  const { selectedDate, selectedEmployeeId } = useDatetimePickerContext();

  // TODO: think of better solution
  useEffect(() => {
    close();
  }, [selectedDate, close, selectedEmployeeId]);

  // TODO: consider using useMemo here
  const isOverflowing = hours && hours.length > 12;
  let limitedHours = hours ?? [];

  const shouldRenderShowAllSessionsButton =
    isOverflowing && !shouldShowAllSessions;

  if (shouldRenderShowAllSessionsButton) {
    limitedHours = limitedHours.slice(0, 12);
  }

  return {
    limitedHours,
    showAllSessions,
    shouldRenderShowAllSessionsButton,
  };
}

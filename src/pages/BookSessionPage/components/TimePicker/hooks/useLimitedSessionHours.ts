import useToggle from "@hooks/useToggle.ts";

export default function useLimitedSessionHours(hours: Date[] | null) {
  const { isOpen: shouldShowAllSessions, open: showAllSessions } = useToggle();

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

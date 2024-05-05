import { WEEK_DAYS } from "../data/weekDays";

export type CalendarSize = "normal" | "compact";

export type CalendarData = {
  weekDays: typeof WEEK_DAYS;
  days: Date[];
  selectedPageLabel: string;
};

export type CalendarUtils = {
  checkSelected: (day: Date) => boolean;
  checkAnotherMonth: (day: Date) => boolean;
};

export type CalendarControls = {
  showPreviousPage: () => void;
  showNextPage: () => void;
};

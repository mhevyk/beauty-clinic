import { WEEK_DAYS } from "@/pages/book-session/data/weekDays.ts";

export type CalendarSize = "normal" | "compact";

export type CalendarData = {
  weekDays: typeof WEEK_DAYS;
  days: Date[];
  selectedPageLabel: string;
  selectedPage: Date;
};

export type CalendarUtils = {
  checkSelected: (day: Date) => boolean;
  checkAnotherMonth: (day: Date) => boolean;
  checkSamePage: (date1: Date, date2: Date) => boolean;
};

export type CalendarControls = {
  showPreviousPage: () => void;
  showNextPage: () => void;
};

import Stack from "@mui/material/Stack";

import {
  CaretLeftIcon,
  CaretRightIcon,
  NextMonthButton,
  PrevMonthButton,
  SelectedMonth,
} from "@/pages/book-session/components/calendar-header/CalendarHeader.styled";
import { CalendarControls } from "@/pages/book-session/hooks/use-calendar/useCalendar.types";

type CalendarHeaderProps = {
  controls: CalendarControls;
  selectedPageLabel: string;
};

export default function CalendarHeader({
  controls,
  selectedPageLabel,
}: CalendarHeaderProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ mb: "10px" }}
    >
      <PrevMonthButton
        onClick={controls.showPreviousPage}
        data-testid="prev-page-button"
      >
        <CaretLeftIcon />
      </PrevMonthButton>
      <SelectedMonth>{selectedPageLabel}</SelectedMonth>
      <NextMonthButton
        onClick={controls.showNextPage}
        data-testid="next-page-button"
      >
        <CaretRightIcon />
      </NextMonthButton>
    </Stack>
  );
}

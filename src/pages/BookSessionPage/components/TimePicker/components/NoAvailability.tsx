import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import useEventEmitter from "@/hooks/useEventEmitter";
import { useDatetimePickerContext } from "@/pages/BookSessionPage/context/DatetimePickerProvider";

import getNextWorkingDay from "../utils/getNextWorkingDay";

const ButtonStyled = styled(Button)({
  marginTop: "30px",
});

// TODO: add logic to handle next availability
export default function NoAvailability() {
  const { emit } = useEventEmitter();
  const { selectedDate, setSelectedDate } = useDatetimePickerContext();

  const nextWorkingDate = getNextWorkingDay(selectedDate);

  function goToNextAvailableDate() {
    emit("CALENDAR_NEXT_PAGE", {
      date1: nextWorkingDate,
      date2: selectedDate,
    });
    setSelectedDate(nextWorkingDate);
  }

  return (
    <>
      <Typography>No availability</Typography>
      <ButtonStyled
        onClick={goToNextAvailableDate}
        size="small"
        variant="primary"
      >
        Check Next Availability
      </ButtonStyled>
    </>
  );
}

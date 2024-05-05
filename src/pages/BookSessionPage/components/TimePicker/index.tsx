import { Box, Button, styled, Typography } from "@mui/material";
import { format, getHours } from "date-fns";
import theme from "@theme/theme.ts";
import getNextAvailabilityDay from "./utils/getNextWorkingDay.ts";
import { useLayoutEffect, useMemo } from "react";
import useLimitedSessionHours from "./hooks/useLimitedSessionHours.ts";
import useEventEmitter from "@hooks/useEventEmitter";
import { useGetAvailableTreatmentSessionHoursSuspenseQuery } from "@api/hooks";
import { useDatetimePickerContext } from "@pages/BookSessionPage/context/DatetimePickerProvider.tsx";

const BoxGridStyled = styled(Box)({
  maxWidth: "375px",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "48px",
  [theme.breakpoints.down(393)]: {
    justifyContent: "center",
  },
});

const ButtonStyled = styled(Button)({
  marginTop: "30px",
});

const ButtonShowSessionStyled = styled(ButtonStyled)({
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "underline",
  },
});

type ButtonStyledPickerProps = {
  isSelected: boolean;
};

const ButtonStyledPicker = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<ButtonStyledPickerProps>(({ isSelected }) => ({
  backgroundColor: isSelected ? "#e0d9ce" : undefined,
  color: isSelected ? "black" : undefined,
  borderColor: isSelected ? theme.palette.secondary.main : "#66635e",

  py: "8px",
  width: "117.659px",
  padding: "8px",
  textAlign: "center",
  "&:hover, &:focus": {
    borderColor: theme.palette.secondary.main,
    color: "black",
    backgroundColor: "#e0d9ce",
  },
}));

const TimePicker = () => {
  const { selectedDate, setSelectedDate, selectedEmployeeId } =
    useDatetimePickerContext();

  const date = useMemo(() => selectedDate, [selectedDate.toDateString()]);

  const { data } = useGetAvailableTreatmentSessionHoursSuspenseQuery({
    variables: {
      day: date,
      employeeId: selectedEmployeeId ?? -1,
    },
  });

  let hours: Date[] = [];

  if (data) {
    hours = data.getAvailableTreatmentSessionHours.map(
      (ISODate) => new Date(ISODate)
    );
  }

  const nextWorkingDate = getNextAvailabilityDay(selectedDate);

  const { limitedHours, shouldRenderShowAllSessionsButton, showAllSessions } =
    useLimitedSessionHours(hours);

  const { emit } = useEventEmitter();

  const isTimeSelected = getHours(selectedDate) !== 0;

  useLayoutEffect(() => {
    if (hours && hours.length > 0 && !isTimeSelected) {
      const firstTime = hours[0]!;
      setSelectedDate(firstTime);
    }
  }, [hours, isTimeSelected]);

  if (limitedHours.length === 0) {
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

  return (
    <>
      <BoxGridStyled>
        {limitedHours.map((date) => (
          <ButtonStyledPicker
            isSelected={selectedDate.toTimeString() === date.toTimeString()}
            key={date.getTime()}
            onClick={() => setSelectedDate(date)}
            variant="primary-outlined"
          >
            {format(date, "h:mm aaa")}
          </ButtonStyledPicker>
        ))}
      </BoxGridStyled>
      {shouldRenderShowAllSessionsButton && (
        <ButtonShowSessionStyled onClick={showAllSessions} fullWidth>
          Show all sessions
        </ButtonShowSessionStyled>
      )}
    </>
  );
};

export default TimePicker;

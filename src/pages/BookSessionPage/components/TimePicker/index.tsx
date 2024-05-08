import { Box, Button, styled } from "@mui/material";
import { format, subMinutes } from "date-fns";
import theme from "@theme/theme.ts";
import { useEffect } from "react";
import useLimitedSessionHours from "./hooks/useLimitedSessionHours.ts";
import { useGetAvailableTreatmentSessionHoursSuspenseQuery } from "@api/hooks";
import { useDatetimePickerContext } from "@pages/BookSessionPage/context/DatetimePickerProvider.tsx";
import NoAvailability from "./components/NoAvailability.tsx";

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
  const { selectedDate, selectedTime, setSelectedTime, selectedEmployeeId } =
    useDatetimePickerContext();

  const { data } = useGetAvailableTreatmentSessionHoursSuspenseQuery({
    variables: {
      day: subMinutes(selectedDate, selectedDate.getTimezoneOffset()),
      employeeId: selectedEmployeeId,
    },
  });

  let hours: Date[] = [];

  if (data) {
    hours = data.getAvailableTreatmentSessionHours.map(
      (ISODate) => new Date(ISODate)
    );
  }

  const { limitedHours, shouldRenderShowAllSessionsButton, showAllSessions } =
    useLimitedSessionHours(hours);

  const isSelected = selectedTime !== null;

  useEffect(() => {
    if (hours.length === 0 || isSelected) {
      return;
    }

    const newDate = hours[0]!;
    setSelectedTime(newDate);
  }, [hours, isSelected]);

  if (limitedHours.length === 0) {
    return <NoAvailability />;
  }

  return (
    <>
      <BoxGridStyled>
        {limitedHours.map((date) => (
          <ButtonStyledPicker
            isSelected={Boolean(
              selectedTime &&
                selectedTime.toTimeString() === date.toTimeString()
            )}
            key={date.getTime()}
            onClick={() => setSelectedTime(date)}
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

import { Box, Button, styled, Typography } from "@mui/material";
import { format, getDay, getHours } from "date-fns";
import theme from "@theme/theme.ts";
import getHoursSession from "./utils/getHoursSession.ts";
import getNextAvailabilityDay from "./utils/getNextAvailabilityDay.ts";
import { useEffect } from "react";
import useLimitedSessionHours from "./hooks/useLimitedSessionHours.ts";

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

const ButtonStyledPicker = styled(Button)<ButtonStyledPickerProps>(
  ({ isSelected }) => ({
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
  }),
);

type TimePickerProps = {
  date: Date;
  setSelectedDate: (date: Date) => void;
};

export default function TimePicker({
  date: userDate,
  setSelectedDate,
}: TimePickerProps) {
  const hours = getHoursSession(userDate);
  const nextWorkingDay = getNextAvailabilityDay(userDate);

  const { limitedHours, shouldRenderShowAllSessionsButton, showAllSessions } =
    useLimitedSessionHours(hours);

  const currentHours = getHours(userDate);
  const currentDay = getDay(userDate);

  useEffect(() => {
    if (hours && hours.length > 0 && currentHours === 0) {
      const firstTime = hours[0]!;
      setSelectedDate(firstTime);
    }
  }, [currentDay, currentHours]);

  if (hours === null) {
    return (
      <>
        <Typography>No availability</Typography>
        <ButtonStyled
          onClick={() => setSelectedDate(nextWorkingDay)}
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
            isSelected={userDate.toTimeString() === date.toTimeString()}
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
}

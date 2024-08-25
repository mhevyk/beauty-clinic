import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { subMinutes } from "date-fns";

import { useGetAvailableTreatmentSessionHoursSuspenseQuery } from "@/api/generated";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider.tsx";
import theme from "@/theme/theme.ts";

import useLimitedSessionHours from "../../hooks/use-limited-session-hours/useLimitedSessionHours.ts";
import NoAvailability from "../no-availability/NoAvailability.tsx";
import TimeButton from "../time-button/TimeButton.tsx";

const BoxGridStyled = styled(Box)({
  width: "375px",
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

const TimePicker = () => {
  const { selectedDate, selectedEmployeeId } = useDatetimePickerContext();

  const { data } = useGetAvailableTreatmentSessionHoursSuspenseQuery({
    variables: {
      day: subMinutes(selectedDate, selectedDate.getTimezoneOffset()),
      employeeId: selectedEmployeeId,
    },
    fetchPolicy: "cache-and-network", // used to remove ordered session hours
  });

  let availableHours: Date[] = [];

  if (data) {
    availableHours = data.getAvailableTreatmentSessionHours.map(
      ISODate => new Date(ISODate)
    );
  }

  const { limitedHours, shouldRenderShowAllSessionsButton, showAllSessions } =
    useLimitedSessionHours(availableHours);

  if (limitedHours.length === 0) {
    return <NoAvailability />;
  }

  return (
    <>
      <BoxGridStyled>
        {limitedHours.map((datetime, index) => (
          <TimeButton
            key={datetime.getTime()}
            datetime={datetime}
            isFirstAvailableTime={index === 0}
          />
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

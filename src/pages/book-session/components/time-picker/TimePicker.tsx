import { subMinutes } from "date-fns";

import { useGetAvailableTreatmentSessionHoursSuspenseQuery } from "@/api/generated";
import {
  BoxGridStyled,
  ButtonShowSessionStyled,
} from "@/pages/book-session/components/time-picker/TimePicker.styled.ts";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider.tsx";

import useLimitedSessionHours from "../../hooks/use-limited-session-hours/useLimitedSessionHours.ts";
import NoAvailability from "../no-availability/NoAvailability.tsx";
import TimeButton from "../time-button/TimeButton.tsx";

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

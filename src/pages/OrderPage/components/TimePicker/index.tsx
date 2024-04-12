import { Button, Grid } from "@mui/material";
import { addMinutes, format, set } from "date-fns";
import { useState } from "react";

function getHalfHourRange(date: Date) {
  const startDate = set(date, {
    hours: 10,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const dates = [startDate];

  for (let i = 0; i < 13; i++) {
    dates.push(addMinutes(dates.at(-1)!, 30));
  }

  return dates;
}

type TimePickerProps = {
  date: Date;
  setSelectedDate: (date: Date) => void;
};

export default function TimePicker({
  date: userDate,
  setSelectedDate,
}: TimePickerProps) {
  const [shouldShowAllSessions, setShouldShowAllSessions] = useState(false);

  const dateRange = getHalfHourRange(userDate);

  const limitedSessionTimes = shouldShowAllSessions
    ? dateRange
    : dateRange.slice(0, 12);

  return (
    <>
      <Grid container spacing="10px" columns={12} alignItems="center">
        {limitedSessionTimes.map((date) => (
          <Grid item key={date.getTime()} md="auto">
            <Button
              onClick={() => setSelectedDate(date)}
              variant="primary-outlined"
              sx={{
                py: "8px",
                width: "117.659px",
                padding: "8px",
                textAlign: "center",
              }}
            >
              {format(date, "h:mm aaa")}
            </Button>
          </Grid>
        ))}
      </Grid>
      {!shouldShowAllSessions && (
        <Button onClick={() => setShouldShowAllSessions(true)} fullWidth>
          Show all sessions
        </Button>
      )}
    </>
  );
}

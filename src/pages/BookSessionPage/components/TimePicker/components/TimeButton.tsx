import { Button, styled } from "@mui/material";
import { useDatetimePickerContext } from "@pages/BookSessionPage/context/DatetimePickerProvider";
import { format } from "date-fns";
import { useEffect } from "react";

type ButtonStyledPickerProps = {
  isSelected: boolean;
};

const ButtonStyledPicker = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<ButtonStyledPickerProps>(({ isSelected, theme }) => () => {
  const selectedStyles = {
    borderColor: theme.palette.secondary.main,
    color: "black",
    backgroundColor: "#e0d9ce",
  };

  return {
    border: "1px solid",
    borderColor: "#66635e",
    py: "8px",
    width: "117.659px",
    padding: "8px",
    textAlign: "center",
    ...(isSelected && selectedStyles),
    "&:hover, &:focus": selectedStyles,
  };
});

type TimeButtonProps = {
  datetime: Date;
  isFirstAvailableTime: boolean;
};

export default function TimeButton({
  datetime,
  isFirstAvailableTime,
}: TimeButtonProps) {
  const { selectedTime, setSelectedTime, selectedEmployeeId } =
    useDatetimePickerContext();

  // TODO: think of better solution
  useEffect(() => {
    if (isFirstAvailableTime) {
      setSelectedTime(datetime);
    }
  }, [selectedEmployeeId, isFirstAvailableTime]);

  const isSelected = Boolean(
    selectedTime && selectedTime.toTimeString() === datetime.toTimeString()
  );

  return (
    <ButtonStyledPicker
      isSelected={isSelected}
      key={datetime.getTime()}
      onClick={() => setSelectedTime(datetime)}
      variant="primary-outlined"
    >
      {format(datetime, "h:mm aaa")}
    </ButtonStyledPicker>
  );
}

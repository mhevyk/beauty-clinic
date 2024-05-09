import { Button, styled } from "@mui/material";
import { useDatetimePickerContext } from "@pages/BookSessionPage/context/DatetimePickerProvider";
import { format } from "date-fns";
import { useCallback } from "react";

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

type ButtonDataset = {
  timestamp: string;
};

interface HTMLButtonElementWithDataset extends HTMLButtonElement {
  dataset: ButtonDataset;
}

type TimeButtonProps = {
  datetime: Date;
  isFirstAvailableTime: boolean;
};

export default function TimeButton({
  datetime,
  isFirstAvailableTime,
}: TimeButtonProps) {
  const { selectedTime, setSelectedTime } = useDatetimePickerContext();

  const firstHourDynamicRef = useCallback(
    (button: HTMLButtonElementWithDataset | null) => {
      if (button === null) {
        return;
      }

      const dataset = button.dataset;
      if (dataset.timestamp) {
        setSelectedTime(new Date(dataset.timestamp));
      }
    },
    []
  );

  const isSelected = Boolean(
    selectedTime && selectedTime.toTimeString() === datetime.toTimeString()
  );

  return (
    <ButtonStyledPicker
      ref={isFirstAvailableTime ? firstHourDynamicRef : undefined}
      data-timestamp={datetime.toISOString()}
      isSelected={isSelected}
      key={datetime.getTime()}
      onClick={() => setSelectedTime(datetime)}
      variant="primary-outlined"
    >
      {format(datetime, "h:mm aaa")}
    </ButtonStyledPicker>
  );
}

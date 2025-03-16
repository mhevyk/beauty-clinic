import { useEffect } from "react";

import { format } from "date-fns";

import { ButtonStyledPicker } from "@/pages/book-session/components/time-button/TimeButton.styled";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

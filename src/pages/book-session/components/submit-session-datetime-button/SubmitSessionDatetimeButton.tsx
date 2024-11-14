import { useNavigate } from "react-router-dom";

import { Employee } from "@/api/generated";
import { NextStepButtonStyled } from "@/pages/book-session/components/submit-session-datetime-button/SubmitSessionDatetimeButton.styled";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";
import { useOrderStore } from "@/store/order/orderStore.ts";

export default function SubmitSessionDatetimeButton() {
  const setSessionStartsAt = useOrderStore(store => store.setSessionStartsAt);
  const setEmployee = useOrderStore(store => store.setEmployee);
  const { selectedTime, selectedEmployeeId, treatmentId, qualifiedEmployees } =
    useDatetimePickerContext();

  const navigate = useNavigate();

  const qualifiedEmployee = qualifiedEmployees.find(
    employee => employee.id === selectedEmployeeId
  ) as Employee | undefined;

  const isTimeSelected = selectedTime !== null;

  function handleSubmit() {
    setSessionStartsAt(selectedTime);
    setEmployee(qualifiedEmployee!);
    navigate(`/booking-form/${treatmentId}`);
  }

  return (
    <NextStepButtonStyled
      disabled={!isTimeSelected}
      size="small"
      fullWidth
      variant="primary-outlined"
      onClick={handleSubmit}
    >
      Next
    </NextStepButtonStyled>
  );
}

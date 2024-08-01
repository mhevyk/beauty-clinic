import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material";
import Button from "@mui/material/Button";

import { useOrderStore } from "@/store/order/orderStore.ts";
import { Employee } from "@api/hooks";

import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";

const NextStepButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: "32px",
  fontWeight: 800,
  "&:disabled": {
    backgroundColor: theme.palette.SoftGray.main,
    borderColor: theme.palette.SoftGray.main,
    color: theme.palette.primary.main,
  },
}));

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

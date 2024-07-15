import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material";
import Button from "@mui/material/Button";

import { useOrderStore } from "@/store/order/orderStore";
import { Employee } from "@api/hooks";

import { useDatetimePickerContext } from "../context/DatetimePickerProvider";

//TODO: add color to palette
const NextStepButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: "32px",
  fontWeight: 800,
  "&:disabled": {
    backgroundColor: "#b5b4b1",
    borderColor: "#b5b4b1",
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

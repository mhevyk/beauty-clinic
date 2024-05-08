import { Button, styled } from "@mui/material";
import { useDatetimePickerContext } from "../context/DatetimePickerProvider";
import { useOrderStore } from "@store/order/orderStore";
import { useNavigate } from "react-router-dom";

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
  const setEmployeeId = useOrderStore((store) => store.setEmployeeId);
  const setSessionStartsAt = useOrderStore((store) => store.setSessionStartsAt);
  const { selectedTime, selectedEmployeeId, treatmentId } =
    useDatetimePickerContext();
  const navigate = useNavigate();

  const isTimeSelected = selectedTime !== null;

  function handleSubmit() {
    setEmployeeId(selectedEmployeeId);
    setSessionStartsAt(selectedTime);
    // TODO: change url of last order page
    navigate(`/finish-session/${treatmentId}`);
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

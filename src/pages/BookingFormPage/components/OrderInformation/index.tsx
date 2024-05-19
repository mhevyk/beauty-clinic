import BookingDetails from "@pages/BookingFormPage/components/OrderInformation/components/BookingDetails.tsx";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import useSelectedTreatmentSession from "@pages/BookingFormPage/hooks/useSelectedTreatmentSession";

const TotalPriceBox = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
});

export default function OrderInformation() {
  const [selectedSession, { isLoading }] = useSelectedTreatmentSession();

  const { employee, sessionStartsAt, treatments, treatmentId } =
    selectedSession;

  const totalPrice = treatments.reduce(
    (sum, item) => sum + item.pricePerUnit,
    0
  );

  if (sessionStartsAt === null) {
    return <Navigate to={`/book-session/${treatmentId}`} />;
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" marginBottom="46px">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <>
      <BookingDetails
        employee={employee}
        treatments={treatments}
        date={sessionStartsAt}
      />
      <Typography margin="20px 0 12px">Payment Details</Typography>
      <TotalPriceBox>
        <Typography>Total</Typography>
        <Typography>${totalPrice}</Typography>
      </TotalPriceBox>
    </>
  );
}

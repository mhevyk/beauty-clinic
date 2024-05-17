import BookingDetails from "@pages/BookingFormPage/components/OrderInformation/components/BookingDetails.tsx";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { useOrderStore } from "@store/order/orderStore.ts";
import { Navigate, useParams } from "react-router-dom";
import useBookingDetails from "@pages/BookingFormPage/hooks/useBookingDetails";

const TotalPriceBox = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
});

type BookTreatmentSessionParams = {
  treatmentId: string;
};

export default function OrderInformation() {
  const params = useParams<BookTreatmentSessionParams>();
  const treatmentId = Number(params.treatmentId);

  const { treatments, isLoading } = useBookingDetails(treatmentId);

  const sessionStartsAt = useOrderStore((store) => store.sessionStartsAt);
  const employee = useOrderStore((store) => store.employee);

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
        employee={employee!}
        treatments={treatments}
        date={sessionStartsAt!}
      />
      <Typography margin="20px 0 12px">Payment Details</Typography>
      <TotalPriceBox>
        <Typography>Total</Typography>
        <Typography>${totalPrice}</Typography>
      </TotalPriceBox>
    </>
  );
}

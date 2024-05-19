import BookingDetails from "./components/BookingDetails";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import useSelectedTreatmentSession from "../../hooks/useSelectedTreatmentSession";
import { useCartStore } from "@store/cart/cartStore";

const TotalPriceBox = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
});

export default function OrderInformation() {
  const [selectedSession, { isLoading }] = useSelectedTreatmentSession();
  const totalPriceOfItemsFromCart = useCartStore((store) =>
    store.getTotalPrice()
  );

  const { sessionStartsAt, treatmentId, treatment } = selectedSession;

  if (sessionStartsAt === null || !treatment) {
    return <Navigate to={`/book-session/${treatmentId}`} />;
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" marginBottom="46px">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const totalPrice = totalPriceOfItemsFromCart + treatment.pricePerUnit;

  return (
    <>
      <BookingDetails />
      <Typography margin="20px 0 12px">Payment Details</Typography>
      <TotalPriceBox>
        <Typography>Total</Typography>
        <Typography>${totalPrice}</Typography>
      </TotalPriceBox>
    </>
  );
}

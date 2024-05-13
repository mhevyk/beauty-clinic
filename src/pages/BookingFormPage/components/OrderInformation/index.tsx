import BookingDetails from "@pages/BookingFormPage/components/OrderInformation/components/BookingDetails.tsx";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { useOrderStore } from "@store/order/orderStore.ts";
import { GetTreatmentByIdDocument, Treatment } from "@api/hooks";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "@config/apollo";
import { useCartStore } from "@store/cart/cartStore.ts";

const TotalPriceBox = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
});

type BookTreatmentSessionParams = {
  treatmentId: string;
};

type LocationState = {
  fromCalendar?: boolean;
  fromCart?: boolean;
};

export default function OrderInformation() {
  const params = useParams<BookTreatmentSessionParams>();
  const treatmentId = Number(params.treatmentId);

  const location = useLocation();
  const { fromCalendar, fromCart } = location.state ?? ({} as LocationState);

  const sessionStartsAt = useOrderStore((store) => store.sessionStartsAt);
  const employee = useOrderStore((store) => store.employee);

  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fromCalendar) {
      setIsLoading(true);
      client
        .query({
          query: GetTreatmentByIdDocument,
          variables: {
            treatmentId,
          },
        })
        .then((response) => setTreatments([response.data.treatment]))
        .catch((error) => error.message)
        .finally(() => setIsLoading(false));
    } else if (fromCart) {
      const itemsFromCart = useCartStore.getState().items;
      const treatmentsFromCart = itemsFromCart.map((item) => item.treatment);
      setTreatments(treatmentsFromCart);
    }
  }, [fromCalendar, fromCalendar, setIsLoading, setTreatments]);

  const totalPrice = treatments.reduce(
    (sum, item) => sum + item.pricePerUnit,
    0,
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

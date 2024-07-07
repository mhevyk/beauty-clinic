import { Navigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

import { useCartStore } from "@/store/cart/cartStore";

import useSelectedTreatmentSession from "../../hooks/useSelectedTreatmentSession";
import BookingDetails from "./components/BookingDetails";

const TotalPriceBox = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
});

export type SessionFromLocation = ReturnType<
  typeof useSelectedTreatmentSession
>[0];

type OrderInformationProps = {
  sessionsFromLocation: SessionFromLocation[];
};

export default function OrderInformation({
  sessionsFromLocation,
}: OrderInformationProps) {
  const [selectedSessionFromHook, { isLoading }] =
    useSelectedTreatmentSession();

  const totalPriceOfItemsFromCart = useCartStore(store =>
    store.getTotalPrice()
  );

  const lastSession = sessionsFromLocation?.at(-1) ?? null;

  const checkSessionExists = useCartStore(store => store.checkSessionExists);

  const selectedSessions = lastSession || selectedSessionFromHook;
  const { sessionStartsAt, treatmentId, treatment, employee } =
    selectedSessions;

  if (sessionStartsAt === null || !treatment) {
    return (
      <Navigate
        to={treatmentId ? `/book-session/${treatmentId}` : "/treatment"}
      />
    );
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" marginBottom="46px">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const totalPrice =
    totalPriceOfItemsFromCart +
    (checkSessionExists(treatmentId, {
      sessionStartsAt,
      employeeId: employee!.id,
    })
      ? 0
      : treatment.pricePerUnit);

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

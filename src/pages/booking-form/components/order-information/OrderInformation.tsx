import { Icon } from "@iconify/react";
import { Navigate } from "react-router-dom";

import AppTypography from "design-system/app-typography/AppTypography";

import BookingDetails from "@/pages/booking-form/components/booking-details/BookingDetails";
import "@/pages/booking-form/components/order-information/OrderInformation.scss";
import useSelectedTreatmentSession from "@/pages/booking-form/hooks/use-selected-treatment-session/useSelectedTreatmentSession";
import { useCartStore } from "@/store/cart/cartStore";

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
      <div className="order-information__loading-box">
        <Icon
          icon="line-md:loading-loop"
          className="order-information__loading-box__icon"
        />
      </div>
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
      <AppTypography className="order-information__heading">
        Payment Details
      </AppTypography>
      <div className="order-information__price-box">
        <AppTypography>Total</AppTypography>
        <AppTypography>${totalPrice}</AppTypography>
      </div>
    </>
  );
}

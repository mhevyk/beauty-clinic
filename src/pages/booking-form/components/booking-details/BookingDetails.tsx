import { useLocation } from "react-router-dom";

import BookingDetailsItem from "@/pages/booking-form/components/booking-details-item/BookingDetailsItem";
import useItemsToOrder from "@/pages/booking-form/hooks/use-items-to-order/useItemsToOrder";
import AppCollapsible from "@/styles/app-collapsible/AppCollapsible.tsx";
import { OrderItem } from "@/utils/get-sessions-to-order-from-cart/getSessionsToOrderFromCart.ts";

export default function BookingDetails() {
  const location = useLocation();

  const itemsToOrderFromHook = useItemsToOrder();

  const itemsToOrderFromState = location.state?.sessions ?? null;
  const itemsToOrder: OrderItem[] =
    itemsToOrderFromState || itemsToOrderFromHook;

  return (
    <>
      <AppCollapsible header="Booking Details">
        {itemsToOrder.map(orderItem => (
          <BookingDetailsItem
            key={`${orderItem.treatment.id}-${orderItem.employee.id}-${orderItem.sessionStartsAt}`}
            orderItem={orderItem}
          />
        ))}
      </AppCollapsible>
    </>
  );
}

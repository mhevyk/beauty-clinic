import { useLocation } from "react-router-dom";
import { SessionFromLocation } from "@pages/BookingFormPage/components/OrderInformation";
import useItemsToOrder from "@pages/BookingFormPage/hooks/useItemsToOrder.ts";

export default function useUnifiedOrderData() {
  const location = useLocation();
  const itemsToOrderFromHook = useItemsToOrder();

  const itemsToOrderFromState = location.state?.sessions ?? null;
  const itemsToOrder = itemsToOrderFromState || itemsToOrderFromHook;

  const cartState = location.state as {
    sessions: SessionFromLocation[];
  };

  return { cartState, itemsToOrder };
}

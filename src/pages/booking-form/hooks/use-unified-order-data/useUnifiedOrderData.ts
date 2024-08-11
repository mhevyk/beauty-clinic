import { useLocation } from "react-router-dom";

import { SessionFromLocation } from "@/pages/booking-form/components/OrderInformation.tsx";
import useItemsToOrder from "@/pages/booking-form/hooks/useItemsToOrder.ts";

type LocationState = {
  sessions: SessionFromLocation[];
};

export default function useUnifiedOrderData() {
  const location = useLocation();
  const itemsToOrderFromHook = useItemsToOrder();

  // TODO: remove any here
  const itemsToOrderFromState = location.state?.sessions ?? null;
  const itemsToOrder = itemsToOrderFromState || itemsToOrderFromHook;

  const cartState = location.state as LocationState;

  return { cartState, itemsToOrder };
}

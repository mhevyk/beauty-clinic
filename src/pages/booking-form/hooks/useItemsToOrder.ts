import { useCartStore } from "@/store/cart/cartStore.ts";
import getSessionsToOrderFromCart from "@/utils/get-sessions-to-order-from-cart/getSessionsToOrderFromCart.ts";

import useSelectedTreatmentSession from "./useSelectedTreatmentSession.ts";

export default function useItemsToOrder() {
  const checkSessionExists = useCartStore(store => store.checkSessionExists);

  const [selectedSession, { isLoading }] = useSelectedTreatmentSession();
  const { employee, sessionStartsAt, treatmentId, treatment } = selectedSession;

  if (!employee || !treatment || !sessionStartsAt) {
    return [];
  }

  const sessionExists = checkSessionExists(treatmentId, {
    employeeId: employee.id,
    sessionStartsAt,
  });

  const sessionsToOrder = getSessionsToOrderFromCart();

  if (!sessionExists && !isLoading) {
    sessionsToOrder.push({
      employee,
      sessionStartsAt,
      treatment,
    });
  }

  return sessionsToOrder;
}

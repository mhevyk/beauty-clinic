import { useCartStore } from "@store/cart/cartStore";
import useSelectedTreatmentSession from "./useSelectedTreatmentSession";
import getOrderItemsFromCart from "../utils/getOrderItemsFromCart";

export default function useItemsToOrder() {
  const checkSessionExists = useCartStore((store) => store.checkSessionExists);

  const [selectedSession, { isLoading }] = useSelectedTreatmentSession();
  const { employee, sessionStartsAt, treatmentId } = selectedSession;

  if (!employee) {
    return [];
  }

  const employeeId = employee.id;

  const sessionExists = checkSessionExists(treatmentId, {
    employeeId,
    sessionStartsAt,
  });

  const sessionsToOrder = getOrderItemsFromCart();

  if (!sessionExists && !isLoading) {
    sessionsToOrder.push({
      employeeId,
      startsAt: sessionStartsAt,
      treatmentId,
    });
  }

  return sessionsToOrder;
}

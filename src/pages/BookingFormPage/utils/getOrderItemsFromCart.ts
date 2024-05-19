import { OrderTreatmentSession } from "@api/hooks";
import { useCartStore } from "@store/cart/cartStore";

export default function getOrderItemsFromCart() {
  const orderItems = useCartStore.getState().getItems();
  const transformedSessions: OrderTreatmentSession[] = [];

  for (const orderItem of orderItems) {
    for (const session of orderItem.sessions) {
      const transformedSession = {
        employeeId: session.employeeId,
        startsAt: session.sessionStartsAt,
        treatmentId: orderItem.treatment.id,
      };

      transformedSessions.push(transformedSession);
    }
  }

  return transformedSessions;
}

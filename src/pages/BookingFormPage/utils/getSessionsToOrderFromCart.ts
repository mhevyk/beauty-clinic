import { Employee, Treatment } from "@api/hooks";
import { useCartStore } from "@store/cart/cartStore";

export type OrderItem = {
  employee: Pick<Employee, "id" | "name">;
  sessionStartsAt: Date;
  treatment: Treatment;
};

export default function getSessionsToOrderFromCart() {
  const orderItems = useCartStore.getState().getItems();
  const transformedSessions: OrderItem[] = [];

  for (const orderItem of orderItems) {
    for (const { employee, sessionStartsAt } of orderItem.sessions) {
      const transformedSession = {
        employee,
        sessionStartsAt,
        treatment: orderItem.treatment,
      };

      transformedSessions.push(transformedSession);
    }
  }

  return transformedSessions;
}

import { PERSISTED_STORAGE_KEYS } from "@constants/index";
import createPersistedStore from "@store/utils/createPersistedStore";
import showSnackbar from "@utils/showSnackbar";
import { Employee, Treatment } from "@api/hooks";
import { OrderStore } from "@store/order/orderStore";
import { QualifiedEmployee } from "@pages/BookSessionPage/hooks/useSelectedQualifiedEmployee";
import sessionComparator from "./utils/sessionComparator";

export type CartSession = {
  employee: Pick<Employee, "id" | "name">;
  sessionStartsAt: Date;
};

export type CartItem = {
  treatment: Treatment;
  sessions: CartSession[];
};

type RequiredSessionFields = Pick<CartSession, "sessionStartsAt"> & {
  employeeId: number;
};

type TreatmentId = number;
type Cart = Record<TreatmentId, CartItem>;

type SessionToFind = {
  employeeId?: QualifiedEmployee["id"];
  sessionStartsAt?: OrderStore["sessionStartsAt"];
};

type CheckSessionExists = (
  treatmentId: TreatmentId,
  sessionToFind: SessionToFind
) => boolean;

type RemoveFromCart = (
  treatmentId: number,
  sessionToRemove: RequiredSessionFields
) => void;

type CartStore = {
  _cart: Cart;
  getItems: () => CartItem[];
  getTotalSessionsCount: () => number;
  checkSessionExists: CheckSessionExists;
  getTotalPrice: () => number;
  addToCart: (treatment: Treatment, sessionToAdd: CartSession) => void;
  removeFromCart: RemoveFromCart;
  clearCart: () => void;
};

export const useCartStore = createPersistedStore<CartStore>(
  (set, get) => ({
    _cart: {},
    getItems() {
      const cart = get()._cart;
      return Object.values(cart);
    },
    getTotalSessionsCount() {
      const cartItems = get().getItems();
      return cartItems.reduce(
        (totalCount, { sessions }) => totalCount + sessions.length,
        0
      );
    },
    checkSessionExists(treatmentId, sessionToFind) {
      const cart = get()._cart;
      const existingTreatment = cart[treatmentId];

      if (!existingTreatment) {
        return false;
      }

      const { employeeId, sessionStartsAt } = sessionToFind;

      if (!employeeId || !sessionStartsAt) {
        return false;
      }

      return existingTreatment.sessions.some((session) => {
        return sessionComparator(session, { employeeId, sessionStartsAt });
      });
    },
    getTotalPrice() {
      const cartItems = get().getItems();
      return cartItems.reduce(
        (totalCount, { treatment, sessions }) =>
          totalCount + treatment.pricePerUnit * sessions.length,
        0
      );
    },
    addToCart(treatment, sessionToAdd) {
      const cart = get()._cart;
      const treatmentId = treatment.id;
      const existingTreatment = cart[treatmentId];

      if (!existingTreatment) {
        cart[treatmentId] = {
          treatment,
          sessions: [sessionToAdd],
        };

        set({ _cart: cart });
        return;
      }

      const { employee, sessionStartsAt } = sessionToAdd;

      const existingSessions = existingTreatment.sessions;
      const existingSession = existingSessions.find((session) =>
        sessionComparator(session, {
          employeeId: employee.id,
          sessionStartsAt: sessionStartsAt,
        })
      );

      if (existingSession) {
        showSnackbar({
          message: "Session is already added to cart!",
          autohide: true,
        });
        return;
      }

      existingTreatment.sessions.push(sessionToAdd);
      set({ _cart: cart });
    },
    removeFromCart(treatmentId, sessionToRemove) {
      const cart = get()._cart;
      const existingTreatment = cart[treatmentId];

      if (!existingTreatment) {
        showSnackbar({
          message: `Item with treatment id ${treatmentId} can't be deleted because it does not exists`,
          autohide: true,
        });
        return;
      }

      const existingSessions = existingTreatment.sessions;
      const existingSessionIndex = existingSessions.findIndex((session) =>
        sessionComparator(session, sessionToRemove)
      );

      if (existingSessionIndex === -1) {
        showSnackbar({
          message: `Session does not exist, so it cannot be deleted`,
          autohide: true,
        });
        return;
      }

      if (existingSessions.length === 1) {
        delete cart[treatmentId];
        set({ _cart: cart });
        return;
      }

      existingTreatment.sessions.splice(existingSessionIndex, 1);
      set({ _cart: cart });
    },
    clearCart() {
      set({ _cart: {} });
    },
  }),
  {
    name: PERSISTED_STORAGE_KEYS.cart,
  }
);

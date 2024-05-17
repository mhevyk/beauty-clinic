import { PERSISTED_STORAGE_KEYS } from "@constants/index";
import createPersistedStore from "@store/utils/createPersistedStore";
import showSnackbar from "@utils/showSnackbar";
import { Treatment } from "@api/hooks";

type Session = {
  employeeId: number;
  employeeName: string;
  sessionStartsAt: Date;
};

// TODO: move types from here to reuse them
type CartItemWithMultipleSessions = {
  treatment: Treatment;
  sessions: Session[];
};

type CartItemWithOneSession = {
  treatment: Treatment;
  session: Session;
};

type CartStore = {
  items: CartItemWithMultipleSessions[];
  getItemsCount: () => number;
  getTotalPrice: () => number;
  addToCart: (cartItem: CartItemWithOneSession) => void;
  removeFromCart: (treatmentId: number, sessionStartsAt: Date) => void;
};

export const useCartStore = createPersistedStore<CartStore>(
  (set, get) => ({
    items: [],
    getItemsCount: () => {
      return get().items.reduce((count, treatment) => {
        return count + treatment.sessions.length;
      }, 0);
    },
    getTotalPrice: () => {
      return get().items.reduce((totalPrice, { treatment, sessions }) => {
        return totalPrice + treatment.pricePerUnit * sessions.length;
      }, 0);
    },
    addToCart: (cartItem) => {
      const items = get().items;

      const treatmentIndex = items.findIndex(
        (item) => item.treatment.id === cartItem.treatment.id
      );

      const newItem = {
        treatment: cartItem.treatment,
      };

      if (treatmentIndex === -1) {
        set((state) => ({
          items: [
            ...state.items,
            {
              ...newItem,
              sessions: [cartItem.session],
            },
          ],
        }));
        return;
      }

      const item = items[treatmentIndex]!;
      const session = item.sessions.find(
        (session) =>
          session.sessionStartsAt.toString() ===
          cartItem.session.sessionStartsAt.toString()
      );

      if (session) {
        showSnackbar({
          autohide: true,
          message: "Session was already added to the cart",
        });
        return;
      }

      set((state) => ({
        items: state.items.map((item) => {
          if (item.treatment.id === cartItem.treatment.id) {
            return {
              ...newItem,
              sessions: [...item.sessions, cartItem.session],
            };
          }

          return item;
        }),
      }));

      showSnackbar({
        autohide: true,
        variant: "success",
        message: `Item was successfully added to the cart`,
      });
    },
    removeFromCart: (treatmentId, sessionStartsAt) => {
      set((state) => ({
        items: state.items.reduce<CartItemWithMultipleSessions[]>(
          (result, item) => {
            if (item.treatment.id !== treatmentId) {
              return [...result, item];
            }

            const filteredSessions = item.sessions.filter(
              (session) =>
                session.sessionStartsAt.toString() !==
                sessionStartsAt.toString()
            );

            if (filteredSessions.length === 0) {
              return result;
            }

            const itemWithFilteredSessions = {
              treatment: item.treatment,
              sessions: filteredSessions,
            };

            return [...result, itemWithFilteredSessions];
          },
          []
        ),
      }));
    },
  }),
  {
    name: PERSISTED_STORAGE_KEYS.cart,
  }
);

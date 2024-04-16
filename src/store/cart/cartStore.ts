import { PERSISTED_STORAGE_KEYS } from "@constants/index";
import createPersistedStore from "@store/utils/createPersistedStore";
import showSnackbar from "@utils/showSnackbar";

// TODO: move types from here to reuse them
type TreatmentSessionDuration = {
  start: Date;
  end: Date;
};

type EmployeeDetails = {
  name: string;
};

type TreatmentDetails = {
  id: number;
  name: string;
  pricePerUnit: number;
  imageUrl?: string;
};

type TreatmentSession = {
  id: number;
  employee: EmployeeDetails;
  time: TreatmentSessionDuration;
};

type CartItemBase = {
  treatment: TreatmentDetails;
};

export type CartItemWithOneSession = CartItemBase & {
  session: TreatmentSession;
};

export type CartItemWithMultipleSessions = CartItemBase & {
  sessions: TreatmentSession[];
};

type CartStore = {
  items: CartItemWithMultipleSessions[];
  getItemsCount: () => number;
  addToCart: (cartItem: CartItemWithOneSession) => void;
  removeFromCart: (treatmentId: number, treatmentSessionId: number) => void;
};

export const useCartStore = createPersistedStore<CartStore>(
  (set, get) => ({
    items: [],
    getItemsCount() {
      return get().items.reduce<number>((count, treatment) => {
        return count + treatment.sessions.length;
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
        (session) => session.id === cartItem.session.id
      );

      if (session) {
        showSnackbar({
          autohide: true,
          message: "Treatment cannot be duplicated!",
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
    },
    removeFromCart: (treatmentId, treatmentSessionId) => {
      set((state) => ({
        items: state.items.reduce<CartItemWithMultipleSessions[]>(
          (result, item) => {
            if (item.treatment.id !== treatmentId) {
              return [...result, item];
            }

            const filteredSessions = item.sessions.filter(
              (session) => session.id !== treatmentSessionId
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

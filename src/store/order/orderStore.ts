import { create } from "zustand";

import { Employee } from "@api/hooks";

export type OrderStore = {
  sessionStartsAt: Date | null;
  setSessionStartsAt: (date: Date | null) => void;
  employee: Employee | null;
  setEmployee: (employees: Employee | null) => void;
};

export const useOrderStore = create<OrderStore>(set => ({
  sessionStartsAt: null,
  setSessionStartsAt: sessionStartsAt => set({ sessionStartsAt }),
  employee: null,
  setEmployee: employee => set({ employee }),
}));

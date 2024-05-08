import { create } from "zustand";
import { Employee } from "@api/hooks";

export type TreatmentDetailsStore = {
  employeeId: Employee["id"] | null;
  setEmployeeId: (id: Employee["id"] | null) => void;
  sessionStartsAt: Date | null;
  setSessionStartsAt: (date: Date | null) => void;
};

export const useOrderStore = create<TreatmentDetailsStore>((set) => ({
  employeeId: null,
  setEmployeeId: (employeeId) => set({ employeeId }),
  sessionStartsAt: null,
  setSessionStartsAt: (sessionStartsAt) => set({ sessionStartsAt }),
}));

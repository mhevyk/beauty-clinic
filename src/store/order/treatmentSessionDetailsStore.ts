import { CreateTreatmentSessionInput } from "@api/hooks";
import { create } from "zustand";

type TreatmentDetails = {
  employeeId: CreateTreatmentSessionInput["employeeId"] | null;
  treatmentId: CreateTreatmentSessionInput["treatmentId"] | null;
  treatmentSessionDatetime: Date | null;
};

export type TreatmentDetailsStore = TreatmentDetails & {
  setEmployeeId: (id: number) => void;
  setTreatmentId: (id: number) => void;
  setTreatmentSessionDateTime: (datetime: Date) => void;
};

export const useOrderStore = create<TreatmentDetailsStore>((set) => ({
  employeeId: null,
  treatmentId: null,
  treatmentSessionDatetime: null,
  setEmployeeId: (id) => set({ employeeId: id }),
  setTreatmentId: (id) => set({ treatmentId: id }),
  setTreatmentSessionDateTime: (datetime) =>
    set({ treatmentSessionDatetime: datetime }),
}));

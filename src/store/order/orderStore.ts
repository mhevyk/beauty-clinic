import { CreateTreatmentSessionInput } from "@api/hooks";
import { create } from "zustand";
import { startOfToday } from "date-fns";

export type TreatmentDetailsStore = {
  treatmentId: CreateTreatmentSessionInput["treatmentId"] | null;
  treatmentSessionDatetime: Date;
  setTreatmentId: (id: number) => void;
  setTreatmentSessionDateTime: (datetime: Date) => void;
};

export const useOrderStore = create<TreatmentDetailsStore>((set) => ({
  treatmentId: null,
  treatmentSessionDatetime: startOfToday(),
  setTreatmentId: (id) => set({ treatmentId: id }),
  setTreatmentSessionDateTime: (datetime) =>
    set({ treatmentSessionDatetime: datetime }),
}));

import { create } from "zustand";

import { AppModalConfig } from "@/styles/app-modal/AppModalWrapper.types";

export type ModalStore = {
  modalStack: AppModalConfig[];
  addDialog: (dialog: AppModalConfig) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
  modalStack: [],
  addDialog: (dialog: AppModalConfig) => {
    set(state => {
      return { modalStack: [...state.modalStack, dialog] };
    });
  },
  closeModal: id =>
    set(state => ({
      modalStack: state.modalStack.filter(modal => modal.id !== id),
    })),
  closeAllModals: () => set({ modalStack: [] }),
}));

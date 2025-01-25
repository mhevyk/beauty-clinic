import { create } from "zustand";

import { AppDialogConfig } from "@/styles/app-modal/AppModal.types";

export type ModalStore = {
  modalStack: AppDialogConfig[];
  addDialog: (dialog: AppDialogConfig) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
  modalStack: [],
  addDialog: (dialog: AppDialogConfig) => {
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

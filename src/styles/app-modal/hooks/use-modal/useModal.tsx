import { create } from "zustand";

import {
  AppModalConfig,
  AppModalWithType,
} from "@/styles/app-modal/AppModalWrapper.types";
import { AppDialogConfig } from "@/styles/app-modal/app-dialog/AppDialog.types";
import { AppDrawerConfig } from "@/styles/app-modal/app-drawer/AppDrawer.types";

export type ModalStore<Modal extends AppModalConfig> = {
  modalStack: AppModalWithType<Modal>[];
  addDialog: (dialog: Modal) => void;
  addDrawer: (drawer: Modal) => void;
  closeModalById: (id: string) => void;
  closeAllModals: () => void;
};

export const useModalStore = create<
  ModalStore<AppDialogConfig | AppDrawerConfig>
>(set => ({
  modalStack: [],
  addDialog: (dialogConfig: AppDialogConfig) => {
    set(state => {
      const dialog: AppModalWithType<AppDialogConfig> = {
        ...dialogConfig,
        type: "dialog",
      };

      return { modalStack: [...state.modalStack, dialog] };
    });
  },
  addDrawer: (drawerConfig: AppDrawerConfig) => {
    set(state => {
      const drawer: AppModalWithType<AppDrawerConfig> = {
        ...drawerConfig,
        type: "drawer",
      };

      return { modalStack: [...state.modalStack, drawer] };
    });
  },
  closeModalById: id =>
    set(state => {
      console.log("close", id);
      return {
        modalStack: state.modalStack.filter(modal => modal.id !== id),
      };
    }),
  closeAllModals: () => set({ modalStack: [] }),
}));

import { FocusTrap } from "focus-trap-react";
import { createPortal } from "react-dom";

import "@/styles/app-modal/AppModalWrapper.scss";
import {
  AppModalConfig,
  AppModalWithType,
} from "@/styles/app-modal/AppModalWrapper.types";
import AppModal from "@/styles/app-modal/app-dialog/AppDialog";
import AppDrawer from "@/styles/app-modal/app-drawer";
import { useModalStore } from "@/styles/app-modal/hooks/use-modal/useModal";

const modalRootId = "modal-container";

const modalRoot =
  document.getElementById(modalRootId) ||
  (() => {
    const root = document.createElement("div");
    root.setAttribute("id", modalRootId);
    document.body.appendChild(root);
    return root;
  })();

const AppModalWrapper = () => {
  const { closeModalById, modalStack } = useModalStore();

  if (modalStack.length === 0) {
    return null;
  }

  const handleOverlayClick = (modalConfig: AppModalConfig) => {
    if (!modalConfig.shouldDisableOverlayClick) {
      closeModalById(modalConfig.id);
    }
  };

  const getModalByType = <Modal extends AppModalConfig>(
    modal: AppModalWithType<Modal>
  ) => {
    switch (modal.type) {
      case "dialog":
        return <AppModal config={modal} />;
      case "drawer":
        return <AppDrawer config={modal} />;
    }
  };

  return createPortal(
    modalStack.map(modalConfig => (
      <FocusTrap key={modalConfig.id}>
        <div
          className="app-modal__overlay"
          onClick={() => handleOverlayClick(modalConfig)}
        >
          {getModalByType(modalConfig)}
        </div>
      </FocusTrap>
    )),
    modalRoot
  );
};

export default AppModalWrapper;

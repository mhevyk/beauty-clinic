import { FocusTrap } from "focus-trap-react";
import { createPortal } from "react-dom";

import "@/styles/app-modal/AppModalWrapper.scss";
import { AppModalConfig } from "@/styles/app-modal/AppModalWrapper.types";
import AppModal from "@/styles/app-modal/app-dialog/AppDialog";
import { useModalStore } from "@/styles/app-modal/useModal";

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
  const { closeModal, modalStack } = useModalStore();

  if (modalStack.length === 0) {
    return null;
  }

  const handleOverlayClick = (modal: AppModalConfig) => {
    if (!modal.shouldDisableOverlayClick) {
      closeModal(modal.id);
    }
  };

  return createPortal(
    modalStack.map(modal => (
      <FocusTrap key={modal.id}>
        <div
          className="app-modal__overlay"
          onClick={() => handleOverlayClick(modal)}
        >
          <AppModal modal={modal} />
        </div>
      </FocusTrap>
    )),
    modalRoot
  );
};

export default AppModalWrapper;

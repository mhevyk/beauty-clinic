import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import "@/styles/app-modal/app-modal-wrapper/AppModalWrapper.scss";

const modalRootId = "modal-container";

const modalRoot =
  document.getElementById(modalRootId) ||
  (() => {
    const root = document.createElement("div");
    root.setAttribute("id", modalRootId);
    document.body.appendChild(root);
    return root;
  })();

type AppModalWrapperProps = PropsWithChildren & {
  onOverlayClick?: () => void;
};

const AppModalWrapper = ({
  onOverlayClick,
  children,
}: AppModalWrapperProps) => {
  return createPortal(
    <div
      className="app-modal__overlay"
      role="presentation"
      onClick={onOverlayClick}
    >
      {children}
    </div>,
    modalRoot
  );
};

export default AppModalWrapper;

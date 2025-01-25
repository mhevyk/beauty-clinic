import { KeyboardEvent, MouseEvent } from "react";

import AppButton from "@/styles/app-button/AppButton";
import AppIconButton from "@/styles/app-icon-button/AppIconButton";
import {
  AppDialogConfig,
  AppDialogProps,
} from "@/styles/app-modal/AppModal.types";
import { useModalStore } from "@/styles/app-modal/useModal";
import AppTypography from "@/styles/app-typography/AppTypography";

const getFooterButtonProps = (
  footerButton: AppDialogConfig["submitButton" | "cancelButton"]
) => {
  if (!footerButton || footerButton === true) {
    return {};
  }

  return footerButton;
};

const AppDialog = ({ modal }: AppDialogProps) => {
  const { closeModal } = useModalStore();

  const handleModalClose = () => {
    closeModal(modal.id);
  };

  const handleModalClick = (event: MouseEvent<HTMLDialogElement>) => {
    event.stopPropagation();
  };

  const handleModalKeydown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleModalClose();
    }
  };

  // @TODO: handle size
  const { title, renderContent, cancelButton, submitButton } = modal;

  const {
    label: cancelButtonLabel = "Cancel",
    onClick: onCancel,
    ...restCancelButtonProps
  } = getFooterButtonProps(cancelButton);

  const {
    label: submitButtonLabel = "Submit",
    onClick: onSubmit,
    ...restSubmitButtonProps
  } = getFooterButtonProps(submitButton);

  const handleCancelClick = (event: MouseEvent<HTMLButtonElement>) => {
    onCancel?.(event);
    handleModalClose();
  };

  const handleSubmitClick = (event: MouseEvent<HTMLButtonElement>) => {
    onSubmit?.(event);
    handleModalClose();
  };

  return (
    <dialog
      open
      className="modal-content fade-in"
      onClick={handleModalClick}
      onKeyDown={handleModalKeydown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title}
    >
      <div className="app-modal__header">
        {title && (
          <AppTypography id="dialog-title" variant="h5">
            {title}
          </AppTypography>
        )}
        <AppIconButton
          icon="ic:sharp-close"
          onClick={handleModalClose}
          aria-label="Close modal"
          className="app-dialog__close-button"
        />
      </div>
      <div>{renderContent()}</div>
      <div className="modal-footer">
        {cancelButton && (
          <AppButton
            variant="secondary"
            size="sm"
            onClick={handleCancelClick}
            width={!submitButton ? "full" : undefined}
            {...restCancelButtonProps}
          >
            {cancelButtonLabel}
          </AppButton>
        )}
        {submitButton && (
          <AppButton
            size="sm"
            onClick={handleSubmitClick}
            width={!cancelButton ? "full" : undefined}
            {...restSubmitButtonProps}
          >
            {submitButtonLabel}
          </AppButton>
        )}
      </div>
    </dialog>
  );
};

export default AppDialog;

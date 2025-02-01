import { KeyboardEvent, MouseEvent } from "react";

import classnames from "classnames";

import AppButton from "@/styles/app-button/AppButton";
import AppIconButton from "@/styles/app-icon-button/AppIconButton";
import "@/styles/app-modal/app-dialog/AppDialog.scss";
import {
  AppDialogConfig,
  AppDialogProps,
} from "@/styles/app-modal/app-dialog/AppDialog.types";
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

type AppModalFooterProps = Pick<
  AppDialogConfig,
  "cancelButton" | "submitButton"
> & {
  closeModal: () => void;
};

const ModalFooter = ({
  cancelButton,
  submitButton,
  closeModal,
}: AppModalFooterProps) => {
  if (!cancelButton && !submitButton) {
    return null;
  }

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
    closeModal();
  };

  const handleSubmitClick = (event: MouseEvent<HTMLButtonElement>) => {
    onSubmit?.(event);
    closeModal();
  };

  return (
    <div className="app-dialog__footer">
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
  );
};

const AppDialog = ({ modal }: AppDialogProps) => {
  const { closeModal } = useModalStore();

  const {
    id: modalId,
    title,
    renderContent,
    cancelButton,
    submitButton,
    size = "md",
    isFullscreen,
  } = modal;

  const handleModalClose = () => {
    closeModal(modalId);
  };

  const handleModalClick = (event: MouseEvent<HTMLDialogElement>) => {
    event.stopPropagation();
  };

  const handleModalKeydown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleModalClose();
    }
  };

  return (
    <dialog
      open
      className={classnames(
        "app-dialog",
        `app-dialog--${size}`,
        { "app-dialog--fullscreen": isFullscreen },
        "fade-in"
      )}
      onClick={handleModalClick}
      onKeyDown={handleModalKeydown}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="app-dialog__header">
        {title && <AppTypography variant="h4">{title}</AppTypography>}
        <AppIconButton
          icon="ic:sharp-close"
          onClick={handleModalClose}
          aria-label="Close dialog"
          className="app-dialog__close-button"
        />
      </div>
      <div className="app-dialog__body">{renderContent()}</div>
      <ModalFooter
        submitButton={submitButton}
        cancelButton={cancelButton}
        closeModal={handleModalClose}
      />
    </dialog>
  );
};

export default AppDialog;

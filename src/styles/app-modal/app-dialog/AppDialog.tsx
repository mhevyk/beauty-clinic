import { KeyboardEvent, MouseEvent } from "react";

import classnames from "classnames";

import AppButton from "@/styles/app-button/AppButton";
import AppIconButton from "@/styles/app-icon-button/AppIconButton";
import "@/styles/app-modal/app-dialog/AppDialog.scss";
import {
  AppDialogConfig,
  AppDialogProps,
} from "@/styles/app-modal/app-dialog/AppDialog.types";
import { useModalStore } from "@/styles/app-modal/hooks/use-modal/useModal";
import AppTypography from "@/styles/app-typography/AppTypography";

const getFooterButtonProps = (
  footerButton: AppDialogConfig["submitButton" | "cancelButton"]
) => {
  if (!footerButton || footerButton === true) {
    return {};
  }

  return footerButton;
};

type AppDialogFooterProps = Pick<
  AppDialogConfig,
  "cancelButton" | "submitButton"
> & {
  closeModal: () => void;
};

const ModalFooter = ({
  cancelButton,
  submitButton,
  closeModal,
}: AppDialogFooterProps) => {
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
  };

  return (
    <footer className="app-dialog__footer">
      {cancelButton && (
        <AppButton
          variant="secondary"
          size="sm"
          onClick={handleCancelClick}
          width="full"
          {...restCancelButtonProps}
        >
          {cancelButtonLabel}
        </AppButton>
      )}
      {submitButton && (
        <AppButton
          size="sm"
          onClick={handleSubmitClick}
          width="full"
          {...restSubmitButtonProps}
        >
          {submitButtonLabel}
        </AppButton>
      )}
    </footer>
  );
};

const AppDialog = ({ config }: AppDialogProps) => {
  const { closeModalById } = useModalStore();

  const {
    id: modalId,
    title,
    renderContent,
    cancelButton,
    submitButton,
    size = "md",
    isFullscreen,
  } = config;

  const handleDialogClose = () => {
    closeModalById(modalId);
  };

  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    event.stopPropagation();
  };

  const handleDialogKeydown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleDialogClose();
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
      onClick={handleDialogClick}
      onKeyDown={handleDialogKeydown}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <header className="app-dialog__header">
        {title && <AppTypography variant="h4">{title}</AppTypography>}
        <AppIconButton
          icon="ic:sharp-close"
          onClick={handleDialogClose}
          aria-label="Close dialog"
          className="app-dialog__close-button"
        />
      </header>
      <div className="app-dialog__body">{renderContent()}</div>
      <ModalFooter
        submitButton={submitButton}
        cancelButton={cancelButton}
        closeModal={handleDialogClose}
      />
    </dialog>
  );
};

export default AppDialog;

import { MouseEvent, useId, useLayoutEffect, useRef, useState } from "react";

import classnames from "classnames";

import AppButton from "@/styles/app-button/AppButton";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import AppIconButton from "@/styles/app-icon-button/AppIconButton";
import "@/styles/app-modal/app-dialog/AppDialog.scss";
import {
  AppDialogButtonConfig,
  AppDialogProps,
} from "@/styles/app-modal/app-dialog/AppDialog.types";
import AppModalWrapper from "@/styles/app-modal/app-modal-wrapper/AppModalWrapper";
import AppTypography from "@/styles/app-typography/AppTypography";

type FooterButtonProps = {
  defaultLabel: string;
  button: true | AppDialogButtonConfig;
  variant: AppButtonProps["variant"];
};

const FooterButton = ({ button, defaultLabel, variant }: FooterButtonProps) => {
  const { label, ...buttonProps } = button === true ? {} : button;

  return (
    <AppButton variant={variant} size="sm" width="full" {...buttonProps}>
      {label || defaultLabel}
    </AppButton>
  );
};

const AppDialog = ({
  isOpen = false,
  onClose,
  children,
  size = "md",
  title,
  cancelButton,
  submitButton,
  shouldDisableOverlayClick,
  isFullscreen,
}: AppDialogProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const previousIsOpen = useRef<boolean>();
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();

  useLayoutEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    } else if (previousIsOpen.current) {
      setIsClosing(true);
    }

    // lock scroll when dialog is open
    document.body.style.overflow = isOpen ? "hidden" : "";

    previousIsOpen.current = isOpen;
  }, [isOpen]);

  const handleDialogClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleDialogKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }

    if (event.key === "Tab") {
      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  };

  const handleDialogAnimationEnd = () => {
    setIsClosing(false);
  };

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <AppModalWrapper
      onOverlayClick={!shouldDisableOverlayClick ? onClose : undefined}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${dialogId}-title`}
        aria-describedby={`${dialogId}-body`}
        ref={dialogRef}
        tabIndex={-1}
        className={classnames("app-dialog", `app-dialog--${size}`, {
          "app-dialog--closing": isClosing,
          "app-dialog--fullscreen": isFullscreen,
        })}
        onClick={handleDialogClick}
        onKeyDown={handleDialogKeydown}
        onAnimationEnd={handleDialogAnimationEnd}
      >
        <header className="app-dialog__header">
          {title && (
            <AppTypography variant="h4" id={`${dialogId}-title`}>
              {title}
            </AppTypography>
          )}
          <AppIconButton
            icon="ic:sharp-close"
            onClick={onClose}
            aria-label="Close dialog"
            className="app-dialog__close-button"
          />
        </header>
        <div className="app-dialog__body" id={`${dialogId}-body`}>
          {children}
        </div>
        <footer className="app-dialog__footer">
          {cancelButton && (
            <FooterButton
              defaultLabel="Cancel"
              button={cancelButton}
              variant="secondary"
            />
          )}
          {submitButton && (
            <FooterButton
              defaultLabel="Submit"
              button={submitButton}
              variant="primary"
            />
          )}
        </footer>
      </div>
    </AppModalWrapper>
  );
};

export default AppDialog;

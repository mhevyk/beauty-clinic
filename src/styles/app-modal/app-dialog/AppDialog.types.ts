import { ReactNode } from "react";

import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import { AppSize } from "@/styles/types";

export type AppDialogSize = AppSize;

export type AppDialogButtonConfig = Pick<
  AppButtonProps,
  "onClick" | "isLoading" | "disabled" | "startAdornment" | "endAdornment"
> & {
  label?: string;
};

export type AppDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  size?: AppDialogSize;
  submitButton?: boolean | AppDialogButtonConfig;
  cancelButton?: boolean | AppDialogButtonConfig;
  shouldDisableOverlayClick?: boolean;
  isFullscreen?: boolean;
};

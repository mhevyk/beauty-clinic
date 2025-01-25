import { ReactNode } from "react";

import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import { AppSize } from "@/styles/types";

export type AppDialogSize = AppSize;

type FooterButtonProps = Pick<
  AppButtonProps,
  "onClick" | "isLoading" | "disabled" | "startAdornment" | "endAdornment"
> & {
  label: string;
};

export type AppDialogConfig = {
  id: string;
  renderContent: () => ReactNode;
  title?: string;
  size?: AppDialogSize;
  cancelButton?: boolean | Partial<FooterButtonProps>;
  submitButton?: boolean | Partial<FooterButtonProps>;
  shouldDisableOverlayClick?: boolean;
  isFullscreen?: boolean;
};

export type AppDialogProps = {
  modal: AppDialogConfig;
};

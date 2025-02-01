import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import { AppModalConfig } from "@/styles/app-modal/AppModalWrapper.types";
import { AppSize } from "@/styles/types";

export type AppDialogSize = AppSize;

type FooterButtonProps = Pick<
  AppButtonProps,
  "onClick" | "isLoading" | "disabled" | "startAdornment" | "endAdornment"
> & {
  label: string;
};

export type AppDialogConfig = AppModalConfig & {
  size?: AppDialogSize;
  cancelButton?: boolean | Partial<FooterButtonProps>;
  submitButton?: boolean | Partial<FooterButtonProps>;
  isFullscreen?: boolean;
};

export type AppDialogProps = {
  modal: AppDialogConfig;
};

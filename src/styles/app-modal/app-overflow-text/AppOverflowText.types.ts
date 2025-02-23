import {
  AppDialogSize,
  AppDialogTooltipConfig,
} from "@/styles/app-modal/app-dialog/AppDialog.types.ts";
import { AppTypographyVariant } from "@/styles/app-typography/AppTypography.types.ts";

export type AppOverflowTextsProps = {
  children: string;
  textSize: AppDialogSize;
  variant?: AppTypographyVariant;
  tooltip?: AppDialogTooltipConfig;
};

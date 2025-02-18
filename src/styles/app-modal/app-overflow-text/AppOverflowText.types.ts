import {
  AppDialogSize,
  AppDialogTooltipConfig,
} from "@/styles/app-modal/app-dialog/AppDialog.types.ts";
import {
  AppTooltipPosition,
  AppTooltipSize,
} from "@/styles/app-tooltip/AppTooltip.types.ts";
import { AppTypographyVariant } from "@/styles/app-typography/AppTypography.types.ts";

export type AppOverflowTextsProps = {
  id: string;
  children: string;
  tooltipSize?: AppTooltipSize;
  tooltipPosition?: AppTooltipPosition;
  textSize: AppDialogSize;
  variant?: AppTypographyVariant;
  tooltip?: AppDialogTooltipConfig;
};

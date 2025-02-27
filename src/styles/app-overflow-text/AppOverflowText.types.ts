import { ElementType } from "react";

import { AppTooltipProps } from "@/styles/app-tooltip/AppTooltip.types";
import { AppTypographyProps } from "@/styles/app-typography/AppTypography.types.ts";

export type TooltipProps = Pick<AppTooltipProps, "position" | "width">;

export type AppOverflowTextsProps<Element extends ElementType> = {
  children: string;
  tooltipProps?: TooltipProps;
  typographyProps: Omit<AppTypographyProps<Element>, "children">;
};

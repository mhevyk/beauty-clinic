import { ComponentPropsWithoutRef, ReactElement } from "react";

import { AppSize } from "@/styles/types.ts";

export type AppTooltipPosition = "top" | "bottom" | "left" | "right";

export type AppTooltipSize = Extract<AppSize, "md" | "lg">;

export type AppTooltipProps = {
  children: ReactElement;
  content: string;
  position?: AppTooltipPosition;
  width?: AppTooltipSize;
} & ComponentPropsWithoutRef<"div">;

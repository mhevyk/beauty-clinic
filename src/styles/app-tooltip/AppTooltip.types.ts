import { ComponentPropsWithoutRef, ReactElement } from "react";

import { AppSize } from "@/styles/types.ts";

type AppTooltipPosition = "top" | "bottom" | "left" | "right";

type AppTooltipSize = Extract<AppSize, "md" | "lg">;

export type AppTooltipProps = {
  children: ReactElement;
  content: string;
  position?: AppTooltipPosition;
  width?: AppTooltipSize;
} & ComponentPropsWithoutRef<"div">;

import { ComponentPropsWithoutRef, ReactElement } from "react";

export type AppTooltipProps = {
  children: ReactElement;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  width?: "medium" | "large";
} & ComponentPropsWithoutRef<"div">;

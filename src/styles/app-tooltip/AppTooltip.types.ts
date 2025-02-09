import { ComponentPropsWithoutRef, ReactElement } from "react";

export type AppTooltipProps = {
  children: ReactElement;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
} & ComponentPropsWithoutRef<"div">;

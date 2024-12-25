import { ElementType } from "react";
import { APP_BREAKPOINTS, APP_COLORS } from "@/styles";

export type PropsWithAs<T extends ElementType> = {
  as?: T;
};

export type AppColorVariant = keyof typeof APP_COLORS;
export type AppBreakpoint = keyof typeof APP_BREAKPOINTS;

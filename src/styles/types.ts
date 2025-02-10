import { ElementType, HTMLAttributes, ReactElement } from "react";

import { APP_BREAKPOINTS, APP_COLORS } from "@/styles";

export type AppSize = "sm" | "md" | "lg";

export type PropsWithAs<T extends ElementType> = {
  as?: T;
};

export type AppAdornment = ReactElement<HTMLAttributes<HTMLElement>>;

export type WithStartAdornment = {
  startAdornment?: AppAdornment;
};

export type WithEndAdornment = {
  endAdornment?: AppAdornment;
};

export type AppColorVariant = keyof typeof APP_COLORS;
export type AppBreakpoint = keyof typeof APP_BREAKPOINTS;

import { ElementType, HTMLAttributes, ReactElement } from "react";

import { APP_BREAKPOINTS, APP_COLORS } from "@/styles";

export type PropsWithAs<T extends ElementType> = {
  as?: T;
};

type Adornment = ReactElement<HTMLAttributes<HTMLElement>>;

export type WithStartAdornment = {
  startAdornment?: Adornment;
};

export type WithEndAdornment = {
  endAdornment?: Adornment;
};

export type AppColorVariant = keyof typeof APP_COLORS;
export type AppBreakpoint = keyof typeof APP_BREAKPOINTS;

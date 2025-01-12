import { ComponentPropsWithoutRef, HTMLAttributes, ReactElement } from "react";

import { AppFormControlMeta } from "@/styles/app-form-control/AppFormControl.types";

type AppInputVariant = "filled" | "underlined";

export type AppInputAdornment = ReactElement<HTMLAttributes<HTMLElement>>;

export type AppTextInputProps = AppFormControlMeta & {
  variant?: AppInputVariant;
  startAdornment?: AppInputAdornment;
  endAdornment?: AppInputAdornment;
  fullWidth?: boolean;
  mask?: Array<string | RegExp>;
  minWidth?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "id">;

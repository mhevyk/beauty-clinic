import { ComponentPropsWithoutRef } from "react";

import { AppFormControlMeta } from "@/styles/app-form-control/AppFormControl.types";
import { WithEndAdornment, WithStartAdornment } from "@/styles/types";

type AppInputVariant = "filled" | "underlined";

export type AppTextInputProps = AppFormControlMeta &
  WithStartAdornment &
  WithEndAdornment & {
    variant?: AppInputVariant;
    fullWidth?: boolean;
    minWidth?: string;
    mask?: Array<string | RegExp>;
  } & Omit<ComponentPropsWithoutRef<"input">, "type" | "id">;

import { ComponentPropsWithoutRef } from "react";

import { AppFormControlMeta } from "@/styles/app-form-control/AppFormControl.types";

type AppTextareaVariant = "filled" | "underlined";

export type AppTextareaProps = AppFormControlMeta & {
  isAutoresisable?: boolean;
  variant?: AppTextareaVariant;
} & Omit<ComponentPropsWithoutRef<"textarea">, "className">;

import { AppSize } from "@/styles/types.ts";

export type AppSpinnerSize = Extract<AppSize, "md" | "lg">;

export type AppSpinnerVariant = "primary" | "secondary";

export type AppSpinnerProps = {
  size?: AppSpinnerSize;
  variant?: AppSpinnerVariant;
  fullScreen?: boolean;
};

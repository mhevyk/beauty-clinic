import { AppSize } from "@/styles/types.ts";

export type AppSpinnerSize = Extract<AppSize, "md" | "lg">;

export type AppSpinnerColor = "primary" | "secondary";

export type AppSpinnerProps = {
  size?: AppSpinnerSize;
  color?: AppSpinnerColor;
  fullScreen?: boolean;
  label?: string;
};

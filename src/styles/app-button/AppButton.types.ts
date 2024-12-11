import { PropsWithChildren } from "react";

type AppButtonVariant = "primary" | "secondary";
type AppButtonSize = "sm" | "md" | "lg";

export type AppButtonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  inline?: boolean;
} & PropsWithChildren;

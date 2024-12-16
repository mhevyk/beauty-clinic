import { HTMLAttributes } from "react";

type AppButtonVariant = "primary" | "secondary";
type AppButtonSize = "sm" | "md" | "lg";
type ButtonType = "submit" | "button";

export type AppButtonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  inline?: boolean;
  type?: ButtonType;
  children?: string;
} & HTMLAttributes<HTMLButtonElement>;

import { HTMLAttributes, ReactElement } from "react";

type AppButtonVariant = "primary" | "secondary";
type AppButtonSize = "sm" | "md" | "lg";
type ButtonType = "submit" | "button";

export type AppButtonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  inline?: boolean;
  type?: ButtonType;
  prefixIcon?: ReactElement;
  icon?: ReactElement;
  children?: string;
} & HTMLAttributes<HTMLButtonElement>;

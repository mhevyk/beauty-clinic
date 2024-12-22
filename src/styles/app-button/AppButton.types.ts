import { HTMLAttributes, ReactElement } from "react";

type AppButtonVariant = "primary" | "secondary";
type AppButtonSize = "sm" | "md" | "lg";
type AppButtonType = "submit" | "button";
type AppButtonWidth = "fit" | "full"

export type AppButtonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  width?: AppButtonWidth;
  isLoading?: boolean;
  disabled?: boolean;
  type?: AppButtonType;
  prefixIcon?: ReactElement;
  icon?: ReactElement;
  children?: string;
} & HTMLAttributes<HTMLButtonElement>;

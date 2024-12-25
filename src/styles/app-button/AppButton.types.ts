import { ButtonHTMLAttributes, ReactElement } from "react";

type AppButtonVariant = "primary" | "secondary";
type AppButtonSize = "sm" | "md" | "lg";
type AppButtonWidth = "fit" | "full"

export type AppButtonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  width?: AppButtonWidth;
  isLoading?: boolean;
  prefixIcon?: ReactElement;
  icon?: ReactElement;
  children?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

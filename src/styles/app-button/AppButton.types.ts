import { ButtonHTMLAttributes } from "react";

import { WithEndAdornment, WithStartAdornment } from "@/styles/types";

type AppButtonVariant = "primary" | "secondary";
type AppButtonSize = "sm" | "md" | "lg";
type AppButtonWidth = "fit" | "full";

export type AppButtonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  width?: AppButtonWidth;
  isLoading?: boolean;
  children?: string;
} & WithStartAdornment &
  WithEndAdornment &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

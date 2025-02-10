import { ButtonHTMLAttributes } from "react";
import { To } from "react-router-dom";

import { AppSize, WithEndAdornment, WithStartAdornment } from "@/styles/types";

type AppButtonVariant = "primary" | "secondary";
type AppButtonSize = AppSize;
type AppButtonWidth = "fit" | "full";

export type AppButtonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  width?: AppButtonWidth;
  isLoading?: boolean;
  children?: string;
  to?: To;
} & WithStartAdornment &
  WithEndAdornment &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

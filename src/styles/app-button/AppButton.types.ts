import { PropsWithAs } from "@/styles/types";
import { ElementType, PropsWithChildren } from "react";

type AppButtonVariant = "primary" | "secondary";
type AppButtonSize = "sm" | "md" | "lg";

export type AppButtonProps<T extends ElementType = ElementType> = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  inline?: boolean;
} & PropsWithAs<T> & PropsWithChildren;

import {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactElement,
  Ref,
} from "react";

type AppInputVariant = "filled" | "underlined";

export type AppInputAdornment = ReactElement<HTMLAttributes<HTMLElement>>;

export type AppTextInputProps = {
  variant?: AppInputVariant;
  startAdornment?: AppInputAdornment;
  endAdornment?: AppInputAdornment;
  fullWidth?: boolean;
  errorMessage?: string;
  mask?: Array<string | RegExp>;
  label?: string;
  helperText?: string;
  minWidth?: string;
  innerRef?: Ref<HTMLInputElement | null>;
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "id">;

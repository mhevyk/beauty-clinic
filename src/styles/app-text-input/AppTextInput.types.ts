import {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactElement,
  Ref,
} from "react";
import MaskedInput from "react-text-mask";

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
  innerRef?: Ref<MaskedInput>;
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "id">;

import { ReactElement, Ref } from "react";

export type AppFormControlMeta = {
  errorMessage?: string;
  label?: string;
  helperText?: string;
  controlRef?: Ref<HTMLDivElement>;
  fullWidth?: boolean;
};

export type AppFormControlProps = Omit<AppFormControlMeta, "controlRef"> & {
  control: ReactElement;
  className: string;
};

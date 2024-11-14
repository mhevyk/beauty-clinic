import { PropsWithChildren } from "react";

import { SxProps } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";

import { Feedback } from "@/components/form-group-with-error/FormGroupWithError.styled";

type FormGroupWithErrorProps = PropsWithChildren & {
  errorMessage?: string;
  feedbackStyles?: SxProps;
};

export default function FormGroupWithError({
  children,
  errorMessage,
  feedbackStyles,
}: FormGroupWithErrorProps) {
  return (
    <FormGroup sx={{ flexGrow: 1, height: "min-content" }}>
      {children}
      {!!errorMessage && (
        <Feedback error sx={feedbackStyles}>
          {errorMessage}
        </Feedback>
      )}
    </FormGroup>
  );
}

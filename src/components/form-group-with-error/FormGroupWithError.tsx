import { PropsWithChildren } from "react";

import { SxProps } from "@mui/material";
import { styled } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";

const Feedback = styled(FormHelperText)(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "12px",
  lineHeight: "1rem",
}));

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

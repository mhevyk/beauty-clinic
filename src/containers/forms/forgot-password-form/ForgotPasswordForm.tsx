import { useId } from "react";

import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";

import FormGroupWithError from "@/components/form-group-with-error/FormGroupWithError.tsx";
import { LabelStyled } from "@/containers/forms/forgot-password-form/ForgotPasswordForm.styled";
import { ForgotPasswordFormValues } from "@/containers/modals/forgot-password-modal/ForgotPasswordModal";

export default function ForgotPasswordForm() {
  const id = useId();
  const { values, handleChange, errors } =
    useFormikContext<ForgotPasswordFormValues>();

  return (
    <form style={{ width: "100%" }}>
      <FormGroupWithError errorMessage={errors?.email}>
        <LabelStyled htmlFor={`${id}-email`}>Email*</LabelStyled>
        <TextField
          size="small"
          type="text"
          id={`${id}-email`}
          name="email"
          value={values.email}
          onChange={handleChange}
          fullWidth
        />
      </FormGroupWithError>
    </form>
  );
}

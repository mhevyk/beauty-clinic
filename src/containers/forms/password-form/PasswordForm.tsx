import { useId } from "react";

import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";

import FormGroupWithError from "@/components/form-group-with-error/FormGroupWithError";
import {
  Form,
  LabelStyled,
} from "@/containers/forms/password-form/PasswordForm.styled";

export type PasswordFormValues = {
  password: string;
  repeatedPassword: string;
};

export default function PasswordForm() {
  const id = useId();
  const { values, handleChange, errors } =
    useFormikContext<PasswordFormValues>();

  return (
    <Form>
      <FormGroupWithError errorMessage={errors.password}>
        <LabelStyled htmlFor={`${id}-password`}>Password*</LabelStyled>
        <TextField
          type="password"
          id={`${id}-password`}
          size="small"
          name="password"
          value={values.password}
          onChange={handleChange}
          fullWidth
        />
      </FormGroupWithError>
      <FormGroupWithError errorMessage={errors.repeatedPassword}>
        <LabelStyled htmlFor={`${id}-repeat-password`}>
          Repeat password*
        </LabelStyled>
        <TextField
          type="password"
          id={`${id}-repeat-password`}
          size="small"
          name="repeatedPassword"
          value={values.repeatedPassword}
          onChange={handleChange}
          fullWidth
        />
      </FormGroupWithError>
    </Form>
  );
}

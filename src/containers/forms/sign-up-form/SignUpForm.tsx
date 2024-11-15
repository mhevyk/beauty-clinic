import { useId } from "react";

import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";

import FormGroupWithError from "@/components/form-group-with-error/FormGroupWithError";
import {
  Form,
  LabelStyled,
} from "@/containers/forms/sign-up-form/SignUpForm.styled";
import PhoneNumberFormGroup from "@/containers/phone-number-form-group/PhoneNumberFormGroup";
import { SignUpFormValues } from "@/pages/sign-up/SignUpPage.types";

export default function SignUpForm() {
  const id = useId();
  const { values, handleChange, errors } = useFormikContext<SignUpFormValues>();

  return (
    <Form>
      <FormGroupWithError errorMessage={errors.username}>
        <LabelStyled htmlFor={`${id}-username`}>Username*</LabelStyled>
        <TextField
          size="small"
          type="text"
          id={`${id}-username`}
          name="username"
          value={values.username}
          onChange={handleChange}
          fullWidth
        />
      </FormGroupWithError>
      <FormGroupWithError errorMessage={errors.email}>
        <LabelStyled htmlFor={`${id}-email`}>Email*</LabelStyled>
        <TextField
          size="small"
          type="email"
          id={`${id}-email`}
          name="email"
          value={values.email}
          onChange={handleChange}
          fullWidth
        />
      </FormGroupWithError>
      <PhoneNumberFormGroup backgroundColor="" isDisabled={false} />
    </Form>
  );
}

import { useId } from "react";

import { SignUpFormValues } from "..";
import { InputLabel, TextField, styled } from "@mui/material";
import { useFormikContext } from "formik";

import FormGroupWithError from "@/components/FormGroupWithError";
import PhoneNumberFormGroup from "@/components/PhoneNumberFormGroup.tsx";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "19px",
});

const LabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "15px",
  marginBottom: "2px",
  fontWeight: 400,
}));

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
      <PhoneNumberFormGroup backgroundColor="" isDisable={false} />
    </Form>
  );
}

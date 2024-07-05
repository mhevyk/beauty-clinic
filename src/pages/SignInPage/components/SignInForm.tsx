import { useId } from "react";

import { InputLabel, TextField, styled } from "@mui/material";
import { useFormikContext } from "formik";

import FormGroupWithError from "@/components/FormGroupWithError";
import { SignInFormValues } from "@/pages/SignInPage";

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

export default function SignInForm() {
  const id = useId();
  const { values, handleChange, errors } = useFormikContext<SignInFormValues>();

  return (
    <Form>
      <FormGroupWithError errorMessage={errors.usernameOrEmail}>
        <LabelStyled htmlFor={`${id}-usernameOrEmail`}>
          Username or email*
        </LabelStyled>
        <TextField
          size="small"
          type="text"
          id={`${id}-usernameOrEmail`}
          name="usernameOrEmail"
          value={values.usernameOrEmail}
          onChange={handleChange}
          fullWidth
        />
      </FormGroupWithError>
      <FormGroupWithError errorMessage={errors.password}>
        <LabelStyled htmlFor={`${id}-password`}>Password*</LabelStyled>
        <TextField
          size="small"
          type="password"
          id={`${id}-password`}
          name="password"
          value={values.password}
          onChange={handleChange}
          fullWidth
        />
      </FormGroupWithError>
    </Form>
  );
}

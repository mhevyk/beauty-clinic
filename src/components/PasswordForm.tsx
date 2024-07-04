import { InputLabel, TextField, styled } from "@mui/material";
import { useFormikContext } from "formik";
import { useId } from "react";
import FormGroupWithError from "@/components/FormGroupWithError";

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

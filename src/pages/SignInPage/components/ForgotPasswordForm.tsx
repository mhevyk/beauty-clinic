import FormGroupWithError from "@components/FormGroupWithError";
import { InputLabel, TextField, styled } from "@mui/material";
import { useFormikContext } from "formik";
import { useId } from "react";
import { ForgotPasswordFormValues } from "./ForgotPasswordModal";

const LabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "15px",
  marginBottom: "2px",
  fontWeight: 400,
}));

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

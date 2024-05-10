import { InputLabel, TextField, styled } from "@mui/material";
import { useFormikContext } from "formik";
import { useId } from "react";
import FormGroupWithError from "@components/FormGroupWithError";
import { SignUpFormValues } from "..";
import MaskedInput from "react-text-mask";
import { PHONE_NUMBER_PATTERN } from "@constants/index";

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
      <FormGroupWithError errorMessage={errors.phoneNumber}>
        <LabelStyled htmlFor={`${id}-phone-number`}>Phone number</LabelStyled>
        <MaskedInput
          mask={PHONE_NUMBER_PATTERN}
          type="tel"
          id={`${id}-phone-number`}
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          render={(ref, props) => (
            <TextField inputRef={ref} size="small" fullWidth {...props} />
          )}
        />
      </FormGroupWithError>
    </Form>
  );
}

import { useId } from "react";

import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";

import FormGroupWithError from "@/components/form-group-with-error/FormGroupWithError";
import { PHONE_NUMBER_PATTERN } from "@/constants/index.ts";
import {
  LabelStyled,
  MaskedInputStyled,
} from "@/containers/phone-number-form-group/PhoneNumberFormGroup.styled";
import { SignUpFormValues } from "@/pages/sign-up/SignUpPage.types";

type PhoneNumberFormGroupProps = {
  isDisabled: boolean;
  backgroundColor: string;
};

export default function PhoneNumberFormGroup({
  isDisabled,
  backgroundColor,
}: PhoneNumberFormGroupProps) {
  const id = useId();
  const { values, handleChange, errors } = useFormikContext<SignUpFormValues>();

  return (
    <FormGroupWithError errorMessage={errors.phoneNumber}>
      <LabelStyled htmlFor={`${id}-phone-number`}>Phone number</LabelStyled>
      <MaskedInputStyled
        backgroundColor={backgroundColor}
        disabled={isDisabled}
        placeholder="(___) ___-____"
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
  );
}

import MaskedInput from "react-text-mask";
import { PHONE_NUMBER_PATTERN } from "@/constants/index.ts";
import { InputLabel, styled, TextField } from "@mui/material";
import FormGroupWithError from "@/components/FormGroupWithError.tsx";
import { useId } from "react";
import { useFormikContext } from "formik";
import { SignUpFormValues } from "@/pages/SignUpPage";

const LabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "15px",
  marginBottom: "2px",
  fontWeight: 400,
}));

interface MaskedInputStyledProps {
  backgroundColor: string;
  disabled: boolean;
}

const MaskedInputStyled = styled(MaskedInput, {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<MaskedInputStyledProps>(
  ({ backgroundColor, disabled }: MaskedInputStyledProps) => ({
    backgroundColor,
    ...(disabled && { pointerEvents: "none" }),
  })
);

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

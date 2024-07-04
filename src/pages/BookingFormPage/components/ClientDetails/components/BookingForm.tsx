import FormGroupWithError from "@/components/FormGroupWithError.tsx";
import { Box, InputLabel, styled, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetCurrentUserDetailsQuery } from "@api/hooks";
import { useUserStore } from "@/store/user/userStore.ts";
import PhoneNumberFormGroup from "@/components/PhoneNumberFormGroup.tsx";
import theme from "@/theme/theme.ts";

type ForgotPasswordFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

const BoxStyled = styled(Box)({
  display: "flex",
  gap: "24px",
});

const TextFieldStyled = styled(TextField)(({ theme, disabled }) => ({
  backgroundColor: theme.palette.CreamyDawn.main,
  ...(disabled && { pointerEvents: "none" }),
}));

const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  marginTop: "32px",
});

const Counter = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  display: "flex",
  justifyContent: "end",
  margin: "8px 0 0 0",
  position: "absolute",
  right: 0,
  top: "58px",
}));

export default function BookingForm() {
  const [length, setLength] = useState(0);
  const { values, handleChange, errors, setFieldValue, setValues } =
    useFormikContext<ForgotPasswordFormValues>();

  const isAuthenticated = useUserStore((store) => store.checkAuthenticated());

  const { data } = useGetCurrentUserDetailsQuery();

  useEffect(() => {
    const userDetails = data?.getCurrentUserDetails;

    if (userDetails && isAuthenticated) {
      setLength(userDetails.username.length);

      setFieldValue("name", userDetails.username ?? "");
      setFieldValue("email", userDetails.email ?? "");
      setFieldValue("phoneNumber", userDetails.phoneNumber ?? "");
    } else {
      setValues({
        name: "",
        email: "",
        phoneNumber: "",
        message: values.message,
      });
    }
  }, [isAuthenticated, data]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (newName.length <= 50) {
      handleChange(event);
      setLength(newName.length);
    }
  };

  return (
    <>
      <Form>
        <BoxStyled>
          <Box position="relative" flexGrow="1">
            <FormGroupWithError errorMessage={errors?.name}>
              <InputLabelStyled>Name*</InputLabelStyled>
              {/*TODO: maybe off focus when disabled is true */}
              <TextFieldStyled
                size="small"
                type="text"
                name="name"
                value={values.name}
                onChange={handleNameChange}
                fullWidth
                maxRows={50}
                disabled={isAuthenticated}
              />
            </FormGroupWithError>
            <Counter>{length}/50</Counter>
          </Box>
          <FormGroupWithError errorMessage={errors?.email}>
            <InputLabelStyled>Email*</InputLabelStyled>
            <TextFieldStyled
              size="small"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              disabled={isAuthenticated}
            />
          </FormGroupWithError>
        </BoxStyled>
        <PhoneNumberFormGroup
          backgroundColor={theme.palette.CreamyDawn.main}
          isDisabled={isAuthenticated}
        />
        <FormGroupWithError errorMessage={errors?.message}>
          <InputLabelStyled>Add Your Message</InputLabelStyled>
          <TextFieldStyled
            multiline
            rows={2.5}
            size="small"
            type="text"
            name="message"
            value={values.message}
            onChange={handleChange}
            fullWidth
          />
        </FormGroupWithError>
      </Form>
    </>
  );
}

import { ChangeEvent, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { useFormikContext } from "formik";

import { useGetCurrentUserDetailsQuery } from "@/api/generated";
import FormGroupWithError from "@/components/form-group-with-error/FormGroupWithError";
import {
  BoxStyled,
  Counter,
  Form,
  InputLabelStyled,
  TextFieldStyled,
} from "@/containers/forms/booking-form/BookingForm.styled";
import PhoneNumberFormGroup from "@/containers/phone-number-form-group/PhoneNumberFormGroup";
import { useUserStore } from "@/store/user/userStore.ts";
import theme from "@/theme/theme.ts";

type ForgotPasswordFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export default function BookingForm() {
  const [length, setLength] = useState(0);
  const { values, handleChange, errors, setFieldValue, setValues } =
    useFormikContext<ForgotPasswordFormValues>();

  const isAuthenticated = useUserStore(store => store.checkAuthenticated());

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

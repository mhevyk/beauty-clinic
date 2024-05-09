import FormGroupWithError from "@components/FormGroupWithError.tsx";
import { Box, InputLabel, styled, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";
import { useGetCurrentUserDetailsQuery } from "@api/hooks";

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

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.CreamyDawn.main,
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
}));

type BookingFormProps = {
  isAuthenticated: boolean;
};

export default function BookingForm({ isAuthenticated }: BookingFormProps) {
  const [length, setLength] = useState(0);
  const { values, handleChange, errors } =
    useFormikContext<ForgotPasswordFormValues>();

  const { data } = useGetCurrentUserDetailsQuery();

  if (isAuthenticated) {
    values.name = data?.getCurrentUserDetails.username;
    values.email = data?.getCurrentUserDetails.email;
    values.phoneNumber = data?.getCurrentUserDetails.phoneNumber;
  }

  values.name = "fdfd";
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
          <Box flexGrow="1">
            <FormGroupWithError errorMessage={errors?.name}>
              <InputLabelStyled>Name*</InputLabelStyled>
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
        <FormGroupWithError errorMessage={errors?.phoneNumber}>
          <InputLabelStyled>Phone Number</InputLabelStyled>
          <TextFieldStyled
            size="small"
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            fullWidth
            disabled={isAuthenticated}
          />
        </FormGroupWithError>
        <FormGroupWithError errorMessage={errors?.message}>
          <InputLabelStyled>Add Your Message</InputLabelStyled>
          <TextFieldStyled
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

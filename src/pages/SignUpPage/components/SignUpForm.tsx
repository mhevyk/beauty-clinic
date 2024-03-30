import { FormGroup, InputLabel, TextField, styled } from "@mui/material";
import { useId } from "react";

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

  return (
    <Form>
      <FormGroup>
        <LabelStyled htmlFor={`${id}-username`}>Username</LabelStyled>
        <TextField size="small" type="text" id={`${id}-username`} fullWidth />
      </FormGroup>
      <FormGroup>
        <LabelStyled htmlFor={`${id}-email`}>Email</LabelStyled>
        <TextField size="small" type="email" id={`${id}-email`} fullWidth />
      </FormGroup>
      <FormGroup>
        <LabelStyled htmlFor={`${id}-phone-number`}>Phone number</LabelStyled>
        <TextField
          size="small"
          type="tel"
          id={`${id}-phone-number`}
          fullWidth
        />
      </FormGroup>
    </Form>
  );
}

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

export default function PasswordForm() {
  const id = useId();

  return (
    <Form>
      <FormGroup>
        <LabelStyled htmlFor={`${id}-password`}>Password</LabelStyled>
        <TextField
          type="password"
          id={`${id}-password`}
          size="small"
          fullWidth
        />
      </FormGroup>
      <FormGroup>
        <LabelStyled htmlFor={`${id}-repeat-password`}>
          Repeat password
        </LabelStyled>
        <TextField
          type="password"
          id={`${id}-repeat-password`}
          size="small"
          fullWidth
        />
      </FormGroup>
    </Form>
  );
}

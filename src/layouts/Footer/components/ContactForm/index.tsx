import {
  Button,
  FormGroup,
  FormHelperText,
  InputBase,
  Stack,
  styled,
} from "@mui/material";
import { useContactFormValues } from "./hooks/useContactFormValues";

const TextInput = styled(InputBase)(() => {
  const placeholderStyles = {
    "&::placeholder": {
      opacity: 0.6,
    },
  };

  return {
    padding: "3px 3px 3px 12px",
    fontSize: "16px",
    flexGrow: 1,
    borderBottom: "1px solid rgb(3, 3, 3)",
    color: "rgb(3, 3, 3)",
    input: placeholderStyles,
    textarea: placeholderStyles,
  };
});

const SubmitButton = styled(Button)(({ theme }) => ({
  ...theme.typography.FontAvenirLight3,
  textTransform: "initial",
  fontWeight: 400,
  fontSize: "16px",
  color: "rgb(3, 3, 3)",
}));

const Feedback = styled(FormHelperText)(({ theme }) => ({
  ...theme.typography.FontAvenirLight3,
  fontSize: "12px",
}));

// TODO: complete UI
export default function ContactForm() {
  const { values, errors, handleChange, handleSubmit } = useContactFormValues();

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" gap="22px">
        <FormGroup sx={{ flexGrow: 1, height: "min-content" }}>
          <TextInput
            error={!!errors.name}
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <Feedback error>{errors.name}</Feedback>}
        </FormGroup>
        <FormGroup sx={{ flexGrow: 1, height: "min-content" }}>
          <TextInput
            error={!!errors.email}
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <Feedback error>{errors.email}</Feedback>}
        </FormGroup>
      </Stack>
      <FormGroup>
        <TextInput
          multiline
          rows={5}
          placeholder="Message"
          fullWidth
          sx={{ marginTop: "22px" }}
          name="message"
          value={values.message}
          onChange={handleChange}
        />
        {errors.message && <Feedback error>{errors.message}</Feedback>}
      </FormGroup>
      <SubmitButton type="submit" fullWidth>
        Submit
      </SubmitButton>
    </form>
  );
}

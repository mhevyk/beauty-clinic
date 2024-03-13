import {
  Button,
  FormGroup,
  FormHelperText,
  InputBase,
  Stack,
  styled,
} from "@mui/material";
import { useContactFormValues } from "./hooks/useContactFormValues";
import HumanVerificationModal from "../HumanVerificationModal";
import useToggle from "@hooks/useToggle";
import { PropsWithChildren } from "react";

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
  const { isOpen, open, close } = useToggle();
  const formik = useContactFormValues(open);

  function handleConfirm() {
    // TODO: complete server side logic with form values
    console.log(formik.values);
    formik.resetForm();
    close();
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" gap="22px">
          <FormGroupWithError errorMessage={formik.errors.name}>
            <TextInput
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </FormGroupWithError>
          <FormGroupWithError errorMessage={formik.errors.email}>
            <TextInput
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </FormGroupWithError>
        </Stack>
        <FormGroupWithError errorMessage={formik.errors.message}>
          <TextInput
            multiline
            rows={5}
            placeholder="Message"
            fullWidth
            sx={{ marginTop: "22px" }}
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
          />
        </FormGroupWithError>
        <SubmitButton type="submit" fullWidth>
          Submit
        </SubmitButton>
      </form>
      <HumanVerificationModal
        isOpen={isOpen}
        handleClose={close}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

type FormGroupWithErrorProps = PropsWithChildren & {
  errorMessage?: string;
};

function FormGroupWithError({
  children,
  errorMessage,
}: FormGroupWithErrorProps) {
  return (
    <FormGroup sx={{ flexGrow: 1, height: "min-content" }}>
      {children}
      {!!errorMessage && <Feedback error>{errorMessage}</Feedback>}
    </FormGroup>
  );
}

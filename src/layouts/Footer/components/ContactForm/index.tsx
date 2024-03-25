import {
  Button,
  Fade,
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
import { useDelayedUnmount } from "./hooks/useDelayedUnmount";

const SUCCESS_FEEDBACK_DISPLAY_DURATION = 5000;

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

const Feedback = styled(FormHelperText)(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "12px",
  lineHeight: "2rem",
}));

const SuccessFeedback = styled("p")({
  textAlign: "center",
  color: "#6BD089", // TODO: pick more suitable color
  fontSize: 16,
});

export default function ContactForm() {
  const { isOpen, open, close } = useToggle();
  const formik = useContactFormValues(open);
  const [shouldRenderSuccessFeedback, renderSuccessFeedback] =
    useDelayedUnmount(SUCCESS_FEEDBACK_DISPLAY_DURATION);

  async function handleConfirm(recaptchaToken: string) {
    // TODO: complete server side logic with form values
    renderSuccessFeedback();
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
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
      <Fade in={shouldRenderSuccessFeedback} timeout={400}>
        <SuccessFeedback>Thanks for submitting!</SuccessFeedback>
      </Fade>
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

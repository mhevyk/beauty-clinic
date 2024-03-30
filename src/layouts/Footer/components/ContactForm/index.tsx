import { Button, Fade, InputBase, Stack, styled } from "@mui/material";
import { useContactFormValues } from "./hooks/useContactFormValues";
import HumanVerificationModal from "../HumanVerificationModal";
import useToggle from "@hooks/useToggle";
import { useDelayedUnmount } from "./hooks/useDelayedUnmount";
import {
  useCreateContactFormEntryMutation,
  useVerifyRecaptchaMutation,
} from "@api/hooks";
import FormGroupWithError from "@components/FormGroupWithError";

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

  const [verifyRecaptcha, { loading: isVerifyingRecaptcha }] =
    useVerifyRecaptchaMutation();
  const [createContactFormEntry, { loading: isContactFormEntryCreating }] =
    useCreateContactFormEntryMutation();

  async function handleConfirm(recaptchaToken: string) {
    try {
      const { data } = await verifyRecaptcha({ variables: { recaptchaToken } });

      if (!data?.verifyRecaptcha) {
        throw new Error("Recaptcha is invalid");
      }

      await createContactFormEntry({ variables: { input: formik.values } });
      renderSuccessFeedback();
      formik.resetForm();
      close();
    } catch (error) {
      // TODO: handle error output to user, maybe via toast library
      console.log(error);
    }
  }

  const isFormSubmitting = isVerifyingRecaptcha || isContactFormEntryCreating;

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" gap="22px">
          <FormGroupWithError
            errorMessage={formik.errors.name}
            feedbackStyles={{ lineHeight: "2rem" }}
          >
            <TextInput
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              autoComplete="on"
            />
          </FormGroupWithError>
          <FormGroupWithError
            errorMessage={formik.errors.email}
            feedbackStyles={{ lineHeight: "2rem" }}
          >
            <TextInput
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="on"
            />
          </FormGroupWithError>
        </Stack>
        <FormGroupWithError
          errorMessage={formik.errors.message}
          feedbackStyles={{ lineHeight: "2rem" }}
        >
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
        <Button type="submit" fullWidth disabled={shouldRenderSuccessFeedback}>
          Submit
        </Button>
      </form>
      <Fade in={shouldRenderSuccessFeedback} timeout={400}>
        <SuccessFeedback>Thanks for submitting!</SuccessFeedback>
      </Fade>
      <HumanVerificationModal
        isOpen={isOpen}
        isFormSubmitting={isFormSubmitting}
        handleClose={close}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

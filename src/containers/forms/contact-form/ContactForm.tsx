import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";

import {
  VerifyRecaptchaMutation,
  useCreateContactFormEntryMutation,
  useVerifyRecaptchaMutation,
} from "@/api/generated";
import FormGroupWithError from "@/components/form-group-with-error/FormGroupWithError";
import {
  SuccessFeedback,
  TextInput,
} from "@/containers/forms/contact-form/ContactForm.styled";
import HumanVerificationModal from "@/containers/modals/human-verication-modal/HumanVerificationModal";
import useToggle from "@/hooks/use-toggle/useToggle";
import { useContactFormValues } from "@/layouts/footer/hooks/useContactFormValues";
import { useDelayedUnmount } from "@/layouts/footer/hooks/useDelayedUnmount";
import closeSnackbar from "@/utils/close-snackbar/closeSnackbar";
import extractErrorMessage from "@/utils/extract-error-message/extractErrorMessage";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

const SUCCESS_FEEDBACK_DISPLAY_DURATION = 5000;

function validateRecaptcha(data?: VerifyRecaptchaMutation | null) {
  const isRecaptchaValid = Boolean(data?.verifyRecaptcha);

  if (!isRecaptchaValid) {
    throw new Error("Recaptcha is invalid");
  }
}

export default function ContactForm() {
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useToggle();
  const formik = useContactFormValues(openModal);
  const [shouldRenderSuccessFeedback, renderSuccessFeedback] =
    useDelayedUnmount(SUCCESS_FEEDBACK_DISPLAY_DURATION);

  const [verifyRecaptcha, { loading: isVerifyingRecaptcha }] =
    useVerifyRecaptchaMutation();
  const [createContactFormEntry, { loading: isContactFormEntryCreating }] =
    useCreateContactFormEntryMutation();

  async function handleConfirm(recaptchaToken: string) {
    try {
      const { data } = await verifyRecaptcha({ variables: { recaptchaToken } });

      validateRecaptcha(data);

      await createContactFormEntry({ variables: { input: formik.values } });
      renderSuccessFeedback();
      formik.resetForm();
      closeModal();
    } catch (error) {
      showSnackbar({
        autohide: true,
        autohideDuration: 6000,
        message: extractErrorMessage(error),
      });
    }
  }

  function handleCloseModal() {
    closeSnackbar();
    closeModal();
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
        isOpen={isModalOpen}
        isFormSubmitting={isFormSubmitting}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

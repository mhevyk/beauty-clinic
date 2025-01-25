import { useRef } from "react";

import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { Formik } from "formik";

import OpenLockIconSvg from "@/assets/icons/open-lock.svg";

import { useForgotPasswordMutation } from "@/api/generated";
import AppLink from "@/components/app-link/AppLink";
import ResetPasswordForm from "@/containers/forms/forgot-password-form/ForgotPasswordForm.tsx";
import {
  BoxStyled,
  CircleWrapper,
  CloseIcon,
  CloseIconButton,
  Description,
  DialogContentStyled,
  Digit,
  DividerStyled,
  Information,
  ResetPasswordFormWrapper,
  SubmitButton,
  Title,
} from "@/containers/modals/forgot-password-modal/ForgotPasswordModal.styled";
import useLockPageScroll from "@/hooks/use-lock-page-scroll/useLockPageScroll";
import { RESEND_EMAIL_MIN_SECONDS } from "@/pages/sign-in/constants";
import useCountdown from "@/pages/sign-in/hooks/use-countdown/useCountdown";
import updateResendEmailDuration from "@/pages/sign-in/utils/update-resend-email-duration/updateResendEmailDuration";
import theme from "@/theme/theme.ts";
import extractErrorMessage from "@/utils/extract-error-message/extractErrorMessage";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";
import { emailFormSchema } from "@/validation/emailFormSchema.ts";

type ForgotPasswordModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export type ForgotPasswordFormValues = {
  email: string;
};

const initialFormValues: ForgotPasswordFormValues = {
  email: "",
};

export default function ForgotPasswordModal({
  isOpen,
  handleClose,
}: ForgotPasswordModalProps) {
  const forgotPasswordAttemptsRef = useRef(0);
  const resendEmailDurationRef = useRef(RESEND_EMAIL_MIN_SECONDS); // in seconds

  const {
    isTimerRunning,
    secondsLeft,
    start: startCountdown,
  } = useCountdown({
    seconds: resendEmailDurationRef.current,
  });

  const [
    sendForgotPasswordVerificationEmail,
    { loading: isSendingVerificationEmail },
  ] = useForgotPasswordMutation();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useLockPageScroll(isOpen);

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      await sendForgotPasswordVerificationEmail({
        variables: { email: values.email },
      });

      showSnackbar({
        variant: "success",
        message:
          "Reset password link was successfully sent\nPlease check your email inbox",
        autohide: true,
        autohideDuration: 5000,
      });

      forgotPasswordAttemptsRef.current++;
      resendEmailDurationRef.current = updateResendEmailDuration(
        forgotPasswordAttemptsRef.current,
        resendEmailDurationRef.current
      );

      startCountdown();
    } catch (error) {
      showSnackbar({
        message: extractErrorMessage(error),
        autohide: true,
        autohideDuration: 3000,
      });
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullScreen={isSmallScreen}
      disableScrollLock
      transitionDuration={400}
      PaperProps={{
        sx: {
          borderRadius: 0,
          maxWidth: 580,
          minHeight: 400,
          margin: 0,
        },
      }}
    >
      <CloseIconButton aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </CloseIconButton>
      <DialogContentStyled>
        <BoxStyled>
          <Box>
            <CircleWrapper>
              {isTimerRunning ? (
                <Digit data-testid="digit">{secondsLeft}</Digit>
              ) : (
                <OpenLockIconSvg data-testid="open-lock-icon" />
              )}
            </CircleWrapper>
          </Box>
          <Information>
            <Title variant="heading">Reset your password</Title>
            <br />
            <Description variant="paragraph">
              Please enter your email address. We&apos;ll send you a link to
              reset your password
            </Description>
          </Information>
        </BoxStyled>
        <Formik
          initialValues={initialFormValues}
          onSubmit={onSubmit}
          validationSchema={emailFormSchema}
        >
          {({ handleSubmit }) => (
            <>
              <ResetPasswordFormWrapper>
                <ResetPasswordForm />
              </ResetPasswordFormWrapper>
              <SubmitButton
                variant="primary"
                size="small"
                fullWidth
                onClick={handleSubmit as () => void}
                disabled={isTimerRunning}
                loading={isSendingVerificationEmail}
              >
                {isTimerRunning
                  ? "Please wait before sending email again"
                  : "Send letter"}
              </SubmitButton>
            </>
          )}
        </Formik>
        <DividerStyled aria-hidden="true">or</DividerStyled>
        <AppLink variant="accent" to="/auth/signup">
          Don&apos;t have an account?
        </AppLink>
      </DialogContentStyled>
    </Dialog>
  );
}

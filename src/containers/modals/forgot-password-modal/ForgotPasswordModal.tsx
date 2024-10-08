import { useRef } from "react";

import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";

import CloseIconSvg from "@/assets/icons/close-icon-thin.svg";
import OpenLockIconSvg from "@/assets/icons/open-lock.svg";

import { useForgotPasswordMutation } from "@/api/generated";
import AppLink from "@/components/app-link/AppLink";
import ButtonWithSpinner from "@/components/button-with-spinner/ButtonWithSpinner";
import ResetPasswordForm from "@/containers/forms/forgot-password-form/ForgotPasswordForm.tsx";
import useLockPageScroll from "@/hooks/use-lock-page-scroll/useLockPageScroll";
import { RESEND_EMAIL_MIN_SECONDS } from "@/pages/sign-in/constants";
import useCountdown from "@/pages/sign-in/hooks/use-countdown/useCountdown";
import updateResendEmailDuration from "@/pages/sign-in/utils/update-resend-email-duration/updateResendEmailDuration";
import theme from "@/theme/theme.ts";
import extractErrorMessage from "@/utils/extract-error-message/extractErrorMessage";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";
import { emailFormSchema } from "@/validation/emailFormSchema.ts";

const CircleWrapper = styled(Box)(({ theme }) => ({
  width: "115px",
  height: "115px",
  border: `6px solid ${theme.palette.secondary.main}`,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "25px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
  },
}));

const Information = styled(Box)({
  maxWidth: "244px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginLeft: "21px",
});

const Digit = styled(Typography)({
  fontSize: "55px",
  fontWeight: "bold",
});

const DialogContentStyled = styled(DialogContent)({
  padding: "62px 32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Title = styled(Typography)({
  letterSpacing: "1px",
  fontSize: "19px",
  fontWeight: "bold",
  textAlign: "center",
});

const Description = styled(Typography)({
  fontSize: "11px",
  letterSpacing: "1.28px",
  lineHeight: "26px",
  textAlign: "center",
});

const SubmitButton = styled(ButtonWithSpinner)(({ theme }) => ({
  "&.Mui-disabled": {
    color: theme.palette.primary.main,
    opacity: 0.5,
  },
}));

const CloseIconButton = styled(IconButton)({
  position: "absolute",
  right: 16,
  top: 16,
});

const CloseIcon = styled(CloseIconSvg)(({ theme }) => ({
  width: 30,
  aspectRatio: "1 / 1",
  [theme.breakpoints.up("md")]: {
    width: 20,
  },
}));

const DividerStyled = styled(Divider)({
  "&::before, &::after": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  margin: "25px auto",
  width: "100%",
  maxWidth: "198px",
});

const ResetPasswordFormWrapper = styled(Box)({
  width: "100%",
  marginBottom: "25px",
});

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

  async function handleSubmit(values: ForgotPasswordFormValues) {
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
          onSubmit={handleSubmit}
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

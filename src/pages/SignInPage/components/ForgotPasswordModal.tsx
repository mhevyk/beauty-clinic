import useLockPageScroll from "@hooks/useLockPageScroll";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import OpenLockIconSvg from "@icons/open-lock.svg?react";
import useCountdown from "../hooks/useCountdown";
import { Formik } from "formik";
import ResetPasswordForm from "./ForgotPasswordForm";
import { useState } from "react";
import { emailFormSchema } from "@validation/emailFormSchema";
import ButtonWithSpinner from "@components/ButtonWithSpinner";
import { useForgotPasswordMutation } from "@api/hooks";
import showSnackbar from "@utils/showSnackbar";
import extractErrorMessage from "@utils/extractErrorMessage";
import CloseIconSvg from "@icons/close-icon-thin.svg?react";

const EMAIL_RESEND_AFTER_SECONDS = 60;

const CircleWrapper = styled(Box)(({ theme }) => ({
  width: "115px",
  height: "115px",
  border: `6px solid ${theme.palette.secondary.main}`,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Digit = styled(Typography)({
  fontSize: "55px",
  fontWeight: "bold",
});

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "51.2px 0",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
  [theme.breakpoints.up("md")]: {
    margin: "51.2px 60px",
  },
}));

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

// TODO: complete UI
export default function ForgotPasswordModal({
  isOpen,
  handleClose,
}: ForgotPasswordModalProps) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { secondsLeft, start: startCountdown } = useCountdown({
    seconds: EMAIL_RESEND_AFTER_SECONDS,
    onCountdownStarted: () => setIsTimerRunning(true),
    onCountdownFinished: () => setIsTimerRunning(false),
  });

  const [
    sendForgotPasswordVerificationEmail,
    { loading: isSendingVerificationEmail },
  ] = useForgotPasswordMutation();

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
        <CircleWrapper>
          {isTimerRunning ? <Digit>{secondsLeft}</Digit> : <OpenLockIconSvg />}
        </CircleWrapper>
        <Typography>Reset your password</Typography>
        <Typography>
          Please enter your email address. We’ll send you a link to reset your
          password
        </Typography>
        <Formik
          initialValues={initialFormValues}
          onSubmit={handleSubmit}
          validationSchema={emailFormSchema}
        >
          {({ handleSubmit }) => (
            <>
              <ResetPasswordForm />
              <SubmitButton
                variant="primary"
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
      </DialogContentStyled>
    </Dialog>
  );
}

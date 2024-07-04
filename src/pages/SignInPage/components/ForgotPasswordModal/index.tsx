import useLockPageScroll from "@/hooks/useLockPageScroll.ts";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import OpenLockIconSvg from "@/assets/icons/open-lock.svg";
import useCountdown from "../../hooks/useCountdown.ts";
import { Formik } from "formik";
import ResetPasswordForm from "../ForgotPasswordForm.tsx";
import { useRef, useState } from "react";
import { emailFormSchema } from "@/validation/emailFormSchema.ts";
import ButtonWithSpinner from "@/components/ButtonWithSpinner.tsx";
import { useForgotPasswordMutation } from "@api/hooks";
import showSnackbar from "@/utils/showSnackbar.ts";
import extractErrorMessage from "@/utils/extractErrorMessage.ts";
import CloseIconSvg from "@/assets/icons/close-icon-thin.svg";
import AppLink from "@/components/AppLink.tsx";
import theme from "@/theme/theme.ts";
import { RESEND_EMAIL_MIN_SECONDS } from "./constants";
import updateResendEmailDuration from "./utils/updateResendEmailDuration.ts";

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

export default function Index({
  isOpen,
  handleClose,
}: ForgotPasswordModalProps) {
  const forgotPasswordAttemptsRef = useRef(0);
  const resendEmailDurationRef = useRef(RESEND_EMAIL_MIN_SECONDS); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const { secondsLeft, start: startCountdown } = useCountdown({
    seconds: resendEmailDurationRef.current,
    onCountdownStarted: () => setIsTimerRunning(true),
    onCountdownFinished: () => setIsTimerRunning(false),
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
        resendEmailDurationRef.current,
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
                <Digit>{secondsLeft}</Digit>
              ) : (
                <OpenLockIconSvg />
              )}
            </CircleWrapper>
          </Box>
          <Information>
            <Title variant="heading">Reset your password</Title>
            <br />
            <Description variant="paragraph">
              Please enter your email address. We'll send you a link to reset
              your password
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
              <Box sx={{ width: "100%", marginBottom: "25px" }}>
                <ResetPasswordForm />
              </Box>
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
          Don't have an account?
        </AppLink>
      </DialogContentStyled>
    </Dialog>
  );
}

import { IconButton, useMediaQuery, styled, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import closeIcon from "@icons/close-icon-thin.svg";
import theme from "@theme/theme";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect } from "react";
import useRecaptcha from "./hooks/useRecaptcha";
import useLockPageScroll from "@hooks/useLockPageScroll";

const DialogContentTitle = styled("h2")(({ theme }) => ({
  ...theme.typography.heading,
  fontWeight: "bold",
  fontSize: "35px",
  margin: 0,
}));

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

const DialogContentTextStyled = styled(DialogContentText)(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "17px",
  color: theme.palette.text.primary,
  margin: "18px 0 28px 0",
  lineHeight: 1.4,
  textAlign: "center",
}));

const CloseIconButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
});

const CloseIcon = styled("img")(({ theme }) => ({
  width: 30,
  aspectRatio: "1 / 1",
  [theme.breakpoints.up("md")]: {
    width: 20,
  },
}));

const ReCAPTCHABox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(350)]: {
    transform: "scale(0.7)",
  },
}));

type HumanVerificationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: (captchaKey: string) => void;
};

export default function HumanVerificationModal({
  isOpen,
  handleClose,
  handleConfirm,
}: HumanVerificationModalProps) {
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(304));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [recaptchaRef, getRecaptchaKey] = useRecaptcha();

  useLockPageScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      recaptchaRef.current?.reset();
    }
  }, [isOpen]);

  function confirmContactForm() {
    const captchaKey = getRecaptchaKey();
    if (!captchaKey) {
      return;
    }

    setTimeout(() => handleConfirm(captchaKey), 600);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={!isSmallScreen}
      fullScreen={isSmallScreen}
      disableScrollLock
      keepMounted // using it to disable leaving a lot of emply divs on component remount
      transitionDuration={400}
      PaperProps={{
        sx: {
          borderRadius: 0,
          maxWidth: 580,
          margin: 0,
        },
      }}
    >
      <CloseIconButton aria-label="close" onClick={handleClose}>
        <CloseIcon src={closeIcon} alt="Close icon" />
      </CloseIconButton>
      <DialogContentStyled>
        <DialogContentTitle>Verification</DialogContentTitle>
        <DialogContentTextStyled>
          Please confirm you're human.
        </DialogContentTextStyled>
        <ReCAPTCHABox>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_APP_RECAPTCHA_KEY}
            ref={recaptchaRef}
            onChange={confirmContactForm}
            size={isVerySmallScreen ? "compact" : "normal"}
          />
        </ReCAPTCHABox>
      </DialogContentStyled>
    </Dialog>
  );
}

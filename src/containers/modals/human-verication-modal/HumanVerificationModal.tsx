import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  CloseIcon,
  CloseIconButton,
  DialogContentStyled,
  DialogContentTitle,
} from "@/containers/modals/human-verication-modal/HumanVerificationModal.styled";
import useLockPageScroll from "@/hooks/use-lock-page-scroll/useLockPageScroll";
import RecaptchaVerification from "@/layouts/footer/components/RecaptchaVerification/RecaptchaVerification";
import theme from "@/theme/theme";

export type HumanVerificationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: (recaptchaToken: string) => void;
  isFormSubmitting: boolean;
};

export default function HumanVerificationModal({
  isOpen,
  handleClose,
  handleConfirm,
  isFormSubmitting,
}: HumanVerificationModalProps) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useLockPageScroll(isOpen);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={!isSmallScreen}
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
        <DialogContentTitle>Verification</DialogContentTitle>
        {isFormSubmitting ? (
          <CircularProgress color="secondary" />
        ) : (
          <RecaptchaVerification handleConfirm={handleConfirm} />
        )}
      </DialogContentStyled>
    </Dialog>
  );
}

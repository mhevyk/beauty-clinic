import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import useMediaQuery from "@mui/material/useMediaQuery";

import CloseIconSvg from "@/assets/icons/close-icon-thin.svg";

import useLockPageScroll from "@/hooks/useLockPageScroll";
import RecaptchaVerification from "@/layouts/footer/components/RecaptchaVerification";
import theme from "@/theme/theme";

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

const DialogContentTitle = styled("h2")(({ theme }) => ({
  ...theme.typography.heading,
  fontWeight: "bold",
  fontSize: "35px",
  margin: "0 0 18px 0",
}));

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

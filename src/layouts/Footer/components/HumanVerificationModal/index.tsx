import {
  IconButton,
  useMediaQuery,
  styled,
  CircularProgress,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIconSvg from "@icons/close-icon-thin.svg?react";
import theme from "@theme/theme";
import useLockPageScroll from "@hooks/useLockPageScroll";
import { RecaptchaVerification } from "./components/RecaptchaVerification";

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
        {isFormSubmitting ? (
          <CircularProgress sx={{ color: "black" }} />
        ) : (
          <RecaptchaVerification handleConfirm={handleConfirm} />
        )}
      </DialogContentStyled>
    </Dialog>
  );
}

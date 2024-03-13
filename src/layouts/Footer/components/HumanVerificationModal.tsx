import { IconButton, useMediaQuery, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import closeIcon from "@icons/close-icon-thin.svg";
import theme from "@theme/theme";
import { useLockPageScroll } from "@layouts/Navbar/hooks/useLockPageScroll";

type HumanVerificationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

// TODO: fix styles
const DialogContentTitle = styled("h2")(({ theme }) => ({
  ...theme.typography.FontArialBlack1,
  fontSize: "35px",
  margin: 0,
}));

const DialogContentStyled = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "60px 60px",
});

const DialogContentTextStyled = styled(DialogContentText)(({ theme }) => ({
  ...theme.typography.FontAvenirLight3,
  fontSize: "17px",
  color: theme.palette.text.primary,
  margin: "20px 0 30px 0",
}));

const CloseIconButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
});

const CloseIcon = styled("img")({
  width: 20,
  height: 20,
});

export default function HumanVerificationModal({
  isOpen,
  handleClose,
  handleConfirm,
}: HumanVerificationModalProps) {
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  useLockPageScroll(isOpen);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={!matches}
      maxWidth="sm"
      fullScreen={matches}
      disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: 0,
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
        <Button type="submit" variant="contained" onClick={handleConfirm}>
          Verify
        </Button>
      </DialogContentStyled>
    </Dialog>
  );
}

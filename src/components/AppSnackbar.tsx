import Snackbar, {
  SnackbarCloseReason,
  SnackbarProps,
} from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
import { SyntheticEvent } from "react";

type AppSnackbarProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string | null;
  variant: AlertProps["severity"];
} & SnackbarProps;
export default function AppSnackbar({
  isOpen,
  onClose,
  message,
  variant: severity,
  ...props
}: AppSnackbarProps) {
  const handleClose = (
    _: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      {...props}
      open={isOpen}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

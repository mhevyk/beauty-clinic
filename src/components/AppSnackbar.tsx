import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SyntheticEvent } from "react";
import { useSnackbarStore } from "@store/snackbar/snackbarStore";

export default function AppSnackbar() {
  const isOpen = useSnackbarStore((store) => store.isOpen);
  const { message, variant } = useSnackbarStore((store) => store.config);
  const closeSnackbar = useSnackbarStore((store) => store.closeSnackbar);

  const handleClose = (
    _: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    closeSnackbar();
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={isOpen}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={variant}
        variant="filled"
        sx={{ whiteSpace: "break-spaces" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

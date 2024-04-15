import { useSnackbarStore } from "@store/snackbar/snackbarStore";

export default function closeSnackbar() {
  useSnackbarStore.getState().closeSnackbar();
}

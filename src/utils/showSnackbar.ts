import {
  SnackbarConfig,
  useSnackbarStore,
} from "@store/snackbar/snackbarStore";

export default function showSnackbar(config: SnackbarConfig) {
  useSnackbarStore.getState().showSnackbar(config);
}

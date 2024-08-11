import { AlertProps } from "@mui/material";
import { create } from "zustand";

import { Timer } from "@/types/helpers";

type SnackbarVariant = AlertProps["severity"];

const DEFAULT_AUTOHIDE_DURATION_MS = 2000;
const DEFAULT_VARIANT: SnackbarVariant = "error";

export type SnackbarConfig = {
  message: string;
  variant?: SnackbarVariant;
} & (
  | { autohide?: false }
  | {
      autohide: true;
      autohideDuration?: number;
    }
);

type SnackbarStore = {
  isOpen: boolean;
  config: Pick<SnackbarConfig, "message" | "variant">;
  showSnackbar: (config: SnackbarConfig) => void;
  closeSnackbar: () => void;
};

let timeoutId: Timer | undefined = undefined;

export const useSnackbarStore = create<SnackbarStore>((set, get) => ({
  isOpen: false,
  config: {
    message: "",
    variant: "error",
  },
  showSnackbar: config => {
    set({
      isOpen: true,
      config: {
        message: config.message,
        variant: config.variant ?? DEFAULT_VARIANT,
      },
    });

    clearTimeout(timeoutId);

    if (config.autohide) {
      timeoutId = setTimeout(
        get().closeSnackbar,
        config.autohideDuration ?? DEFAULT_AUTOHIDE_DURATION_MS
      );
    }
  },
  closeSnackbar: () => {
    clearTimeout(timeoutId);
    set({ isOpen: false });
  },
}));

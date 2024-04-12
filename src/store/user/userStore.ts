import { PERSISTED_STORAGE_KEYS } from "@constants/index";
import createPersistedStore from "@store/utils/createPersistedStore";

type UserStore = {
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

export const useUserStore = createPersistedStore<UserStore>(
  PERSISTED_STORAGE_KEYS.auth,
  (set) => ({
    isAuthenticated: false,
    accessToken: null,
    setAccessToken: (accessToken) => {
      set({ accessToken, isAuthenticated: accessToken !== null });
    },
  })
);

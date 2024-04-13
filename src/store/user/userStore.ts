import { LogoutDocument } from "@api/hooks";
import { client } from "@config/apollo";
import { PERSISTED_STORAGE_KEYS } from "@constants/index";
import createPersistedStore from "@store/utils/createPersistedStore";

export type AccessToken = string | null;

type UserStore = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  accessToken: AccessToken;
  setAccessToken: (accessToken: AccessToken) => void;
  logout: () => Promise<void>;
};

export const useUserStore = createPersistedStore<UserStore>(
  (set) => ({
    isAuthenticated: false,
    isAuthenticating: false,
    accessToken: null,
    setAccessToken: (accessToken) => {
      set({ accessToken, isAuthenticated: accessToken !== null });
    },
    setIsAuthenticating: (isAuthenticating) => set({ isAuthenticating }),
    logout: async () => {
      await client.mutate({ mutation: LogoutDocument });
      set({ accessToken: null, isAuthenticated: false });
    },
  }),
  {
    name: PERSISTED_STORAGE_KEYS.auth,
    fieldsToPersist: { accessToken: true },
  }
);

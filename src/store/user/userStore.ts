import { LogoutDocument } from "@api/hooks";
import { client } from "@config/apollo";
import { create } from "zustand";

export type AccessToken = string | null;

type UserStore = {
  checkAuthenticated: () => boolean;
  isAuthenticating: boolean;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  accessToken: AccessToken;
  setAccessToken: (accessToken: AccessToken) => void;
  logout: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  checkAuthenticated: () => {
    return get().accessToken !== null;
  },
  isAuthenticating: false,
  accessToken: null,
  setAccessToken: (accessToken) => {
    set({ accessToken });
  },
  setIsAuthenticating: (isAuthenticating) => set({ isAuthenticating }),
  logout: async () => {
    await client.mutate({ mutation: LogoutDocument });
    set({ accessToken: null });
  },
}));

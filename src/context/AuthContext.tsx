import { User, useGetCurrentUserLazyQuery } from "@api/hooks";
import { AUTH_TOKEN_KEY } from "@constants/index";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authenticate: (token: string) => void;
  user: User | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [getMe, { loading }] = useGetCurrentUserLazyQuery();
  const [user, setUser] = useState<User | null>(null);

  async function fetchCurrentUser() {
    try {
      const { data } = await getMe();
      setUser(data?.me ?? null);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  function authenticate(token: string) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    fetchCurrentUser();
  }

  function logout() {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: localStorage.getItem(AUTH_TOKEN_KEY) !== null,
        isAuthenticating: loading,
        authenticate,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useUser should be used within AuthProvider!");
  }

  return context;
};

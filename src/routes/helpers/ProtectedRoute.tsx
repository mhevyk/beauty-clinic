import { useUserStore } from "@store/user/userStore";
import { Navigate, Outlet } from "react-router-dom";

type ProtectionMode = "auth" | "no-auth";

type ProtectedRouteProps = {
  redirectPath?: string;
  protectionMode?: ProtectionMode;
};

export default function ProtectedRoute({
  redirectPath = "/auth/signin",
  protectionMode = "auth",
}: ProtectedRouteProps) {
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());

  if (protectionMode === "auth" && !isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  if (protectionMode === "no-auth" && isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

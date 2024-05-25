import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "@store/user/userStore";

type ProtectionMode = "auth" | "no-auth";

type ProtectedRouteProps = {
  redirectPath?: string;
  protectionMode?: ProtectionMode;
};

export default function ProtectedRoute({
  redirectPath = "/auth/signin",
  protectionMode = "auth",
}: ProtectedRouteProps) {
  const isAuthenticated = useUserStore((store) => store.checkAuthenticated());
  const { state } = useLocation();

  if (protectionMode === "auth" && !isAuthenticated) {
    return <Navigate to={state?.from ?? redirectPath} />;
  }

  if (protectionMode === "no-auth" && isAuthenticated) {
    return <Navigate to={state?.from ?? redirectPath} />;
  }

  return <Outlet />;
}

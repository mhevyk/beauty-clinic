import { Box, CircularProgress, styled } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@context/AuthContext";

// TODO: change ui
const SpinnerWrapper = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

type ProtectionMode = "auth" | "no-auth";

type ProtectedRouteProps = {
  redirectPath?: string;
  protectionMode?: ProtectionMode;
};

export default function ProtectedRoute({
  redirectPath = "/auth/signin",
  protectionMode = "auth",
}: ProtectedRouteProps) {
  const { isAuthenticated, isAuthenticating } = useUser();

  if (isAuthenticating) {
    return (
      <SpinnerWrapper>
        <CircularProgress color="secondary" size={50} />
      </SpinnerWrapper>
    );
  }

  if (protectionMode === "auth" && !isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  if (protectionMode === "no-auth" && isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}

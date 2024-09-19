import { Navigate } from "react-router-dom";

import { AppLoader } from "@/components/app-suspense-with-outlet/AppSuspenseWithOutlet";
import { routePaths } from "@/constants/routePaths";
import useCurrentUser from "@/hooks/use-current-user/useCurrentUser";
import { useUserStore } from "@/store/user/userStore";
import { NonEmptyArray, UserRole } from "@/types/helpers";

type ProtectedRouteProps = {
  element: JSX.Element;
  allowedRoles: NonEmptyArray<UserRole>;
  unauthorizedRedirectPath?: string;
  forbiddenRedirectPath?: string;
};

const ProtectedRoute = ({
  element,
  allowedRoles,
  unauthorizedRedirectPath = routePaths.home.path,
  forbiddenRedirectPath = routePaths.home.path,
}: ProtectedRouteProps) => {
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());
  const isAuthenticating = useUserStore(store => store.isAuthenticating);
  const userDetails = useCurrentUser();

  if (isAuthenticating) {
    return <AppLoader />;
  }

  if (!isAuthenticated || !userDetails) {
    return <Navigate to={unauthorizedRedirectPath} />;
  }

  const hasAccessToResource = allowedRoles.includes(userDetails.role);

  if (!hasAccessToResource) {
    return <Navigate to={forbiddenRedirectPath} />;
  }

  return element;
};

export default ProtectedRoute;

import { screen } from "@testing-library/react";
import { Navigate } from "react-router-dom";

import mockZustandStore from "@tests/unit/utils/mockZustandStore";
import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import { USER_ROLES } from "@/constants";
import useCurrentUser from "@/hooks/use-current-user/useCurrentUser";
import ProtectedRoute from "@/routes/protected-route/ProtectedRoute";
import { useUserStore } from "@/store/user/userStore";
import { UserRole } from "@/types/helpers";

jest.mock("@/store/user/userStore", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("@/hooks/use-current-user/useCurrentUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(() => null),
}));

type RenderComponent = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole;
  forbiddenRedirectPath: string;
  unauthorizedRedirectPath: string;
};

const renderComponent = ({
  isAuthenticated = false,
  isLoading = false,
  role,
  forbiddenRedirectPath,
  unauthorizedRedirectPath,
}: Partial<RenderComponent> = {}) => {
  mockZustandStore(useUserStore, {
    isAuthenticating: isLoading,
    checkAuthenticated: () => isAuthenticated,
  });

  (useCurrentUser as jest.Mock).mockReturnValue(
    role && {
      role,
    }
  );

  return renderWithProviders(
    <ProtectedRoute
      element={<div>Protected Content</div>}
      allowedRoles={[USER_ROLES.ADMIN]}
      forbiddenRedirectPath={forbiddenRedirectPath}
      unauthorizedRedirectPath={unauthorizedRedirectPath}
    />
  );
};

describe("<ProtectedRoute />", () => {
  it("should show loading fallback initially", () => {
    renderComponent({ isLoading: true });

    const loadingComponent = screen.getByTestId("app-loader");
    expect(loadingComponent).toBeInTheDocument();
  });

  it("should redirect to unauthorized path if user is not authenticated", () => {
    renderComponent();

    expect(Navigate).toHaveBeenCalled();
  });

  it("should redirect to unauthorized path if userDetails is null", () => {
    renderComponent({
      isAuthenticated: true,
      unauthorizedRedirectPath: "/401",
    });

    expect(Navigate).toHaveBeenCalledWith({ to: "/401" }, {});
  });

  it("should redirect to forbidden path if user does not have the required role", () => {
    renderComponent({
      isAuthenticated: true,
      role: USER_ROLES.USER,
      forbiddenRedirectPath: "/403",
    });

    expect(Navigate).toHaveBeenCalledWith({ to: "/403" }, {});
  });

  it("should render protected element if user is authenticated and has required role", () => {
    renderComponent({
      isAuthenticated: true,
      role: USER_ROLES.ADMIN,
    });

    const protectedContent = screen.getByText("Protected Content");
    expect(protectedContent).toBeInTheDocument();
  });
});

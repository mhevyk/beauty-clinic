import { screen } from "@testing-library/react";

import mockZustandStore from "@tests/unit/utils/mockZustandStore.ts";
import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import UserToolbar from "@/containers/user-toolbar/UserToolbar.tsx";
import { useUserStore } from "@/store/user/userStore.ts";

jest.mock("@/containers/user-toolbar/components/MyAccountButton.tsx", () => ({
  __esModule: true,
  default: () => <div>MyAccountButton</div>,
}));
jest.mock("@/store/user/userStore", () => ({
  useUserStore: jest.fn(),
}));

const renderAndMock = ({
  isAuthenticated = false,
  isAuthenticating = false,
}) => {
  mockZustandStore(useUserStore, {
    checkAuthenticated: () => isAuthenticated,
    isAuthenticating,
  });

  renderWithProviders(<UserToolbar />);
};

describe("<UserToolbar />", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  });

  it("should render CircularProgress when isAuthenticating is true", () => {
    renderAndMock({ isAuthenticating: true, isAuthenticated: false });

    const circularProgress = screen.getByTestId("circular-progress");
    expect(circularProgress).toBeInTheDocument();
  });

  it("should render MyAccountButton and BellIconSvg when user is authenticated", () => {
    renderAndMock({ isAuthenticated: true });

    const myAccountButton = screen.getByRole("button");
    expect(myAccountButton).toBeInTheDocument();

    const bellIcon = screen.getByTestId("bell-icon-svg");
    expect(bellIcon).toBeInTheDocument();
  });

  it("should render LoginLink when user is not authenticated", () => {
    renderAndMock({ isAuthenticated: false });

    const logInButton = screen.getByRole("link", { name: /Log In/i });
    expect(logInButton).toBeInTheDocument();
    expect(logInButton).toHaveAttribute("href", "/auth/signin");
  });
});

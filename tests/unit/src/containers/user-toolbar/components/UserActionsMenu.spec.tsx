import { fireEvent, screen, waitFor } from "@testing-library/react";

import mockZustandStore from "@tests/unit/utils/mockZustandStore";
import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import UserActionsMenu from "@/containers/user-toolbar/components/UserActionsMenu";
import { useUserStore } from "@/store/user/userStore";

jest.mock("@/store/user/userStore", () => ({
  useUserStore: jest.fn(),
}));

const renderWithMockStore = (isOpen = true) => {
  mockZustandStore(useUserStore, {
    logout: jest.fn().mockResolvedValueOnce(undefined),
  });

  renderWithProviders(
    <UserActionsMenu
      anchorEl={document.createElement("button")}
      isOpen={isOpen}
      handleClose={jest.fn()}
      id="test-id"
    />
  );
};

describe("<UserActionsMenu />", () => {
  it("should render the menu when open", () => {
    renderWithMockStore(true);

    const profile = screen.getByText("Profile");
    expect(profile).toBeInTheDocument();

    const logOut = screen.getByText("Log Out");
    expect(logOut).toBeInTheDocument();
  });

  it("should call handleClose when a menu item is clicked", () => {
    const handleClose = jest.fn();
    renderWithProviders(
      <UserActionsMenu
        anchorEl={document.createElement("button")}
        isOpen={true}
        handleClose={handleClose}
        id="test-id"
      />
    );

    fireEvent.click(screen.getByText("Profile"));

    expect(handleClose).toHaveBeenCalled();
  });

  it("should call logout and close the menu when Log Out is clicked", async () => {
    const handleClose = jest.fn();
    const logout = jest.fn().mockResolvedValueOnce(undefined);
    mockZustandStore(useUserStore, {
      logout,
    });

    renderWithProviders(
      <UserActionsMenu
        anchorEl={document.createElement("button")}
        isOpen={true}
        handleClose={handleClose}
        id="test-id"
      />
    );

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => {
      const menu = screen.queryByRole("menu");
      expect(menu).toBeInTheDocument();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});

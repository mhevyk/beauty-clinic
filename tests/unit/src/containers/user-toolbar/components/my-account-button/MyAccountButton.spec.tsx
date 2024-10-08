import { fireEvent, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import MyAccountButton from "@/containers/user-toolbar/components/MyAccountButton.tsx";

jest.mock("@/hooks/use-lock-page-scroll/useLockPageScroll");

jest.mock(
  "@/containers/user-toolbar/components/UserActionsMenuToggler.tsx",
  () => ({
    __esModule: true,
    default: props => (
      <button onClick={props.onClick} data-testid="my-account-button">
        Toggle Menu
      </button>
    ),
  })
);

jest.mock("@/containers/user-toolbar/components/UserActionsMenu.tsx", () => ({
  __esModule: true,
  default: props => (
    <div
      data-testid="user-actions-menu"
      {...(props.isOpen ? { open: true } : {})}
    >
      <button onClick={props.handleClose}>Close Menu</button>
      Menu
    </div>
  ),
}));

describe("<MyAccountButton />", () => {
  it("should render the UserActionsMenuToggler and not show the menu initially", () => {
    renderWithProviders(<MyAccountButton />);

    expect(screen.getByTestId("my-account-button")).toBeInTheDocument();
    expect(screen.queryByTestId("user-actions-menu")).not.toHaveAttribute(
      "open"
    );
  });

  it("should open the menu when the toggler is clicked", () => {
    renderWithProviders(<MyAccountButton />);

    fireEvent.click(screen.getByTestId("my-account-button"));

    expect(screen.getByTestId("user-actions-menu")).toHaveAttribute("open");
  });

  it("should close the menu when the Close Menu button is clicked", () => {
    renderWithProviders(<MyAccountButton />);

    fireEvent.click(screen.getByTestId("my-account-button"));

    expect(screen.getByTestId("user-actions-menu")).toHaveAttribute("open");

    fireEvent.click(screen.getByText("Close Menu"));

    expect(screen.queryByTestId("user-actions-menu")).not.toHaveAttribute(
      "open"
    );
  });

  it("should set anchorEl to null when the menu is closed", () => {
    renderWithProviders(<MyAccountButton />);

    fireEvent.click(screen.getByTestId("my-account-button"));

    expect(screen.getByTestId("user-actions-menu")).toHaveAttribute("open");

    fireEvent.click(screen.getByText("Close Menu"));

    expect(screen.queryByTestId("user-actions-menu")).not.toHaveAttribute(
      "open"
    );
  });
});

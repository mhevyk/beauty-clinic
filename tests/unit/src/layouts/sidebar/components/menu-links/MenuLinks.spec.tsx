import { fireEvent, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import MenuLinks from "@/layouts/sidebar/components/MenuLinks/MenuLinks.tsx";
import { menuItems } from "@/layouts/sidebar/data/menuItems";

jest.mock("@/layouts/sidebar/data/menuItems", () => ({
  menuItems: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
}));

describe("<MenuLinks />", () => {
  const onCloseMock = jest.fn();

  const renderMenuLinks = () =>
    renderWithProviders(<MenuLinks onClose={onCloseMock} />);

  it("should renders all menu items correctly", () => {
    renderMenuLinks();

    menuItems.forEach(item => {
      const menuItem = screen.getByText(item.label);
      expect(menuItem).toBeInTheDocument();
    });
  });

  it("should calls onClose when a menu link is clicked", () => {
    renderMenuLinks();

    menuItems.forEach(item => {
      const menuItem = screen.getByText(item.label);
      fireEvent.click(menuItem);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(menuItems.length);
  });

  it("should applies active class to the active link", () => {
    renderMenuLinks();

    const activeLink = screen.getByText(menuItems[0]!.label);
    fireEvent.click(activeLink);

    expect(activeLink).toHaveClass("active");
  });
});

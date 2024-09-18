import { screen } from "@testing-library/react";

import Footer from "@/layouts/footer/Footer";
import renderWithProviders from "@tests/unit/utils/renderWithProviders";

jest.mock("@/layouts/footer/components/LocationMap", () => ({
  __esModule: true,
  default: () => <div data-testid="map" />,
}));

describe("<Footer />", () => {
  it("should initially render footer", () => {
    renderWithProviders(<Footer />);

    const map = screen.getByTestId("map");

    expect(map).toBeInTheDocument();
  });
});

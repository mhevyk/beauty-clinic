import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";

import ContactDetails from "@/layouts/footer/components/ContactDetails";

jest.mock("@/containers/forms/contact-form/ContactForm", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-form">Contact form</div>,
}));

describe("<ContactDetails />", () => {
  it("should render correctly", () => {
    renderWithProviders(<ContactDetails />);

    const contactForm = screen.getByTestId("contact-form");
    expect(contactForm).toBeInTheDocument();
  });
});

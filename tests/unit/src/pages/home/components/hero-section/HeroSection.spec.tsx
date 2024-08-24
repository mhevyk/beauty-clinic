import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import HeroSection from "@/pages/home/components/hero-section/HeroSection.tsx";

describe("<HeroSection />", () => {
  beforeEach(() => {
    renderWithProviders(<HeroSection />);
  });

  it("should render the title", () => {
    const header = screen.getByText(/Lily Organic/i);
    expect(header).toBeInTheDocument();
  });

  it("should render the description", () => {
    const description = screen.getByText(/Hand Crafted Natural Treatments/i);
    expect(description).toBeInTheDocument();
  });

  it("should render the 'Book an Appointment' button with correct link", () => {
    const link = screen.getByRole("link", {
      name: "Book an Appointment",
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/treatments");
  });
});

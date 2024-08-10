import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import EmployeeShowcaseSection from "@/pages/HomePage/components/EmployeeShowcaseSection.tsx";
import HeroSection from "@/pages/HomePage/components/HeroSection.tsx";

describe("<HomePage />", () => {
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

  describe("<EmployeeShowcaseSection />", () => {
    beforeEach(() => {
      renderWithProviders(<EmployeeShowcaseSection />);
    });

    it("should render the employee description", () => {
      const employeeDescription = screen.getByText(/Meet lily/i);
      expect(employeeDescription).toBeInTheDocument();
    });

    it("should render the title", () => {
      const employeeTitle = screen.getByText(/Hi, I'm Lily/i);
      expect(employeeTitle).toBeInTheDocument();
    });

    it("should render the employeeSummary", () => {
      const employeeSummary = screen.getByTestId("description");
      expect(employeeSummary).toBeInTheDocument();
    });
  });
});

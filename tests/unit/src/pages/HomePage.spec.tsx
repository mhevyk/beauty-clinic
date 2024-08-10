import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import EmployeeShowcaseSection from "@/pages/HomePage/components/EmployeeShowcaseSection.tsx";
import HeroSection from "@/pages/HomePage/components/HeroSection.tsx";

jest.mock("@/pages/HomePage/components/HeroImage.tsx", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// jest.mock("@/", () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

jest.mock("@mui/material/Grid", () => {
  const MockGrid = ({ children }) => <div>{children}</div>;
  MockGrid.displayName = "Grid";
  return MockGrid;
});

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
      const employeeSummary = screen.getByText(
        "I'm a paragraph. Click here to add your own text and edit me. It’s\n" +
          "            easy. Just click “Edit Text” or double click me to add your own\n" +
          "            content and make changes to the font. Feel free to drag and drop me\n" +
          "            anywhere you like on your page. I’m a great place for you to tell a\n" +
          "            story and let your users know a little more about you."
      );
      expect(employeeSummary).toBeInTheDocument();
    });

    it("should render image", () => {
      const employeeLilyImage = screen.getByRole("img", {
        name: /Treatment employee Lily/i,
      });
      expect(employeeLilyImage).toBeInTheDocument();
    });
  });
});

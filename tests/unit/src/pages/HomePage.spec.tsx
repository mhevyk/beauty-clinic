import { act, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import EmployeeShowcaseSection from "@/pages/home/components/employee-showcase-section/EmployeeShowcaseSection.tsx";
import HeroSection from "@/pages/home/components/hero-section/HeroSection.tsx";
import MyTreatments from "@/pages/home/components/my-treatments/MyTreatments.tsx";
import TestimonialCard from "@/pages/home/components/testimonial-card/TestimonialCard.tsx";
import TreatmentCardList from "@/pages/home/components/treatment-card-list/TreatmentCardList.tsx";
import { Quote } from "@/pages/home/data/quotes.ts";
import useInterval from "@/pages/home/hooks/use-interval/useInterval.ts";

jest.mock(
  "@/pages/home/components/treatment-card-list/TreatmentCardList",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

jest.mock("@/pages/home/hooks/use-interval/useInterval.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

export const quotesMock: Quote[] = [
  { author: "Author 1", description: "Quote 1" },
  { author: "Author 2", description: "Quote 2" },
  { author: "Author 3", description: "Quote 3" },
];

const setupWithMockContent = (mockContent: () => ReactNode | never) => {
  (TreatmentCardList as jest.Mock).mockImplementation(mockContent);
  // FIXME: it is not good solution, it just avoids printing error to console
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  renderWithProviders(<MyTreatments />);
};

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

  describe("<Testimonials />", () => {
    let startIntervalMock: jest.Mock;
    let stopIntervalMock: jest.Mock;

    beforeEach(() => {
      startIntervalMock = jest.fn();
      stopIntervalMock = jest.fn();

      (useInterval as jest.Mock).mockReturnValue({
        startInterval: startIntervalMock,
        stopInterval: stopIntervalMock,
      });

      renderWithProviders(
        <TestimonialCard quotes={quotesMock} backgroundColor="red" />
      );
    });
    it("should render the first quote initially", () => {
      const firstQuote = screen.getByText(/Quote 1/i);
      const firstAuthor = screen.getByText(/Author 1/i);
      expect(firstQuote).toBeInTheDocument();
      expect(firstAuthor).toBeInTheDocument();
    });

    it("should change to the second quote when second button is clicked", () => {
      const secondButton = screen.getAllByRole("button")[1];
      const secondQuote = screen.getByText(/Quote 2/i);
      const secondAuthor = screen.getByText(/Author 2/i);

      fireEvent.click(secondButton);

      expect(stopIntervalMock).toHaveBeenCalled();
      expect(startIntervalMock).toHaveBeenCalled();
      expect(secondQuote).toBeInTheDocument();
      expect(secondAuthor).toBeInTheDocument();
    });

    it("should cycle through quotes based on interval", () => {
      act(() => {
        (useInterval as jest.Mock).mock.calls[0][0].onTick();
      });

      expect(screen.getByText(/Quote 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Author 2/i)).toBeInTheDocument();

      act(() => {
        (useInterval as jest.Mock).mock.calls[0][0].onTick();
      });

      expect(screen.getByText(/Quote 3/i)).toBeInTheDocument();
      expect(screen.getByText(/Author 3/i)).toBeInTheDocument();

      act(() => {
        (useInterval as jest.Mock).mock.calls[0][0].onTick();
      });

      expect(screen.getByText(/Quote 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
    });
  });

  describe("<MyTreatments />", () => {
    it("should render the title and button correctly", () => {
      renderWithProviders(<MyTreatments />);

      expect(screen.getByText("MY TREATMENTS")).toBeInTheDocument();

      const bookNowButton = screen.getByRole("link", { name: /book now/i });
      expect(bookNowButton).toBeInTheDocument();
      expect(bookNowButton).toHaveAttribute("href", "/treatments");
    });

    it("should render the treatment cards when data is available", async () => {
      const contentText = "Treatment Card Content";

      setupWithMockContent(() => <div>{contentText}</div>);

      const mainContent = await screen.findByText(contentText);
      expect(mainContent).toBeInTheDocument();
    });

    it("should render the error state when an error is thrown", async () => {
      const errorMessage = "Test Error";

      setupWithMockContent(() => {
        throw new Error(errorMessage);
      });

      const errorContent = await screen.findByText(errorMessage);
      expect(errorContent).toBeInTheDocument();
    });
  });
});

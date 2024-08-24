import { screen } from "@testing-library/react";
import { ReactNode } from "react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import MyTreatments from "@/pages/home/components/my-treatments/MyTreatments.tsx";
import TreatmentCardList from "@/pages/home/components/treatment-card-list/TreatmentCardList.tsx";

jest.mock(
  "@/pages/home/components/treatment-card-list/TreatmentCardList",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

const setupWithMockContent = (mockContent: () => ReactNode | never) => {
  (TreatmentCardList as jest.Mock).mockImplementation(mockContent);
  // FIXME: it is not good solution, it just avoids printing error to console
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  renderWithProviders(<MyTreatments />);
};

describe("<MyTreatments />", () => {
  it("should render the title and button correctly", () => {
    renderWithProviders(<MyTreatments />);

    expect(screen.getByText("MY TREATMENTS")).toBeInTheDocument();

    const bookNowButton = screen.getByRole("link", { name: /book now/i });
    expect(bookNowButton).toBeInTheDocument();
    expect(bookNowButton).toHaveAttribute("href", "/treatments");
  });

  it("should render the error state when an error is thrown", async () => {
    const errorMessage = "Test Error";

    setupWithMockContent(() => {
      throw new Error(errorMessage);
    });

    const errorContent = await screen.getByText(errorMessage);
    expect(errorContent).toBeInTheDocument();
  });
});

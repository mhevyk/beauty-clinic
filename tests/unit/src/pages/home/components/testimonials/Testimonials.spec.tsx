import { act, fireEvent, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import TestimonialCard from "@/pages/home/components/testimonial-card/TestimonialCard";
import { Quote } from "@/pages/home/data/quotes.ts";
import useInterval from "@/pages/home/hooks/use-interval/useInterval.ts";

jest.mock("@/pages/home/hooks/use-interval/useInterval.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

export const quotesMock: Quote[] = [
  { author: "Author 1", description: "Quote 1" },
  { author: "Author 2", description: "Quote 2" },
  { author: "Author 3", description: "Quote 3" },
];

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

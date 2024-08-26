import { act, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import { useMultistepForm } from "@/hooks/use-multistep-form/useMultistepForm.ts";

const pages = [
  <div key="page1">Page1</div>,
  <div key="page2">Page2</div>,
  <div key="page3">Page3</div>,
];

const Sandbox = () => {
  const { page, controls, hasNextPage, hasPreviousPage, isFirstPage } =
    useMultistepForm({ pages });

  return (
    <>
      {page}
      <button onClick={controls.previousPage} disabled={!hasPreviousPage}>
        Previous
      </button>
      <button onClick={controls.nextPage} disabled={!hasNextPage}>
        Next
      </button>
      {isFirstPage && (
        <span data-testid="first-page-indicator">First Page</span>
      )}
    </>
  );
};

describe("useMultistepForm()", () => {
  beforeEach(() => {
    renderWithProviders(<Sandbox />);
  });

  it("should render the first page initially", () => {
    const firstPage = screen.getByTestId("first-page-indicator");
    const pageNumber = screen.getByText("Page1");

    expect(firstPage).toBeInTheDocument();
    expect(pageNumber).toBeInTheDocument();
  });

  it("should disable the 'Previous' button on the first page and enable the 'Next' button", () => {
    const PrevButton = screen.getByText("Previous");
    const NextButton = screen.getByText("Next");

    expect(NextButton).toBeEnabled();
    expect(PrevButton).toBeDisabled();
  });
  it("should navigate to the next page", () => {
    const firstPage = screen.getByTestId("first-page-indicator");

    expect(firstPage).toBeInTheDocument();

    act(() => {
      screen.getByText("Next").click();
    });

    const pageNumber = screen.getByText("Page2");

    expect(firstPage).not.toBeInTheDocument();
    expect(pageNumber).toBeInTheDocument();
  });

  it("should navigate to the previous page", () => {
    const firstPage = screen.getByTestId("first-page-indicator");
    const PrevButton = screen.getByText("Previous");
    const NextButton = screen.getByText("Next");

    expect(firstPage).toBeInTheDocument();

    act(() => {
      screen.getByText("Next").click();
      screen.getByText("Next").click();
    });

    const pageThree = screen.getByText("Page3");

    expect(NextButton).toBeDisabled();
    expect(PrevButton).toBeEnabled();
    expect(firstPage).not.toBeInTheDocument();
    expect(pageThree).toBeInTheDocument();

    act(() => {
      screen.getByText("Previous").click();
    });

    const pageTwo = screen.getByText("Page2");

    expect(pageTwo).toBeInTheDocument();
    expect(NextButton).toBeEnabled();
    expect(PrevButton).toBeEnabled();
  });
});

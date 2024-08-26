import { act, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import { useMultistepForm } from "@/hooks/use-multistep-form/useMultistepForm.ts";

const pages = [
  <div key="page1">Page1</div>,
  <div key="page2">Page2</div>,
  <div key="page3">Page3</div>,
];

const Sandbox = () => {
  const { page, controls, hasNextPage, hasPreviousPage } = useMultistepForm({
    pages,
  });

  return (
    <>
      {page}
      <button onClick={controls.previousPage} disabled={!hasPreviousPage}>
        Previous
      </button>
      <button onClick={controls.nextPage} disabled={!hasNextPage}>
        Next
      </button>
    </>
  );
};

describe("useMultistepForm()", () => {
  beforeEach(() => {
    renderWithProviders(<Sandbox />);
  });

  it("should render the first page initially", () => {
    const PrevButton = screen.getByText("Previous");
    const pageNumber = screen.getByText("Page1");

    expect(PrevButton).toBeDisabled();
    expect(pageNumber).toBeInTheDocument();
  });

  it("should disable the 'Previous' button on the first page and enable the 'Next' button", () => {
    const PrevButton = screen.getByText("Previous");
    const NextButton = screen.getByText("Next");

    expect(NextButton).toBeEnabled();
    expect(PrevButton).toBeDisabled();
  });
  it("should navigate to the next page", () => {
    const PrevButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");
    const pageOne = screen.getByText("Page1");

    expect(pageOne).toBeInTheDocument();

    act(() => {
      nextButton.click();
    });

    const pageTwo = screen.getByText("Page2");

    expect(PrevButton).toBeEnabled();
    expect(pageTwo).toBeInTheDocument();
  });

  it("should navigate to the previous page", () => {
    const PrevButton = screen.getByText("Previous");
    const NextButton = screen.getByText("Next");

    act(() => {
      NextButton.click();
      NextButton.click();
    });

    const pageThree = screen.getByText("Page3");

    expect(NextButton).toBeDisabled();
    expect(PrevButton).toBeEnabled();
    expect(pageThree).toBeInTheDocument();

    act(() => {
      PrevButton.click();
    });

    const pageTwo = screen.getByText("Page2");

    expect(pageTwo).toBeInTheDocument();
    expect(NextButton).toBeEnabled();
    expect(PrevButton).toBeEnabled();
  });
});

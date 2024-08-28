import { act, fireEvent, screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";
import typeIntoInput from "@tests/unit/utils/typeIntoInput";

import BlogSearchInput from "@/layouts/blog-tab-layout/components/blog-search-input/BlogSearchInput";

const mockExitSearchMode = jest.fn();
const mockSetSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

const renderAndMock = (searchParamsObject?: Record<string, string>) => {
  (useSearchParams as jest.Mock).mockReturnValue([
    new URLSearchParams(searchParamsObject),
    mockSetSearchParams,
  ]);

  renderWithProviders(<BlogSearchInput exitSearchMode={mockExitSearchMode} />);
};

const setupAndAssertDebouncedValue = async () => {
  // TODO: this is temporary until search logic is implemented
  jest.spyOn(console, "log").mockImplementation(() => jest.fn());

  renderAndMock();

  const searchInput = screen.getByPlaceholderText("Search");

  await typeIntoInput(searchInput, "va");
  await typeIntoInput(searchInput, "value");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(console.log).not.toHaveBeenCalled();

  return searchInput;
};

describe("<BlogSearchInput />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // ignore error with svgs
    jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render input with default value from search params if search key exists", () => {
    renderAndMock({ search: "skin" });

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toHaveValue("skin");
  });

  it("should render empty input if search key is not found among searchParams", () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toHaveValue("");
  });

  it("should change search input value correctly", async () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText("Search");
    await typeIntoInput(searchInput, "value");

    expect(searchInput).toHaveValue("value");
  });

  it("should exit search mode when cross button is pressed", () => {
    renderAndMock();

    const closeButton = screen.getByTestId("exit-button");
    fireEvent.click(closeButton);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it("should trigger search when form is submitted", () => {
    // TODO: this is temporary until search logic is implemented
    jest.spyOn(console, "log").mockImplementation(() => jest.fn());

    renderAndMock({ search: "skin" });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(console.log).toHaveBeenCalledWith("skin");
  });

  it("should trigger search with debounced value correctly", async () => {
    const searchInput = await setupAndAssertDebouncedValue();
    await typeIntoInput(searchInput, "value1");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(console.log).toHaveBeenCalledWith("value1");
  });

  it("should not trigger search twice if form is triggered before debounced value was set", async () => {
    const searchInput = await setupAndAssertDebouncedValue();
    await typeIntoInput(searchInput, "value1");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(console.log).toHaveBeenCalledTimes(1);
  });
});

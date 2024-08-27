import { renderHook } from "@testing-library/react";

import useSearchParamsActions from "@/hooks/use-search-params-actions/useSearchParamsActions";

const mockSetSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(() => [
    new URLSearchParams({ category: "wellness", search: "skin" }),
    mockSetSearchParams,
  ]),
}));

describe("useSearchParamsActions()", () => {
  it("should get search param by key correctly", () => {
    const { result } = renderHook(() => useSearchParamsActions());

    const categoryParam = result.current.getSearchParam("category");
    expect(categoryParam).toBe("wellness");

    const nonExistingParam = result.current.getSearchParam("non-existing");
    expect(nonExistingParam).toBeNull();
  });

  it("should get all search params correcly", () => {
    const { result } = renderHook(() => useSearchParamsActions());

    const categoryParam = result.current.getAllSearchParams();
    expect(categoryParam).toEqual({
      category: "wellness",
      search: "skin",
    });
  });

  it("should delete search params correcly", () => {
    const { result } = renderHook(() => useSearchParamsActions());

    result.current.deleteSearchParam("category");
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ search: "skin" })
    );
  });

  it("should set search params correcly", () => {
    const { result } = renderHook(() => useSearchParamsActions());

    result.current.setSearchParam("filter", "my-filter");

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({
        category: "wellness",
        search: "skin",
        filter: "my-filter",
      })
    );
  });

  it("should toggle search params correctly when param is empty", () => {
    const { result } = renderHook(() => useSearchParamsActions());

    result.current.toggleSearchParam("search", "");

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({
        category: "wellness",
      })
    );
  });

  it("should toggle search params correctly when param is not empty", () => {
    const { result } = renderHook(() => useSearchParamsActions());

    result.current.toggleSearchParam("filter", "new-filter");

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({
        category: "wellness",
        search: "skin",
        filter: "new-filter",
      })
    );
  });
});

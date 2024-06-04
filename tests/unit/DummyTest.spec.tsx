import { render, screen } from "@testing-library/react";
import ButtonWithSpinner from "@components/ButtonWithSpinner";

// TODO: remove it and replace with real tests
describe("test", () => {
  it("should add two numbers", () => {
    expect(1 + 2).toBe(3);
  });

  it("should render ButtonWithSpinner correclty", () => {
    render(<ButtonWithSpinner />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

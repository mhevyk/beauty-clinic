import { screen } from "@testing-library/react";
import BookSessionPage from "@pages/BookSessionPage";
import renderWithProviders from "@tests/utils/renderWithProviders";
import { PropsWithChildren, ReactNode } from "react";
import BookSessionPageContent from "@pages/BookSessionPage/components/BookSessionPageContent";

jest.mock("@pages/BookSessionPage/context/DatetimePickerProvider", () => ({
  __esModule: true,
  default: ({ children }: PropsWithChildren) => <div>{children}</div>,
}));

jest.mock("@pages/BookSessionPage/components/BookSessionPageContent", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const setupWithMockContent = (mockContent: () => ReactNode | never) => {
  (BookSessionPageContent as jest.Mock).mockImplementation(mockContent);
  // FIXME: it is not good solution, it just avoids printing error to console
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  renderWithProviders(<BookSessionPage />);
};

describe("<BookSessionPage />", () => {
  it("should render the main content with valid params", async () => {
    const contentText = "BookSessionPageContent";

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

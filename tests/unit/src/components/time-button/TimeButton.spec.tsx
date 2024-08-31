import { fireEvent, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";
import { format } from "date-fns";

import TimeButton from "@/pages/book-session/components/time-button/TimeButton.tsx";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider.tsx";

jest.mock(
  "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider.tsx",
  () => ({
    useDatetimePickerContext: jest.fn(),
  })
);

const mockSetSelectedTime = jest.fn();
const mockContext = {
  selectedTime: null,
  setSelectedTime: mockSetSelectedTime,
  selectedEmployeeId: null,
};

describe("<TimeButton />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useDatetimePickerContext.mockReturnValue(mockContext);
  });

  it("should display a button with the correct time format", () => {
    const testDate = new Date(2024, 7, 31, 10, 30); // August 31, 2024, 10:30 AM
    renderWithProviders(
      <TimeButton datetime={testDate} isFirstAvailableTime={false} />
    );

    const button = screen.getByRole("button", {
      name: format(testDate, "h:mm aaa"),
    });
    expect(button).toBeInTheDocument();
  });

  it("should call setSelectedTime with the date when the button is pressed", () => {
    const testDate = new Date(2024, 7, 31, 10, 30);
    renderWithProviders(
      <TimeButton datetime={testDate} isFirstAvailableTime={false} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetSelectedTime).toHaveBeenCalledWith(testDate);
  });

  it("should set the initial selected time if isFirstAvailableTime is true", () => {
    const testDate = new Date(2024, 7, 31, 10, 30);
    renderWithProviders(
      <TimeButton datetime={testDate} isFirstAvailableTime={true} />
    );

    expect(mockSetSelectedTime).toHaveBeenCalledWith(testDate);
  });

  it("should apply the selected styles when the button is selected", () => {
    const testDate = new Date(2024, 7, 31, 10, 30);
    useDatetimePickerContext.mockReturnValue({
      ...mockContext,
      selectedTime: testDate,
    });

    renderWithProviders(
      <TimeButton datetime={testDate} isFirstAvailableTime={false} />
    );

    const button = screen.getByRole("button");

    expect(button).toHaveStyle({
      backgroundColor: "#e0d9ce",
    });
  });

  it("should not set the selected time if another time is already selected", () => {
    const testDate = new Date(2024, 7, 31, 10, 30);
    const otherDate = new Date(2024, 7, 31, 11, 0);
    useDatetimePickerContext.mockReturnValue({
      ...mockContext,
      selectedTime: otherDate,
    });

    renderWithProviders(
      <TimeButton datetime={testDate} isFirstAvailableTime={false} />
    );

    expect(mockSetSelectedTime).not.toHaveBeenCalledWith(testDate);
  });
});

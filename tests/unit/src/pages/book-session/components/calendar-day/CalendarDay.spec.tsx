import { fireEvent, screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders";
import { addMonths, subMonths } from "date-fns";

import CalendarDay from "@/pages/book-session/components/calendar-day/CalendarDay";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";
import { CalendarUtils } from "@/pages/book-session/hooks/use-calendar/useCalendar.types";

const mockSetSelectedDate = jest.fn();
const mockSetSelectedTime = jest.fn();

const mockStringDate = "2022-01-02";
const mockDay = new Date(mockStringDate);

const mockUtils: CalendarUtils = {
  checkSelected: jest.fn(),
  checkAnotherMonth: jest.fn(),
  checkSamePage: jest.fn(),
};

jest.mock(
  "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider"
);

const renderAndMock = (day = mockDay, isAnotherMonth = false) => {
  (useDatetimePickerContext as jest.Mock).mockReturnValue({
    setSelectedDate: mockSetSelectedDate,
    setSelectedTime: mockSetSelectedTime,
  });

  (mockUtils.checkAnotherMonth as jest.Mock).mockReturnValue(isAnotherMonth);

  renderWithProviders(
    <CalendarDay
      day={day}
      utils={mockUtils}
      hasAvailableSessions
      calendarSize="normal"
    />
  );
};

describe("<CalendarDay />", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDay);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render correctly", () => {
    renderAndMock();

    const timeElement = screen.getByRole("time");
    expect(timeElement).toHaveAttribute("datetime", mockStringDate);
    expect(timeElement).toHaveTextContent("2");
  });

  it("should update day and reset time at the same time correctly", () => {
    renderAndMock();

    const dayButton = screen.getByRole("button");
    fireEvent.click(dayButton);

    expect(mockSetSelectedDate).toHaveBeenCalledWith(mockDay);
    expect(mockSetSelectedTime).toHaveBeenCalledWith(null);
  });

  it("should not be disabled if day is not in the past or another month", () => {
    renderAndMock();

    const dayButton = screen.getByRole("button");
    expect(dayButton).not.toBeDisabled();
  });

  it("should be disabled if day is from another month", () => {
    const prevMonthDay = subMonths(mockDay, 1);
    renderAndMock(prevMonthDay);

    const dayButton = screen.getByRole("button");
    expect(dayButton).toBeDisabled();
  });

  it("should be disabled if day is from another future month", () => {
    const prevMonthDay = addMonths(mockDay, 1);
    renderAndMock(prevMonthDay, true);

    const dayButton = screen.getByRole("button");
    expect(dayButton).toBeDisabled();
  });
});

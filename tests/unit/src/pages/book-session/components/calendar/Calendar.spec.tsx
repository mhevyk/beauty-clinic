import { act, fireEvent, screen } from "@testing-library/react";

import { useMediaQuery } from "@mui/material";
import renderWithProviders from "@tests/unit/utils/renderWithProviders";
import { addDays, format } from "date-fns";

import Calendar from "@/pages/book-session/components/calendar/Calendar";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";
import useNextPageListener from "@/pages/book-session/hooks/use-next-page-listener/useNextPageListener";
import useTreatmentSessionAvailabilities from "@/pages/book-session/hooks/use-treatment-session-availabilities/useTreatmentSessionAvailabilities";

const mockAvailabilities = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
];

const mockDate = new Date("2021-09-01T00:00:00Z");
const mockEmployeeId = 1;

jest.mock(
  "@/pages/book-session/hooks/use-treatment-session-availabilities/useTreatmentSessionAvailabilities",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

jest.mock(
  "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider"
);

jest.mock(
  "@/pages/book-session/hooks/use-next-page-listener/useNextPageListener"
);

type RenderAndMock = {
  isBiggerThanSmallScreen: boolean;
  availabilities: boolean[];
};

const defaultArgs: RenderAndMock = {
  isBiggerThanSmallScreen: false,
  availabilities: mockAvailabilities,
};

const renderAndMock = (args: Partial<RenderAndMock> = {}) => {
  const actualArgs = { ...defaultArgs, ...args };

  (useTreatmentSessionAvailabilities as jest.Mock).mockReturnValue(
    actualArgs.availabilities
  );

  (useDatetimePickerContext as jest.Mock).mockReturnValue({
    selectedDate: mockDate,
    selectedEmployeeId: mockEmployeeId,
  });

  (useMediaQuery as jest.Mock).mockReturnValue(
    actualArgs.isBiggerThanSmallScreen
  );

  renderWithProviders(<Calendar />);
};

describe("<Calendar />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render correct number of weekdays", () => {
    renderAndMock();

    const weekdays = screen.getAllByTestId("weekday");
    expect(weekdays).toHaveLength(7);
  });

  it("should use useNextPageListener correctly", () => {
    renderAndMock();

    expect(useTreatmentSessionAvailabilities).toHaveBeenCalledWith({
      range: {
        start: expect.any(Date),
        end: expect.any(Date),
      },
      shouldFetch: true,
      employeeId: mockEmployeeId,
    });
  });

  it("should use useNextPageListener correctly", () => {
    renderAndMock();

    expect(useNextPageListener).toHaveBeenCalledWith({
      checkSamePage: expect.any(Function),
      showNextPage: expect.any(Function),
    });
  });

  it("should show available treatment sessions with short debounce delay", () => {
    renderAndMock();

    const day1 = screen.getByText(format(mockDate, "d"));
    expect(day1).toBeInTheDocument();

    const nextPageButton = screen.getByTestId("next-page-button");
    fireEvent.click(nextPageButton);

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    const day2 = screen.getByText(format(addDays(mockDate, 7), "d"));
    expect(day2).toBeInTheDocument();
  });

  describe("when the user is on a small screen", () => {
    it("should render correct number of days", () => {
      renderAndMock({ isBiggerThanSmallScreen: true });

      const days = screen.getAllByTestId("day");
      expect(days).toHaveLength(42);
    });
  });

  describe("when the user is on a large screen", () => {
    it("should render correct number of days", () => {
      renderAndMock();

      const days = screen.getAllByTestId("day");
      expect(days).toHaveLength(7);
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";

import { useGetAvailableTreatmentSessionHoursSuspenseQuery } from "@/api/generated";
import TimePicker from "@/pages/book-session/components/time-picker/TimePicker.tsx";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";
import useLimitedSessionHours from "@/pages/book-session/hooks/use-limited-session-hours/useLimitedSessionHours.ts";

jest.mock("@/api/generated");
jest.mock(
  "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider"
);
jest.mock(
  "@/pages/book-session/hooks/use-limited-session-hours/useLimitedSessionHours.ts"
);
jest.mock(
  "@/pages/book-session/components/no-availability/NoAvailability",
  () => {
    const NoAvailability = () => <div>No Availability</div>;
    NoAvailability.displayName = "NoAvailability";
    return NoAvailability;
  }
);

jest.mock("@/pages/book-session/components/time-button/TimeButton", () => {
  const MockTimeButton = ({ datetime }) => (
    <button>{datetime.toTimeString()}</button>
  );
  MockTimeButton.displayName = "MockTimeButton"; // Add display name here
  return MockTimeButton;
});

describe("<TimePicker />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should renders no availability when no session hours are available", () => {
    useDatetimePickerContext.mockReturnValue({
      selectedDate: new Date(),
      selectedEmployeeId: "123",
    });

    useGetAvailableTreatmentSessionHoursSuspenseQuery.mockReturnValue({
      data: {
        getAvailableTreatmentSessionHours: [],
      },
    });

    useLimitedSessionHours.mockReturnValue({
      limitedHours: [],
      shouldRenderShowAllSessionsButton: false,
      showAllSessions: jest.fn(),
    });

    render(<TimePicker />);

    const noAvailability = screen.getByText("No Availability");
    expect(noAvailability).toBeInTheDocument();
  });

  it("should renders available session times as buttons", () => {
    const mockAvailableHours = [
      new Date("2024-08-10T09:00:00Z"),
      new Date("2024-08-10T10:00:00Z"),
    ];

    useDatetimePickerContext.mockReturnValue({
      selectedDate: new Date(),
      selectedEmployeeId: "123",
    });

    useGetAvailableTreatmentSessionHoursSuspenseQuery.mockReturnValue({
      data: {
        getAvailableTreatmentSessionHours: mockAvailableHours.map(date =>
          date.toISOString()
        ),
      },
    });

    useLimitedSessionHours.mockReturnValue({
      limitedHours: mockAvailableHours,
      shouldRenderShowAllSessionsButton: false,
      showAllSessions: jest.fn(),
    });

    render(<TimePicker />);

    mockAvailableHours.forEach(hour => {
      const hourToTimeString = screen.getByText(hour.toTimeString());
      expect(hourToTimeString).toBeInTheDocument();
    });
  });

  it("should renders 'Show all sessions' button when applicable", () => {
    const mockAvailableHours = [new Date("2024-08-10T09:00:00Z")];
    const mockShowAllSessions = jest.fn();

    useDatetimePickerContext.mockReturnValue({
      selectedDate: new Date(),
      selectedEmployeeId: "123",
    });

    useGetAvailableTreatmentSessionHoursSuspenseQuery.mockReturnValue({
      data: {
        getAvailableTreatmentSessionHours: mockAvailableHours.map(date =>
          date.toISOString()
        ),
      },
    });

    useLimitedSessionHours.mockReturnValue({
      limitedHours: mockAvailableHours,
      shouldRenderShowAllSessionsButton: true,
      showAllSessions: mockShowAllSessions,
    });

    render(<TimePicker />);

    const showAllButton = screen.getByText("Show all sessions");
    expect(showAllButton).toBeInTheDocument();

    fireEvent.click(showAllButton);
    expect(mockShowAllSessions).toHaveBeenCalled();
  });
});

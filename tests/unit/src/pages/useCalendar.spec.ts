import { act, renderHook } from "@testing-library/react";

import { addDays, addMonths, startOfToday, subMonths } from "date-fns";

import {
  CalendarInput,
  CalendarOutput,
  useCalendar,
} from "@/pages/book-session/hooks/useCalendar.ts";

const mockSelectedDate = new Date("2024-02-01");
const mockSelectedFirstDateOfNormalCalendarSize = new Date("2024-01-28");
const mockSelectedLastDateOfNormalCalendarSize = new Date("2024-03-09");
const mockSelectedLastDateOfCompactCalendarSize = new Date("2024-02-03");

const defaultUseCalendarInput: CalendarInput = {
  selectedDayDate: mockSelectedDate,
  size: "normal",
};

const renderUseCalendarHook = (input?: Partial<CalendarInput>) => {
  const { result } = renderHook(() =>
    useCalendar({
      ...defaultUseCalendarInput,
      ...input,
    })
  );

  return result;
};

describe("useCalendar()", () => {
  describe("controls", () => {
    let result: { current: CalendarOutput };

    beforeEach(() => {
      result = renderUseCalendarHook();
    });

    it("should go to previous calendar page correctly", () => {
      act(() => result.current.controls.showPreviousPage());
      expect(result.current.data.selectedPageLabel).toMatch(/january 2024/i);
    });

    it("should go to next calendar page correctly", () => {
      act(() => result.current.controls.showNextPage());
      expect(result.current.data.selectedPageLabel).toMatch(/march 2024/i);
    });
  });

  describe("utils", () => {
    describe("checkSelected", () => {
      it("should check selected page correctly", () => {
        const result = renderUseCalendarHook();

        act(() => {
          const isSelected =
            result.current.utils.checkSelected(mockSelectedDate);
          expect(isSelected).toBeTruthy();
        });
      });

      it("should return false if selectedDayDate is null", () => {
        const result = renderUseCalendarHook({ selectedDayDate: null });

        act(() => {
          const isSelected =
            result.current.utils.checkSelected(mockSelectedDate);
          expect(isSelected).toBeFalsy();
        });
      });
    });

    describe("checkAnotherMonth", () => {
      it("should check another month correctly", () => {
        const result = renderUseCalendarHook();

        act(() => {
          const isAnotherMonth = result.current.utils.checkAnotherMonth(
            subMonths(mockSelectedDate, 1)
          );
          expect(isAnotherMonth).toBeTruthy();
        });
      });

      it("should return false if calendar size is compact", () => {
        const result = renderUseCalendarHook({ size: "compact" });

        act(() => {
          const isAnotherMonth = result.current.utils.checkAnotherMonth(
            addMonths(mockSelectedDate, 2)
          );
          expect(isAnotherMonth).toBeFalsy();
        });
      });
    });

    describe("checkSamePage", () => {
      it("should check if dates are from same month if calendar size is normal", () => {
        const result = renderUseCalendarHook();

        act(() => {
          const isOnTheSamePage = result.current.utils.checkSamePage(
            mockSelectedDate,
            addDays(mockSelectedDate, 10)
          );
          expect(isOnTheSamePage).toBeTruthy();
        });
      });

      it("should check if dates are from same week if calendar size is compact", () => {
        const result = renderUseCalendarHook({ size: "compact" });

        act(() => {
          const isOnTheSamePage = result.current.utils.checkSamePage(
            mockSelectedDate,
            addDays(mockSelectedDate, 2)
          );
          expect(isOnTheSamePage).toBeTruthy();
        });
      });
    });
  });

  describe("data", () => {
    it("should return correct range of dates if calendar size is normal", () => {
      const result = renderUseCalendarHook();

      const {
        data: { weekDays, days },
      } = result.current;

      expect(weekDays).toHaveLength(7);
      expect(days).toHaveLength(42);
      expect(days[0]?.toDateString()).toBe(
        mockSelectedFirstDateOfNormalCalendarSize.toDateString()
      );
      expect(days.at(-1)?.toDateString()).toBe(
        mockSelectedLastDateOfNormalCalendarSize.toDateString()
      );
    });

    it("should return correct range of dates if calendar size is compact", () => {
      const result = renderUseCalendarHook({ size: "compact" });

      const {
        data: { weekDays, days },
      } = result.current;

      expect(weekDays).toHaveLength(7);
      expect(days).toHaveLength(7);
      expect(days[0]?.toDateString()).toBe(
        mockSelectedFirstDateOfNormalCalendarSize.toDateString()
      );
      expect(days.at(-1)?.toDateString()).toBe(
        mockSelectedLastDateOfCompactCalendarSize.toDateString()
      );
    });

    it("should use current date as selected if it is null", () => {
      const result = renderUseCalendarHook({ selectedDayDate: null });
      expect(result.current.data.selectedPage).toEqual(startOfToday());
    });
  });
});

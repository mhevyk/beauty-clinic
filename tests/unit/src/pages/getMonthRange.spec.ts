import { format } from "date-fns";

import getMonthRange from "@/pages/book-session/utils/get-month-range/getMonthRange";

const date = new Date("2024-07-26");

const stripTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

describe("getMonthRange()", () => {
  let monthRange: Date[];

  beforeEach(() => {
    monthRange = getMonthRange(date).map(stripTime);
  });

  it("should return 42 days for a given month", () => {
    expect(monthRange).toHaveLength(42);
  });

  it("should start from the first day of the week of the first day of the month", () => {
    const expectedStart = stripTime(new Date("2024-06-30")); // Assuming the week starts on Sunday
    expect(monthRange[0]).toEqual(expectedStart);
  });

  it("should end on the last day of the week of the last day of the month", () => {
    const expectedEnd = stripTime(new Date("2024-08-10")); // Assuming the week ends on Saturday
    expect(monthRange[41]).toEqual(expectedEnd);
  });

  it("should cover the entire month", () => {
    const formattedRange = monthRange.map(day => format(day, "yyyy-MM-dd"));
    expect(formattedRange).toContain("2024-07-01");
    expect(formattedRange).toContain("2024-07-31");
  });
});

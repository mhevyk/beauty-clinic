import minutesToHourAndMinutes from "@utils/minutesToHourAndMinutes.ts";

describe("minutesToHourAndMinutes", () => {
  test("converts 0 minutes correctly", () => {
    expect(minutesToHourAndMinutes(0)).toBe("0 hr ");
  });

  test("converts minutes less than an hour correctly", () => {
    expect(minutesToHourAndMinutes(5)).toBe("0 hr 5 min");
    expect(minutesToHourAndMinutes(25)).toBe("0 hr 20 min");
    expect(minutesToHourAndMinutes(45)).toBe("0 hr 45 min");
  });

  test("converts exactly one hour correctly", () => {
    expect(minutesToHourAndMinutes(60)).toBe("1 hr ");
    expect(minutesToHourAndMinutes(120)).toBe("2 hr ");
    expect(minutesToHourAndMinutes(240)).toBe("4 hr ");
  });

  test("converts more than an hour correctly", () => {
    expect(minutesToHourAndMinutes(75)).toBe("1 hr 15 min");
    expect(minutesToHourAndMinutes(160)).toBe("2 hr 40 min");
    expect(minutesToHourAndMinutes(315)).toBe("5 hr 15 min");
  });
});

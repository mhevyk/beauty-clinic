import useTreatmentSessionAvailabilities from "@/pages/BookSessionPage/components/Calendar/hooks/useTreatmentSessionAvailabilities";
import { renderHook, waitFor } from "@testing-library/react";
import { client } from "@/config/apollo";
import { GetTreatmentSessionAvailabilitiesDocument } from "@api/hooks";

jest.mock("@/config/apollo", () => ({
  __esModule: true,
  client: {
    query: jest.fn(),
  },
}));

type HookInput = Parameters<typeof useTreatmentSessionAvailabilities>[0];

const defaultHookInput: HookInput = {
  employeeId: 1,
  range: { start: new Date(), end: new Date() },
  shouldFetch: true,
};

const renderUseTreatmentSessionAvailabilitiesHook = (
  input?: Partial<HookInput>
) => {
  const { result } = renderHook(() =>
    useTreatmentSessionAvailabilities({
      ...defaultHookInput,
      ...input,
    })
  );

  return result;
};

describe("useTreatmentSessionAvailabilities()", () => {
  it("should not perform fetch if employeeId contains falsy value", () => {
    renderUseTreatmentSessionAvailabilitiesHook({ employeeId: undefined });
    expect(client.query).not.toHaveBeenCalled();
  });

  it("should not perform fetch if shouldFetch is false", () => {
    renderUseTreatmentSessionAvailabilitiesHook({ shouldFetch: false });
    expect(client.query).not.toHaveBeenCalled();
  });

  it("should set availabilities array after fetch succeeded", async () => {
    const mockTreatmentSessionAvailability = [true, false];

    (client.query as jest.Mock).mockResolvedValue({
      data: {
        getTreatmentSessionAvailability: mockTreatmentSessionAvailability,
      },
    });

    const result = renderUseTreatmentSessionAvailabilitiesHook();

    expect(client.query).toHaveBeenCalledWith({
      query: GetTreatmentSessionAvailabilitiesDocument,
      fetchPolicy: "network-only",
      variables: {
        employeeId: defaultHookInput.employeeId,
        startDate: defaultHookInput.range.start,
        endDate: defaultHookInput.range.end,
      },
    });

    await waitFor(() => {
      expect(result.current).toEqual(mockTreatmentSessionAvailability);
    });
  });

  it("should not set availabilities array if data is null", async () => {
    (client.query as jest.Mock).mockResolvedValue({ data: null });

    const result = renderUseTreatmentSessionAvailabilitiesHook();

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });
});

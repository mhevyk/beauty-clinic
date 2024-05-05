import { GetTreatmentSessionAvailabilitiesDocument } from "@api/hooks";
import { isBefore, startOfMonth, startOfToday, subMonths } from "date-fns";
import { useEffect, useState } from "react";
import { client } from "@config/apollo";

type UseTreatmentSessionAvailabilities = {
  days: Date[];
  employeeId: number;
};

export default function useTreatmentSessionAvailabilities({
  days,
  employeeId,
}: UseTreatmentSessionAvailabilities) {
  const [availabilities, setAvailabilities] = useState<boolean[]>([]);

  useEffect(() => {
    if (!employeeId) {
      return;
    }

    // should not fetch if date if already passed in history
    const firstDateOfRange = days[0]!;

    const startOfPreviousMonth = startOfMonth(subMonths(startOfToday(), 1));
    const isPreviousMonthOrEarlier = isBefore(
      firstDateOfRange,
      startOfPreviousMonth
    );

    if (isPreviousMonthOrEarlier) {
      return;
    }

    const lastDateOfRange = days.at(-1)!;

    const variables = {
      employeeId,
      startDate: firstDateOfRange,
      endDate: lastDateOfRange,
    };

    client
      .query({
        query: GetTreatmentSessionAvailabilitiesDocument,
        variables,
      })
      .then(({ data }) => {
        const newAvailabilities = data?.getTreatmentSessionAvailability;
        if (newAvailabilities) {
          setAvailabilities(newAvailabilities);
        }
      });
  }, [employeeId, days]);

  return availabilities;
}

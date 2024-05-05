import { GetTreatmentSessionAvailabilitiesDocument } from "@api/hooks";
import { useEffect, useState } from "react";
import { client } from "@config/apollo";

type UseTreatmentSessionAvailabilities = {
  days: Date[];
  shouldFetch: boolean;
  employeeId: number;
};

export default function useTreatmentSessionAvailabilities({
  days,
  employeeId,
  shouldFetch,
}: UseTreatmentSessionAvailabilities) {
  const [availabilities, setAvailabilities] = useState<boolean[]>([]);

  useEffect(() => {
    if (!employeeId) {
      return;
    }

    const firstDateOfRange = days[0]!;
    const lastDateOfRange = days.at(-1)!;

    if (!shouldFetch) {
      return;
    }

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
  }, [employeeId, days, shouldFetch]);

  return availabilities;
}

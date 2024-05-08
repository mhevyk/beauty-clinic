import { GetTreatmentSessionAvailabilitiesDocument } from "@api/hooks";
import { useEffect, useState } from "react";
import { client } from "@config/apollo";

type DateRange = {
  start: Date;
  end: Date;
};

type UseTreatmentSessionAvailabilities = {
  range: DateRange;
  shouldFetch: boolean;
  employeeId: number;
};

export default function useTreatmentSessionAvailabilities({
  range,
  employeeId,
  shouldFetch,
}: UseTreatmentSessionAvailabilities) {
  const [availabilities, setAvailabilities] = useState<boolean[]>([]);

  useEffect(() => {
    if (!employeeId || !shouldFetch) {
      return;
    }

    const variables = {
      employeeId,
      startDate: range.start,
      endDate: range.end,
    };

    client
      .query({
        query: GetTreatmentSessionAvailabilitiesDocument,
        variables,
      })
      .then(({ data }) => {
        const newAvailabilities: boolean[] =
          data?.getTreatmentSessionAvailability;
        if (newAvailabilities) {
          setAvailabilities(newAvailabilities);
        }
      });
  }, [employeeId, range, shouldFetch]);

  return availabilities;
}

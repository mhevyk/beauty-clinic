import { useEffect, useState } from "react";

import { GetTreatmentSessionAvailabilitiesDocument } from "@/api/generated";
import { client } from "@/config/apollo";

type DateRange = {
  start: Date;
  end: Date;
};

type UseTreatmentSessionAvailabilities = {
  range: DateRange;
  shouldFetch: boolean;
  employeeId?: number;
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
        fetchPolicy: "network-only", // TODO: make this refetch also
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

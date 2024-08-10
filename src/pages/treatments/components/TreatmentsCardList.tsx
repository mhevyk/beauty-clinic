import { useGetTreatmentsSuspenseQuery } from "@api/hooks";

import TreatmentsCard from "./TreatmentsCard.tsx";

export default function TreatmentsCardList() {
  const { data } = useGetTreatmentsSuspenseQuery();

  return data.treatments.map(treatment => {
    return <TreatmentsCard key={treatment.id} treatment={treatment} />;
  });
}

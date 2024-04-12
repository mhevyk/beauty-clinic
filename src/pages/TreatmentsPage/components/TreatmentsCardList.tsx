import TreatmentsCard from "./TreatmentsCard.tsx";
import { useGetTreatmentsSuspenseQuery } from "@api/hooks";

export default function TreatmentsCardList() {
  const { data } = useGetTreatmentsSuspenseQuery();

  return data.treatments.map((treatment) => {
    return <TreatmentsCard key={treatment.id} treatment={treatment} />;
  });
}

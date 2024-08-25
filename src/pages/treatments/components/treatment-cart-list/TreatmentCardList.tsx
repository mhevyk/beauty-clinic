import TreatmentsCard from "@/pages/treatments/components/treatment-card/TreatmentsCard";
import { useGetTreatmentsSuspenseQuery } from "@/api/generated";

export default function TreatmentCardList() {
  const { data } = useGetTreatmentsSuspenseQuery();

  return data.treatments.map(treatment => {
    return <TreatmentsCard key={treatment.id} treatment={treatment} />;
  });
}

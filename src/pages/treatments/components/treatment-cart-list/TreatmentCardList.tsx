import { useGetTreatmentsSuspenseQuery } from "@/api/generated";
import TreatmentsCard from "@/pages/treatments/components/treatment-card/TreatmentsCard";

export default function TreatmentCardList() {
  const { data } = useGetTreatmentsSuspenseQuery();

  return data?.treatments.map(treatment => {
    return <TreatmentsCard key={treatment.id} treatment={treatment} />;
  });
}

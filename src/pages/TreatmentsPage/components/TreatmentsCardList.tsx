import TreatmentsCard from "./TreatmentsCard.tsx";
import { useGetTreatmentsSuspenseQuery } from "@api/hooks";

export default function TreatmentsCardList() {
  const { data } = useGetTreatmentsSuspenseQuery();

  return data.treatments.map((treatment) => {
    const hour = Math.floor(treatment.duration / 60);
    const minutes = treatment.duration % 60;

    let time = hour + " hr ";

    if (minutes !== 0) {
      time += minutes + " min";
    }

    return (
      <TreatmentsCard
        key={treatment.id}
        treatmentName={treatment.name}
        treatmentPrice={treatment.pricePerUnit}
        treatmentDuration={time}
      />
    );
  });
}

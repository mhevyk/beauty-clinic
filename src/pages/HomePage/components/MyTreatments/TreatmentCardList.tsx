import TreatmentCard from "@pages/HomePage/components/MyTreatments/TreatmentCard.tsx";
import treatmentSvgImage from "@pages/HomePage/data/treatmentItems.ts";
import { useGetLimitedTreatmentsSuspenseQuery } from "@api/hooks";

export default function TreatmentCardList() {
  const { data } = useGetLimitedTreatmentsSuspenseQuery({
    variables: { limit: 3 },
  });
  return data.treatments.map((treatment, index) => {
    const svgImage = treatmentSvgImage[index];
    if (!svgImage) {
      return null;
    }

    return (
      <TreatmentCard
        key={treatment.id}
        treatment={treatment}
        svgImage={svgImage.svgImage}
        style={svgImage.styled}
      />
    );
  });
}

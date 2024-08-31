import { useGetTreatmentsSuspenseQuery } from "@/api/generated";
import concatUrls from "@/utils/concat-urls/concatUrls.ts";

import myTreatmentDecorationImageData from "../../data/treatmentItems.ts";
import TreatmentCard from "../testimonials-card/TreatmentCard.tsx";

export default function TreatmentCardList() {
  const { data } = useGetTreatmentsSuspenseQuery({
    variables: { limit: 3 },
  });

  return data.treatments.map((treatment, index) => {
    const svgImage = myTreatmentDecorationImageData[index];

    if (!svgImage || !treatment.imageUrl) {
      return null;
    }

    const treatmentImageUrl = concatUrls(
      import.meta.env.VITE_API_BASE_IMAGE_URL,
      treatment.imageUrl
    );

    return (
      <TreatmentCard
        key={treatment.id}
        treatment={treatment}
        DecorationComponent={svgImage.svgImage}
        svgImageDecorationStyles={svgImage.styled}
        treatmentImageUrl={treatmentImageUrl}
      />
    );
  });
}

import concatUrls from "@utils/concatUrls.ts";
import TreatmentCard from "../TreatmentCard.tsx";
import myTreatmentDecorationImageData from "./data/treatmentItems";
import { useGetTreatmentsSuspenseQuery } from "@api/hooks";

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
        decorationSvgImage={svgImage.svgImage}
        svgImageDecorationStyles={svgImage.styled}
        treatmentImageUrl={treatmentImageUrl}
      />
    );
  });
}

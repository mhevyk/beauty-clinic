import TreatmentCard from "./TreatmentCard.tsx";
import myTreatmentDecorationImageData from "./data/treatmentItems.ts";
import { useGetLimitedTreatmentsSuspenseQuery } from "@api/hooks";

export default function TreatmentCardList() {
  const { data } = useGetLimitedTreatmentsSuspenseQuery({
    variables: { limit: 3 },
  });
  return data.treatments.map((treatment, index) => {
    const svgImage = myTreatmentDecorationImageData[index];
    const treatmentImageSrc = new URL(
      treatment.imageUrl,
      import.meta.env.VITE_API_BASE_IMAGE_URL,
    ).href;

    return (
      <TreatmentCard
        key={treatment.id}
        treatment={treatment}
        decorationSvgImage={svgImage.svgImage}
        styleSvgImageDecoration={svgImage.styled}
        treatmentImageSrc={treatmentImageSrc}
      />
    );
  });
}

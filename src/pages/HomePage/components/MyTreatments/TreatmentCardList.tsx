import { Treatment } from "@api/hooks";
import TreatmentCard from "@pages/HomePage/components/MyTreatments/TreatmentCard.tsx";
import homeSignatureFacial from "@images/homeSignatureFacial.svg";
import homeOxygenFacial from "@images/homeOxygenFacial.svg";
import homePurifyingHerbalFacial from "@images/homePurifyingHerbalFacial.svg";

// import { useGetLimitedTreatmentsSuspenseQuery } from "@api/hooks";

const data: { treatments: Treatment[] } = {
  treatments: [
    {
      __typename: "Treatment",
      id: "1",
      name: "Signature Facial",
      duration: 90,
      pricePerUnit: 200,
      imageUrl:
        "/2feeec_966aedab4a3f491f801a3ddc40ef56ca~mv2-lvQkZJo5qNd6xX7RIiSMshBS5l7XUF.webp",
    },
    {
      __typename: "Treatment",
      id: "2",
      name: "Oxygen Facial",
      duration: 60,
      pricePerUnit: 160,
      imageUrl:
        "/2feeec_91ff7bb6e66844629569bb641280c5a9~mv2-GVD1fGVEnm9NVERaeABTTgm9ScD4mw.webp",
    },
    {
      __typename: "Treatment",
      id: "3",
      name: "Purifying Herbal Facial",
      duration: 60,
      pricePerUnit: 160,
      imageUrl:
        "/2feeec_5b22635c22154cb59ab4603d6247654f~mv2_d_1306_1308_s_2-akOASgUHyy8nWiu3Uaheoh8YhLUo1e.webp",
    },
  ],
};

const svgImages = [
  {
    id: "1",
    svgImage: homeSignatureFacial,
    styled: {
      top: "35%",
      right: "26%",
      height: "177px",
      transform: "translate(-50%, -50%) rotate(349deg)",
    },
  },
  {
    id: "2",
    svgImage: homeOxygenFacial,
    styled: {
      top: "28%",
      left: "50%",
      height: "234px",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    id: "3",
    svgImage: homePurifyingHerbalFacial,
    styled: {
      top: "25%",
      left: "35%",
      height: "253px",
      transform: "translate(-50%, -50%) rotate(18deg)",
    },
  },
];

export default function TreatmentCardList() {
  // const { data } = useGetLimitedTreatmentsSuspenseQuery({
  //   variables: { limit: 3 },
  // });
  return data.treatments.map((treatment, index) => {
    const svgImage = svgImages[index];
    if (!svgImage) {
      return null;
    }

    return (
      <TreatmentCard
        key={treatment.id}
        treatment={treatment}
        svgImage={svgImage.svgImage}
        styled={svgImage.styled}
      />
    );
  });
}

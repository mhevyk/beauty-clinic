import SkeletonTreatmentBox from "@/pages/home/components/skeleton-treatment-box/SkeletonTreatmentBox";
import { GridStyled } from "@/pages/home/components/skeleton-treatment-card/SkeletonTratmentCard.styled";

export default function SkeletonTreatmentCard() {
  return (
    <GridStyled justifyContent="center" container spacing={2} columns={12}>
      <SkeletonTreatmentBox />
    </GridStyled>
  );
}

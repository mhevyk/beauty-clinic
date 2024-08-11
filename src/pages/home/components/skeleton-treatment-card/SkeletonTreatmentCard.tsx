import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";

import SkeletonTreatmentBox from "@/pages/home/components/skeleton-treatment-box/SkeletonTreatmentBox";

const GridStyled = styled(Grid)({
  marginBottom: 30,
});

export default function SkeletonTreatmentCard() {
  return (
    <GridStyled justifyContent="center" container spacing={2} columns={12}>
      <SkeletonTreatmentBox />
    </GridStyled>
  );
}

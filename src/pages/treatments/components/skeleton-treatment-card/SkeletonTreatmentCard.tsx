import Grid from "@mui/material/Grid";

import {
  BoxStyled,
  SkeletonButtonStyled,
  SkeletonDurationStyled,
  SkeletonPriceStyled,
  SkeletonTitleStyled,
} from "@/pages/treatments/components/skeleton-treatment-card/SkeletonTreatmentCard.styled";

export default function SkeletonTreatmentCard() {
  return (
    <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
      <BoxStyled>
        <SkeletonTitleStyled variant="text" />
        <SkeletonDurationStyled variant="text" />
        <SkeletonPriceStyled variant="text" />
        <SkeletonButtonStyled variant="rectangular" />
      </BoxStyled>
    </Grid>
  );
}

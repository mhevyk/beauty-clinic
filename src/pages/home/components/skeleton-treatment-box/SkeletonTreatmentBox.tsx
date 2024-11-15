import Grid from "@mui/material/Grid";

import {
  BoxStyled,
  SkeletonDescriptionStyled,
  SkeletonStyled,
  SkeletonTitleStyled,
} from "@/pages/home/components/skeleton-treatment-box/SkeletonTreatmentBox.styled";

export default function SkeletonTreatmentBox() {
  return Array.from({ length: 3 }, (_, index) => (
    <Grid item xs={12} sm={9} md={4.5} lg={3} xl={2.5} key={index}>
      <BoxStyled>
        <SkeletonStyled variant="rounded" />
        <SkeletonTitleStyled variant="text" />
        <SkeletonDescriptionStyled variant="text" />
      </BoxStyled>
    </Grid>
  ));
}

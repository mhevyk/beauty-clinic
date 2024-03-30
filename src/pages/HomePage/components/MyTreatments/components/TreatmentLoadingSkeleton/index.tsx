import { Grid, styled } from "@mui/material";
import TreatmentLoadingSkeletonBox from "./TreatmentLoadingSkeletonBox.tsx";

const GridStyled = styled(Grid)({
  marginBottom: 30,
});

export default function TreatmentLoadingSkeleton() {
  return (
    <GridStyled justifyContent="center" container spacing={2} columns={12}>
      <TreatmentLoadingSkeletonBox />
    </GridStyled>
  );
}

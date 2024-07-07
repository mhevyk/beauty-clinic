import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";

import SkeletonTreatmentBox from "./SkeletonTreatmentBox.tsx";

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

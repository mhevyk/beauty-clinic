import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import theme from "@/theme/theme.ts";

const SkeletonStyled = styled(Skeleton)({
  paddingTop: 200,
  height: 240,
  width: 240,
});

const SkeletonTitleStyled = styled(Skeleton)({
  fontSize: "56px",
  width: 220,
  marginTop: 30,
  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
});

const SkeletonDescriptionStyled = styled(Skeleton)({
  width: 180,
  fontSize: "20px",
});

const BoxStyled = styled(Box)({
  [theme.breakpoints.up("xs")]: {
    height: 460,
  },
  [theme.breakpoints.up("lg")]: {
    height: 560,
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20%",
});

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

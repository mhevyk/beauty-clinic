import { Box, Grid, Skeleton, styled } from "@mui/material";
import theme from "@theme/theme.ts";

const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "252px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "auto",
  padding: "31px",
  gap: "5px",
}));

const SkeletonTitleStyled = styled(Skeleton)({
  fontSize: "42px",
  width: "100%",
});

const SkeletonDurationStyled = styled(Skeleton)({
  width: "40%",
  fontSize: "16 px",
});

const SkeletonPriceStyled = styled(Skeleton)({
  width: "25%",
  marginBottom: "auto",
  fontSize: "16 px",
});

const SkeletonButtonStyled = styled(Skeleton)({
  width: "115px",
  height: "40px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

export default function SkeletonTreatmentsCard() {
  return Array.from({ length: 6 }, (_, index) => (
    <Grid item xs={12} sm={6} md={5} lg={4} xl={4} key={index}>
      <BoxStyled>
        <SkeletonTitleStyled variant="text" />
        <SkeletonDurationStyled variant="text" />
        <SkeletonPriceStyled variant="text" />
        <SkeletonButtonStyled variant="rectangular" />
      </BoxStyled>
    </Grid>
  ));
}

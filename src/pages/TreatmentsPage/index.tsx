import { Suspense } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import { styled } from "@mui/material";

import FernDecorationSvg from "@/assets/decorations/fern.svg";

import ErrorBoundary from "@/components/ErrorBoundary.tsx";
import ErrorAlertLayout from "@/layouts/ErrorLayout.tsx";
import theme from "@/theme/theme.ts";

import SkeletonTreatmentsCard from "./components/SkeletonTreatmentsCard.tsx";
import TreatmentsCardList from "./components/TreatmentsCardList.tsx";

const SectionStyled = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.CreamyDawn.main,
  padding: "100px 15px",
}));

const TreatmentImageStyled = styled(FernDecorationSvg)({
  position: "relative",
  width: "446px",
  height: "225px",
  transform: "rotate(356deg)",
  left: "50%",
  display: "block",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    width: "356px",
    height: "180px",
    transform: "rotate(362deg)",
  },
});

const TitleStyled = styled("h2")(({ theme }) => ({
  ...theme.typography.heading,
  margin: 0,
  fontSize: "24px",
  lineHeight: "1.2em",
  maxWidth: "250px",
  width: "100%",
  display: "flex",
  [theme.breakpoints.up("sm")]: {
    fontSize: "42px",
    maxWidth: "500px",
  },
}));

export default function TreatmentsPage() {
  return (
    <SectionStyled>
      <Hidden only={["xs", "sm"]}>
        <TreatmentImageStyled />
      </Hidden>
      <Container sx={{ maxWidth: "1000px" }}>
        <ErrorBoundary
          fallback={error => (
            <ErrorAlertLayout
              errorMessage={error?.message}
              backButtonPath="/"
              buttonLabel="Back to home"
            />
          )}
        >
          <Grid justifyContent="center" container spacing={3.5} columns={12}>
            <Grid item xs={12} sm={12} md={10} lg={12} xl={12}>
              <TitleStyled>My Hand Crafted Treatments Menu</TitleStyled>
            </Grid>
            <Suspense fallback={<SkeletonTreatmentsCard />}>
              <TreatmentsCardList />
            </Suspense>
          </Grid>
        </ErrorBoundary>
      </Container>
    </SectionStyled>
  );
}

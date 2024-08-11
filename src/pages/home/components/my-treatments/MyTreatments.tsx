import { Suspense } from "react";
import { Link } from "react-router-dom";

import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ErrorBoundary from "@/components/error-boundary/ErrorBoundary.tsx";
import ErrorAlertLayout from "@/layouts/error-layout/ErrorLayout.tsx";
import SkeletonTreatmentCard from "@/pages/home/components/skeleton-treatment-card/SkeletonTreatmentCard";
import TreatmentCardList from "@/pages/home/components/treatment-card-list/TreatmentCardList";
import theme from "@/theme/theme.ts";

const SectionStyled = styled("section")({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: "120px 0",
});

const TitleStyled = styled("h2")({
  margin: 0,
  paddingBottom: 20,
  ...theme.typography.paragraph,
  fontSize: "17px",
  letterSpacing: "0.7em",
  fontWeight: 400,
});

const ButtonStyled = styled(Button)({
  margin: "auto",
}) as typeof Button;

export default function MyTreatments() {
  return (
    <ErrorBoundary
      fallback={error => <ErrorAlertLayout errorMessage={error?.message} />}
    >
      <SectionStyled>
        <TitleStyled>MY TREATMENTS</TitleStyled>
        <Grid justifyContent="center" container spacing={2} columns={12}>
          <Suspense fallback={<SkeletonTreatmentCard />}>
            <TreatmentCardList />
          </Suspense>
        </Grid>
        <ButtonStyled component={Link} to="/treatments" variant="primary">
          Book Now
        </ButtonStyled>
      </SectionStyled>
    </ErrorBoundary>
  );
}

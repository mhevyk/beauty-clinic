import { Suspense } from "react";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";

import ErrorBoundary from "@/components/error-boundary/ErrorBoundary.tsx";
import ErrorAlertLayout from "@/layouts/error-layout/ErrorLayout.tsx";
import {
  ButtonStyled,
  SectionStyled,
  TitleStyled,
} from "@/pages/home/components/my-treatments/MyTreatments.styled";
import SkeletonTreatmentCard from "@/pages/home/components/skeleton-treatment-card/SkeletonTreatmentCard";
import TreatmentCardList from "@/pages/home/components/treatment-card-list/TreatmentCardList";

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

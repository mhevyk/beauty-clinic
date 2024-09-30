import { Suspense } from "react";

import Grid from "@mui/material/Grid";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";
import ErrorAlertLayout from "@/layouts/error-layout/ErrorLayout";
import {
  Section,
  Title,
  TreatmentDecoration,
  TreatmentsGrid,
  TreatmentsWrapper,
} from "@/pages/treatments/TreatmentsPage.styles";
import SkeletonTreatmentsCard from "@/pages/treatments/components/skeleton-treatment-card/SkeletonTreatmentCard";
import TreatmentsCardList from "@/pages/treatments/components/treatment-cart-list/TreatmentCardList";
import repeatComponent from "@/utils/repeat-component/repeatComponent";

export default function TreatmentsPage() {
  return (
    <AppHelmet title="Treatments">
      <Section>
        <TreatmentDecoration />
        <TreatmentsWrapper>
          <ErrorBoundary
            fallback={error => (
              <ErrorAlertLayout
                errorMessage={error?.message}
                backButtonPath="/"
                buttonLabel="Back to home"
              />
            )}
          >
            <TreatmentsGrid container spacing={3.5} columns={12}>
              <Grid item xs={12} sm={12} md={10} lg={12} xl={12}>
                <Title>My Hand Crafted Treatments Menu</Title>
              </Grid>
              <Suspense
                fallback={repeatComponent(<SkeletonTreatmentsCard />, 6)}
              >
                <TreatmentsCardList />
              </Suspense>
            </TreatmentsGrid>
          </ErrorBoundary>
        </TreatmentsWrapper>
      </Section>
    </AppHelmet>
  );
}

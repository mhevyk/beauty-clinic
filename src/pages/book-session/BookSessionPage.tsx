import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import ErrorBoundary from "@/components/ErrorBoundary.tsx";
import ErrorAlertLayout from "@/layouts/error-layout/ErrorLayout.tsx";
import theme from "@/theme/theme.ts";

import BookSessionPageContent from "./components/BookSessionPageContent.tsx";
import DatetimePickerProvider from "@/pages/book-session/context/DatetimePickerProvider.tsx";

const ContainerStyled = styled(Box)({
  maxWidth: "800px",
  width: "100%",
  margin: "140px 10px 48px 10px",
});

const SectionStyled = styled("section")({
  backgroundColor: theme.palette.CreamyDawn.main,
  display: "flex",
  justifyContent: "center",
});

type BookSessionPageParams = {
  treatmentId: string;
};

export default function BookSessionPage() {
  const params = useParams<BookSessionPageParams>();

  return (
    <SectionStyled>
      <ContainerStyled>
        <ErrorBoundary
          fallback={error => (
            <ErrorAlertLayout
              errorMessage={error!.message}
              backButtonPath="/treatments"
            />
          )}
        >
          <Suspense
            key={params.treatmentId}
            fallback={
              <Box display="flex" justifyContent="center">
                <CircularProgress sx={{ my: "300px" }} color="secondary" />
              </Box>
            }
          >
            <DatetimePickerProvider treatmentId={Number(params.treatmentId)}>
              <BookSessionPageContent />
            </DatetimePickerProvider>
          </Suspense>
        </ErrorBoundary>
      </ContainerStyled>
    </SectionStyled>
  );
}

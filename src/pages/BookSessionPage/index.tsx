import { Suspense } from "react";
import Calendar from "./components/Calendar";
import { format } from "date-fns";
import TimePicker from "./components/TimePicker";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  styled,
  Typography,
} from "@mui/material";
import theme from "@theme/theme.ts";
import CaretLeft from "@icons/caret-left.svg?react";
import { Link, useParams } from "react-router-dom";
import ServiceDetails from "./components/ServiceDetails.tsx";
import DatetimePickerProvider, {
  useDatetimePickerContext,
} from "./context/DatetimePickerProvider.tsx";
import SubmitSessionDatetimeButton from "./components/SubmitSessionDatetimeButton.tsx";
import ErrorBoundary from "@components/ErrorBoundary.tsx";

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

const ButtonStyled = styled(Button)({
  textAlign: "left",
  paddingBottom: "42px",
  fontWeight: 330,
}) as typeof Button;

const BookNowLinkButton = styled(Button)({
  padding: "8px 30px",
  display: "block",
  marginTop: "22px",
  width: "max-content",
}) as typeof Button;

const DateNow = styled("p")({
  ...theme.typography.paragraph,
  margin: "0",
});

type BookSessionPageParams = {
  treatmentId: string;
};

export default function BookSessionPage() {
  const params = useParams<BookSessionPageParams>();

  return (
    <SectionStyled>
      <ContainerStyled>
        {/* TODO: improve UI */}
        <ErrorBoundary
          fallback={
            <Box>
              <Typography>
                Sorry, but currently there are no employees specialized in
                current session.
                <br />
                Please try again later or select another treatment
              </Typography>
              <BookNowLinkButton
                component={Link}
                to="/treatments"
                variant="primary"
              >
                Back to treatments
              </BookNowLinkButton>
            </Box>
          }
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

function BookSessionPageContent() {
  const { selectedTime, selectedDate } = useDatetimePickerContext();

  {
    /* TODO: fix styles */
  }
  return (
    <Box sx={{ width: "100%" }}>
      <ButtonStyled
        component={Link}
        to={"/treatments"}
        startIcon={<CaretLeft width={16} height={16} />}
      >
        Back
      </ButtonStyled>
      <Typography
        component="h2"
        fontSize="20px"
        textAlign="center"
        variant="heading"
        margin="12px 0px"
      >
        Select a Date and Time
      </Typography>
      <Divider color="030303" variant="fullWidth" />
      <Box paddingTop="20px">
        <Box flexWrap="wrap" justifyContent="center" display="flex" gap={6}>
          <Box sx={{ flex: 1 }}>
            <Calendar />
          </Box>
          <Box sx={{ flex: 1 }}>
            <DateNow>{format(selectedDate, "EEEE, MMMM d")}</DateNow>
            <Suspense
              fallback={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: "40px",
                  }}
                >
                  <CircularProgress
                    sx={{ color: "#9A968E" }}
                    thickness={2}
                    size={20}
                  />
                </Box>
              }
            >
              <TimePicker />
            </Suspense>
          </Box>
        </Box>
      </Box>
      <Typography
        component="h2"
        fontSize="20px"
        textAlign="center"
        variant="heading"
        margin="12px 0px"
      >
        Booking Details
      </Typography>
      <ServiceDetails hasAvailableSession={selectedTime !== null} />
      <Divider color="030303" variant="fullWidth" />
      <SubmitSessionDatetimeButton />
    </Box>
  );
}

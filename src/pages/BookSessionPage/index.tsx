import { Suspense } from "react";
import Calendar from "./components/Calendar";
import { format, getHours } from "date-fns";
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

const DateNow = styled("p")({
  ...theme.typography.paragraph,
  margin: "0",
});

//TODO: add color to palette
const NextStepButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: "32px",
  fontWeight: 800,
  "&:disabled": {
    backgroundColor: "#b5b4b1",
    borderColor: "#b5b4b1",
    color: theme.palette.primary.main,
  },
}));

type BookSessionPageParams = {
  treatmentId: string;
};

export default function BookSessionPage() {
  const params = useParams<BookSessionPageParams>();

  return (
    <SectionStyled>
      <ContainerStyled>
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
      </ContainerStyled>
    </SectionStyled>
  );
}

function BookSessionPageContent() {
  const { selectedDate } = useDatetimePickerContext();

  const isTimeSelected = getHours(selectedDate) !== 0;

  function handleSubmit() {}

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
      <Box paddingTop="20px" display="flex" justifyContent="space-between">
        <Box flexWrap="wrap" justifyContent="center" display="flex" gap={6}>
          <Calendar />
          <Box>
            <DateNow>{format(selectedDate, "EEEE, MMMM d")}</DateNow>
            <Suspense
              fallback={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
      <ServiceDetails hasAvailableSession={isTimeSelected} />
      <Divider color="030303" variant="fullWidth" />
      <NextStepButtonStyled
        disabled={!isTimeSelected}
        size="small"
        fullWidth
        variant="primary-outlined"
        onClick={handleSubmit}
      >
        Next
      </NextStepButtonStyled>
    </Box>
  );
}

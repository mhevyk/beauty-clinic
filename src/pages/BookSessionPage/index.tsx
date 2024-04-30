import { Suspense, useState } from "react";
import Calendar from "./components/Calendar";
import { format, getHours, startOfToday } from "date-fns";
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
import { useOrderStore } from "@store/order/orderStore.ts";
import { useGetTreatmentByIdSuspenseQuery } from "@api/hooks";

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

type BookTreatmentSessionParams = {
  treatmentId: string;
};

export default function BookSessionPage() {
  return (
    <SectionStyled>
      <ContainerStyled>
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center">
              <CircularProgress sx={{ my: "300px" }} color="secondary" />
            </Box>
          }
        >
          <BookSessionPageContent />
        </Suspense>
      </ContainerStyled>
    </SectionStyled>
  );
}

function BookSessionPageContent() {
  const params = useParams<BookTreatmentSessionParams>();
  const treatmentId = Number(params.treatmentId);

  const { data } = useGetTreatmentByIdSuspenseQuery({
    variables: { treatmentId },
  });

  const [selectedDayDate, setSelectedDayDate] = useState(startOfToday());
  const setSelectedDate = useOrderStore(
    (store) => store.setTreatmentSessionDateTime
  );
  const setTreatmentId = useOrderStore((store) => store.setTreatmentId);

  const isTimeSelected = getHours(selectedDayDate) !== 0;

  function handleSubmit() {
    setSelectedDate(selectedDayDate);
    setTreatmentId(treatmentId);
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
      <Box paddingTop="20px" display="flex" justifyContent="space-between">
        <Box flexWrap="wrap" justifyContent="center" display="flex" gap={6}>
          <Calendar
            selectedDayDate={selectedDayDate}
            setSelectedDayDate={setSelectedDayDate}
          />
          <Box>
            <DateNow>{format(selectedDayDate, "EEEE, MMMM d")}</DateNow>
            {Boolean(selectedDayDate) && (
              <TimePicker
                date={selectedDayDate}
                setSelectedDate={setSelectedDayDate}
              />
            )}
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
      <ServiceDetails
        date={selectedDayDate}
        hasAvailableSession={isTimeSelected}
        treatment={data.treatment}
      />
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

import { useState } from "react";
import Calendar from "./components/Calendar";
import { format, getHours, startOfToday } from "date-fns";
import TimePicker from "./components/TimePicker";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import theme from "@theme/theme.ts";
import BackIcon from "@icons/caret-left.svg";
import { Link, useParams } from "react-router-dom";
import ServiceDetails from "./components/ServiceDetails.tsx";
import { useOrderStore } from "@store/order/orderStore.ts";
import { useGetTreatmentByIdQuery } from "@api/hooks";
import AppSnackbar from "@components/AppSnackbar.tsx";

const ContainerStyled = styled(Box)({
  maxWidth: "800px",
  width: "100%",
  margin: "140px 10px 48px 10px",
});

const SectionStyled = styled("section")({
  backgroundColor: theme.palette.CreamyDawn.main,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
});

const GridStyled = styled(Grid)({
  justifyContent: "space-betwen",
  [theme.breakpoints.down("md")]: {
    alignContent: "center",
    flexDirection: "column",
  },
});

const BackIconStyled = styled("img")({
  height: 16,
  width: "auto",
});

function BackPageIcon() {
  return <BackIconStyled alt="Back icon" src={BackIcon} />;
}

const ButtonStyled = styled(Button)({
  textAlign: "left",
  paddingBottom: "42px",
  fontWeight: 330,
}) as typeof Button;

const DateNow = styled("p")({
  ...theme.typography.paragraph,
  margin: "0",
});

const GridStyledItem = styled(Grid)({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
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

export default function BookSessionPage() {
  //TODO: fix errors
  const params = useParams<BookTreatmentSessionParams>();
  const treatmentId = Number(params.treatmentId);
  const { data, error, loading } = useGetTreatmentByIdQuery({
    variables: { treatmentId },
  });

  const initialDate = startOfToday();
  const [selectedDayDate, setSelectedDayDate] = useState(initialDate);

  const isNotHaveAvailableSession = getHours(selectedDayDate) === 0;

  const setSelectedDate = useOrderStore(
    (store) => store.setTreatmentSessionDateTime,
  );
  const setTreatmentId = useOrderStore((store) => store.setTreatmentId);

  if (loading) {
    return (
      <SectionStyled>
        <ContainerStyled display="flex" justifyContent="center">
          <CircularProgress color="secondary" />
        </ContainerStyled>
      </SectionStyled>
    );
  }
  if (error) {
    return <AppSnackbar />;
  }

  function handleSubmit() {
    setSelectedDate(selectedDayDate);
    setTreatmentId(parseInt(data?.treatment.id as string));
  }

  return (
    <SectionStyled>
      <ContainerStyled>
        <ButtonStyled
          component={Link}
          to={"/treatments"}
          startIcon={<BackPageIcon />}
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
        <GridStyled
          padding="20px 0px"
          justifyContent="center"
          container
          spacing={6}
          columns={12}
        >
          <Grid
            display="flex"
            justifyContent="center"
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <Calendar
              selectedDayDate={selectedDayDate}
              setSelectedDayDate={setSelectedDayDate}
            />
          </Grid>
          <GridStyledItem item xs={12} sm={12} md={6} lg={6} xl={6}>
            <DateNow>{format(selectedDayDate, "EEEE, MMMM d")}</DateNow>
            {Boolean(selectedDayDate) && (
              <TimePicker
                date={selectedDayDate}
                setSelectedDate={setSelectedDayDate}
              />
            )}
          </GridStyledItem>
        </GridStyled>
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
          aviableSession={isNotHaveAvailableSession}
          details={data!.treatment}
        />
        <Divider color="030303" variant="fullWidth" />
        <NextStepButtonStyled
          disabled={isNotHaveAvailableSession}
          size="small"
          fullWidth
          variant="primary-outlined"
          onClick={() => handleSubmit()}
        >
          Next
        </NextStepButtonStyled>
      </ContainerStyled>
    </SectionStyled>
  );
}

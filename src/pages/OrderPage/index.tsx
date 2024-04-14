import { useState } from "react";
import Calendar from "./components/Calendar";
import { format, setHours, startOfToday } from "date-fns";
import TimePicker from "./components/TimePicker";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import theme from "@theme/theme.ts";
import BackIcon from "@icons/caret-left.svg";
import { Link } from "react-router-dom";
// import { Navigate, useParams } from "react-router-dom";
// import { useGetEmployeesQuery, useGetTreatmentByIdQuery } from "@api/hooks";
// import { CircularProgress } from "@mui/material";
// import { useTreatmentDetailsStore } from "@store/order/treatmentSessionDetailsStore.ts";

const data = {
  treatment: [
    {
      __typename: "Treatment",
      id: "1",
      name: "Signature Facial",
      duration: 90,
      pricePerUnit: 200,
    },
    {
      __typename: "Treatment",
      id: "2",
      name: "Bright Vitamin C Facial\n",
      duration: 160,
      pricePerUnit: 400,
    },
  ],
};

const BoxTimePickerStyled = styled(Box)({
  und: "#f9f2e5",
  paddingTop: "100px",
  // display: "block",
  // flexDirection: "column",
  // alignItems: "center",
});

const BoxSessionStyled = styled(Box)({
  paddingTop: "20px",
  paddingBottom: "32px",
});

const ContainerStyled = styled(Container)({
  marginTop: "140px",
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-between",
  // gap: "20px",
});

const SectionStyled = styled("section")({
  backgroundColor: theme.palette.CreamyDawn.main,
  overflow: "hidden",
  height: "1060px",
});

const BackIconStyled = styled("img")({
  height: 16,
  width: "auto",
});

function BackPage() {
  return <BackIconStyled alt="Back icon" src={BackIcon} />;
}

const ButtonStyled = styled(Button)({
  textAlign: "left",
  paddingBottom: "42px",
  fontWeight: 330,
}) as typeof Button;

// type BookTreatmentSessionParams = {
//   treatmentId: string;
// };

export default function OrderPage() {
  // const params = useParams<BookTreatmentSessionParams>();
  // const treatmentId = Number(params.treatmentId);
  // const { data, error, loading } = useGetTreatmentByIdQuery({
  //   variables: { treatmentId },
  // });

  const initialDate = setHours(startOfToday(), 10);

  const [selectedDayDate, setSelectedDayDate] = useState(initialDate);
  // const { data, error, loading } = useGetEmployeesQuery();
  // if (loading) {
  //   return <CircularProgress />;
  // }
  // if (error) {
  //   return <Navigate to="/404" />;
  // }
  // const setTreatmentId = useTreatmentDetailsStore(
  //   (store) => store.setTreatmentId,
  // );

  const hour = Math.floor(data.treatment[1].duration / 60);
  const minutes = data.treatment[1].duration % 60;

  let time = hour + " hr ";

  if (minutes !== 0) {
    time += minutes + " min";
  }

  console.log(data);
  console.log(selectedDayDate);

  // TODO: remove styles later
  return (
    <SectionStyled>
      <ContainerStyled maxWidth="md">
        <ButtonStyled
          component={Link}
          to={"/treatments"}
          startIcon={<BackPage />}
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
        <Grid
          padding="20px 0px"
          justifyContent="center"
          container
          spacing={2}
          columns={12}
        >
          <Grid item xs={12} sm={7} md={6} lg={6} xl={6}>
            <Calendar
              selectedDayDate={selectedDayDate}
              setSelectedDayDate={setSelectedDayDate}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={6} lg={6} xl={6}>
            <BoxTimePickerStyled>
              <Typography>{format(selectedDayDate, "EEEE, MMMM d")}</Typography>
              {Boolean(selectedDayDate) && (
                <TimePicker
                  date={selectedDayDate}
                  setSelectedDate={setSelectedDayDate}
                />
              )}
            </BoxTimePickerStyled>
          </Grid>
        </Grid>
        <Typography
          component="h2"
          fontSize="20px"
          textAlign="center"
          variant="heading"
          margin="12px 0px"
        >
          Booking Details
        </Typography>
        <Divider color="030303" variant="fullWidth" />
        <BoxSessionStyled>
          {data.treatment[1].name}
          <br />
          {time}
        </BoxSessionStyled>
        <Button size="small" fullWidth variant="primary-outlined">
          Next
        </Button>
      </ContainerStyled>
    </SectionStyled>
  );
}

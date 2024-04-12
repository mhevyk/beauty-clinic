import { useState } from "react";
import Calendar from "./components/Calendar";
import { format, startOfToday } from "date-fns";
import TimePicker from "./components/TimePicker";
import {
  Box,
  Container,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
// import { Navigate, useParams } from "react-router-dom";
// import { useGetEmployeesQuery, useGetTreatmentByIdQuery } from "@api/hooks";
// import { CircularProgress } from "@mui/material";
// import { useTreatmentDetailsStore } from "@store/order/treatmentSessionDetailsStore.ts";

const data = {
  treatment: {
    __typename: "Treatment",
    id: "1",
    name: "Signature Facial",
    duration: 90,
    pricePerUnit: 200,
  },
};
const BoxStyled = styled(Box)({
  und: "#f9f2e5",
  paddingTop: "100px",
  // display: "block",
  // flexDirection: "column",
  // alignItems: "center",
});

const ContainerStyled = styled(Container)({
  marginTop: 100,
  // display: "flex",
  // justifyContent: "space-between",
});

// type BookTreatmentSessionParams = {
//   treatmentId: string;
// };

export default function OrderPage() {
  // const params = useParams<BookTreatmentSessionParams>();
  // const treatmentId = Number(params.treatmentId);
  // const { data, error, loading } = useGetTreatmentByIdQuery({
  //   variables: { treatmentId },
  // });
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(
    startOfToday(),
  );
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

  console.log(data);
  console.log(selectedDayDate);

  // TODO: remove styles later
  return (
    <ContainerStyled maxWidth="md">
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
          <BoxStyled>
            <Typography>{format(selectedDayDate, "EEEE, MMMM d")}</Typography>
            {selectedDayDate ? (
              <TimePicker
                date={selectedDayDate}
                setSelectedDate={setSelectedDayDate}
              />
            ) : null}
          </BoxStyled>
        </Grid>
      </Grid>
      <Divider color="030303" variant="fullWidth" />
    </ContainerStyled>
  );
}

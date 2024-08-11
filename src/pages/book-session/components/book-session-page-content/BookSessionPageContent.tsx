import { Suspense } from "react";
import { Link } from "react-router-dom";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

import CaretLeftIconSvg from "@/assets/icons/caret-left.svg";

import Calendar from "@/pages/book-session/components/calendar/Calendar";
import ServiceDetails from "@/pages/book-session/components/service-details/ServiceDetails";
import SubmitSessionDatetimeButton from "@/pages/book-session/components/submit-session-datetime-button/SubmitSessionDatetimeButton";
import TimePicker from "@/pages/book-session/components/time-picker/TimePicker";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider.tsx";

const ButtonStyled = styled(Button)({
  textAlign: "left",
  paddingBottom: "42px",
  fontWeight: 330,
}) as typeof Button;

const DateNow = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  margin: "0",
}));

export default function BookSessionPageContent() {
  const { selectedTime, selectedDate } = useDatetimePickerContext();

  return (
    <Box>
      <ButtonStyled
        component={Link}
        to={"/treatments"}
        startIcon={<CaretLeftIconSvg width={16} height={16} />}
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
        <Box flexWrap="wrap" display="flex" gap={6}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Calendar />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Box>
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

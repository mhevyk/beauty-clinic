import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import theme from "@/theme/theme.ts";
import minutesToHourAndMinutes from "@/utils/minutesToHourAndMinutes.ts";
import { Treatment } from "@api/hooks";

const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "252px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "auto",
  padding: "31px",
  gap: "10px",
}));

const ButtonStyled = styled(Button)({
  fontSize: "16px",
  fontWeight: 700,
  width: "115px",
  padding: "5px 10px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "14px",
  },
}) as typeof Button;

const TitleStyled = styled("h4")(({ theme }) => ({
  ...theme.typography.heading,
  margin: 0,
  textAlign: "center",
  fontSize: "20px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "22px",
  },
}));

type TreatmentsCardProps = {
  treatment: Treatment;
};
export default function TreatmentsCard({ treatment }: TreatmentsCardProps) {
  return (
    <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
      <BoxStyled>
        <TitleStyled>{treatment.name}</TitleStyled>
        <Typography variant="paragraph" fontSize="15px">
          {minutesToHourAndMinutes(treatment.duration)}
        </Typography>
        <Typography marginBottom="auto" variant="paragraph" fontSize="15px">
          ${treatment.pricePerUnit}
        </Typography>
        <ButtonStyled
          to={`/book-session/${treatment.id}`}
          component={Link}
          variant="primary"
        >
          Book Now
        </ButtonStyled>
      </BoxStyled>
    </Grid>
  );
}

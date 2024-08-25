import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {
  BoxStyled,
  ButtonStyled,
  TitleStyled,
} from "@/pages/treatments/components/treatment-card/TreatmentCard.styles";
import minutesToHourAndMinutes from "@/utils/minutes-to-hour-and-minutes/minutesToHourAndMinutes";
import { Treatment } from "@/api/generated";

type TreatmentCardProps = {
  treatment: Treatment;
};

export default function TreatmentCard({ treatment }: TreatmentCardProps) {
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

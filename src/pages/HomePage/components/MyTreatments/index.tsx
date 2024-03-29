import { Suspense } from "react";
import TreatmentCardList from "./components/TreatmentCardList";
import { Button, Grid, styled } from "@mui/material";
import theme from "@theme/theme.ts";
import { Link } from "react-router-dom";

const SectionStyled = styled("section")({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: "120px 0",
});

const TitleStyled = styled("h2")({
  margin: 0,
  paddingBottom: 20,
  ...theme.typography.paragraph,
  fontSize: "17px",
  letterSpacing: "0.7em",
  fontWeight: 400,
});

const ButtonStyled = styled(Button)({
  margin: "auto",
}) as typeof Button;

export default function MyTreatments() {
  return (
    <SectionStyled>
      <TitleStyled>MY TREATMENTS</TitleStyled>
      <Grid justifyContent="center" container spacing={2} columns={12}>
        {/*  TODO:finish loading*/}
        <Suspense fallback={<div>Loading</div>}>
          <TreatmentCardList />
        </Suspense>
      </Grid>
      <ButtonStyled component={Link} to="/treatments" variant="primary">
        Book Now
      </ButtonStyled>
    </SectionStyled>
  );
}

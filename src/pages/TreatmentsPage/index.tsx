import { Container, Grid, styled, Typography } from "@mui/material";
import ImageTreatmentsPage from "@images/ImageTreatmentsPage.svg";
import theme from "@theme/theme.ts";
import { Suspense } from "react";
import TreatmentsCardList from "@pages/TreatmentsPage/components/TreatmentsCardList.tsx";

const SectionStyled = styled("section")({
  backgroundColor: theme.palette.CreamyDawn.main,
  padding: "100px 80px",
});

const TreatmentImageStyled = styled("img")({
  position: "relative",
  width: "446px",
  height: "225px",
  transform: "rotate(356deg)",
  left: "50%",
});

export default function TreatmentsPage() {
  return (
    <SectionStyled>
      <TreatmentImageStyled src={ImageTreatmentsPage} alt="spikelet" />
      <Container maxWidth="tm">
        <Grid justifyContent="center" container spacing={3.5} columns={12}>
          <Grid item xs={12} sm={12} md={10} lg={12} xl={12}>
            <Typography
              variant="heading"
              fontSize="42px"
              lineHeight="1.2em"
              width="500px"
              display="flex"
            >
              My Hand Crafted Treatments Menu
            </Typography>
          </Grid>
          {/*TODO:add loading skeleton*/}
          <Suspense fallback={<div>loading</div>}>
            <TreatmentsCardList />
          </Suspense>
        </Grid>
      </Container>
    </SectionStyled>
  );
}

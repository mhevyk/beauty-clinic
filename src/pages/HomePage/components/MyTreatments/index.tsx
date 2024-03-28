import { Suspense } from "react";
import TreatmentCardList from "@pages/HomePage/components/MyTreatments/TreatmentCardList.tsx";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import theme from "@theme/theme.ts";

const BoxStyled = styled(Box)({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
});

const GridStyled = styled(Grid)({});

const TitleStyled = styled(Typography)({
  paddingTop: 120,
  paddingBottom: 20,
  ...theme.typography.paragraph,
  fontSize: "17px",
  letterSpacing: "0.7em",
  fontWeight: 400,
});

const ButtonStyled = styled(Button)({
  margin: "auto",
});
export default function MyTreatments() {
  return (
    <BoxStyled>
      <TitleStyled>MY TREATMENTS</TitleStyled>
      <Box>
        <GridStyled justifyContent="center" container spacing={2} columns={12}>
          <Suspense fallback={<div>Loading</div>}>
            <TreatmentCardList />
          </Suspense>
        </GridStyled>
      </Box>
      <ButtonStyled variant="primary">Book Now</ButtonStyled>
    </BoxStyled>
  );
}

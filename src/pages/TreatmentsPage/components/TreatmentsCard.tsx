import { Box, Button, Grid, styled, Typography } from "@mui/material";
import theme from "@theme/theme.ts";

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
});

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
  treatmentName: string;
  treatmentPrice: number;
  treatmentDuration: string;
};

export default function TreatmentsCard({
  treatmentName,
  treatmentPrice,
  treatmentDuration,
}: TreatmentsCardProps) {
  return (
    <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
      <BoxStyled>
        <TitleStyled>{treatmentName}</TitleStyled>
        <Typography variant="paragraph" fontSize="15px">
          {treatmentDuration}
        </Typography>
        <Typography marginBottom="auto" variant="paragraph" fontSize="15px">
          ${treatmentPrice}
        </Typography>
        <ButtonStyled variant="primary">Book Now</ButtonStyled>
      </BoxStyled>
    </Grid>
  );
}

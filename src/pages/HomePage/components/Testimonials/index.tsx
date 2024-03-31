import { Box, Grid, styled, Typography } from "@mui/material";
import TestimonialsImage from "@pages/HomePage/components/Testimonials/components/TestimonialsImage.tsx";

type BoxStyledProps = {
  backgroundColor: string;
};

const BoxStyled = styled(Box)(({ backgroundColor }: BoxStyledProps) => ({
  height: 662,
  backgroundColor: backgroundColor,
  border: "2px solid blue",
}));
const TestimonialTextCard = (
  <Grid item xs={12} sm={12} md={4} lg={4} xl={4.4}>
    <BoxStyled backgroundColor="red">
      <Typography></Typography>
    </BoxStyled>
  </Grid>
);

export default function Testimonials() {
  return (
    <section>
      <Box height="123px" />
      <Grid justifyContent="center" container spacing={0} columns={12}>
        {TestimonialTextCard}
        <Grid item xs={12} sm={12} md={3} lg={3.5} xl={3.2}>
          <BoxStyled backgroundColor="black">
            <TestimonialsImage />
          </BoxStyled>
        </Grid>
        {TestimonialTextCard}
      </Grid>
    </section>
  );
}

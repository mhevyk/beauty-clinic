import { Box, Grid } from "@mui/material";
import TestimonialsImage from "./components/TestimonialsImage.tsx";
import theme from "@theme/theme.ts";
import TestimonialCard from "./components/TestimonialCard/index.tsx";
import { quotes } from "./data/quotes.ts";

const PinkChiffon = theme.palette.PinkChiffon.main;

const SteelMist = theme.palette.SteelMist.main;

export default function Testimonials() {
  return (
    <section>
      <Box height="123px" />
      <Grid justifyContent="center" container spacing={0} columns={12}>
        <Grid item xs={12} sm={12} md={4.2} lg={4.2} xl={4.2}>
          <TestimonialCard
            quotes={quotes.slice(0, 2)}
            backgroundColor={PinkChiffon}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3.6} lg={3.6} xl={3.6}>
          <TestimonialsImage />
        </Grid>
        <Grid item xs={12} sm={12} md={4.2} lg={4.2} xl={4.2}>
          <TestimonialCard
            quotes={quotes.slice(2)}
            backgroundColor={SteelMist}
          />
        </Grid>
      </Grid>
    </section>
  );
}

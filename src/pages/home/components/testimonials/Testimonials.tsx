import Box from "@mui/material/Box";

import {
  BoxStyled,
  GridBoxStyled,
  PinkChiffon,
  SteelMist,
} from "@/pages/home/components/testimonials/Testimonials.styled.ts";
import { quotes } from "@/pages/home/data/quotes.ts";

import TestimonialCard from "../testimonial-card/TestimonialCard.tsx";
import TestimonialsImage from "../testimonials-image/TestimonialsImage.tsx";

export default function Testimonials() {
  return (
    <section>
      <BoxStyled height="123px" />
      <GridBoxStyled>
        <Box sx={{ gridArea: "firstCard" }}>
          <TestimonialCard
            quotes={quotes.slice(0, 2)}
            backgroundColor={PinkChiffon}
          />
        </Box>
        <Box sx={{ gridArea: "imageCard" }}>
          <TestimonialsImage />
        </Box>
        <Box sx={{ gridArea: "secondCard" }}>
          <TestimonialCard
            quotes={quotes.slice(2)}
            backgroundColor={SteelMist}
          />
        </Box>
      </GridBoxStyled>
    </section>
  );
}

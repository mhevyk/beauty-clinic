import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme.ts";

import TestimonialCard from "../testimonial-card/TestimonialCard.tsx";
import TestimonialsImage from "../testimonials-image/TestimonialsImage.tsx";
import { quotes } from "@/pages/home/data/quotes.ts";

const PinkChiffon = theme.palette.PinkChiffon.main;
const SteelMist = theme.palette.SteelMist.main;

const BoxStyled = styled(Box)({
  height: "0",
  [theme.breakpoints.up("md")]: {
    height: "123px",
  },
});
const GridBoxStyled = styled(Box)({
  justifyContent: "center",
  display: "grid",
  gridTemplateRows: "auto",
  paddingBottom: "80px",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridTemplateAreas: `"firstCard""imageCard""secondCard"`,
  [theme.breakpoints.up("md")]: {
    paddingBottom: "0",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateAreas: `"firstCard secondCard"
  "imageCard imageCard"`,
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"firstCard imageCard secondCard"`,
  },
});

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

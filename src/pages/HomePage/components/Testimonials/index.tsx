import { Box, styled } from "@mui/material";

import theme from "@/theme/theme.ts";

import TestimonialCard from "./components/TestimonialCard/index.tsx";
import TestimonialsImage from "./components/TestimonialsImage.tsx";
import { quotes } from "./data/quotes.ts";

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

import { Box, styled } from "@mui/material";
import TestimonialFlower1 from "@images/TestimonialFlower1.svg";

const ImageStyled = styled("img")({});
export default function TestimonialsImage() {
  return (
    <Box>
      <ImageStyled src={TestimonialFlower1} />
    </Box>
  );
}

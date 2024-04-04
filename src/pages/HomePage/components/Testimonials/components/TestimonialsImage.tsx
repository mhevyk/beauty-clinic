import { Box, styled } from "@mui/material";
import TestimonialFlower1 from "@images/TestimonialFlower1.svg";
import TestimonialFlower2 from "@images/TestimonialFlower2.svg";
import TestimonialFlower3 from "@images/TestimonialFlower3.svg";
import TestimonialFlower4 from "@images/TestimonialFlower4.svg";
import TestimonialFlower5 from "@images/TestimonialFlower5.svg";
import theme from "@theme/theme.ts";

const breakpointScreen = theme.breakpoints.up("lg");

const ImageStyled = styled("img")({
  position: "absolute",
  objectFit: "cover",
});

const BoxStyled = styled(Box)({
  [breakpointScreen]: {
    height: 662,
  },
  height: 422,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden",
});

const Flower1ImageStyled = styled(ImageStyled)({
  width: 132,
  height: 141,
  transform: "translate(-40%, 45%) ",
  [breakpointScreen]: {
    width: 195,
    height: 208,
    transform: "translate(-20%, 45%) ",
  },
});

const Flower2ImageStyled = styled(ImageStyled)({
  width: 129,
  height: 78,
  transform: "translate(-40%, 260%) rotate(350deg)",
  [breakpointScreen]: {
    width: 164,
    height: 99,
    transform: "translate(-53%, 307%) rotate(350deg)",
  },
});

const Flower3ImageStyled = styled(ImageStyled)({
  transform: "translate(60%, 85%) rotate(354deg)",
  width: 113,
  height: 144,
  [breakpointScreen]: {
    width: 161,
    height: 205,
    transform: "translate(52%, 105%) rotate(354deg)",
  },
});

const Flower4ImageStyled = styled(ImageStyled)({
  transform: "translate(145%, 340%) rotate(20deg)",
  width: 52,
  height: 79,
  [breakpointScreen]: {
    width: 68,
    height: 101,
    transform: "translate(105%, 400%) rotate(11deg)",
  },
});

const Flower5ImageStyled = styled(ImageStyled)({
  transform: "translate(-25%, 290%) rotate(338deg)",
  width: 105,
  height: 96,
  [breakpointScreen]: {
    width: 154,
    height: 140,
    transform: "translate(-40%, 285%) rotate(338deg)",
  },
});

export default function TestimonialsImage() {
  return (
    <BoxStyled>
      <Flower1ImageStyled src={TestimonialFlower1} />
      <Flower2ImageStyled src={TestimonialFlower2} />
      <Flower3ImageStyled src={TestimonialFlower3} />
      <Flower4ImageStyled src={TestimonialFlower4} />
      <Flower5ImageStyled src={TestimonialFlower5} />
    </BoxStyled>
  );
}

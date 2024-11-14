import {
  BoxStyled,
  OpenBananaDecoration,
  PionFlowerDecoration,
  SeaweedDecoration,
  SpiralSharpLeafDecoration,
  ThickSharpLeafDecoration,
} from "@/pages/home/components/testimonials-image/TestimonialsImage.styled";

export default function TestimonialsImage() {
  return (
    <BoxStyled>
      <PionFlowerDecoration />
      <SpiralSharpLeafDecoration />
      <OpenBananaDecoration />
      <ThickSharpLeafDecoration />
      <SeaweedDecoration />
    </BoxStyled>
  );
}

import { CSSProperties } from "react";

import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

import PionFlowerDecorationSvg from "@/assets/decorations/flower-pion.svg";
import OpenBananaDecorationSvg from "@/assets/decorations/opened-banana.svg";
import SeaweedDecorationSvg from "@/assets/decorations/seaweed.svg";
import SpiralSharpLeafDecorationSvg from "@/assets/decorations/spiral-sharp-leaf.svg";
import ThickSharpLeafDecorationSvg from "@/assets/decorations/thick-sharp-leaf.svg";

import theme from "@/theme/theme.ts";

const breakpointScreen = theme.breakpoints.up("lg");

const baseImageStyles: CSSProperties = {
  position: "absolute",
  objectFit: "cover",
};

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

const PionFlowerDecoration = styled(PionFlowerDecorationSvg)({
  ...baseImageStyles,
  width: 132,
  height: 141,
  transform: "translate(-40%, 45%) ",
  [breakpointScreen]: {
    width: 195,
    height: 208,
    transform: "translate(-20%, 45%) ",
  },
});

const SpiralSharpLeafDecoration = styled(SpiralSharpLeafDecorationSvg)({
  ...baseImageStyles,
  width: 129,
  height: 78,
  transform: "translate(-40%, 260%) rotate(350deg)",
  [breakpointScreen]: {
    width: 164,
    height: 99,
    transform: "translate(-53%, 307%) rotate(350deg)",
  },
});

const OpenBananaDecoration = styled(OpenBananaDecorationSvg)({
  ...baseImageStyles,
  transform: "translate(60%, 85%) rotate(354deg)",
  width: 113,
  height: 144,
  [breakpointScreen]: {
    width: 161,
    height: 205,
    transform: "translate(52%, 105%) rotate(354deg)",
  },
});

const ThickSharpLeafDecoration = styled(ThickSharpLeafDecorationSvg)({
  ...baseImageStyles,
  transform: "translate(145%, 340%) rotate(20deg)",
  width: 52,
  height: 79,
  [breakpointScreen]: {
    width: 68,
    height: 101,
    transform: "translate(105%, 400%) rotate(11deg)",
  },
});

const SeaweedDecoration = styled(SeaweedDecorationSvg)({
  ...baseImageStyles,
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
      <PionFlowerDecoration />
      <SpiralSharpLeafDecoration />
      <OpenBananaDecoration />
      <ThickSharpLeafDecoration />
      <SeaweedDecoration />
    </BoxStyled>
  );
}

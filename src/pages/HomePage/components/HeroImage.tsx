import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

import flowerCombinationDecoration from "@/assets/decorations/flower-combination.svg?url";
import coconutImage from "@/assets/images/coconut.png";
import cottonImage from "@/assets/images/cotton.png";
import whitePetalImage from "@/assets/images/white-petal.png";

import theme from "@/theme/theme.ts";

const smallScreenMediaQuery = theme.breakpoints.down("md");
const middleScreenMediaQuery = theme.breakpoints.down(1200);

const FlowerImage = styled("img")({
  width: 325,
  height: 738,
  [middleScreenMediaQuery]: {
    width: 227.5,
    height: 516.6,
  },
  [smallScreenMediaQuery]: {
    width: 155,
    height: 352,
  },
});

const CottonImage = styled("img")({
  position: "relative",
  width: 331,
  height: 165,
  top: 540,
  right: 690,
  transform: "rotate(353deg)",
  [middleScreenMediaQuery]: {
    width: 231.7,
    height: 115.5,
    top: 378,
    right: 483,
  },
  [smallScreenMediaQuery]: {
    width: 163,
    height: 87,
    top: 240,
    right: 320,
  },
});

const CocoImage = styled("img")({
  position: "relative",
  width: 235,
  height: 240,
  top: 230,
  right: 395,
  [middleScreenMediaQuery]: {
    width: 164.5,
    height: 168,
    top: 161,
    right: 276.5,
  },
  [smallScreenMediaQuery]: {
    width: 90,
    height: 90,
    top: 120,
    right: 215,
  },
});

const PetalImage = styled("img")({
  position: "relative",
  width: 154,
  height: 134,
  top: 40,
  right: 215,
  transform: "rotate(334deg)",
  [middleScreenMediaQuery]: {
    width: 107.8,
    height: 93.8,
    top: 28,
    right: 150.5,
  },
  [smallScreenMediaQuery]: {
    width: 90,
    height: 87,
    top: 15,
    right: 100,
  },
});

const BoxImageStyled = styled(Box)({
  userSelect: "none",
  width: 330,
  display: "flex",
  marginTop: 100,
  [middleScreenMediaQuery]: {
    width: 231,
    marginTop: 70,
  },
  [smallScreenMediaQuery]: {
    marginTop: 320,
    width: 155,
  },
});

export default function HeroImage() {
  return (
    <BoxImageStyled>
      <FlowerImage
        alt="Flowers combination decoration"
        src={flowerCombinationDecoration}
      />
      <PetalImage alt="Petal" src={whitePetalImage} />
      <CocoImage alt="Coconut" src={coconutImage} />
      <CottonImage alt="Cotton" src={cottonImage} />
    </BoxImageStyled>
  );
}

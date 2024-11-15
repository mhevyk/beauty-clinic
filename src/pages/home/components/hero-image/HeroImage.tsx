import flowerCombinationDecoration from "@/assets/decorations/flower-combination.png";
import coconutImage from "@/assets/images/coconut.png";
import cottonImage from "@/assets/images/cotton.png";
import whitePetalImage from "@/assets/images/white-petal.png";

import {
  BoxImageStyled,
  CocoImage,
  CottonImage,
  FlowerImage,
  PetalImage,
} from "@/pages/home/components/hero-image/HeroImage.styled";

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

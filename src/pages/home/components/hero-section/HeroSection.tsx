import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import HelloDecoration from "@/assets/decorations/hello.png";

import HeroImage from "@/pages/home/components/hero-image/HeroImage";
import {
  BoxStyled,
  BoxTitleStyled,
  Description,
  Header,
  HelloImg,
  SectionStyled,
} from "@/pages/home/components/hero-section/HeroSection.styled";

export default function HeroSection() {
  return (
    <SectionStyled>
      <BoxStyled>
        <BoxTitleStyled>
          <HelloImg src={HelloDecoration} alt="hello image" />
          <Header>
            Lily Organic
            <br /> Beautician
          </Header>
          <Description>Hand Crafted Natural Treatments</Description>
          <Button component={Link} to="/treatments" variant="primary-outlined">
            Book an Appointment
          </Button>
        </BoxTitleStyled>
        <HeroImage />
      </BoxStyled>
    </SectionStyled>
  );
}

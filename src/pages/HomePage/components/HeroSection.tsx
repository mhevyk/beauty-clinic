import { Link } from "react-router-dom";

import { Box, Button, styled } from "@mui/material";

import HelloDecorationSvg from "@/assets/decorations/hello.svg";

import HeroImage from "@/pages/HomePage/components/HeroImage.tsx";
import theme from "@/theme/theme.ts";

const smallScreenMediaQuery = theme.breakpoints.down("md");
const middleScreenMediaQuery = theme.breakpoints.down(1200);

const HelloImg = styled(HelloDecorationSvg)({
  userSelect: "none",
  zIndex: 1,
  width: 580,
  height: 380,
  transform: "rotate(350deg)",
  position: "relative",
  top: 80,
  right: 80,
  [middleScreenMediaQuery]: {
    width: 406,
    height: 266,
    top: 56,
    right: 56,
  },
  [smallScreenMediaQuery]: {
    width: 201,
    height: 114,
    top: 10,
    left: 22,
  },
});

const BoxStyled = styled(Box)({
  transform: "translateX(-20px)",
  display: "flex",
  [middleScreenMediaQuery]: {
    transform: "translateX(0px)",
  },
  [smallScreenMediaQuery]: {
    transform: "translateX(0px)",
    flexDirection: "column-reverse",
    alignItems: "center",
  },
});

const BoxTitleStyled = styled(Box)({
  marginBottom: 240,
});

const SectionStyled = styled("section")({
  overflow: "hidden",
  height: "1060px",
  backgroundColor: "#F8EBE1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [smallScreenMediaQuery]: {
    height: "900px",
  },
});

const Description = styled("h1")({
  fontFamily: "Avenir, sans-serif",
  fontSize: "25px",
  letterSpacing: "0.04",
  lineHeight: "1.2",
  fontWeight: "bold",
  margin: "19px 0 19px 5px",

  [middleScreenMediaQuery]: {
    fontSize: "23px",
  },
  [smallScreenMediaQuery]: {
    position: "relative",
    fontSize: "22px",
    width: 200,
    textAlign: "center",
    margin: 0,
    left: 10,
    bottom: 20,
  },
});

const Header = styled("h1")({
  ...theme.typography.heading,
  fontSize: "80px",
  letterSpacing: "-0.04rem",
  lineHeight: "1.1",
  zIndex: 2,
  margin: 0,
  position: "relative",
  [middleScreenMediaQuery]: {
    fontSize: "55px",
  },
  [smallScreenMediaQuery]: {
    fontSize: "35px",
    bottom: 35,
    textAlign: "center",
  },
});

export default function HeroSection() {
  return (
    <SectionStyled>
      <BoxStyled>
        <BoxTitleStyled>
          <HelloImg />
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

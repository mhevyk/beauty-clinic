import { Box, Button, styled } from "@mui/material";
import homeHello from "@images/homeHello.svg";
import theme from "@theme/theme.ts";
import { Link } from "react-router-dom";
import HeroImage from "@pages/HomePage/components/HeroImage.tsx";

const smallScreenMediaQuery = theme.breakpoints.down("md");

const middleScreenMediaQuery = theme.breakpoints.down(1200);

const HelloImg = styled("img")(() => {
  return {
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
      left: 20,
    },
  };
});

const BoxStyled = styled(Box)(() => {
  return {
    paddingRight: 140,
    display: "flex",
    [middleScreenMediaQuery]: {
      paddingRight: 80,
    },
    [smallScreenMediaQuery]: {
      paddingRight: 0,
      flexDirection: "column-reverse",
      alignItems: "center",
    },
  };
});

const BoxTitleStyled = styled(Box)({
  marginBottom: 240,
});

const SectionStyled = styled("section")(() => {
  return {
    overflow: "hidden",
    height: "1060px",
    backgroundColor: "#F8EBE1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [smallScreenMediaQuery]: {
      height: "900px",
    },
  };
});

const Description = styled("h1")(() => {
  return {
    ...theme.typography.h5,
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
      bottom: 10,
    },
  };
});

const Header = styled("h1")(() => {
  return {
    ...theme.typography.h2,
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
  };
});

export default function HeroSection() {
  return (
    <SectionStyled>
      <BoxStyled>
        <BoxTitleStyled>
          <HelloImg alt="Hello image" src={homeHello} />
          <Header>
            Lily Organic
            <br /> Beautician
          </Header>
          <Description>Hand Crafted Natural Treatments</Description>
          <Button component={Link} to="/treatments" variant="outlined">
            Book an Appointment
          </Button>
        </BoxTitleStyled>
        <HeroImage />
      </BoxStyled>
    </SectionStyled>
  );
}

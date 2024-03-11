import { Box, Button, styled } from "@mui/material";
import homeHello from "@images/homeHello.svg";
import homeFlower from "@images/homeFlower.svg";
import homeCotton from "@images/homeСotton.png";
import homeCoco from "@images/homeCoco.png";
import homePetal from "@images/homePetal.png";
import theme from "@theme/theme.ts";
import { Link } from "react-router-dom";

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

const FlowerImage = styled("img")(() => {
  return {
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
  };
});

const CottonImage = styled("img")(() => {
  return {
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
  };
});

const CocoImage = styled("img")(() => {
  return {
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
  };
});

const PetalImage = styled("img")(() => {
  return {
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
  };
});

const BoxStyled = styled(Box)(() => {
  return {
    paddingRight: 140,
    display: "flex",
    [smallScreenMediaQuery]: {
      paddingRight: 0,
      flexDirection: "column-reverse",
      alignItems: "center",
    },
  };
});

const BoxImageStyled = styled(Box)(() => {
  return {
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
        <BoxImageStyled>
          <FlowerImage alt="Flower" src={homeFlower} />
          <PetalImage alt="Petal" src={homePetal} />
          <CocoImage alt="Coco" src={homeCoco} />
          <CottonImage alt="Cotton" src={homeCotton} />
        </BoxImageStyled>
      </BoxStyled>
    </SectionStyled>
  );
}

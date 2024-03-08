import { Box, Button, styled } from "@mui/material";
import homeHello from "@images/homeHello.svg";
import homeFlower from "@images/homeFlower.svg";
import homeCotton from "@images/homeСotton.png";
import homeCoco from "@images/homeCoco.png";
import homePetal from "@images/homePetal.png";
import theme from "@theme/theme.ts";

const smallScreenMediaQuery = theme.breakpoints.down("md");

const HelloImg = styled("img")(() => {
  return {
    zIndex: 20,
    width: 580,
    height: 380,
    transform: "rotate(350deg)",
    position: "relative",
    top: 80,
    right: 80,
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
    display: "flex",
    [smallScreenMediaQuery]: {
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
    [smallScreenMediaQuery]: {
      position: "relative",
      fontSize: "22px",
      width: 200,
      textAlign: "center",
      margin: 0,
      left: 10,
    },
  };
});

const Header = styled("p")(() => {
  return {
    ...theme.typography.h2,
    zIndex: 50,
    margin: 0,
    position: "relative",
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
          <Button variant="outlined">Bool an Appointment</Button>
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

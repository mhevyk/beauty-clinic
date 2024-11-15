import { alpha } from "@mui/material";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import backgroundImage from "@/assets/backgrounds/flower-background.png?url";
import HelloDecorationSvg from "@/assets/decorations/hello.svg";

export const PageWrapper = styled(Box)(({ theme }) => {
  const overlayColor = alpha(theme.palette.secondary.main, 0.25);

  return {
    background: `linear-gradient(${overlayColor}, ${overlayColor}), url("${backgroundImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    display: "flex",
    justifyContent: "center",
    minWidth: "100vw",
    minHeight: "100vh",
    [`${theme.breakpoints.down("sm")} and (min-height: 750px)`]: {
      alignItems: "center",
    },
    [theme.breakpoints.up(1024)]: {
      justifyContent: "flex-end",
      paddingRight: "10vw",
    },
  };
});

export const Main = styled("main")(({ theme }) => ({
  boxShadow: `0 0 70px 15px ${alpha(theme.palette.secondary.main, 0.25)}`,
  backgroundColor: theme.palette.PinkMarbleSky.main,
  width: "100vw",
  margin: 0,
  padding: "50px 20px 0",
  ["@media (max-height: 750px)"]: {
    minHeight: "100vh",
  },
  [`${theme.breakpoints.down(428)} and (min-height: 750px)`]: {
    paddingBottom: "50px",
    height: "700px",
    borderRadius: "25px",
  },
  [theme.breakpoints.between(428, 1024)]: {
    width: "80vw",
    height: "100vh",
    padding: "50px 40px",
  },
  [`${theme.breakpoints.between(428, "sm")} and (min-height: 800px)`]: {
    margin: "0 30px",
    height: "700px",
    borderRadius: "25px",
    paddingBottom: "50px",
    paddingTop: "50px",
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "560px",
    padding: "50px 90px 0",
  },
  [`${theme.breakpoints.up("sm")} and (min-height: 800px)`]: {
    padding: "128px 90px 99px",
  },
  [theme.breakpoints.up(1024)]: {
    maxWidth: "560px",
  },
}));

export const Header = styled("header")({
  position: "relative",
  marginBottom: "57px",
});

export const HeaderTypography = styled(Typography)({
  display: "block",
  lineHeight: 1,
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  margin: 0,
});

export const MainTitle = styled(HeaderTypography)(({ theme }) => ({
  ...theme.typography.heading,
  fontSize: "42px",
  [`${theme.breakpoints.up("sm")} and (min-height: 700px)`]: {
    fontSize: "70px",
  },
  marginBottom: "10px",
})) as typeof Typography;

export const Description = styled(HeaderTypography)(({ theme }) => ({
  fontSize: "20px",
  [`${theme.breakpoints.up("sm")} and (min-height: 700px)`]: {
    fontSize: "32px",
  },
})) as typeof Typography;

export const HelloDecoration = styled(HelloDecorationSvg)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  minWidth: "192px",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  [`${theme.breakpoints.up("sm")} and (min-height: 700px)`]: {
    minWidth: "288px",
  },
}));

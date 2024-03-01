import { Box, styled, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import facebook from "@images/facebook.png";
import instagram from "@images/instagram.png";
import theme from "@theme/theme.ts";

const SocialLinks = () => {
  const BoxStyled = styled(Box)({
    width: 24,
    height: 60,
    position: "absolute",
    bottom: 0,
    marginLeft: 24,
    marginBottom: 44,
    justifySelf: "start",
  });
  const BoxStyledPhone = styled(Box)({
    width: 53,
    height: 23,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    top: "calc(25% + 70px)",

    // alignSelf: "center",
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isSmallScreen ? (
        <BoxStyledPhone>
          <Link to="#">
            <img style={{ width: 24, height: 24 }} src={facebook} />
          </Link>
          <Link to="#">
            <img style={{ width: 24, height: 24 }} src={instagram} />
          </Link>
        </BoxStyledPhone>
      ) : (
        <BoxStyled>
          <Link to="#">
            <img style={{ width: 24, height: 24 }} src={facebook} />
          </Link>
          <Link to="#">
            <img style={{ width: 24, height: 24 }} src={instagram} />
          </Link>
        </BoxStyled>
      )}
    </>
  );
};
export default SocialLinks;

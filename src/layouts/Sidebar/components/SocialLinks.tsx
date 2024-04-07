import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import facebook from "@images/facebook.png";
import instagram from "@images/instagram.png";

const BoxStyled = styled(Box)(({ theme }) => {
  const smallScreenMediaQuery = theme.breakpoints.down("md");

  return {
    width: 24,
    height: 60,
    marginLeft: 24,
    marginBottom: 44,
    [smallScreenMediaQuery]: {
      width: 53,
      height: 23,
      display: "flex",
      justifyContent: "space-between",
      marginTop: 18,
      marginLeft: 0,
      marginBottom: 0,
    },
  };
});

const Image = styled("img")({
  width: 24,
  height: 24,
});

export default function SocialLinks() {
  return (
    <BoxStyled>
      <Link to="#">
        <Image alt="facebook" src={facebook} />
      </Link>
      <Link to="#">
        <Image alt="instagram" src={instagram} />
      </Link>
    </BoxStyled>
  );
}

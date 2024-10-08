import { cloneElement } from "react";
import { Link } from "react-router-dom";

import { Box, styled } from "@mui/material";

import FacebookIconSvg from "@/assets/icons/facebook.svg";
import InstagramIconSvg from "@/assets/icons/instagram.svg";

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

const socialLinksData = [
  {
    path: "#",
    icon: <FacebookIconSvg />,
  },
  {
    path: "#",
    icon: <InstagramIconSvg />,
  },
];

const iconStyles = {
  width: 24,
  height: 24,
};

export default function SocialLinks() {
  return (
    <BoxStyled>
      {socialLinksData.map(({ icon, path }, index) => (
        <Link key={index} to={path}>
          {cloneElement(icon, iconStyles)}
        </Link>
      ))}
    </BoxStyled>
  );
}

import { cloneElement } from "react";
import { Link } from "react-router-dom";

import FacebookIconSvg from "@/assets/icons/facebook.svg";
import InstagramIconSvg from "@/assets/icons/instagram.svg";

import {
  BoxStyled,
  iconStyles,
} from "@/layouts/sidebar/components/SocialLinks/SocialLinks.styled";

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

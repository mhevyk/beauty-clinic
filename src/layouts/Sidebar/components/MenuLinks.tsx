import { NavLink } from "react-router-dom";

import { Typography, styled } from "@mui/material";

import { menuItems } from "../data/menuItems";

const MenuWrapper = styled("ul")(({ theme }) => {
  const smallScreenMediaQuery = theme.breakpoints.down("md");

  return {
    marginTop: 300,
    marginLeft: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
    [smallScreenMediaQuery]: {
      gap: "25px",
      marginLeft: 0,
      marginTop: 0,
      "& li": {
        fontSize: "16px",
      },
    },
  };
});

type MenuLinkProps = {
  to: string;
};

const MenuLink = styled(NavLink)<MenuLinkProps>(({ theme, to }) => {
  const shouldHighlight = !to.includes("#");

  return {
    "&:active": {
      color: "unset",
    },
    "&.active": {
      color: shouldHighlight ? theme.palette.GrayPhoneNav.main : undefined,
    },
  };
});

type MenuLinksProps = {
  onClose: () => void;
};

export default function MenuLinks({ onClose }: MenuLinksProps) {
  return (
    <MenuWrapper>
      {menuItems.map((menuItem, index) => (
        <Typography
          fontSize="30px"
          variant="heading"
          component="li"
          key={index}
        >
          <MenuLink onClick={onClose} to={menuItem.path}>
            {menuItem.label}
          </MenuLink>
        </Typography>
      ))}
    </MenuWrapper>
  );
}

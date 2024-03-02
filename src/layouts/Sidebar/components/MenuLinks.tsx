import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { menuItems } from "../data/menuItems";

// TODO: Vasyl: fix styles
const MenuWrapper = styled("ul")(({ theme }) => {
  const smallScreenMediaQuery = theme.breakpoints.down("md");

  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "40px",
    [smallScreenMediaQuery]: {
      gap: "30px",
    },
  };
});

const MenuItem = styled("li")(({ theme }) => {
  return theme.typography.h6;
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
      color: shouldHighlight ? theme.palette.ButtonBlack.dark : undefined,
    },
  };
});

export default function MenuLinks() {
  return (
    <MenuWrapper>
      {menuItems.map((menuItem, index) => (
        <MenuItem key={index}>
          <MenuLink to={menuItem.path}>{menuItem.label}</MenuLink>
        </MenuItem>
      ))}
    </MenuWrapper>
  );
}

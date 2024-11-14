import { NavLink } from "react-router-dom";

import { styled } from "@mui/material";

export const MenuWrapper = styled("ul")(({ theme }) => {
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

export const MenuLink = styled(NavLink)<MenuLinkProps>(({ theme, to }) => {
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

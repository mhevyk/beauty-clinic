import * as React from "react";
import { Box, styled, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "@theme/theme.ts";

type MenuItem = {
  path: string;
  label: string;
};
const menuItems: MenuItem[] = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/",
    label: "Meet Lily",
  },
  {
    path: "/Treatments",
    label: "Treatments",
  },
  {
    path: "/Blog",
    label: "Blog",
  },
  {
    path: "/",
    label: "Contact",
  },
  {
    path: "/Members",
    label: "Members",
  },
];
const BoxStyled = styled(Box)({
  left: 80,
  width: 190,
  position: "absolute",
  bottom: 100,
  // height: "50vh",
});
const BoxStyledPhone = styled(Box)({
  width: 190,
  position: "absolute",
});

const MenuLinks: React.FC = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {isSmallScreen ? (
        <BoxStyledPhone>
          {menuItems.map((menuItems, index) => (
            <Link
              key={index}
              to={menuItems.path}
              color="secondary"
              style={{ color: "inherit" }}
            >
              <Typography variant="h6" style={{ margin: "40px 0" }}>
                <h3>{menuItems.label}</h3>
              </Typography>
            </Link>
          ))}
        </BoxStyledPhone>
      ) : (
        <BoxStyled>
          {menuItems.map((menuItems, index) => (
            <Link
              key={index}
              to={menuItems.path}
              color="secondary"
              style={{ color: "inherit" }}
            >
              <Typography variant="h6" style={{ margin: "-10px 0" }}>
                <h1>{menuItems.label}</h1>
              </Typography>
            </Link>
          ))}
        </BoxStyled>
      )}
    </>
  );
};
export default MenuLinks;

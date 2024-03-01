import { AppBar, styled, useMediaQuery } from "@mui/material";
import * as React from "react";
import BurgerButton from "@layouts/Sidebar/components/BurgerButton.tsx";
import Logo from "@layouts/Sidebar/components/Logo.tsx";
import SocialLinks from "@layouts/Sidebar/components/SocialLinks.tsx";
import DrawerMenu from "@layouts/Sidebar/components/DrawerMenu.tsx";
import theme from "@theme/theme.ts";

const SidebarStyled = styled(AppBar)({
  width: "78px",
  height: "100vh",
  left: 0,
  // position: "fixed",
  display: "flex",
});
const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      {!isSmallScreen && (
        <SidebarStyled elevation={0} color="primary">
          <BurgerButton toggleDrawer={toggleDrawer} />
          <Logo />
          <SocialLinks />
          <DrawerMenu open={open} toggleDrawer={toggleDrawer} />
        </SidebarStyled>
      )}
    </>
  );
};
export default Sidebar;

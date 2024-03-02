import { AppBar, styled, useMediaQuery } from "@mui/material";
import { useState } from "react";
import BurgerButton from "@layouts/Sidebar/components/BurgerButton.tsx";
import Logo from "@layouts/Sidebar/components/Logo.tsx";
import SocialLinks from "@layouts/Sidebar/components/SocialLinks.tsx";
import DrawerMenu from "@layouts/Sidebar/components/DrawerMenu.tsx";
import theme from "@theme/theme.ts";

const SidebarStyled = styled(AppBar)({
  width: "78px",
  height: "100vh",
  left: 0,
  display: "flex",
});

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (isSmallScreen) {
    return null;
  }

  return (
    <SidebarStyled elevation={0} color="primary">
      <BurgerButton openSidebar={() => setIsSidebarOpen(true)} />
      <Logo />
      <SocialLinks />
      <DrawerMenu
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </SidebarStyled>
  );
};
export default Sidebar;

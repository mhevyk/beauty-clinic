import { AppBar, styled, useMediaQuery } from "@mui/material";

import useToggle from "@/hooks/use-toggle/useToggle";
import BurgerButton from "@/layouts/sidebar/components/BurgerButton";
import DrawerMenu from "@/layouts/sidebar/components/DrawerMenu";
import Logo from "@/layouts/sidebar/components/Logo";
import SocialLinks from "@/layouts/sidebar/components/SocialLinks";
import theme from "@/theme/theme";

const SidebarStyled = styled(AppBar)({
  width: "78px",
  height: "100vh",
  left: 0,
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  zIndex: 30,
}) as typeof AppBar;

export default function Sidebar() {
  const { isOpen, open, close } = useToggle();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (isSmallScreen) {
    return null;
  }

  return (
    <SidebarStyled component="aside" elevation={0} color="primary">
      <BurgerButton openSidebar={open} />
      <Logo />
      <SocialLinks />
      <DrawerMenu isSidebarOpen={isOpen} onClose={close} />
    </SidebarStyled>
  );
}

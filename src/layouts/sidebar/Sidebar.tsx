import { useMediaQuery } from "@mui/material";

import SidebarDrawer from "@/containers/drawers/sidebar-drawer/SidebarDrawer";
import useToggle from "@/hooks/use-toggle/useToggle";
import { SidebarStyled } from "@/layouts/sidebar/Sidebar.styled";
import BurgerButton from "@/layouts/sidebar/components/BurgerButton/BurgerButton";
import Logo from "@/layouts/sidebar/components/Logo/Logo";
import SocialLinks from "@/layouts/sidebar/components/SocialLinks/SocialLinks";
import theme from "@/theme/theme";

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
      <SidebarDrawer isSidebarOpen={isOpen} onClose={close} />
    </SidebarStyled>
  );
}

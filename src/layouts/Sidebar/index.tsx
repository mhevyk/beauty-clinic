import { AppBar, styled, useMediaQuery } from "@mui/material";
import BurgerButton from "@layouts/Sidebar/components/BurgerButton.tsx";
import Logo from "@layouts/Sidebar/components/Logo.tsx";
import SocialLinks from "@layouts/Sidebar/components/SocialLinks.tsx";
import DrawerMenu from "@layouts/Sidebar/components/DrawerMenu.tsx";
import theme from "@theme/theme.ts";
import useToggle from "@hooks/useToggle";

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

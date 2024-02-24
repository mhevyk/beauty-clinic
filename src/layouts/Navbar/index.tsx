import { useState } from "react";
import { AppBar, Toolbar, Fade, styled, Box } from "@mui/material";
import BurgerButton from "./components/BurgerButton";
import MobileMenu from "./components/MobileMenu";
import { useLockPageScroll } from "./hooks/useLockPageScroll";

const BurgerButtonStyled = styled(BurgerButton)({
  position: "relative",
  zIndex: 100,
});

const BurgerMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setLocked } = useLockPageScroll();

  function toggleMobileMenu() {
    const nextIsOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextIsOpen);
    setLocked(nextIsOpen);
  }

  return (
    <>
      {/* TODO: change styles, change color when theme is ready */}
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
          {/* TODO: remove Box, its just for test */}
          <Box sx={{ flexGrow: 1 }}>Hi</Box>
          <BurgerButtonStyled
            isActive={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </Toolbar>
      </AppBar>
      <Fade in={isMobileMenuOpen} timeout={400} mountOnEnter>
        <MobileMenu />
      </Fade>
    </>
  );
};

export default BurgerMenu;

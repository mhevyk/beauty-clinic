import { useState } from "react";
import { AppBar, Toolbar, Fade, styled } from "@mui/material";
import BurgerButton from "./components/BurgerButton";
import MobileMenu from "./components/MobileMenu";

const BurgerButtonStyled = styled(BurgerButton)({
  position: "relative",
  zIndex: 100,
});

const BurgerMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <>
      {/* TODO: change styles, change color when theme is ready */}
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
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

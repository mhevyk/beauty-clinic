import { useEffect } from "react";
import { AppBar, Toolbar, styled, Box, useMediaQuery } from "@mui/material";
import BurgerButton from "./components/BurgerButton";
import MobileMenu from "./components/MobileMenu";
import CartDrawerButton from "./components/Cart/CartDrawerButton";
import { Link } from "react-router-dom";
import theme from "@theme/theme";
import useToggle from "@hooks/useToggle";
import LoginButton from "@components/LoginButton.tsx";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  padding: "16px 0 8px",
  zIndex: "auto",
  [theme.breakpoints.down("md")]: {
    backgroundColor: "white",
  },
}));

const LinkStyled = styled(Link)({
  transition: "color 400ms",
});

const LogoLink = styled(LinkStyled)({
  ...theme.typography.heading,
  fontSize: "22px",
});

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginRight: "35px",
  },
}));

export default function BurgerMenu() {
  const { isOpen, toggle, close } = useToggle();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!isSmallScreen) {
      close();
    }
  }, [isSmallScreen, close]);

  const visibility = isOpen ? "hidden" : "visible";

  return (
    <>
      <AppBarStyled
        position={isSmallScreen ? "static" : "absolute"}
        elevation={0}
        color="transparent"
      >
        <ToolbarStyled>
          {/* Added box for proper logo focus state and pushing rest icons to right */}
          <Box sx={{ flexGrow: 1, visibility }}>
            {isSmallScreen && <LogoLink to="/">Lily.</LogoLink>}
          </Box>
          {!isSmallScreen && <LoginButton sx={{ marginRight: "20px" }} />}
          <CartDrawerButton visibility={visibility} />
          {isSmallScreen && <BurgerButton isActive={isOpen} onClick={toggle} />}
        </ToolbarStyled>
      </AppBarStyled>
      <MobileMenu isOpen={isOpen} onClose={close} />
    </>
  );
}

import { useEffect } from "react";

import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

import UserToolbar from "@/containers/user-toolbar/UserToolbar";
import useToggle from "@/hooks/use-toggle/useToggle";
import {
  AppBarStyled,
  LogoLink,
  ToolbarStyled,
} from "@/layouts/navbar/Navbar.styled";
import theme from "@/theme/theme";

import CartDrawerButton from "../../containers/drawers/cart-drawer/components/CartDriwerButton/CartDrawerButton";
import BurgerButton from "./components/BurgerButton/BurgerButton";
import MobileMenu from "./components/MobileMenu/MobileMenu";

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
          {/* TODO: fix styles */}
          {!isSmallScreen && (
            <Box
              sx={{
                marginRight: "12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <UserToolbar />
            </Box>
          )}
          <CartDrawerButton visibility={visibility} />
          {isSmallScreen && <BurgerButton isActive={isOpen} onClick={toggle} />}
        </ToolbarStyled>
      </AppBarStyled>
      <MobileMenu isOpen={isOpen} onClose={close} />
    </>
  );
}

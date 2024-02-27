import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Fade,
  styled,
  Box,
  useMediaQuery,
} from "@mui/material";
import BurgerButton from "./components/BurgerButton";
import MobileMenu from "./components/MobileMenu";
import { useLockPageScroll } from "./hooks/useLockPageScroll";
import CartIconButton from "./components/CartIcon";
import { Link } from "react-router-dom";
import userIcon from "@icons/user-icon.svg";
import theme from "@theme/theme";

const AppBarStyled = styled(AppBar)({
  padding: "16px 0 8px",
});

const BurgerButtonStyled = styled(BurgerButton)({
  position: "relative",
  zIndex: 100,
});

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary.dark,
  transition: "color 400ms",
  "&:active": {
    color: "rgb(199, 179, 163)",
  },
}));

const LogoLink = styled(LinkStyled)({
  fontSize: "22px",
  fontWeight: 700,
});

const LoginLink = styled(LinkStyled)({
  display: "flex",
  alignItems: "center",
  gap: 14,
  "&:hover": {
    color: "rgb(199, 179, 163)",
  },
  marginRight: 20,
});

const UserIcon = styled("img")({
  width: 25,
  height: 25,
});

const BurgerMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setLocked } = useLockPageScroll();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  function toggleMobileMenu() {
    const nextIsOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextIsOpen);
    setLocked(nextIsOpen);
  }

  return (
    <>
      {/* TODO: change styles, change color when theme is ready */}
      <AppBarStyled position="static" elevation={0} color="primary">
        <Toolbar>
          {/* Added box for proper logo focus state and pushing rest icons to right */}
          <Box sx={{ flexGrow: 1 }}>
            {isSmallScreen && <LogoLink to="/">Lily.</LogoLink>}
          </Box>
          {!isSmallScreen && (
            <LoginLink to="/auth/login">
              Log In
              <UserIcon src={userIcon} alt="User icon" />
            </LoginLink>
          )}
          <CartIconButton />
          {isSmallScreen && (
            <BurgerButtonStyled
              isActive={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          )}
        </Toolbar>
      </AppBarStyled>
      <Fade in={isMobileMenuOpen} timeout={400} mountOnEnter>
        <MobileMenu />
      </Fade>
    </>
  );
};

export default BurgerMenu;

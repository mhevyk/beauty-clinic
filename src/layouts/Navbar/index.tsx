import { useEffect } from "react";
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
import CartDrawerButton from "./components/CartDrawerButton";
import { Link } from "react-router-dom";
import userIcon from "@icons/user-icon.svg";
import theme from "@theme/theme";
import { useMobileMenu } from "./hooks/useIsMobileMenuOpen";

const AppBarStyled = styled(AppBar)(({ theme }) => {
  const smallScreenMediaQuery = theme.breakpoints.down("md");
  return {
    padding: "16px 0 8px",
    zIndex: "auto",
    [smallScreenMediaQuery]: {
      backgroundColor: "white",
    },
  };
});

const LinkStyled = styled(Link)({
  transition: "color 400ms",
});

const LogoLink = styled(LinkStyled)({
  ...theme.typography.FontArialBlack2,
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

const ToolbarStyled = styled(Toolbar)(({ theme }) => {
  const smallScreenMediaQuery = theme.breakpoints.up("md");
  return {
    [smallScreenMediaQuery]: {
      marginRight: "35px",
    },
  };
});

export default function BurgerMenu() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useMobileMenu();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!isSmallScreen) {
      closeMobileMenu();
    }
  }, [isSmallScreen]);

  const visibility = isMobileMenuOpen ? "hidden" : "visible";

  return (
    <>
      {/* TODO: change styles, change color when theme is ready */}
      <AppBarStyled position="absolute" elevation={0} color="Transparent">
        <ToolbarStyled>
          {/* Added box for proper logo focus state and pushing rest icons to right */}
          <Box sx={{ flexGrow: 1, visibility }}>
            {isSmallScreen && <LogoLink to="/">Lily.</LogoLink>}
          </Box>
          {!isSmallScreen && (
            <LoginLink to="/auth/login">
              Log In
              <UserIcon src={userIcon} alt="User icon" />
            </LoginLink>
          )}
          <CartDrawerButton visibility={visibility} />
          {isSmallScreen && (
            <BurgerButton
              isActive={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          )}
        </ToolbarStyled>
      </AppBarStyled>
      <Fade in={isMobileMenuOpen} timeout={400} mountOnEnter>
        <MobileMenu onClose={closeMobileMenu} />
      </Fade>
    </>
  );
}

import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Box,
  useMediaQuery,
  Button,
  CircularProgress,
} from "@mui/material";
import BurgerButton from "./components/BurgerButton";
import MobileMenu from "./components/MobileMenu";
import CartDrawerButton from "./components/CartDrawerButton";
import { Link } from "react-router-dom";
import UserIconSvg from "@icons/user-icon.svg?react";
import theme from "@theme/theme";
import useToggle from "@hooks/useToggle";
import { useUser } from "@context/AuthContext";

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

const LoginLink = styled(LinkStyled)({
  display: "flex",
  alignItems: "center",
  gap: 14,
  "&:hover": {
    color: "rgb(199, 179, 163)",
  },
  marginRight: 20,
});

const UserIcon = styled(UserIconSvg)({
  width: 25,
  height: 25,
});

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginRight: "35px",
  },
}));

export default function BurgerMenu() {
  const { isOpen, toggle, close } = useToggle();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, isAuthenticating, logout } = useUser();

  useEffect(() => {
    if (!isSmallScreen) {
      close();
    }
  }, [isSmallScreen]);

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
          {/* TODO: change UI */}
          {!isSmallScreen && (
            <>
              {isAuthenticating ? (
                <CircularProgress color="secondary" size={25} />
              ) : isAuthenticated ? (
                <Button sx={{ border: "1px solid black" }} onClick={logout}>
                  Log out
                </Button>
              ) : (
                <LoginLink to="/auth/signin">
                  Log In
                  <UserIcon />
                </LoginLink>
              )}
            </>
          )}
          <CartDrawerButton visibility={visibility} />
          {isSmallScreen && <BurgerButton isActive={isOpen} onClick={toggle} />}
        </ToolbarStyled>
      </AppBarStyled>
      <MobileMenu isOpen={isOpen} onClose={close} />
    </>
  );
}

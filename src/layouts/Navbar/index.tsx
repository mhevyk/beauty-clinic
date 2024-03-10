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
import { useLockPageScroll } from "./hooks/useLockPageScroll";
import CartIconButton from "./components/CartIcon";
import { Link } from "react-router-dom";
import userIcon from "@icons/user-icon.svg";
import theme from "@theme/theme";
import useToggle from "@hooks/useToggle";

const AppBarStyled = styled(AppBar)({
  padding: "16px 0 8px",
  zIndex: 20,
});

const LinkStyled = styled(Link)({
  transition: "color 400ms",
});

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

export default function BurgerMenu() {
  const { isOpen, setIsOpen, close } = useToggle();
  const { setLocked } = useLockPageScroll();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  function toggleMobileMenu() {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    setLocked(nextIsOpen);
  }

  useEffect(() => {
    if (!isSmallScreen) {
      close();
    }
  }, [isSmallScreen]);

  const visibility = isOpen ? "hidden" : "visible";

  return (
    <>
      {/* TODO: change styles, change color when theme is ready */}
      <AppBarStyled position="absolute" elevation={0} color="Transparent">
        <Toolbar sx={{ marginRight: "35px" }}>
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
          <CartIconButton visibility={visibility} />
          {isSmallScreen && (
            <BurgerButton isActive={isOpen} onClick={toggleMobileMenu} />
          )}
        </Toolbar>
      </AppBarStyled>
      <Fade in={isOpen} timeout={400} mountOnEnter>
        <MobileMenu onClose={toggleMobileMenu} />
      </Fade>
    </>
  );
}

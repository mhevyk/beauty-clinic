import { Button, CircularProgress, styled } from "@mui/material";
import { Link } from "react-router-dom";
import UserIconSvg from "@icons/user-icon.svg?react";
import { ComponentPropsWithoutRef } from "react";
import { useUserStore } from "@store/user/userStore";

const LinkStyled = styled(Link)({
  transition: "color 400ms",
});

const UserIcon = styled(UserIconSvg)({
  width: 25,
  height: 25,
});

const LoginLink = styled(LinkStyled)({
  display: "flex",
  alignItems: "center",
  gap: 14,
  "&:hover": {
    color: "rgb(199, 179, 163)",
  },
});

export default function LoginButton(
  props: Omit<ComponentPropsWithoutRef<typeof LoginLink>, "to">
) {
  const isAuthenticated = useUserStore((store) => store.checkAuthenticated());
  const isAuthenticating = useUserStore((store) => store.isAuthenticating);
  const logout = useUserStore((store) => store.logout);

  // TODO: change styling
  if (isAuthenticating) {
    return <CircularProgress color="secondary" size={25} />;
  }

  // TODO: change style
  if (isAuthenticated) {
    return (
      <Button variant="primary" onClick={logout}>
        Logout
      </Button>
    );
  }

  return (
    <LoginLink {...props} to="/auth/signin">
      Log In
      <UserIcon />
    </LoginLink>
  );
}

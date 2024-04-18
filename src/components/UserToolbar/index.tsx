import { CircularProgress, IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";
import UserIconSvg from "@icons/user-icon.svg?react";
import { ComponentPropsWithoutRef } from "react";
import { useUserStore } from "@store/user/userStore";
import BellIconSvg from "@icons/bell.svg?react";
import MyAccountButton from "./components/MyAccountButton";

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

type UserToolbarProps = Omit<ComponentPropsWithoutRef<typeof LoginLink>, "to">;

// TODO: complete design for mobile
export default function UserToolbar(props: UserToolbarProps) {
  const isAuthenticated = useUserStore((store) => store.checkAuthenticated());
  const isAuthenticating = useUserStore((store) => store.isAuthenticating);

  if (isAuthenticating) {
    return <CircularProgress color="secondary" size={25} />;
  }

  if (isAuthenticated) {
    return (
      <>
        <MyAccountButton />
        <IconButton>
          <BellIconSvg style={{ width: "25px", height: "25px" }} />
        </IconButton>
      </>
    );
  }

  return (
    <LoginLink {...props} to="/auth/signin">
      Log In
      <UserIcon />
    </LoginLink>
  );
}

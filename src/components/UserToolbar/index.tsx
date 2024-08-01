import { ComponentPropsWithoutRef } from "react";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";

import BellIconSvg from "@/assets/icons/bell.svg";
import UserIconSvg from "@/assets/icons/user-icon.svg";

import AppLink from "@/components/AppLink";
import { useUserStore } from "@/store/user/userStore";

import MyAccountButton from "./components/MyAccountButton";

const LinkStyled = styled(AppLink)(({ theme }) => ({
  transition: "color 400ms",
  color: theme.palette.secondary.main,
  "&:hover": {
    textDecoration: "none",
  },
}));

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

export default function UserToolbar(props: UserToolbarProps) {
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());
  const isAuthenticating = useUserStore(store => store.isAuthenticating);

  if (isAuthenticating) {
    return <CircularProgress color="secondary" size={25} />;
  }

  if (isAuthenticated) {
    return (
      <Box display="flex">
        <MyAccountButton />
        <IconButton>
          <BellIconSvg style={{ width: "25px", height: "25px" }} />
        </IconButton>
      </Box>
    );
  }

  return (
    <LoginLink {...props} to="/auth/signin">
      Log In
      <UserIcon />
    </LoginLink>
  );
}

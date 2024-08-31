import { ComponentPropsWithoutRef } from "react";

import { styled } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";

import BellIconSvg from "@/assets/icons/bell.svg";
import UserIconSvg from "@/assets/icons/user-icon.svg";

import AppLink from "@/components/app-link/AppLink";
import MyAccountButton from "@/containers/user-toolbar/components/MyAccountButton.tsx";
import { useUserStore } from "@/store/user/userStore";

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

// TODO: complete design for mobile
export default function UserToolbar(props: UserToolbarProps) {
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());
  const isAuthenticating = useUserStore(store => store.isAuthenticating);

  if (isAuthenticating) {
    return (
      <CircularProgress
        color="secondary"
        size={25}
        data-testid="circular-progress"
      />
    );
  }

  if (isAuthenticated) {
    return (
      <>
        <MyAccountButton />
        <IconButton>
          <BellIconSvg
            style={{ width: "25px", height: "25px" }}
            data-testid="bell-icon-svg"
          />
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

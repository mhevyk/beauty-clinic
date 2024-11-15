import { ComponentPropsWithoutRef } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";

import BellIconSvg from "@/assets/icons/bell.svg";

import {
  LoginLink,
  UserIcon,
} from "@/containers/user-toolbar/UserToolbar.styled";
import MyAccountButton from "@/containers/user-toolbar/components/MyAccountButton.tsx";
import { useUserStore } from "@/store/user/userStore";

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

import { MouseEventHandler } from "react";

import { Avatar, Button, styled } from "@mui/material";

import PointerDownIconSvg from "@/assets/icons/pointer-down.svg";

import useCurrentUser from "@/hooks/auth/useCurrentUser";

import getAvatarLabel from "../utils/getAvatarLabel";
import textToColor from "../utils/textToColor";

type AvatarStyledProps = {
  username: string;
};

const AvatarStyled = styled(Avatar)<AvatarStyledProps>(({ username }) => ({
  backgroundColor: textToColor(username),
  width: 32,
  height: 32,
  fontSize: "12px",
}));

type UserActionsMenuTogglerProps = {
  isOpen: boolean;
  id: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function UserActionsMenuToggler({
  onClick,
  isOpen,
  id,
}: UserActionsMenuTogglerProps) {
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  // TODO: fix styles on focus and improve on hover
  return (
    <Button
      size="large"
      onClick={onClick}
      id={`${id}-button`}
      aria-controls={isOpen ? `${id}-menu` : undefined}
      aria-expanded={isOpen ? "true" : undefined}
      aria-haspopup="true"
      startIcon={<PointerDownIconSvg width={15} height={15} />}
      sx={{ padding: 0, gap: "4px" }}
    >
      <AvatarStyled username={user.username}>
        {getAvatarLabel(user.username)}
      </AvatarStyled>
    </Button>
  );
}

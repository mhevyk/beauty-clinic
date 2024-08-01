import { MouseEventHandler, useRef } from "react";

import { styled } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import PointerDownIconSvg from "@/assets/icons/pointer-down.svg";

import useCurrentUser from "@/hooks/use-current-user/useCurrentUser";

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

  const iconButtonRef = useRef(null);

  const handleButtonFocus = () => {
    if (iconButtonRef.current) {
      iconButtonRef.current.focus();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Button
      onFocus={handleButtonFocus}
      size="large"
      onClick={onClick}
      id={`${id}-button`}
      aria-controls={isOpen ? `${id}-menu` : undefined}
      aria-expanded={isOpen ? "true" : undefined}
      aria-haspopup="true"
      startIcon={<PointerDownIconSvg width={15} height={15} />}
      sx={{
        padding: 0,
        gap: "4px",
      }}
    >
      <IconButton ref={iconButtonRef}>
        <AvatarStyled username={user.username}>
          {getAvatarLabel(user.username)}
        </AvatarStyled>
      </IconButton>
    </Button>
  );
}

import { MouseEvent, useId, useState } from "react";

import useLockPageScroll from "@/hooks/useLockPageScroll";

import UserActionsMenu from "./UserActionsMenu";
import UserActionsMenuToggler from "./UserActionsMenuToggler";

export default function MyAccountButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const id = useId();

  const isOpen = Boolean(anchorEl);
  useLockPageScroll(isOpen);

  function handleMenuOpen(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <UserActionsMenuToggler
        onClick={handleMenuOpen}
        isOpen={isOpen}
        id={id}
      />
      <UserActionsMenu
        anchorEl={anchorEl}
        isOpen={isOpen}
        handleClose={handleMenuClose}
        id={id}
      />
    </>
  );
}

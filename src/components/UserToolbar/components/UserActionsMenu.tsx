import Divider from "@mui/material/Divider";
import Menu, {MenuProps} from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useUserStore } from "@/store/user/userStore";

type UserActionsMenuProps = Pick<MenuProps, "anchorEl"> & {
  isOpen: boolean;
  handleClose: () => void;
  id: string;
};

export default function UserActionsMenu({
  anchorEl,
  isOpen,
  handleClose,
  id,
}: UserActionsMenuProps) {
  const logout = useUserStore(store => store.logout);

  async function logoutAndCloseMenu() {
    await logout();
    handleClose();
  }

  return (
    <Menu
      id={`${id}-menu`}
      MenuListProps={{
        "aria-labelledby": `${id}-button`,
      }}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      onClick={handleClose}
      disableScrollLock
      transformOrigin={{
        horizontal: "left",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      sx={{ mt: 1 }}
    >
      {/* TODO: complete pages */}
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My bookings</MenuItem>
      <MenuItem onClick={handleClose}>My drafts</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={logoutAndCloseMenu}>Log Out</MenuItem>
    </Menu>
  );
}

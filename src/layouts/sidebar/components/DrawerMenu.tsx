import { Box, Drawer, IconButton, styled } from "@mui/material";

import CloseIconSvg from "@/assets/icons/close-icon.svg";

import useLockPageScroll from "@/hooks/useLockPageScroll";
import MenuLinks from "@/layouts/sidebar/components/MenuLinks";

const CloseIcon = styled(CloseIconSvg)({
  position: "relative",
  cursor: "pointer",
  width: 25,
  height: 28,
});

const IconButtonStyled = styled(IconButton)({
  left: 360,
  top: 50,
});

const MenuWrapper = styled(Box)({
  width: 430,
});

type DrawerMenuProps = {
  isSidebarOpen: boolean;
  onClose: () => void;
};

export default function DrawerMenu({
  isSidebarOpen,
  onClose,
}: DrawerMenuProps) {
  useLockPageScroll(isSidebarOpen);

  return (
    <Drawer
      transitionDuration={400}
      open={isSidebarOpen}
      onClose={onClose}
      disableScrollLock
    >
      <MenuWrapper>
        <IconButtonStyled onClick={onClose}>
          <CloseIcon />
        </IconButtonStyled>
        <MenuLinks onClose={onClose} />
      </MenuWrapper>
    </Drawer>
  );
}
import { Drawer } from "@mui/material";

import {
  CloseIcon,
  IconButtonStyled,
  MenuWrapper,
} from "@/containers/drawers/sidebar-drawer/SidebarDrawer.styled";
import useLockPageScroll from "@/hooks/use-lock-page-scroll/useLockPageScroll";
import MenuLinks from "@/layouts/sidebar/components/MenuLinks/MenuLinks";

type SidebarDrawerProps = {
  isSidebarOpen: boolean;
  onClose: () => void;
};

export default function SidebarDrawer({
  isSidebarOpen,
  onClose,
}: SidebarDrawerProps) {
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

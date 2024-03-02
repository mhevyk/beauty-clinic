import closebutton from "@icons/close-icon.svg";
import { Box, Drawer, styled } from "@mui/material";
import MenuLinks from "@layouts/Sidebar/components/MenuLinks.tsx";

const CloseIcon = styled("img")({
  position: "relative",
  left: 360,
  margin: "52px 0 10px 0",
  cursor: "pointer",
  width: 25,
  height: 28,
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
  return (
    <Drawer open={isSidebarOpen} onClose={onClose}>
      <MenuWrapper>
        <CloseIcon src={closebutton} alt="Close icon" onClick={onClose} />
        <MenuLinks />
      </MenuWrapper>
    </Drawer>
  );
}

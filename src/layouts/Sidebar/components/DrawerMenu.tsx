import closebutton from "@icons/close-icon.svg";
import { Box, Drawer, IconButton, styled } from "@mui/material";
import MenuLinks from "@layouts/Sidebar/components/MenuLinks.tsx";

const CloseIcon = styled("img")({
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
  return (
    <Drawer transitionDuration={400} open={isSidebarOpen} onClose={onClose}>
      <MenuWrapper>
        <IconButtonStyled onClick={onClose}>
          <CloseIcon src={closebutton} alt="Close icon" />
        </IconButtonStyled>
        <MenuLinks onClose={onClose} />
      </MenuWrapper>
    </Drawer>
  );
}

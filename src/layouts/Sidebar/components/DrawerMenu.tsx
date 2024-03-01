import closebutton from "@icons/close-icon.svg";
import { Box, Drawer } from "@mui/material";
import MenuLinks from "@layouts/Sidebar/components/MenuLinks.tsx";

const DrawerMenu = ({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: () => void;
}) => {
  const DrawerOpened = (
    <Box sx={{ width: 430 }} role="presentation">
      <img
        style={{
          position: "relative",
          left: 360,
          margin: "52px 0 10px 0",
          cursor: "pointer",
          width: 25,
          height: 28,
        }}
        src={closebutton}
        onClick={toggleDrawer}
      />
      <MenuLinks />
    </Box>
  );
  return (
    <Drawer open={open} onClose={toggleDrawer}>
      {DrawerOpened}
    </Drawer>
  );
};
export default DrawerMenu;

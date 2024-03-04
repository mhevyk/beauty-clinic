import { Box, BoxProps, styled } from "@mui/material";
import { ElementRef, forwardRef } from "react";
import MenuLinks from "@layouts/Sidebar/components/MenuLinks.tsx";
import SocialLinks from "@layouts/Sidebar/components/SocialLinks.tsx";

// TODO: change UI
const MobileMenuOverlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  background: theme.palette.PinkMarbleSky.main,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  fontSize: "1.2rem",
  textAlign: "center",
  height: "100vh",
}));

type MobileMenuProps = {
  onClose: () => void;
};

const MobileMenu = forwardRef<
  ElementRef<typeof Box>,
  BoxProps & MobileMenuProps
>(({ onClose, ...props }, ref) => {
  return (
    <MobileMenuOverlay ref={ref} {...props}>
      <MenuLinks onClose={onClose} />
      <SocialLinks />
    </MobileMenuOverlay>
  );
});

export default MobileMenu;

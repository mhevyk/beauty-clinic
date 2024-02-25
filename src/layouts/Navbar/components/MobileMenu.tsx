import { Box, BoxProps, styled } from "@mui/material";
import { ElementRef, forwardRef } from "react";

// TODO: change UI
const MobileMenuOverlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  background: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  fontSize: "1.2rem",
  textAlign: "center",
}));

const MobileMenu = forwardRef<ElementRef<typeof Box>, BoxProps>(
  (props, ref) => {
    return (
      <MobileMenuOverlay ref={ref} {...props}>
        My mobile menu
      </MobileMenuOverlay>
    );
  }
);

export default MobileMenu;

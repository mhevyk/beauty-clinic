import { Dialog, DialogContent, styled } from "@mui/material";

import UserToolbar from "@/components/UserToolbar";
import useLockPageScroll from "@/hooks/useLockPageScroll";
import MenuLinks from "@/layouts/Sidebar/components/MenuLinks.tsx";
import SocialLinks from "@/layouts/Sidebar/components/SocialLinks.tsx";

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  background: theme.palette.PinkMarbleSky.main,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: 0,
}));

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useLockPageScroll(isOpen);

  return (
    <Dialog open={isOpen} fullScreen transitionDuration={400} disableScrollLock>
      <DialogContentStyled>
        <UserToolbar />
        <MenuLinks onClose={onClose} />
        <SocialLinks />
      </DialogContentStyled>
    </Dialog>
  );
}

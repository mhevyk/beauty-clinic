import Dialog from "@mui/material/Dialog";

import UserToolbar from "@/containers/user-toolbar/UserToolbar";
import useLockPageScroll from "@/hooks/use-lock-page-scroll/useLockPageScroll";
import { DialogContentStyled } from "@/layouts/navbar/components/MobileMenu/MobileMenu.styled";
import MenuLinks from "@/layouts/sidebar/components/MenuLinks/MenuLinks";
import SocialLinks from "@/layouts/sidebar/components/SocialLinks/SocialLinks";

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

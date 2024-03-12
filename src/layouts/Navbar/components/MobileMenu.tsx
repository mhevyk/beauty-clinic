import { Dialog, DialogContent, styled } from "@mui/material";
import MenuLinks from "@layouts/Sidebar/components/MenuLinks.tsx";
import SocialLinks from "@layouts/Sidebar/components/SocialLinks.tsx";
import useLockPageScroll from "@hooks/useLockPageScroll";

// TODO: change UI
const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  // TODO: fix type
  // @ts-expect-error
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
        <MenuLinks onClose={onClose} />
        <SocialLinks />
      </DialogContentStyled>
    </Dialog>
  );
}

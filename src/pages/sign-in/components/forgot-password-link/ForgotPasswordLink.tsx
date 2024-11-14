import Typography from "@mui/material/Typography";

import ForgotPasswordModal from "@/containers/modals/forgot-password-modal/ForgotPasswordModal";
import useToggle from "@/hooks/use-toggle/useToggle.ts";
import { ForgotPasswordLinkStyled } from "@/pages/sign-in/components/forgot-password-link/ForgotPasswordLink.styled";

export default function ForgotPasswordLink() {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      {/* TODO: change theme to make it work */}
      {/* @ts-expect-error TODO: change theme to make it work */}
      <ForgotPasswordLinkStyled
        component={Typography}
        variant="accent"
        onClick={open}
      >
        Forgot password?
      </ForgotPasswordLinkStyled>
      <ForgotPasswordModal isOpen={isOpen} handleClose={close} />
    </>
  );
}

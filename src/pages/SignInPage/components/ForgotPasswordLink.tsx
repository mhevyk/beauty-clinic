import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";

import AppLink from "@/components/AppLink";
import useToggle from "@/hooks/useToggle";

import ForgotPasswordModal from "./ForgotPasswordModal";

const ForgotPasswordLinkStyled = styled(AppLink)({
  display: "block",
  marginTop: "16px",
  textAlign: "right",
  cursor: "pointer",
});

export default function ForgotPasswordLink() {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <ForgotPasswordLinkStyled
        component={Typography}
        variant="accent"
        onClick={open}
        to=""
      >
        Forgot password?
      </ForgotPasswordLinkStyled>
      <ForgotPasswordModal isOpen={isOpen} handleClose={close} />
    </>
  );
}

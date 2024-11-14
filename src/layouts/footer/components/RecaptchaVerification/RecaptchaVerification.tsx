import ReCAPTCHA from "react-google-recaptcha";

import useMediaQuery from "@mui/material/useMediaQuery";

import { HumanVerificationModalProps } from "@/containers/modals/human-verication-modal/HumanVerificationModal";
import {
  DialogContentTextStyled,
  ReCAPTCHABox,
} from "@/layouts/footer/components/RecaptchaVerification/RecaptchaVerification.styled";
import { useRecaptcha } from "@/layouts/footer/hooks/useRecaptcha";
import theme from "@/theme/theme";

type DialogInnerProps = Pick<HumanVerificationModalProps, "handleConfirm">;

export default function RecaptchaVerification({
  handleConfirm,
}: DialogInnerProps) {
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(304));
  const recaptchaRefCallback = useRecaptcha();

  async function confirmContactForm(token: string | null) {
    if (token === null) {
      return;
    }

    setTimeout(() => handleConfirm(token), 600);
  }

  return (
    <>
      <DialogContentTextStyled as="p">
        Please confirm you&apos;re human.
      </DialogContentTextStyled>
      <ReCAPTCHABox>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_APP_RECAPTCHA_KEY}
          ref={recaptchaRefCallback}
          onChange={confirmContactForm}
          size={isVerySmallScreen ? "compact" : "normal"}
        />
      </ReCAPTCHABox>
    </>
  );
}

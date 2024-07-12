import ReCAPTCHA from "react-google-recaptcha";

import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";
import { styled } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "@/theme/theme";

import { HumanVerificationModalProps } from "../..";
import { useRecaptcha } from "./hooks/useRecaptcha";

const DialogContentTextStyled = styled(DialogContentText)(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "17px",
  color: theme.palette.text.primary,
  margin: "0 0 28px 0",
  lineHeight: 1.4,
  textAlign: "center",
}));

const ReCAPTCHABox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(350)]: {
    transform: "scale(0.7)",
  },
}));

type DialogInnerProps = Pick<HumanVerificationModalProps, "handleConfirm">;

export function RecaptchaVerification({ handleConfirm }: DialogInnerProps) {
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
        Please confirm you're human.
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

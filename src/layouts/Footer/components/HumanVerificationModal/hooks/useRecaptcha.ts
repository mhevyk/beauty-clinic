import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function useRecaptcha() {
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  function getRecaptchaKey() {
    const recaptchaElement = captchaRef.current;
    if (!recaptchaElement) {
      return;
    }

    const captchaKey = recaptchaElement.getValue();
    if (captchaKey === null) {
      return;
    }

    return captchaKey;
  }

  return [captchaRef, getRecaptchaKey] as const;
}

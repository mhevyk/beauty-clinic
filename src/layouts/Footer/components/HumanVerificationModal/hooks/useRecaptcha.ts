import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type ReCAPTCHAWithCaptcha = ReCAPTCHA & {
  captcha: HTMLDivElement;
};

export function useRecaptcha() {
  const recaptchaRef = useRef<ReCAPTCHAWithCaptcha | null>(null);

  // remove iframes created by google-recaptcha by removing recaptcha container
  useEffect(() => {
    return () => {
      const recaptcha = recaptchaRef.current;
      if (!recaptcha) {
        return;
      }

      recaptcha.reset();
      recaptcha.captcha.remove();
    };
  });

  function getToken() {
    return recaptchaRef.current?.getValue() ?? null;
  }

  return [recaptchaRef, getToken] as const;
}

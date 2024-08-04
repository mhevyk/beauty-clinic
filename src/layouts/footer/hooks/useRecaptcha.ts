import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export function useRecaptcha() {
  const [recaptcha, setRecaptcha] = useState<ReCAPTCHA | null>(null);

  // remove iframes created by google-recaptcha by removing recaptcha container
  useEffect(() => {
    return () => {
      recaptcha?.reset();
    };
  });

  const recaptchaRefCallback = (ref: ReCAPTCHA | null) => setRecaptcha(ref);

  return recaptchaRefCallback;
}

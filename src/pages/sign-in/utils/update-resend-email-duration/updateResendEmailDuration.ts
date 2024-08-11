import {
  RESEND_EMAIL_MAX_SECONDS,
  RESEND_EMAIL_STEP_SECONDS,
} from "@/pages/sign-in/constants";

export default function updateResendEmailDuration(
  currentClick: number,
  seconds: number
) {
  if (currentClick % 2 === 0 && seconds < RESEND_EMAIL_MAX_SECONDS) {
    seconds += RESEND_EMAIL_STEP_SECONDS;
    return seconds;
  }

  return seconds;
}

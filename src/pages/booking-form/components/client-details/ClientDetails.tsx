import AppLink from "design-system/app-link/app-link";
import AppTypography from "design-system/app-typography/AppTypography";

import { useUserStore } from "@/store/user/userStore";

import "./ClientDetails.scss";

export default function ClientDetails() {
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <AppTypography className="login-prompt__title">
        Tell us a bit about yourself
      </AppTypography>
      <div className="login-prompt__container">
        <AppTypography inline>Already have an account?</AppTypography>{" "}
        <AppLink to="/auth/signin">
          <AppTypography inline underline>
            Log In
          </AppTypography>
        </AppLink>{" "}
        <AppTypography inline>for faster booking.</AppTypography>
      </div>
    </>
  );
}

import classNames from "classnames";

import Spinner from "@/assets/icons/spinner.svg";

import { APP_COLORS } from "@/styles";
import "@/styles/app-spinner/AppSpinner.scss";
import { AppSpinnerProps } from "@/styles/app-spinner/AppSpinner.types.ts";
import AppTypography from "@/styles/app-typography/AppTypography.tsx";

function AppSpinner({
  size = "md",
  color = "primary",
  fullScreen = false,
  label,
}: AppSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      className={classNames("app-spinner", {
        "app-spinner--full-screen": fullScreen,
      })}
    >
      <Spinner
        stroke={color === "primary" ? APP_COLORS.primary : APP_COLORS.secondary}
        className={classNames(`app-spinner--${size}`)}
      />
      {label && (
        <AppTypography
          fontWeight="bold"
          variant={size === "md" ? "caption" : "body"}
        >
          {label}
        </AppTypography>
      )}
    </div>
  );
}

export default AppSpinner;

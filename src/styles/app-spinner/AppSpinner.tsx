import { Icon } from "@iconify/react";

import classNames from "classnames";

import "@/styles/app-spinner/AppSpinner.scss";
import { AppSpinnerProps } from "@/styles/app-spinner/AppSpinner.types.ts";

function AppSpinner({
  size = "md",
  variant = "primary",
  fullScreen = false,
}: AppSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={classNames("app-spinner", {
        "app-spinner--full-screen": fullScreen,
      })}
    >
      <Icon
        icon={`line-md:loading-loop`}
        color={variant === "secondary" ? "white" : "black"}
        className={classNames(`app-spinner--${size}`)}
      />
    </div>
  );
}

export default AppSpinner;

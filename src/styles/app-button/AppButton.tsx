import { useButton } from "@react-aria/button";
import { useRef } from "react";

import classnames from "classnames";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";

const AppButton = function ({
  variant = "primary",
  size = "md",
  full = false,
  loading = false,
  disabled = false,
  inline = false,
  children,
  ...props
}: AppButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      ref={ref}
      className={classnames(
        "app-button",
        `app-button--${variant}`,
        `app-button--${size}`,
        {
          "app-button--full": full,
          "app-button--disabled": disabled,
          "app-button--loading": loading,
          "app-button--inline": inline,
        }
      )}
      {...buttonProps}
    >
      {loading ? <div className="mini-spinner" /> : children}
    </button>
  );
};

AppButton.displayName = "AppButton";

export default AppButton;

import { useButton } from "@react-aria/button";
import { ForwardedRef, forwardRef } from "react";

import classnames from "classnames";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import { useObjectRef } from "@react-aria/utils";

const AppButton = forwardRef(function ({
  variant = "primary",
  size = "md",
  full = false,
  loading = false,
  disabled = false,
  inline = false,
  children,
  ...props
}: AppButtonProps,
ref: ForwardedRef<HTMLButtonElement>) {
  const buttonRef = useObjectRef(ref);
  const { buttonProps } = useButton(props, buttonRef);

  return (
    <button
      ref={buttonRef}
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
}
)

AppButton.displayName = "AppButton";

export default AppButton;

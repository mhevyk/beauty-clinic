import { ForwardedRef, forwardRef } from "react";

import classnames from "classnames";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";

// TODO: add link variant
const AppButton = forwardRef(function (
  {
    variant = "primary",
    size = "md",
    full = false,
    loading = false,
    disabled = false,
    inline = false,
    children,
    as,
    ...props
  }: AppButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const ButtonComponent = as ?? "button";

  return (
    <ButtonComponent
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
      {...props}
    >
      {loading ? <div className="mini-spinner" /> : children}
    </ButtonComponent>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;

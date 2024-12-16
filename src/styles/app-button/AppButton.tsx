import { ForwardedRef, forwardRef } from "react";

import classnames from "classnames";

import Spinner from "@/assets/icons/spinner.svg";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import AppTypography from "@/styles/app-typography/AppTypography";

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
    type = "button",
    ...props
  }: AppButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      type={type}
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
      {loading ? <Spinner /> : <AppTypography>{children}</AppTypography>}
    </button>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;

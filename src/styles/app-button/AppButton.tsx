import { ForwardedRef, forwardRef } from "react";

import classnames from "classnames";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import AppSpinner from "@/styles/app-spinner/AppSpinner";
import AppTypography from "@/styles/app-typography/AppTypography";

// TODO: add link variant
const AppButton = forwardRef(function (
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    isLoading = false,
    disabled = false,
    inline = true,
    type = "button",
    children,
    prefixIcon,
    icon,
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
          "app-button--full": fullWidth,
          "app-button--disabled": disabled,
          "app-button--loading": isLoading,
          "app-button--inline": inline,
        }
      )}
      {...props}
    >
      {isLoading ? (
        <AppSpinner variant={variant === "primary" ? "#fff" : "#000"} />
      ) : (
        <>
          {prefixIcon}
          <AppTypography as="span">{children}</AppTypography>
          {icon}
        </>
      )}
    </button>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;

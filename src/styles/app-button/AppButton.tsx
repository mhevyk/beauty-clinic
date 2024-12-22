import { ForwardedRef, forwardRef } from "react";

import classnames from "classnames";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import AppSpinner from "@/styles/app-spinner/AppSpinner";
import AppTypography from "@/styles/app-typography/AppTypography";
import { APP_COLORS } from "@/styles/foundation";

// TODO: add link variant
const AppButton = forwardRef(function (
  {
    variant = "primary",
    size = "md",
    width = "fit",
    type = "button",
    isLoading = false,
    disabled = false,
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
          "app-button--full": width === "full",
          "app-button--disabled": disabled,
          "app-button--loading": isLoading,
        }
      )}
      {...props}
    >
      {isLoading ? (
        <AppSpinner
          variant={
            variant === "primary"
              ? APP_COLORS.primary.light
              : APP_COLORS.primary.dark
          }
        />
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

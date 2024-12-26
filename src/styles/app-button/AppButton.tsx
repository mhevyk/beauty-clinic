import { ForwardedRef, forwardRef } from "react";

import classnames from "classnames";

import { APP_COLORS } from "@/styles";
import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import AppSpinner from "@/styles/app-spinner/AppSpinner";
import AppTypography from "@/styles/app-typography/AppTypography";

// TODO: add link variant
const AppButton = forwardRef(function (
  {
    variant = "primary",
    size = "md",
    width = "fit",
    isLoading = false,
    children,
    startAdornment,
    endAdornment,
    ...props
  }: AppButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={classnames(
        "app-button",
        `app-button--${variant}`,
        `app-button--${size}`,
        {
          "app-button--full": width === "full",
          "app-button--loading": isLoading,
        }
      )}
      {...props}
    >
      {isLoading ? (
        <AppSpinner
          variant={
            variant === "primary"
              ? APP_COLORS.textPrimary
              : APP_COLORS.bgPrimary
          }
        />
      ) : (
        <>
          {startAdornment}
          <AppTypography as="span">{children}</AppTypography>
          {endAdornment}
        </>
      )}
    </button>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;

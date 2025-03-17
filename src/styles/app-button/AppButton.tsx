import { ElementType, Ref, forwardRef } from "react";
import { Link } from "react-router-dom";

import classnames from "classnames";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import AppSpinner from "@/styles/app-spinner/AppSpinner";
import AppTypography from "@/styles/app-typography/AppTypography";

type AllowedElementType = HTMLButtonElement | HTMLAnchorElement;

const AppButton = forwardRef<AllowedElementType, AppButtonProps>(function (
  {
    variant = "primary",
    size = "md",
    width = "fit",
    isLoading = false,
    disabled,
    children,
    startAdornment,
    endAdornment,
    to,
    className,
    ...props
  }: AppButtonProps,
  ref: Ref<AllowedElementType>
) {
  const ButtonComponent = (to ? Link : "button") as ElementType;
  const additionalButtonProps = to ? { to } : {};

  return (
    <ButtonComponent
      ref={ref}
      disabled={isLoading || disabled}
      className={classnames(
        "app-button",
        `app-button--${variant}`,
        `app-button--${size}`,
        {
          "app-button--full": width === "full",
          "app-button--loading": isLoading,
        },
        className
      )}
      {...additionalButtonProps}
      {...props}
    >
      {isLoading ? (
        <AppSpinner variant={variant === "primary" ? "secondary" : "primary"} />
      ) : (
        <>
          {startAdornment}
          <AppTypography as="span">{children}</AppTypography>
          {endAdornment}
        </>
      )}
    </ButtonComponent>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;

import { ElementType, Ref, forwardRef } from "react";
import { Link } from "react-router-dom";

import classnames from "classnames";

import { APP_COLORS } from "@/styles";
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
        <AppSpinner
          variant={
            variant === "primary" ? APP_COLORS.secondary : APP_COLORS.primary
          }
        />
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

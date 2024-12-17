import { ForwardedRef, forwardRef } from "react";

import classnames from "classnames";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import AppTypography from "@/styles/app-typography/AppTypography";
import AppSpinner from "@/styles/app-spinner/AppSpinner";

// TODO: add link variant
const AppButton = forwardRef(function (
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    isLoading = false,
    disabled = false,
    inline = false,
    type = "button",
    children,
    prefixIcon: PrefixIcon,
    postfixIcon: PostfixIcon,
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
        <AppSpinner />
      ) : (
        <>
          {PrefixIcon && <PrefixIcon theme="#fff" />}
          <AppTypography>{children}</AppTypography>
          {PostfixIcon && <PostfixIcon theme="#000" />}
        </>
      )}
    </button>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;

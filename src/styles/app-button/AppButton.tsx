import { useButton } from "@react-aria/button";
import { useObjectRef } from "@react-aria/utils";
import { ForwardedRef, forwardRef } from "react";

import classnames from "classnames";

import "@/styles/app-button/AppButton.scss";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";

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
  const buttonRef = useObjectRef(ref);
  const { buttonProps } = useButton(props, buttonRef);
  
  const ButtonComponent = as ?? "button";

  return (
    <ButtonComponent
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
    </ButtonComponent>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;
